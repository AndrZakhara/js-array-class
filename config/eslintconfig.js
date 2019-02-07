module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended'
  ],
  'globals': {
    'expect': true,
    'jest': true,
    'beforeEach': true,
    'describe': true,
    'test': true,
  },
  'rules': {
    // possible errors
    'no-unused-vars': 0,
    'for-direction': 'error',
    'no-await-in-loop': 'error',
    'no-prototype-builtins': 'error',
    'no-template-curly-in-string': 'error',
    // best practices
    'accessor-pairs': 'error',
    'array-callback-return': 'error',
    'class-methods-use-this': [1, {
      'exceptMethods': ['render']
    }],
    'consistent-return': 0,
    'curly': 'error',
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    'eqeqeq': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-empty-function': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 0,
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': 0,
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    'radix': 'error',
    'require-await': 'error',
    'wrap-iife': 'error',
    // variables
    'init-declarations': ['error', 'always'],
    // 'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': 'error',
    // node.js and commonjs
    'global-require': 'error',
    'handle-callback-err': 'error',
    'no-buffer-constructor': 'error',
    'no-mixed-requires': 'error',
    'no-new-require': 'error',
    'no-path-concat': 'error',
    'no-process-env': 'off',
    'no-process-exit': 'error',
    'no-sync': 'error',
    // stylisctic issues
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'camelcase': ['error', {
      'properties': 'always'
    }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'comma-style': 'error',
    'func-call-spacing': 'error',
    'function-paren-newline': 'off',
    'indent': ['error', 2],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': 'error',
    'max-len': ['error', {
      'code': 120,
      'tabWidth': 4
    }],
    'max-params': 'error',
    'max-statements-per-line': 'error',
    'multiline-ternary': 'off',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': ['error', {
      'ignoreChainWithDepth': 2
    }],
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-continue': 'error',
    'no-lonely-if': 'error',
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-plusplus': ['error', {
      'allowForLoopAfterthoughts': true
    }],
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'no-console': 'error',
    'object-curly-newline': ['error', {
      'consistent': true
    }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', {
      'allowMultiplePropertiesPerLine': true
    }],
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'always'],
    'operator-assignment': 'error',
    // 'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': 'var', 'next': 'return' },
      { 'blankLine': 'always', 'prev': 'let', 'next': 'return' },
      { 'blankLine': 'always', 'prev': 'const', 'next': 'return' },
      { 'blankLine': 'always', 'prev': 'import', 'next': 'var' },
      { 'blankLine': 'always', 'prev': 'import', 'next': 'let' },
      { 'blankLine': 'always', 'prev': 'import', 'next': 'const' },
      { 'blankLine': 'always', 'prev': 'block-like', 'next': 'var' },
      { 'blankLine': 'always', 'prev': 'block-like', 'next': 'let' },
      { 'blankLine': 'always', 'prev': 'block-like', 'next': 'const' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'if' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'for' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'while' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'switch' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'do' },
    ],
    // 'quote-props': ['error', 'consistent-as-needed'],
    'quote-props': 0,
    'quotes': ['error', 'single'],
    'semi': 'error',
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'semi-style': ['error', 'last'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', {
      'int32Hint': false
    }],
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': ['error', 'always'],
    'wrap-regex': 'error',
    // ECMAScript 6
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'generator-star-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'no-confusing-arrow': 0,
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': ['error', {
      'ignoreDestructuring': false,
      'ignoreImport': false,
      'ignoreExport': false
    }],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        'array': false,
        'object': true
      },
      {
        'enforceForRenamedProperties': false
      }
    ],
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'template-curly-spacing': ['error', 'never'],
    'yield-star-spacing': ['error', {
      'before': false,
      'after': true
    }]
  }
};
