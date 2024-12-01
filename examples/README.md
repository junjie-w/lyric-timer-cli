# LyricTimer CLI Examples

Examples of using [LyricTimer CLI](https://github.com/junjie-w/lyric-timer-cli) via [Docker image](https://hub.docker.com/r/junjiewu0/lyric-timer-cli), [NPM package](https://www.npmjs.com/package/@junjie-wu/lyric-timer-cli), and standalone executable.

## 🐳 Docker Usage

```bash
npm run start:docker
```

## 🎯 CLI Usage

```bash
npm run start:cli
```

## 📦 Library Usage

```bash
npm run start:lib
```

## ⚡ Executable Usage

```bash
npm run start:exe
```

## ⚠️ Troubleshooting

### Docker on ARM-based machines (Apple Silicon, etc.)

If you're using an ARM-based machine (Apple Silicon Mac):

```bash
docker run -it --rm --platform linux/amd64 junjiewu0/lyric-timer-cli
```
