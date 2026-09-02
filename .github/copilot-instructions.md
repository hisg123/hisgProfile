# Delivery Policy

After completing user-requested repository changes:

1. Run the narrowest relevant validation. For this Vite project, run `npm run build` when no narrower check exists.
2. Inspect `git status` and stage only files relevant to the completed task. Never include unrelated user changes.
3. Create a descriptive commit, rebase it on `origin/main`, then push to `origin/main`.
4. The `Deploy GitHub Pages` workflow runs on every push to `main`; report the commit SHA and deployment trigger to the user.

Do not create an empty commit or push when no relevant changes exist. Do not force-push, amend a user commit, reset, or commit if the user explicitly asks to keep changes local.
