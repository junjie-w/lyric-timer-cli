# LyricTimer CLI

![GitHub package.json version](https://img.shields.io/github/package-json/v/junjie-w/lyric-timer-cli)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/junjie-w/lyric-timer-cli/quality-checks.yml)
![Node.js](https://img.shields.io/badge/Node.js->=20-brightgreen)
[![codecov](https://codecov.io/gh/junjie-w/lyric-timer-cli/branch/main/graph/badge.svg)](https://codecov.io/gh/junjie-w/lyric-timer-cli)
[![semantic-release](https://img.shields.io/badge/semantic--release-enabled-brightgreen?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
![ESLint](https://img.shields.io/badge/ESLint-enabled-brightgreen)
![Husky](https://img.shields.io/badge/Husky-enabled-brightgreen)

A gentle focus timer CLI with inspiring lyrics. Available as an [NPM package](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli) for both CLI usage and library integration, and as a [Docker image](https://hub.docker.com/r/junjiewu0/lyric-timer) for containerized usage.

## ⭐ Quick Start

```bash
# Using NPM (recommended)
npx @junjie-wu/lyric-timer-cli

# Using Docker
docker run -it --rm junjiewu0/lyric-timer

# Using as a library
npm install @junjie-wu/lyric-timer-cli
```

## 📚 Usage

### 📦 NPM Package

#### CLI Usage
```bash
# Run with default settings (25 minutes, 15-second lyric intervals)
npx @junjie-wu/lyric-timer-cli

# Or install globally
npm install -g @junjie-wu/lyric-timer-cli
lyric-timer
```

#### Library Integration
```typescript
import { createTimer } from '@junjie-wu/lyric-timer-cli';

// Basic usage
await createTimer({
  duration: 25,      // 25 minutes
  lyricInterval: 30  // New lyric every 30 seconds
});
```

### 🐳 Docker

```bash
# Using Pre-built Image
docker run -it --rm junjiewu0/lyric-timer

# For ARM-based machines (Apple Silicon, etc.)
docker run -it --rm --platform linux/amd64 junjiewu0/lyric-timer

# Build and Run Locally
docker build -t lyric-timer .
docker run -it --rm lyric-timer
```

### 📋 Examples
For complete working examples of all usage methods, check out the [examples](./examples) directory:
```bash
git clone https://github.com/junjie-w/lyric-timer-cli.git
cd lyric-timer-cli/examples

# Try different examples
npm install
npm run start:lib     # Library usage
npm run start:cli     # CLI usage
npm run start:docker  # Docker usage
npm run start:exe     # Executable usage
```

## ⚡ Features

- 🎵 Inspiring lyrics while you focus
- ⏱️ Configurable timer duration
- 🔄 Adjustable lyric change intervals
- ⌨️ Interactive CLI interface
- ⏸️ Pause/Resume functionality
- 🎨 Beautiful terminal output

## 🛠️ Development

### Setup

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build
npm run build

# Start
npm start
```

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/junjie-w/lyric-timer-cli/issues).

## 🚀 Distribution

- NPM Registry: [@junjie-wu/lyric-timer-cli](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli)
- Docker Hub: [junjiewu0/lyric-timer](https://hub.docker.com/r/junjiewu0/lyric-timer)
- Standalone executables are available in the [releases](https://github.com/junjie-w/lyric-timer-cli/releases) page

## 📄 License

MIT
