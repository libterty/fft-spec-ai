module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      "files": ["**/*.ts", "**/*.d.ts"],
      "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "ecmaVersion": 2020,
        "ecmaFeatures": {
          "legacyDecorators": true
        }
      },

      "parser": "@typescript-eslint/parser",
      "plugins": [
        "@typescript-eslint"
      ],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "rules": {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": "off",
        "semi": [2, "never"],
        "space-before-function-paren": "off",
        "indent": "off",
        "@typescript-eslint/indent": ["error", 2],
        "comma-dangle": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "import/extensions": 0,
        "lines-between-class-members": ["error", "always", {
          "exceptAfterSingleLine": true
        }],
      },
    }
  ],
};

