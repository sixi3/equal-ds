## Contributing to Equal DS UI

Thanks for your interest in contributing! This guide explains how to get a local dev setup, coding standards, and how to propose changes.

### Getting started

```bash
git clone <YOUR_REPO_URL>
cd equal-ds
npm install
npm run storybook
```

Run tests:

```bash
npm test
```

Build library:

```bash
npm run build
```

### Branching

- Create feature branches from `main`: `feat/<short-name>`
- For fixes use `fix/<short-name>`

### Coding standards

- TypeScript, React, Tailwind
- Prefer clear, descriptive names
- Keep components accessible (ARIA roles/labels)
- Run linters and tests before opening a PR

### Commits & PRs

- Keep commits scoped and descriptive
- Open a PR with a clear description, screenshots for UI changes, and checklists for testing

### Release process

Maintainers:

```bash
npm version patch  # or minor/major
npm publish --access public
git push --follow-tags
```

### Reporting issues

Please include:

- Steps to reproduce
- Expected vs actual behavior
- Version info and environment
- Minimal reproduction if possible

### License

By contributing, you agree your contributions are licensed under the MIT license.


