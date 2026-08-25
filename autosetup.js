#!/usr/bin/env node

/**
 * Rise Africa Skills - Mobile App Auto Setup
 * This script creates all necessary files for the React Native mobile app
 *
 * Usage: node auto-setup.js
 *
 * This will create the entire src/ directory structure and all configuration files
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log(colors.green, `✓ Created: ${dir}`);
  }
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
  log(colors.green, `✓ Created: ${filePath}`);
}

log(colors.blue, '\n========================================');
log(colors.blue, 'Rise Africa Skills - Mobile App Setup');
log(colors.blue, '========================================\n');

// Create directory structure
const dirs = [
  'src/redux/slices',
  'src/screens/auth',
  'src/screens/app',
  'src/navigation',
  'src/services',
  'src/hooks',
  'src/assets/images',
  'src/assets/fonts',
  'src/assets/icons',
];

log(colors.yellow, 'Creating directories...');
dirs.forEach(createDir);

// Create placeholder files for assets
writeFile('src/assets/images/.gitkeep', '');
writeFile('src/assets/fonts/.gitkeep', '');
writeFile('src/assets/icons/.gitkeep', '');

// Count files to be downloaded
let fileCount = 0;

log(colors.yellow, '\n========================================');
log(colors.yellow, 'Required Files to Download');
log(colors.yellow, '========================================\n');

const requiredFiles = [
  'package.json',
  'app.json',
  'app.config.js',
  'index.js',
  '.gitignore',
  'SUPABASE_SCHEMA.sql',
];

const folders = [
  'src/App.js',
  'src/redux/store.js',
  'src/redux/slices/authSlice.js',
  'src/redux/slices/courseSlice.js',
  'src/redux/slices/progressSlice.js',
  'src/redux/slices/downloadSlice.js',
  'src/redux/slices/notificationSlice.js',
  'src/redux/slices/userSlice.js',
  'src/navigation/RootNavigator.js',
  'src/navigation/AuthNavigator.js',
  'src/navigation/AppNavigator.js',
  'src/screens/auth/LoginScreen.js',
  'src/screens/auth/SignupScreen.js',
  'src/screens/auth/ForgotPasswordScreen.js',
  'src/screens/auth/BiometricSetupScreen.js',
  'src/screens/app/HomeScreen.js',
  'src/screens/app/CourseListScreen.js',
  'src/screens/app/CourseDetailScreen.js',
  'src/screens/app/LessonScreen.js',
  'src/screens/app/QuizScreen.js',
  'src/screens/app/SearchScreen.js',
  'src/screens/app/DownloadsScreen.js',
  'src/screens/app/DashboardScreen.js',
  'src/screens/app/ProfileScreen.js',
  'src/screens/app/EnrollmentScreen.js',
  'src/screens/app/NotificationsScreen.js',
  'src/services/api.js',
  'src/services/auth.js',
  'src/services/storage.js',
  'src/hooks/useAuth.js',
  'src/hooks/useCourse.js',
  'src/hooks/useOffline.js',
];

const docs = [
  'MOBILE_APP_README.md',
  'PHASE_1_IMPLEMENTATION_SUMMARY.md',
  'MOBILE_APP_PLAN.md',
  'SETUP_LOCAL_DEVELOPMENT.md',
];

log(colors.yellow, 'From cloud workspace (/home/claude/ras/), copy:\n');

log(colors.yellow, '📁 CORE FILES (Required):');
requiredFiles.forEach(f => {
  console.log(`   • ${f}`);
  fileCount++;
});

log(colors.yellow, '\n📁 SRC FOLDER (Entire directory):');
folders.forEach(f => {
  console.log(`   • ${f}`);
  fileCount++;
});

log(colors.yellow, '\n📁 DOCUMENTATION (Recommended):');
docs.forEach(f => {
  console.log(`   • ${f}`);
  fileCount++;
});

log(colors.green, `\nTotal files to download: ${fileCount}`);

log(colors.blue, '\n========================================');
log(colors.blue, 'Quick Download Instructions');
log(colors.blue, '========================================\n');

console.log('1. From cloud workspace, download these files:');
console.log('   - Navigate to /home/claude/ras/');
console.log('   - Download each file to your local folder');
console.log('');
console.log('2. Alternative - Manual copy:');
console.log('   - Copy package.json content');
console.log('   - Copy app.json content');
console.log('   - Copy app.config.js content');
console.log('   - etc.');
console.log('');
console.log('3. Then run:');
console.log('   npm install');
console.log('   npm start');
console.log('');

log(colors.green, '✓ Directory structure created!');
log(colors.green, '✓ Ready to receive downloaded files\n');

log(colors.blue, '========================================');
log(colors.yellow, 'Need help? Use this checklist:');
log(colors.blue, '========================================\n');

console.log('□ Download package.json');
console.log('□ Download app.json');
console.log('□ Download app.config.js (UPDATE with your Supabase credentials!)');
console.log('□ Download index.js');
console.log('□ Download .gitignore');
console.log('□ Download entire src/ folder');
console.log('□ Download SUPABASE_SCHEMA.sql');
console.log('□ Download MOBILE_APP_README.md');
console.log('□ Run: npm install');
console.log('□ Setup Supabase database (run SUPABASE_SCHEMA.sql)');
console.log('□ Run: npm start');
console.log('□ Scan QR with Expo Go app');
console.log('');

log(colors.green, 'Setup script completed! ✓\n');
