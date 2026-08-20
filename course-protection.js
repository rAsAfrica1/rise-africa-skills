// Rise Africa Skills - Course Protection System v2.0
// Protects course content from unauthorized access

class CourseProtection {
  constructor() {
    this.supabaseClient = null;
    this.currentUser = null;
    this.enrollment = null;
  }

  // Initialize course protection
  async init() {
    if (window.supabase) {
      this.supabaseClient = window.supabase.createClient(
        'https://your-supabase-url.supabase.co',
        'your-supabase-anon-key'
      );

      // Check authentication
      const { data: { session } } = await this.supabaseClient.auth.getSession();
      this.currentUser = session?.user || null;

      if (!this.currentUser) {
        console.warn('[CourseProtection] User not authenticated');
        this.redirectToLogin();
        return;
      }

      console.log('[CourseProtection] Initialized for user:', this.currentUser.email);
    } else {
      console.warn('[CourseProtection] Supabase library not loaded');
    }
  }

  // Check if user has access to course
  async checkCourseAccess(courseId) {
    if (!this.currentUser) {
      console.warn('[CourseProtection] Access denied: user not authenticated');
      return false;
    }

    // Check enrollment
    if (window.enrollmentSystem) {
      const isEnrolled = window.enrollmentSystem.isEnrolled(courseId);
      if (!isEnrolled) {
        console.warn('[CourseProtection] Access denied: user not enrolled');
        return false;
      }
    }

    console.log('[CourseProtection] Access granted to course:', courseId);
    return true;
  }

  // Redirect to login if not authenticated
  redirectToLogin() {
    console.log('[CourseProtection] Redirecting to login...');
    // Redirect to login/enrollment page
    const currentPage = window.location.pathname;
    window.location.href = `/enroll.html?redirect=${encodeURIComponent(currentPage)}`;
  }

  // Show enrollment prompt
  showEnrollmentPrompt(courseName) {
    const message = `You are viewing ${courseName}. To continue, you need to enroll in this course.`;
    console.log('[CourseProtection]', message);

    // Create enrollment banner (optional - can be styled with CSS)
    const banner = document.createElement('div');
    banner.id = 'enrollment-banner';
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(201, 162, 39, 0.9);
      color: #1a1a2e;
      padding: 1rem;
      text-align: center;
      z-index: 1000;
      font-weight: bold;
    `;
    banner.innerHTML = `
      ${message}
      <a href="/enroll.html" style="margin-left: 1rem; text-decoration: underline; color: #1a1a2e;">Enroll Now</a>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
  }

  // Log course access event
  async logCourseAccess(courseId, courseName) {
    if (!this.currentUser) return;

    const accessLog = {
      userId: this.currentUser.id,
      courseId: courseId,
      courseName: courseName,
      accessedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Log to localStorage (for analytics)
    const logs = JSON.parse(localStorage.getItem('course-access-logs') || '[]');
    logs.push(accessLog);
    localStorage.setItem('course-access-logs', JSON.stringify(logs));

    console.log('[CourseProtection] Access logged:', accessLog);
  }

  // Protect course content on page load
  async protectCourseContent() {
    await this.init();

    if (!this.currentUser) {
      this.redirectToLogin();
      return;
    }

    // Extract course ID from page (customize based on your HTML structure)
    const courseId = this.extractCourseId();
    const courseName = document.title || 'This Course';

    // Check access
    const hasAccess = await this.checkCourseAccess(courseId);

    if (!hasAccess) {
      this.showEnrollmentPrompt(courseName);
      // Optionally blur/hide content or prevent interaction
      const main = document.querySelector('main');
      if (main) {
        main.style.opacity = '0.3';
        main.style.pointerEvents = 'none';
      }
      return;
    }

    // Log successful access
    await this.logCourseAccess(courseId, courseName);
    console.log('[CourseProtection] Course access granted and logged');
  }

  // Extract course ID from page (customize as needed)
  extractCourseId() {
    // Option 1: From URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('courseId')) {
      return urlParams.get('courseId');
    }

    // Option 2: From HTML meta tag
    const metaTag = document.querySelector('meta[name="course-id"]');
    if (metaTag) {
      return metaTag.getAttribute('content');
    }

    // Option 3: From page filename
    const filename = window.location.pathname.split('/').pop().replace('.html', '');
    return filename;
  }

  // Get access logs for admin
  getAccessLogs() {
    const logs = JSON.parse(localStorage.getItem('course-access-logs') || '[]');
    return logs;
  }

  // Clear access logs (admin only)
  clearAccessLogs() {
    localStorage.removeItem('course-access-logs');
    console.log('[CourseProtection] Access logs cleared');
  }
}

// Global course protection instance
const courseProtection = new CourseProtection();

// Automatically protect course on page load
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[CourseProtection] Activating course protection...');
  await courseProtection.protectCourseContent();
});
