export default {
  '(src|tests|scripts|config|.)/**/*.{js,ts,json,yml}': [
    'eslint --cache --fix',
    'vitest related --run',
  ],
};
