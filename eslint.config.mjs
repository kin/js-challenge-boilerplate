import eslintJs from '@eslint/js'
import stylisticEslintPlugin from '@stylistic/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

// ============================================================================
// == Ignore Patterns
// ============================================================================
const ignorePatterns = {
  ignores: [
    '**/*.js',
    '**/.angular/**',
    '**/.history/**',
    '**/.vscode/**',
    '**/build/**',
    '**/coverage/**',
    '**/debug/**',
    '**/dist/**',
    '**/docs/**',
    '**/node_modules/**',
    '**/package-lock.json',
    '**/package.json',
    '**/public/**',
    '**/schematics/**',
    '**/src/assets/**',
    'package-lock.json',
    'package.json',
    '!eslint.config.mjs',
  ],
}

// ============================================================================
// == "@eslint/js" specific rules
// ============================================================================
const eslintRules = {
  'arrow-body-style': ['error', 'always'],
  curly: ['error', 'all'],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-case-declarations': 'off',
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: true,
    },
  ],
}

// ============================================================================
// == "@stylistic/eslint" specific rules
// ============================================================================
const stylisticEslintRules = {
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline: { delimiter: 'none', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false },
    },
  ],
}

// ============================================================================
// == "typescript-eslint" specific rules
// ============================================================================
const typescriptEslintRules = {
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/dot-notation': 'off',
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      allowDirectConstAssertionInArrowFunctions: true,
      allowExpressions: true,
      allowHigherOrderFunctions: true,
      allowTypedFunctionExpressions: true,
    },
  ],
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'explicit',
      overrides: {
        accessors: 'explicit',
        constructors: 'no-public',
        methods: 'explicit',
        properties: 'explicit',
        parameterProperties: 'explicit',
      },
    },
  ],
  '@typescript-eslint/member-ordering': 'off',
  '@typescript-eslint/no-deprecated': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      ignoreRestSiblings: true,
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/strict-boolean-expressions': [
    'error',
    { allowString: false, allowNumber: false, allowNullableObject: false, allowNullableBoolean: true },
  ],
}

const languageOptions = {
  globals: {
    ...globals.browser,
    ...globals.jest,
  },

  parser: typescriptEslintParser,
  parserOptions: {
    project: true,
  },
}

const typescriptEslintConfig = typescriptEslint.config({
  extends: typescriptEslint.configs.recommended,
  languageOptions: {
    ...languageOptions,
    parserOptions: {
      project: './tsconfig.lint.json',
    },
  },
})

const stylisticEslintConfig = stylisticEslintPlugin.configs.customize({
  arrowParens: true,
  braceStyle: '1tbs',
  jsx: false,
  quoteProps: 'as-needed',
})

const wrapperConfig = typescriptEslint.config({
  extends: [eslintJs.configs.recommended, ...typescriptEslintConfig, stylisticEslintConfig, eslintPluginPrettierRecommended],
  files: ['**/*.ts'],

  rules: {
    ...eslintRules,
    ...stylisticEslintRules,
    ...typescriptEslintRules,
  },
})

const ESLintConfig = [ignorePatterns, ...wrapperConfig]

export default ESLintConfig
