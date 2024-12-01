# LyricTimer Examples

Examples of using LyricTimer via [NPM package](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli), [Docker image](https://hub.docker.com/r/junjiewu0/lyric-timer), and standalone executable.

## 📦 Library Usage
Using the package as a library in your code:
```bash
npm run start:lib
```

This demonstrates:
- Creating a timer with custom duration
- Setting custom lyric intervals
- Basic error handling

## 🎯 CLI Usage
Using the package as a command-line tool:
```bash
npm run start:cli
```

This demonstrates:
- Interactive CLI interface
- Default and custom settings
- Timer controls

## 🐳 Docker Usage
Using the containerized version:
```bash
# Start timer in container
npm run start:docker
```

## ⚡ Executable Usage
Using the standalone executable:
```bash
npm run start:exe
```

## 🧪 Running Examples

```bash
# Clone the repository
git clone https://github.com/junjie-w/lyric-timer-cli.git
cd lyric-timer-cli/examples

# Install dependencies
npm install

# Try different examples
npm run start:lib
npm run start:cli
npm run start:docker
npm run start:exe
```

## ⚠️ Troubleshooting

### Docker Issues

If you're using an ARM-based machine (Apple Silicon Mac):
```bash
docker run -it --rm --platform linux/amd64 junjiewu0/lyric-timer
```

### Executable Issues

If the executable doesn't run:
```bash
# Ensure it's built
cd ..
npm run build:executables

# Then try again
cd examples
npm run start:exe
```

### General Tips
- Each example has proper error handling and troubleshooting messages
- Check the console output for specific error details
- Make sure you're running the latest version of Node.js
