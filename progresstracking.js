/**
 * Progress Tracking System for rAs Courses
 * Tracks: module completion, quiz scores, time spent, overall progress
 * Storage: localStorage (primary) + Supabase (backup)
 */

class ProgressTracker {
  constructor(courseName) {
    this.courseName = courseName;
    this.storageKey = `progress_${courseName}`;
    this.sessionKey = `session_${courseName}`;
    this.init();
  }

  // Initialize or load existing progress
  init() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.data = JSON.parse(stored);
    } else {
      this.data = {
        courseName: this.courseName,
        enrolled_at: new Date().toISOString(),
        modules_completed: [],
        quiz_scores: {},
        total_time_spent: 0, // seconds
        last_accessed: new Date().toISOString(),
        percentage: 0,
        completed: false
      };
      this.save();
    }

    // Start session timer
    this.sessionStartTime = Date.now();
    this.setupSessionTracking();
  }

  // Setup automatic session tracking
  setupSessionTracking() {
    // Track time on page
    window.addEventListener('beforeunload', () => {
      const sessionTime = Math.round((Date.now() - this.sessionStartTime) / 1000);
      if (sessionTime > 10) { // Only count if > 10 seconds
        this.data.total_time_spent += sessionTime;
        this.data.last_accessed = new Date().toISOString();
        this.save();
      }
    });

    // Save progress every 30 seconds while on page
    setInterval(() => {
      const sessionTime = Math.round((Date.now() - this.sessionStartTime) / 1000);
      if (sessionTime > 10) {
        this.data.last_accessed = new Date().toISOString();
        this.save();
      }
    }, 30000);
  }

  // Mark module as completed
  completeModule(moduleNumber) {
    const moduleId = `module_${moduleNumber}`;
    if (!this.data.modules_completed.includes(moduleId)) {
      this.data.modules_completed.push(moduleId);
      this.updatePercentage();
      this.save();
      return true;
    }
    return false;
  }

  // Record quiz score
  recordQuizScore(moduleNumber, score, totalQuestions) {
    const moduleId = `module_${moduleNumber}`;
    const percentage = Math.round((score / totalQuestions) * 100);

    this.data.quiz_scores[moduleId] = {
      score,
      totalQuestions,
      percentage,
      timestamp: new Date().toISOString()
    };

    // Auto-complete module if quiz passed (70%+)
    if (percentage >= 70) {
      this.completeModule(moduleNumber);
    }

    this.save();
    return percentage;
  }

  // Get quiz score
  getQuizScore(moduleNumber) {
    const moduleId = `module_${moduleNumber}`;
    return this.data.quiz_scores[moduleId] || null;
  }

  // Update overall progress percentage
  updatePercentage() {
    const totalModules = 6; // Adjust based on your course structure
    const completed = this.data.modules_completed.length;
    this.data.percentage = Math.round((completed / totalModules) * 100);

    // Mark complete if all modules done
    if (completed >= totalModules) {
      this.data.completed = true;
      this.data.completion_date = new Date().toISOString();
    }

    return this.data.percentage;
  }

  // Get current progress
  getProgress() {
    return {
      percentage: this.data.percentage,
      modules_completed: this.data.modules_completed.length,
      total_modules: 6,
      quiz_scores: this.data.quiz_scores,
      total_time_spent: this.formatTime(this.data.total_time_spent),
      completed: this.data.completed,
      enrolled_at: this.data.enrolled_at,
      last_accessed: this.data.last_accessed
    };
  }

  // Format seconds to readable time
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  // Save to localStorage
  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      // Also try to sync with Supabase (non-blocking)
      this.syncToSupabase();
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }

  // Sync progress to Supabase (if available)
  async syncToSupabase() {
    try {
      const email = localStorage.getItem('enrolledUserEmail');
      if (!email || typeof supabaseClient === 'undefined') return;

      // Update or insert progress record
      const { error } = await supabaseClient.from('course_progress').upsert([
        {
          email: email,
          course_name: this.courseName,
          modules_completed: this.data.modules_completed,
          quiz_scores: this.data.quiz_scores,
          percentage: this.data.percentage,
          total_time_spent: this.data.total_time_spent,
          completed: this.data.completed,
          last_updated: new Date().toISOString()
        }
      ], { onConflict: 'email,course_name' });

      if (error) {
        console.warn('Supabase sync error (non-critical):', error);
      }
    } catch (e) {
      console.warn('Supabase sync error:', e);
    }
  }

  // Check if course is completed
  isCompleted() {
    return this.data.completed;
  }

  // Get completion date
  getCompletionDate() {
    return this.data.completion_date || null;
  }

  // Reset progress (for testing)
  reset() {
    localStorage.removeItem(this.storageKey);
    this.init();
  }
}

// ============================================
// HELPER FUNCTIONS FOR COURSE PAGES
// ============================================

let tracker = null;

// Initialize tracker on page load
function initializeTracker(courseName) {
  if (!courseName) {
    courseName = document.title.split('—')[0].trim();
  }
  tracker = new ProgressTracker(courseName);
  console.log(`Progress tracker initialized for: ${courseName}`);
}

// Mark current module as completed
function completeCurrentModule() {
  if (!tracker) {
    console.error('Tracker not initialized');
    return;
  }

  const moduleHeaders = document.querySelectorAll('h3');
  for (let h of moduleHeaders) {
    const text = h.textContent;
    const match = text.match(/MODULE\s+(\d+)/i);
    if (match) {
      const moduleNum = parseInt(match[1]);
      const wasNew = tracker.completeModule(moduleNum);
      if (wasNew) {
        showNotification(`✓ Module ${moduleNum} marked complete!`);
      }
      return moduleNum;
    }
  }
}

// Record quiz completion
function completeQuiz(score, total) {
  if (!tracker) {
    console.error('Tracker not initialized');
    return;
  }

  const moduleHeaders = document.querySelectorAll('h3');
  for (let h of moduleHeaders) {
    const text = h.textContent;
    const match = text.match(/MODULE\s+(\d+)/i);
    if (match) {
      const moduleNum = parseInt(match[1]);
      const percentage = tracker.recordQuizScore(moduleNum, score, total);
      showNotification(`Quiz Score: ${score}/${total} (${percentage}%)`);
      return { moduleNum, percentage };
    }
  }
}

// Get progress summary
function getProgressSummary() {
  if (!tracker) {
    console.error('Tracker not initialized');
    return null;
  }
  return tracker.getProgress();
}

// Show progress notification
function showNotification(message) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #c9a227;
    color: #1a1a2e;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notif.textContent = message;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), 3000);
}

// Display progress widget on page
function displayProgressWidget() {
  if (!tracker) {
    console.error('Tracker not initialized');
    return;
  }

  const progress = tracker.getProgress();
  const widget = document.createElement('div');
  widget.id = 'progress-widget';
  widget.style.cssText = `
    position: sticky;
    bottom: 0;
    background: rgba(26,26,46,0.95);
    border-top: 2px solid #c9a227;
    padding: 1rem;
    margin-top: 2rem;
    backdrop-filter: blur(8px);
  `;

  widget.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 1.5rem; align-items: center;">
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #fff;">Your Progress</strong>
          <strong style="color: #c9a227;">${progress.percentage}%</strong>
        </div>
        <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="background: #c9a227; height: 100%; width: ${progress.percentage}%; transition: width 0.5s ease;"></div>
        </div>
        <p style="font-size: 0.85rem; color: #999; margin-top: 0.5rem;">
          ${progress.modules_completed} of ${progress.total_modules} modules complete • Time: ${progress.total_time_spent}
        </p>
      </div>
      <div>
        ${progress.completed ? '<span style="background: #27ae60; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600;">✓ Course Complete!</span>' : ''}
      </div>
    </div>
  `;

  // Remove if exists
  const existing = document.getElementById('progress-widget');
  if (existing) existing.remove();

  document.body.appendChild(widget);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  const courseName = document.querySelector('h1')?.textContent ||
                     document.title.split('—')[0].trim();
  initializeTracker(courseName);
  displayProgressWidget();
});
