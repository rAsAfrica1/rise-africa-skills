// Rise Africa Skills - Enrollment System v2.0
// Manages course enrollment, progress tracking, and completion

class EnrollmentSystem {
  constructor() {
    this.storageKey = 'rise-africa-enrollments';
    this.supabaseClient = null;
    this.currentUser = null;
  }

  // Initialize enrollment system
  async init() {
    if (window.supabase) {
      this.supabaseClient = window.supabase.createClient(
        'https://your-supabase-url.supabase.co',
        'your-supabase-anon-key'
      );

      // Check current user
      const { data: { session } } = await this.supabaseClient.auth.getSession();
      this.currentUser = session?.user || null;
      console.log('[Enrollment] System initialized. User:', this.currentUser?.email || 'Guest');
    }
  }

  // Enroll user in a course
  async enrollInCourse(courseId, courseName) {
    if (!this.currentUser) {
      console.warn('[Enrollment] Cannot enroll: user not authenticated');
      return { success: false, error: 'User must be signed in to enroll' };
    }

    try {
      const enrollments = this.getLocalEnrollments();

      // Check if already enrolled
      const existing = enrollments.find(e => e.courseId === courseId);
      if (existing) {
        console.log('[Enrollment] Already enrolled in', courseName);
        return { success: false, error: 'Already enrolled in this course' };
      }

      // Add enrollment
      const enrollment = {
        courseId: courseId,
        courseName: courseName,
        userId: this.currentUser.id,
        enrolledAt: new Date().toISOString(),
        completedModules: [],
        completedQuizzes: [],
        finalProjectSubmitted: false,
        certificateIssued: false,
        progress: 0
      };

      enrollments.push(enrollment);
      localStorage.setItem(this.storageKey, JSON.stringify(enrollments));

      console.log('[Enrollment] Successfully enrolled in', courseName);
      return { success: true, enrollment: enrollment };
    } catch (error) {
      console.error('[Enrollment] Error enrolling:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Mark module as completed
  async completeModule(courseId, moduleNumber) {
    try {
      const enrollments = this.getLocalEnrollments();
      const enrollment = enrollments.find(e => e.courseId === courseId);

      if (!enrollment) {
        return { success: false, error: 'Not enrolled in this course' };
      }

      if (!enrollment.completedModules.includes(moduleNumber)) {
        enrollment.completedModules.push(moduleNumber);
        enrollment.progress = Math.round((enrollment.completedModules.length / 6) * 100);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(enrollments));
      console.log('[Enrollment] Module', moduleNumber, 'marked complete. Progress:', enrollment.progress + '%');

      return { success: true, progress: enrollment.progress };
    } catch (error) {
      console.error('[Enrollment] Error marking module complete:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Record quiz completion
  async completeQuiz(courseId, quizNumber, score) {
    try {
      const enrollments = this.getLocalEnrollments();
      const enrollment = enrollments.find(e => e.courseId === courseId);

      if (!enrollment) {
        return { success: false, error: 'Not enrolled in this course' };
      }

      if (!enrollment.completedQuizzes.includes(quizNumber)) {
        enrollment.completedQuizzes.push(quizNumber);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(enrollments));
      console.log('[Enrollment] Quiz', quizNumber, 'completed. Score:', score);

      return { success: true, quizzes_completed: enrollment.completedQuizzes.length };
    } catch (error) {
      console.error('[Enrollment] Error recording quiz:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Submit final project
  async submitFinalProject(courseId, projectData) {
    try {
      const enrollments = this.getLocalEnrollments();
      const enrollment = enrollments.find(e => e.courseId === courseId);

      if (!enrollment) {
        return { success: false, error: 'Not enrolled in this course' };
      }

      enrollment.finalProjectSubmitted = true;
      enrollment.projectSubmittedAt = new Date().toISOString();
      enrollment.progress = 100;

      localStorage.setItem(this.storageKey, JSON.stringify(enrollments));
      console.log('[Enrollment] Final project submitted for', enrollment.courseName);

      return { success: true, message: 'Project submitted successfully' };
    } catch (error) {
      console.error('[Enrollment] Error submitting project:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Issue certificate
  async issueCertificate(courseId) {
    try {
      const enrollments = this.getLocalEnrollments();
      const enrollment = enrollments.find(e => e.courseId === courseId);

      if (!enrollment) {
        return { success: false, error: 'Not enrolled in this course' };
      }

      // Check completion requirements
      if (enrollment.completedQuizzes.length < 6 || !enrollment.finalProjectSubmitted) {
        return { success: false, error: 'Course not yet complete. All 6 quizzes and final project required.' };
      }

      enrollment.certificateIssued = true;
      enrollment.certificateIssuedAt = new Date().toISOString();

      localStorage.setItem(this.storageKey, JSON.stringify(enrollments));
      console.log('[Enrollment] Certificate issued for', enrollment.courseName);

      return { success: true, certificate: enrollment };
    } catch (error) {
      console.error('[Enrollment] Error issuing certificate:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Get user's enrollments
  getLocalEnrollments() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Get enrollment for specific course
  getEnrollment(courseId) {
    const enrollments = this.getLocalEnrollments();
    return enrollments.find(e => e.courseId === courseId);
  }

  // Check if user is enrolled in course
  isEnrolled(courseId) {
    return !!this.getEnrollment(courseId);
  }
}

// Global enrollment system instance
const enrollmentSystem = new EnrollmentSystem();

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[Enrollment] Initializing enrollment system...');
  await enrollmentSystem.init();
});
