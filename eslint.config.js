import vladpuz from 'eslint-config-vladpuz'

export default [
  ...vladpuz(),
  {
    name: 'extensions',
    rules: {
      'no-restricted-imports': ['error', {
        patterns: ['**/*.js'],
      }],
    },
  },
]
