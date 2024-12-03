# LyricTimer CLI

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/junjie-w/lyric-timer-cli/ci.yml)
[![Clack](https://img.shields.io/badge/@clack-CLI_Prompts-black)](https://github.com/natemoo-re/clack)
[![Chalk](https://img.shields.io/badge/Chalk-CLI_Styling-pink?logo=node.js)](https://github.com/chalk/chalk)
[![ncc](https://img.shields.io/badge/ncc-enabled-black?logo=vercel)](https://github.com/vercel/ncc)
![Vitest](https://img.shields.io/badge/Vitest-enabled-brightgreen?logo=vitest)
[![semantic-release](https://img.shields.io/badge/semantic--release-enabled-brightgreen?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
![ESLint](https://img.shields.io/badge/ESLint-enabled-brightgreen)
![Husky](https://img.shields.io/badge/Husky-enabled-brightgreen)

A command-line focus timer, available as a [Docker image](https://hub.docker.com/r/junjiewu0/lyric-timer-cli) for containerized usage, an [NPM package](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli) for both CLI usage and library integration, and as platform-specific executables.

![lyric-timer-cli](https://github.com/junjie-w/lyric-timer-cli/raw/main/.github/assets/lyric-timer-demo.png)

## ⭐ Quick Start

```bash
# Using Docker
docker run -it --rm junjiewu0/lyric-timer-cli

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

### 🧪 Executables

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

### 📋 Examples
For working examples, check out the [examples](https://github.com/junjie-w/lyric-timer-cli/tree/main/examples) directory:

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

## 🍄 Features

- ⏱️ Configurable timer duration
- 🔄 Adjustable lyric change intervals
- ⏸️ Pause/Resume functionality
- 🎨 Interactive CLI interface (built with [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) and [chalk](https://www.npmjs.com/package/chalk))

### Configuration Options

| Option | Type | Default | Description |
|----------|--------|-------------| ------------|
| `duration` | number | 25 | Timer duration in minutes |
| `lyricInterval` | number | 15 | Interval between lyric changes in seconds |

## 🛠️ Development 

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build
npm run build

# Run the built application
npm start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/junjie-w/lyric-timer-cli/issues).

## 🚀 Distribution

- NPM Registry: [@junjie-wu/lyric-timer-cli](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli)
- Docker Hub: [junjiewu0/lyric-timer-cli](https://hub.docker.com/r/junjiewu0/lyric-timer-cli)
- Platform-specific executables (see [Executables](https://github.com/junjie-w/lyric-timer-cli/tree/main?tab=readme-ov-file#-executables))

## 📄 License

MIT
