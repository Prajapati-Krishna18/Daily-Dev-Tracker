# Daily Dev Tracker 🚀

Welcome to my daily development and learning tracker! This repository serves as a personal journal and log of my continuous learning journey, daily coding practice, and project updates. 

Consistency is key to growth!

## 📈 Activity Log

Check out the [Daily Journal](daily-log.md) to see my daily entries, covering:
- Software development (frontend & backend)
- Data structures and algorithms (DSA)
- System design study
- Bug fixes and refactoring

## ⚙️ Automation & Stats

My progress is automatically tracked and updated in [progress.json](progress.json). The system automatically tracks activities and updates the repository on a realistic daily schedule using GitHub Actions.

---

## 🛠️ Setup Instructions

To set up this automation on your own repository, follow these steps:

### 1. Prerequisites
- A GitHub account.
- The repository must have **GitHub Actions enabled**.

### 2. Enable Workflow Permissions
By default, GitHub Actions might not have permission to push changes directly to your repository. You must enable this:
1. Go to your repository **Settings**.
2. Click on **Actions** > **General** in the left sidebar.
3. Scroll down to **Workflow permissions**.
4. Select **Read and write permissions**.
5. Click **Save**.

### 3. Optional: Trigger Manual Run
To test if it works immediately:
1. Go to the **Actions** tab in your repository.
2. Select **Developer Activity Tracker** on the left.
3. Click the **Run workflow** dropdown button on the right.
4. Click **Run workflow**.

After a few seconds, the workflow will run, generate a new activity in `daily-log.md`, update statistics in `progress.json`, and commit it to the repository!

### 4. Customization
If you want to tweak the generated content, simply modify the `activities` array inside `scripts/generate_activity.js`. You can add your own projects, technologies, and custom journal entries to make it strictly tailored to your personal technology stack.
