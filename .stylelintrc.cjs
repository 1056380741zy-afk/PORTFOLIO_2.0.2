module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  ignoreFiles: ['node_modules/**', 'dist/**', 'build/**', 'public/**'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer', 'config'],
      },
    ],
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'declaration-block-single-line-max-declarations': null,
    'selector-pseudo-element-no-unknown': null,
  },
};
