---
name: conventional-commit
description: Create git commits using Conventional Commits by inspecting diffs, staging relevant files, and running git commit safely. Use when the user asks to commit changes with a conventional commit or to make a commit using Conventional Commits.
---

# Conventional Commit

## Instructions

When the user asks to commit with Conventional Commits:

1. Inspect the repository state before staging anything:
   - Run `git status --short`.
   - Run `git diff` and `git diff --staged`.
   - Run `git log --oneline -5` to understand the repository's commit style.
2. Identify the files that belong to this commit. Do not include unrelated user changes.
3. Refuse to commit likely secrets such as `.env`, credentials, private keys, or tokens unless the user explicitly confirms.
4. Choose the most accurate Conventional Commit type:
   - `feat`: new user-facing capability
   - `fix`: bug fix
   - `docs`: documentation-only change
   - `style`: formatting-only change with no behavior impact
   - `refactor`: code restructuring with no behavior change
   - `perf`: performance improvement
   - `test`: tests only
   - `build`: build system or dependency changes
   - `ci`: CI configuration changes
   - `chore`: maintenance that does not fit another type
   - `revert`: revert a previous commit
5. Add a scope only when it is clear and useful, such as `auth`, `todo`, `ui`, `deps`, or `config`.
6. Write the subject in imperative mood, lowercase after the type, and without a trailing period.
7. Add a body only when it explains important context, motivation, or risk.
8. Stage only the relevant files, then run `git commit` using a HEREDOC message.
9. Run `git status --short` after committing and report the result.

Do not update git config, skip hooks, amend commits, push, force push, reset, or discard changes unless the user explicitly asks.

## Commit Command Format

Use this command shape:

```bash
git commit -m "$(cat <<'EOF'
type(scope): short imperative subject

Optional body explaining why this change is needed.

EOF
)"
```

For breaking changes:

```bash
git commit -m "$(cat <<'EOF'
type(scope)!: short imperative subject

Explain the migration or compatibility impact.

BREAKING CHANGE: describe what breaks and how to adapt.

EOF
)"
```

## Quality Checks

- Prefer `fix` or `feat` over `chore` when user-facing behavior changes.
- Avoid vague subjects like `update files`, `fix bug`, or `misc changes`.
- Keep the first line under 72 characters when practical.
- If multiple unrelated changes are present, ask whether to split them into separate commits.

## Reporting

After committing, report:

- The commit hash and commit message.
- Any remaining unstaged or untracked files.
- Whether tests or checks were run.
