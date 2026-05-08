# 🛡️ Deployment Safety Guide

This document explains the safeguards in place to prevent deploying code with ESLint errors or build failures.

## What Prevents Bad Deploys

### 1. **Pre-Commit Hooks** (Husky + lint-staged)

**When:** Every time you run `git commit`

**What it does:**

- Runs ESLint --fix on all staged JS/TS files
- Runs Prettier to format code
- Runs TypeScript type checking
- **Blocks the commit if any errors exist**

**Files:**

- `.husky/pre-commit` - The hook script
- `.lintstagedrc.json` - Configuration for what runs on which files

### 2. **Pre-Push Hooks**

**When:** Every time you run `git push`

**What it does:**

- Runs `npm run build` to verify the entire app compiles
- **Blocks the push if the build fails**

**File:** `.husky/pre-push`

### 3. **Next.js Build Configuration**

**File:** `next.config.js`

```javascript
eslint: {
  ignoreDuringBuilds: false,  // Fail on ESLint errors
},
typescript: {
  ignoreBuildErrors: false,    // Fail on TypeScript errors
}
```

This ensures Netlify will fail the build if there are any errors.

### 4. **GitHub Actions CI**

**File:** `.github/workflows/ci.yml`

Runs on every PR and push to main:

- ESLint check
- TypeScript type check
- Full production build

**Blocks merging** if any step fails.

### 5. **Netlify Configuration**

**File:** `netlify.toml`

- Uses Node.js 20 (consistent environment)
- Sets `NODE_ENV=production` for builds
- Will fail if the Next.js build fails

## NPM Scripts You Can Use

```bash
# Run all validation locally
npm run validate

# Just linting
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix

# Type check only
npm run type-check

# Full build (catches most Netlify issues)
npm run build
```

## If You Need to Override (Emergency Only)

### Skip pre-commit hooks:

```bash
git commit -m "your message" --no-verify
```

### Skip pre-push hooks:

```bash
git push --no-verify
```

⚠️ **Only use `--no-verify` in true emergencies.** This bypasses all safety checks.

## Troubleshooting

### "husky not found" error?

```bash
npm run prepare
```

### Want to test the full build locally?

```bash
npm run validate
npm run build
```

### CI failing but local works?

- Check if environment variables are set in GitHub/Netlify
- Ensure `npm ci` works (delete node_modules and reinstall)

## Summary

| Stage         | Check              | Blocks Deploy?     |
| ------------- | ------------------ | ------------------ |
| Pre-commit    | ESLint, TypeScript | ❌ (blocks commit) |
| Pre-push      | Full build         | ❌ (blocks push)   |
| GitHub CI     | All checks         | ✅ (blocks merge)  |
| Netlify Build | Next.js build      | ✅ (blocks deploy) |

With these 4 layers of protection, you essentially cannot deploy broken code unless you explicitly bypass all safeguards with `--no-verify` flags.
