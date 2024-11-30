FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY src/ ./src/

RUN npm ci && \
  npm run build && \
  npm prune --production

RUN adduser -D timer
USER timer

ENV TERM=xterm-256color

CMD ["node", "dist/src/bin/lyric-timer.js"]