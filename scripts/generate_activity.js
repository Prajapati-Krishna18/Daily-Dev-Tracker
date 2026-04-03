const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../daily-log.md');
const progressFile = path.join(__dirname, '../progress.json');
const commitMsgFile = path.join(__dirname, '../.commit_msg');

// Realistic activity themes mapping to conventional commits
const activities = [
  {
    category: 'feat',
    scopes: ['api', 'ui', 'auth', 'database', 'core', 'router'],
    descriptions: [
      'Implement user authentication endpoint',
      'Add responsive grid layout',
      'Integrate payment gateway mock',
      'Create data models for users',
      'Setup React Router configuration',
      'Add dark mode toggle functionality',
      'Implement global state management',
      'Build reusable UI components'
    ],
    logEntries: [
      'Focusing on scaling the new feature. Built the foundation and mapped out the core components.',
      'Added the core functionality for this module. Smooth implementation, mostly matching the specs.',
      'Spent time bringing the new UI component to life. Accessibility and responsive design were the priorities.',
      'Integrated backend API with frontend state nicely. Handled loading and error states.',
      'Bootstrapped the new service, setting up the basic connections and middleware.'
    ]
  },
  {
    category: 'fix',
    scopes: ['api', 'ui', 'styles', 'state', 'tests', 'cache'],
    descriptions: [
      'Resolve null pointer exception in controller',
      'Fix alignment issues on mobile view',
      'Patch memory leak in effect hook',
      'Correct state mutation bug',
      'Fix flaky integration tests',
      'Resolve race condition in caching layer'
    ],
    logEntries: [
      'Debugged and fixed some annoying edge case bugs today.',
      'Resolved an issue causing UI jank during scrolling on mobile.',
      'Patched a state bug that took a while to track down in the profiler.',
      'Squashed some technical debt bugs, which should improve overall stability.',
      'Fixed the race condition that was triggering sporadic failures in the CI pipeline.'
    ]
  },
  {
    category: 'refactor',
    scopes: ['components', 'utils', 'services', 'config', 'hooks'],
    descriptions: [
      'Extract common logic into custom hook',
      'Clean up messy controller code',
      'Simplify state management tree',
      'Reorganize folder structure for domain driven design',
      'Optimize database query for faster load time'
    ],
    logEntries: [
      'Refactored some legacy code to be more readable and maintainable.',
      'Cleaned up tech debt. Broke down large functions into smaller, testable units.',
      'Extracted repetitive logic into its own utility function to keep things DRY.',
      'Optimized the performance of a slow path. Looks much better on the profiler now.'
    ]
  },
  {
    category: 'docs',
    scopes: ['readme', 'api', 'setup', 'arch'],
    descriptions: [
      'Update setup instructions',
      'Document API endpoints with Swagger',
      'Add JSDoc comments to core functions',
      'Improve contribution guidelines',
      'Update architecture diagrams'
    ],
    logEntries: [
      'Spent time writing documentation today. Clear docs are better than clever code.',
      'Updated the README for better onboarding of new contributors.',
      'Added inline comments to complex algorithmic functions for future reference.',
      'Fleshed out the API documentation for the newly added endpoints.'
    ]
  },
  {
    category: 'chore',
    scopes: ['deps', 'ci', 'build', 'lint'],
    descriptions: [
      'Update npm packages to latest versions',
      'Configure ESLint and Prettier rules',
      'Tweak GitHub Actions CI pipeline',
      'Migrate build tool setup'
    ],
    logEntries: [
      'Updated dependencies, bumping versions to clear some security advisories.',
      'Tweaked the build configuration. Reduced bundle size slightly.',
      'Fixed some linter warnings across the codebase and enforced stricter rules.',
      'Cleaned up some unused files and configs.'
    ]
  },
  {
    category: 'learning',
    scopes: ['dsa', 'system-design', 'cloud', 'patterns'],
    descriptions: [
      'Practice dynamic programming and graph problems',
      'Study distributed systems concepts',
      'Review AWS serverless architecture patterns',
      'Read up on advanced React design patterns'
    ],
    logEntries: [
      'Practiced DSA problems today. Focused on sliding window and two-pointer techniques.',
      'Read up on system design concepts. Deep dive into caching strategies and load balancing.',
      'Spent time learning some new architectural patterns.',
      'Watched a conference talk and implemented some of the learnings into a sandbox project.'
    ]
  }
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 1. Read existing progress data
let progress;
try {
  progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
} catch (e) {
  // Initialize if missing
  progress = {
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCommitDate: null,
    breakdown: {}
  };
}

// 2. Draft the activity
const activity = getRandomItem(activities);
const commitType = activity.category === 'learning' ? 'docs' : activity.category;
const scope = getRandomItem(activity.scopes);
const desc = getRandomItem(activity.descriptions);
const logEntry = getRandomItem(activity.logEntries);

// 3. Format commit message
const commitMsg = `${commitType}(${scope}): ${desc.toLowerCase()}`;

// 4. Update the statistics
const todayStr = new Date().toISOString().split('T')[0];

if (progress.lastCommitDate === todayStr) {
  progress.totalContributions += 1;
} else if (progress.lastCommitDate) {
  const lastDate = new Date(progress.lastCommitDate);
  const today = new Date(todayStr);
  const diffTime = Math.abs(today - lastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 1) {
    progress.currentStreak += 1;
    if (progress.currentStreak > progress.longestStreak) {
      progress.longestStreak = progress.currentStreak;
    }
  } else {
    progress.currentStreak = 1;
  }
  progress.totalContributions += 1;
  progress.lastCommitDate = todayStr;
} else {
  progress.currentStreak = 1;
  progress.longestStreak = 1;
  progress.totalContributions += 1;
  progress.lastCommitDate = todayStr;
}

progress.breakdown[activity.category] = (progress.breakdown[activity.category] || 0) + 1;

fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));

// 5. Append realistic output into the markdown log
const dateStr = new Date().toUTCString();
const formattedLog = `
### ${dateStr}
- **Type:** ${activity.category.toUpperCase()}
- **Scope:** \`${scope}\`
- **Action:** ${desc}
- **Journal:** ${logEntry}
`;

fs.appendFileSync(logFile, formattedLog);

// 6. Output the commit message for the bash script to consume
fs.writeFileSync(commitMsgFile, commitMsg);

console.log(`Successfully generated activity: ${commitMsg}`);
