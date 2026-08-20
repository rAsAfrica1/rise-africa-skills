/**
 * Rise Africa Skills Platform - Progress Tracker
 * Handles local storage of module progress and syncing with server
 * Works in both online and offline modes
 */

const progressTracker = (() => {
    const STORAGE_PREFIX = 'rise_africa_';
    const SYNC_ENDPOINT = '/api/progress/sync'; // Configure this to your backend
    const VERSION = '1.0.0';

    /**
     * Initialize progress tracker
     */
    function init() {
        // Check if storage quota is available
        if (navigator.storage && navigator.storage.persist) {
            navigator.storage.persist().then(persistent => {
                console.log('Persistent storage enabled:', persistent);
            });
        }

        // Setup periodic sync
        setupPeriodicSync();

        // Monitor online/offline changes
        setupSyncListeners();
    }

    /**
     * Get or create a user profile
     */
    function getUserProfile(userId) {
        const key = `${STORAGE_PREFIX}user_${userId}`;
        let profile = JSON.parse(localStorage.getItem(key));

        if (!profile) {
            profile = {
                userId,
                createdAt: new Date().toISOString(),
                lastSync: null,
                enrolledCourses: [],
                completedModules: [],
                totalPoints: 0,
                badges: [],
                syncPending: true
            };
            saveUserProfile(userId, profile);
        }

        return profile;
    }

    /**
     * Save user profile to local storage
     */
    function saveUserProfile(userId, profile) {
        const key = `${STORAGE_PREFIX}user_${userId}`;
        localStorage.setItem(key, JSON.stringify(profile));
    }

    /**
     * Update module progress
     */
    function updateProgress(moduleId, progressData) {
        const key = `${STORAGE_PREFIX}module_${moduleId}`;
        const timestamp = new Date().toISOString();

        let existing = JSON.parse(localStorage.getItem(key)) || {
            moduleId,
            createdAt: timestamp,
            updates: []
        };

        existing.lastUpdated = timestamp;
        existing.status = calculateStatus(progressData);
        existing.currentProgress = progressData;
        existing.syncPending = true;

        // Track update history
        existing.updates.push({
            timestamp,
            data: progressData,
            synced: false
        });

        // Keep only last 100 updates to avoid storage bloat
        if (existing.updates.length > 100) {
            existing.updates = existing.updates.slice(-100);
        }

        localStorage.setItem(key, JSON.stringify(existing));
        console.log(`Progress updated for module ${moduleId}`, progressData);

        return existing;
    }

    /**
     * Get module progress
     */
    function getModuleProgress(moduleId) {
        const key = `${STORAGE_PREFIX}module_${moduleId}`;
        const data = JSON.parse(localStorage.getItem(key)) || {
            moduleId,
            videosWatched: 0,
            stepsCompleted: 0,
            quizCompleted: false,
            projectSubmitted: false,
            completed: false,
            completedAt: null
        };

        return data;
    }

    /**
     * Get course progress (all modules in a course)
     */
    function getCourseProgress(courseId) {
        const modulesPattern = new RegExp(`${STORAGE_PREFIX}module_${courseId}-\\d+`);
        let totalProgress = 0;
        let completedModules = 0;
        const moduleProgresses = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (modulesPattern.test(key)) {
                const data = JSON.parse(localStorage.getItem(key));
                moduleProgresses.push(data);
                if (data.completed) completedModules++;
                totalProgress += data.currentProgress?.percentage || 0;
            }
        }

        return {
            courseId,
            totalModules: moduleProgresses.length,
            completedModules,
            averageProgress: moduleProgresses.length > 0 ?
                Math.round(totalProgress / moduleProgresses.length) : 0,
            moduleProgresses,
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Record video as watched
     */
    function recordVideoWatched(moduleId, videoId) {
        const progress = getModuleProgress(moduleId);
        if (!progress.videosWatched) progress.videosWatched = [];
        if (!progress.videosWatched.includes(videoId)) {
            progress.videosWatched.push(videoId);
        }
        updateProgress(moduleId, progress);
    }

    /**
     * Record implementation step as completed
     */
    function recordStepCompleted(moduleId, stepNumber) {
        const progress = getModuleProgress(moduleId);
        if (!progress.stepsCompleted) progress.stepsCompleted = [];
        if (!progress.stepsCompleted.includes(stepNumber)) {
            progress.stepsCompleted.push(stepNumber);
        }
        updateProgress(moduleId, progress);
    }

    /**
     * Record quiz submission
     */
    function recordQuizSubmission(moduleId, answers, score) {
        const progress = getModuleProgress(moduleId);
        progress.quizSubmitted = true;
        progress.quizAnswers = answers;
        progress.quizScore = score;
        progress.quizCompletedAt = new Date().toISOString();
        updateProgress(moduleId, progress);
        return { score, passed: score >= 70 };
    }

    /**
     * Record project submission
     */
    function recordProjectSubmission(moduleId, submissionText, files = []) {
        const progress = getModuleProgress(moduleId);
        progress.projectSubmitted = true;
        progress.projectSubmission = submissionText;
        progress.projectFiles = files;
        progress.projectSubmittedAt = new Date().toISOString();
        updateProgress(moduleId, progress);
    }

    /**
     * Save project draft (without submitting)
     */
    function saveProjectDraft(moduleId, draftText) {
        const key = `${STORAGE_PREFIX}module_${moduleId}`;
        let data = JSON.parse(localStorage.getItem(key)) || {};
        data.projectDraft = draftText;
        data.projectDraftSavedAt = new Date().toISOString();
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Complete a module
     */
    function completeModule(moduleId) {
        const progress = getModuleProgress(moduleId);
        progress.completed = true;
        progress.completedAt = new Date().toISOString();
        updateProgress(moduleId, progress);

        // Add points
        const userId = getUserIdFromModule(moduleId);
        if (userId) {
            addPoints(userId, 100); // 100 points per module
        }
    }

    /**
     * Add points to user
     */
    function addPoints(userId, points) {
        const profile = getUserProfile(userId);
        profile.totalPoints = (profile.totalPoints || 0) + points;
        profile.lastPointsUpdate = new Date().toISOString();

        // Check for badges
        checkBadges(userId, profile);
        saveUserProfile(userId, profile);
    }

    /**
     * Award badge to user
     */
    function awardBadge(userId, badgeId, badgeName) {
        const profile = getUserProfile(userId);
        if (!profile.badges) profile.badges = [];

        const badge = {
            id: badgeId,
            name: badgeName,
            awardedAt: new Date().toISOString()
        };

        if (!profile.badges.find(b => b.id === badgeId)) {
            profile.badges.push(badge);
            saveUserProfile(userId, profile);
            return true;
        }
        return false;
    }

    /**
     * Check and award badges based on progress
     */
    function checkBadges(userId, profile) {
        const badges = {
            'first_module': { name: 'First Step', description: 'Complete your first module' },
            'five_modules': { name: 'Learner', description: 'Complete 5 modules' },
            'all_modules': { name: 'Master', description: 'Complete all modules in a course' },
            'perfect_score': { name: 'Perfect', description: 'Score 100% on quiz' },
            'consistency': { name: 'Consistent', description: 'Complete modules 5 days in a row' }
        };

        // Check milestone badges
        const completedCount = profile.completedModules?.length || 0;

        if (completedCount === 1) {
            awardBadge(userId, 'first_module', badges.first_module.name);
        }
        if (completedCount === 5) {
            awardBadge(userId, 'five_modules', badges.five_modules.name);
        }
        if (completedCount >= 50) {
            awardBadge(userId, 'all_modules', badges.all_modules.name);
        }
    }

    /**
     * Calculate completion status based on progress data
     */
    function calculateStatus(progressData) {
        if (progressData.completed) return 'completed';
        if ((progressData.videosWatched || 0) > 0 ||
            (progressData.stepsCompleted || 0) > 0 ||
            progressData.quizSubmitted ||
            progressData.projectSubmitted) {
            return 'in-progress';
        }
        return 'not-started';
    }

    /**
     * Get all pending syncs
     */
    function getPendingSyncs() {
        const pending = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(`${STORAGE_PREFIX}module_`)) {
                const data = JSON.parse(localStorage.getItem(key));
                if (data.syncPending || data.updates?.some(u => !u.synced)) {
                    pending.push(data);
                }
            }
        }

        return pending;
    }

    /**
     * Sync progress with server
     */
    function syncProgress(userId = null) {
        if (!navigator.onLine) {
            console.log('Offline - sync will occur when online');
            return Promise.reject('Offline');
        }

        const pending = getPendingSyncs();

        if (pending.length === 0) {
            console.log('No pending syncs');
            return Promise.resolve({ synced: 0 });
        }

        const syncData = {
            timestamp: new Date().toISOString(),
            userId,
            updates: pending,
            clientVersion: VERSION
        };

        return fetch(SYNC_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(syncData)
        })
        .then(response => {
            if (!response.ok) throw new Error(`Sync failed: ${response.status}`);
            return response.json();
        })
        .then(result => {
            // Mark synced items
            pending.forEach(item => {
                const key = `${STORAGE_PREFIX}module_${item.moduleId}`;
                const stored = JSON.parse(localStorage.getItem(key));
                stored.syncPending = false;
                stored.lastSyncedAt = new Date().toISOString();
                if (stored.updates) {
                    stored.updates.forEach(u => u.synced = true);
                }
                localStorage.setItem(key, JSON.stringify(stored));
            });

            console.log(`Synced ${pending.length} modules`);
            return { synced: pending.length, result };
        })
        .catch(error => {
            console.error('Sync error:', error);
            return { synced: 0, error };
        });
    }

    /**
     * Setup periodic sync (every 5 minutes when online)
     */
    function setupPeriodicSync() {
        setInterval(() => {
            if (navigator.onLine) {
                syncProgress();
            }
        }, 5 * 60 * 1000); // 5 minutes
    }

    /**
     * Setup online/offline listeners
     */
    function setupSyncListeners() {
        window.addEventListener('online', () => {
            console.log('Back online - attempting sync');
            syncProgress();
        });

        window.addEventListener('offline', () => {
            console.log('Offline - future updates will sync when back online');
        });
    }

    /**
     * Get authentication token (from session/localStorage)
     */
    function getAuthToken() {
        return localStorage.getItem('authToken') || '';
    }

    /**
     * Export user data for backup
     */
    function exportUserData(userId) {
        const profile = getUserProfile(userId);
        const courses = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes(`${STORAGE_PREFIX}module_`)) {
                const data = JSON.parse(localStorage.getItem(key));
                courses.push(data);
            }
        }

        return {
            profile,
            courses,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Clear all data (use with caution)
     */
    function clearAllData(confirm = false) {
        if (!confirm) {
            console.warn('Call with confirm=true to clear all data');
            return false;
        }

        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_PREFIX)) {
                keys.push(key);
            }
        }

        keys.forEach(key => localStorage.removeItem(key));
        console.log(`Cleared ${keys.length} items`);
        return true;
    }

    /**
     * Get storage usage
     */
    function getStorageStats() {
        let totalSize = 0;
        const itemCount = { user: 0, module: 0, other: 0 };

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(STORAGE_PREFIX)) {
                const size = new Blob([localStorage.getItem(key)]).size;
                totalSize += size;

                if (key.includes('user_')) itemCount.user++;
                else if (key.includes('module_')) itemCount.module++;
                else itemCount.other++;
            }
        }

        return {
            totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
            itemCount,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Helper to extract userId from moduleId
     */
    function getUserIdFromModule(moduleId) {
        // Assumes moduleId format: courseId-moduleNum
        // In production, you'd store userId separately
        return localStorage.getItem('currentUserId') || 'anonymous';
    }

    // Public API
    return {
        init,
        getUserProfile,
        saveUserProfile,
        updateProgress,
        getModuleProgress,
        getCourseProgress,
        recordVideoWatched,
        recordStepCompleted,
        recordQuizSubmission,
        recordProjectSubmission,
        saveProjectDraft,
        completeModule,
        addPoints,
        awardBadge,
        checkBadges,
        syncProgress,
        getPendingSyncs,
        exportUserData,
        clearAllData,
        getStorageStats,
        VERSION,
        STORAGE_PREFIX
    };
})();

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', progressTracker.init);
} else {
    progressTracker.init();
}
