# LyricTimer CLI
![lyric-timer-demo](.github/assets/lyric-timer-demo.png)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/junjie-w/lyric-timer-cli/ci.yml)
[![semantic-release](https://img.shields.io/badge/semantic--release-enabled-brightgreen?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
![ESLint](https://img.shields.io/badge/ESLint-enabled-brightgreen)
![Husky](https://img.shields.io/badge/Husky-enabled-brightgreen)

A command-line focus timer, available as a [Docker image](https://hub.docker.com/r/junjiewu0/lyric-timer-cli) for containerized usage, an [NPM package](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli) for both CLI usage and library integration, and a standalone execuatble.

## ⭐ Quick Start

```bash
# Using Docker
docker run -it --rm junjiewu0/lyric-timer

# Using NPM (with CLI)
npx @junjie-wu/lyric-timer-cli

# Using NPM (as library)
npm install @junjie-wu/lyric-timer-cli
```

## 📚 Usage

### 🐳 Docker

```bash
# Using Pre-built Image
docker pull junjiewu0/lyric-timer-cli
docker run -it --rm junjiewu0/lyric-timer-cli

# For ARM-based machines (Apple Silicon, etc.)
docker pull --platform linux/amd64 junjiewu0/lyric-timer-cli
docker run -it --rm --platform linux/amd64 junjiewu0/lyric-timer-cli

# Build and Run Locally
docker build -t lyric-timer-cli .
docker run -it --rm lyric-timer-cli
```

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

await createTimer({
  duration: 25,
  lyricInterval: 10
});
```

### Standalone Executable

#### Running Locally with Node.js

```bash
# Build uncompressed version
npm run build:exe

# Run it
npm run start:built
```

#### Platform-specific Builds (Standalone, no Node.js required):

```bash
# Build compressed executables for all platforms
npm run build:exe:compress

# Run based on your platform:
npm run start:mac-arm    # For ARM-based machines (Apple Silicon, etc.)
npm run start:mac-intel  # For Intel Macs
npm run start:linux      # For Linux

# For Windows:
# After running build:exe:compress:
# 1. Find lyric-timer-win-x64.exe.gz in the executables folder
# 2. Extract using 7-Zip, WinRAR, or similar tool
# 3. Run the extracted lyric-timer-win-x64.exe
```

#### Download Pre-built Binary
Download the pre-built binary from the [releases page](https://github.com/junjie-w/lyric-timer-cli/releases).

### 📋 Examples
For complete working examples of all usage methods, check out the [examples](https://github.com/junjie-w/lyric-timer-cli/tree/main/examples) directory:
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
