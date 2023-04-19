module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  rules: {
    'max-len': [2, 100],
    '@typescript-eslint/ban-ts-comment': 1,
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-undef': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'no-underscore-dangle':  [
      'error',
      { 
        allow: ["__SERVER_PORT__"] 
      }
    ],
    'react/jsx-filename-extension': [
      2,
      { 
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
   ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js','.ts', '.tsx']
      }
    }
},
}
