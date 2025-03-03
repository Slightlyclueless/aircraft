'use strict';

module.exports = {
  extends: ['../../../../../../.eslintrc.js', 'plugin:jsdoc/recommended-typescript-error'],

  // overrides airbnb, use sparingly
  rules: {
    'react/no-unknown-property': 'off',
    'react/style-prop-object': 'off',
    'arrow-body-style': 'off',
    camelcase: 'off',
  },
};
