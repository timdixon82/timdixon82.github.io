# timdixon82.github.io

Tim Dixon's project-index landing page, served at [projects.timdixon.net](https://projects.timdixon.net). The page lists Tim's accessible, interactive web tools and links to each project.

## What this project is

A single-page static site hosted on GitHub Pages. It is the GitHub user site for the `timdixon82` account. The custom domain `projects.timdixon.net` is set through the `CNAME` file in this repository, which means this file governs the public address of every project page in the family (for example `projects.timdixon.net/Periodic-Table`). Do not remove or change the `CNAME` file without a deliberate decision.

The page is built with plain HTML and CSS, with a small inline JavaScript theme toggle. There is no build step and no external runtime dependencies. The deployed site is the files in the repository.

## How to run the site locally

Serve the repository root with any static HTTP server. Python's built-in server works with no installation:

```
python3 -m http.server 8080 --directory "/path/to/timdixon82.github.io"
```

Then open `http://localhost:8080` in a browser. Press `Ctrl+C` to stop the server.

## File structure

```
timdixon82.github.io/
├── index.html                    Main page
├── assets/
│   └── analytics/
│       └── count.js              Self-hosted GoatCounter analytics script
├── CNAME                         Custom domain record (do not change)
├── VERSION                       Semantic version string
├── README.md                     This file
├── package.json                  Development linters (not served to the browser)
├── package-lock.json             Pinned dependency tree
├── .gitignore                    Node modules and editor artefacts
├── .htmlvalidate.json            HTML linter configuration
├── .stylelintrc.json             CSS linter configuration
├── eslint.config.js              JavaScript linter configuration
├── pa11y.json                    Pa11y accessibility test configuration
├── release-please-config.json    Release automation configuration
├── .release-please-manifest.json Release version manifest
├── .github/
│   └── workflows/
│       ├── ci.yml                Lint workflow
│       ├── accessibility.yml     Accessibility workflow
│       ├── security.yml          Security workflow
│       ├── codeql.yml            CodeQL static analysis
│       └── release.yml           Release automation
└── docs/                         Project wiki
```

## Live site

The live site is at [projects.timdixon.net](https://projects.timdixon.net).
