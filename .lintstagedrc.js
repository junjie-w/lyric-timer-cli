export default {
  '(src|tests|scripts)/**/*.{js,ts,json,yml}': [
    "eslint --cache --fix",
    "vitest related --run"
  ]
};
