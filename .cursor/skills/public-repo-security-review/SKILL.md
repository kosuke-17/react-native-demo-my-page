---
name: public-repo-security-review
description: Reference knowledge for the public-repo-security-reviewer subagent. Provides review criteria for checking whether current changes are safe to publish to a public GitHub repository.
disable-model-invocation: true
---

# Public Repo Security Review

## Purpose

This skill is supporting knowledge for the `public-repo-security-reviewer` subagent. It should not perform the review by itself.

Use this as the checklist of risks, judgment criteria, and reporting expectations when a subagent reviews whether current git changes and untracked files are safe to publish in a public GitHub repository.

## Review Scope

- Review changed source code, docs, config, generated files, and assets.
- Include untracked files in the security review.
- Limit the review to current git changes unless the user asks for a broader repository audit.

## Risk Areas

### Secrets

Flag API keys, access tokens, bearer tokens, private keys, passwords, credentials, database URLs, service account JSON, cloud keys, OAuth client secrets, and signing material.

Common indicators include `ghp_`, `github_pat`, `sk-`, `AKIA`, `AIza`, PEM blocks, JWT-looking strings, connection strings, and credential-like JSON fields.

### Environment And Key Material

Flag `.env`, `.env.*`, credential files, signing keys, certificates, provisioning profiles, keystores, private profiles, and service account files.

Check whether `.gitignore` protects common local secret files, generated native build outputs, and platform-specific signing artifacts.

### Personal Information And Privacy

Treat real names, face photos, addresses, phone numbers, email addresses, SNS accounts, employment details, location clues, and detailed personal profiles as blocker candidates.

Distinguish between secret leakage and public-by-intent personal information, but require explicit user confirmation before marking public personal data as safe.

### Image And Media Metadata

Newly added image or media assets can expose metadata. Check metadata where practical, especially EXIF, XMP, GPS, camera/device information, and embedded comments.

For WebP, inspect RIFF chunks and flag `EXIF` or `XMP ` chunks when present.

### Docs And Planning Files

Look for internal URLs, private project names, unreleased plans, private architecture notes, customer names, credentials, operational details, and private AI-agent instructions.

### Dependencies

For npm projects, dependency vulnerabilities usually do not block publishing source code by themselves, but runtime-impacting vulnerabilities should be reported.

## Output Format

The subagent should report in this checklist format:

```markdown
## Public Repository Review

結論: `公開可` / `要修正` / `要確認`

| 観点                     | 判定             | 内容 |
| ------------------------ | ---------------- | ---- |
| シークレット             | OK / NG / 要確認 | ...  |
| 環境ファイル・鍵         | OK / NG / 要確認 | ...  |
| 個人情報・プライバシー   | OK / NG / 要確認 | ...  |
| 画像・メディアメタデータ | OK / NG / 要確認 | ...  |
| `.gitignore`             | OK / NG / 要確認 | ...  |
| docs・計画資料           | OK / NG / 要確認 | ...  |
| 依存関係                 | OK / NG / 要確認 | ...  |

## ブロッカー

- [重大度] `path`: 内容と理由

## 公開前に確認すること

- 確認事項

## 実施した確認

- 実行した検索・コマンド・対象ファイル
```

## Judgment Rules

- Mark as `NG` when secrets, credentials, private keys, signing material, or non-intentional private data are present.
- Mark personal profile data or face photos as `要確認` or blocker candidates unless the user has already confirmed they are intended for public release.
- Do not claim a binary asset is metadata-free unless metadata was actually checked.
- Dependency vulnerabilities usually do not block publishing source code by themselves, but they should be reported if they affect runtime security or development tooling.
- If a check could not be performed, say so explicitly and mark the item `要確認`.

## Safety Notes

- Do not modify files during the review unless the user separately asks for fixes.
- Do not commit, delete, rotate, or rewrite secrets. If a secret is found, recommend revocation and history cleanup.
- Keep the review concise and evidence-based. Cite relevant file paths.
