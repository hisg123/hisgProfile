---
name: git-deploy
description: "Use when committing, pushing, deploying, or running GitHub Actions for this portfolio. Validates the Vite app, commits task-related changes, pushes main, and confirms the GitHub Pages deployment trigger."
argument-hint: "Optional commit message"
---

# Git Commit And Deploy

Use this workflow after a completed repository change, or when the user asks to commit, push, deploy, or run Actions.

1. Run `npm run build` unless a more focused validation is appropriate.
2. Inspect `git status` and `git diff --stat`. Stage only files related to the completed request.
3. Commit with the supplied message or a concise conventional description of the change.
4. Run `git pull --rebase origin main`, resolving only conflicts in task-related files. Do not force-push or discard user changes.
5. Push with `git push origin main`.
6. Confirm that the push triggers `.github/workflows/deploy-pages.yml` (`Deploy GitHub Pages`). When GitHub CLI is available, inspect the latest run; otherwise, report that push triggered the workflow.

Do not create an empty commit or push if there are no relevant changes. Stop and report a blocker if rebase or push cannot be completed safely.
