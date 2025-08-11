const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'ci',
        'chore',
        'docs',
        'feat',
        'fix',
        'perf',
        'revert',
        'style',
        'refactor',
        'test'
      ]
    ]
  },
};

export default config;
