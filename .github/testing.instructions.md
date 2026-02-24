# Testing Guidelines

## Overview

This project follows a **data-driven testing pattern** that emphasizes consistency, maintainability, and comprehensive coverage. **All unit tests MUST use the `TEST_CASES` array pattern with `it.each()` unless there is a specific reason requiring individual test cases** (see section 4 below).

## Critical Rule: Data-Driven Tests by Default

**DEFAULT APPROACH:** Every function test should use `TEST_CASES` array with `it.each()`.

**ONLY use individual `it()` blocks when:**

- Testing with mocks or spies that require specific setup
- Using `beforeEach`/`afterEach` hooks for complex state management
- The test truly cannot be represented as input → output

**Even complex scenarios should use TEST_CASES:**

- ✅ Functions with object arguments → Use object literals in TEST_CASES
- ✅ Functions with multiple related tests → Group them all in TEST_CASES with comments
- ✅ Tests that need computed values → Compute them before TEST_CASES definition
- ✅ Tests with long expected outputs → Define expected objects before TEST_CASES

## Test Structure Pattern

### 1. Import Required Dependencies

```typescript
import { functionToTest } from './module'
```

### 2. Use Data-Driven Test Cases (REQUIRED)

**This is the required pattern for all unit tests.** Define test cases using a typed `TEST_CASES` array:

```typescript
describe('module.ts', () => {
  describe(functionToTest.name, () => {
    const TEST_CASES: Array<[Parameters<typeof functionToTest>, ReturnType<typeof functionToTest>]> = [
      // Happy path
      [[inputArg1, inputArg2], expectedOutput],
      [[anotherInput], anotherExpectedOutput],

      // Null/undefined cases
      [[null], defaultOutput],
      [[undefined], defaultOutput],
    ]

    it.each(TEST_CASES)('if given %j, then return %o', (args, expected) => {
      expect(functionToTest(...args)).toEqual(expected)
    })
  })
})
```

**For complex inputs/outputs, define them outside TEST_CASES:**

```typescript
describe(mergeConfig.name, () => {
  const DEFAULT_CONFIG = { timeout: 3000, retries: 3, verbose: false }

  const TEST_CASES: Array<[Parameters<typeof mergeConfig>, ReturnType<typeof mergeConfig>]> = [
    // Nil cases - returns defaults
    [[undefined], DEFAULT_CONFIG],
    [[null], DEFAULT_CONFIG],

    // Partial options - merges with defaults
    [[{ timeout: 5000 }], { ...DEFAULT_CONFIG, timeout: 5000 }],

    // Full override
    [[{ timeout: 1000, retries: 1, verbose: true }], { timeout: 1000, retries: 1, verbose: true }],
  ]

  it.each(TEST_CASES)('if given %j, then return %o', (args, expected) => {
    expect(mergeConfig(...args)).toEqual(expected)
  })
})
```

### 3. Key Principles

#### Use Type-Safe Test Cases

- **Always type the `TEST_CASES` array** using `Array<[Parameters<typeof fn>, ReturnType<typeof fn>]>` to catch input/output mismatches at compile time
- Format: `[[arg1, arg2, ...argN], expectedResult]`

#### Define Constants for Repeated Values

Define named constants before `TEST_CASES` for values used across multiple test cases:

```typescript
// ✅ Good
const EMPTY: string[] = []
const DEFAULT_RESULT = { status: 'ok' as const, data: null }

const TEST_CASES = [
  [[null], EMPTY],
  [[undefined], EMPTY],
  [['valid'], DEFAULT_RESULT],
]

// ❌ Avoid repeating magic values
const TEST_CASES = [
  [[null], []],
  [[undefined], []],
]
```

#### Group Test Cases with Comments

Organize test cases logically with inline comments:

```typescript
const TEST_CASES: Array<[Parameters<typeof myFunction>, ReturnType<typeof myFunction>]> = [
  // Empty and nil cases
  [[null], expectedForNull],
  [[undefined], expectedForUndefined],

  // Valid input cases
  [[validInput1], expectedOutput1],
  [[validInput2], expectedOutput2],

  // Edge cases
  [[edgeCase1], edgeResult1],
]
```

#### Use Descriptive Test Names

Use the function name directly in `describe` blocks:

```typescript
// ✅ Good - uses function name dynamically
describe(functionToTest.name, () => { ... })

// ❌ Avoid - hardcoded string
describe('functionToTest', () => { ... })
```

#### Standard Test Message Format

Use the standard template string for `it.each`:

```typescript
it.each(TEST_CASES)('if given %j, then return %o', (args, expected) => {
  expect(functionToTest(...args)).toEqual(expected)
})
```

- `%j` - JSON representation of the input arguments
- `%o` - Object representation of the expected output

### 4. When to Use Individual Test Cases (RARE EXCEPTIONS)

**Individual test cases are the EXCEPTION, not the rule.** Use them ONLY when absolutely necessary:

#### Valid Reasons for Individual Test Cases:

- Testing with mocks or spies that require specific verification
- Testing side effects that can't be expressed as return values
- Integration tests requiring complex setup/teardown
- Tests requiring `beforeEach`/`afterEach` hooks

#### NOT Valid Reasons:

- ❌ "The expected output is complex" → Define it before TEST_CASES
- ❌ "I need to test multiple scenarios" → That's what TEST_CASES is for
- ❌ "The input is an object" → Objects work fine in TEST_CASES
- ❌ "I want descriptive test names" → Use comments in TEST_CASES
- ❌ "The function has multiple parameters" → TEST_CASES handles this

**Example of valid individual test case:**

```typescript
it('should call the callback with transformed data', () => {
  const mockCallback = jest.fn()
  const data = { id: 1, name: 'test' }

  processData(data, mockCallback)

  expect(mockCallback).toHaveBeenCalledWith({ id: 1, name: 'TEST' })
})
```

**Example of what should be TEST_CASES instead:**

```typescript
// ❌ WRONG - Don't do this
it('returns default config when undefined is provided', () => {
  expect(mergeConfig(undefined)).toEqual(DEFAULT_CONFIG)
})

it('returns default config when null is provided', () => {
  expect(mergeConfig(null)).toEqual(DEFAULT_CONFIG)
})

it('merges provided options with defaults', () => {
  expect(mergeConfig({ timeout: 5000 })).toEqual({ ...DEFAULT_CONFIG, timeout: 5000 })
})

// ✅ CORRECT - Do this instead
const TEST_CASES: Array<[Parameters<typeof mergeConfig>, ReturnType<typeof mergeConfig>]> = [
  [[undefined], DEFAULT_CONFIG],
  [[null], DEFAULT_CONFIG],
  [[{ timeout: 5000 }], { ...DEFAULT_CONFIG, timeout: 5000 }],
]

it.each(TEST_CASES)('if given %j, then return %o', (args, expected) => {
  expect(mergeConfig(...args)).toEqual(expected)
})
```

## Example

Here's a complete example showing the proper data-driven testing approach:

```typescript
import { mergeConfig } from './config.util'

describe('config.util.ts', () => {
  describe(mergeConfig.name, () => {
    const DEFAULT_CONFIG = { timeout: 3000, retries: 3, verbose: false }

    const TEST_CASES: Array<[Parameters<typeof mergeConfig>, ReturnType<typeof mergeConfig>]> = [
      // Nil cases - returns defaults
      [[undefined], DEFAULT_CONFIG],
      [[null], DEFAULT_CONFIG],

      // Partial options - merges with defaults
      [[{ timeout: 5000 }], { ...DEFAULT_CONFIG, timeout: 5000 }],
      [[{ retries: 1, verbose: true }], { ...DEFAULT_CONFIG, retries: 1, verbose: true }],

      // Full override
      [[{ timeout: 1000, retries: 1, verbose: true }], { timeout: 1000, retries: 1, verbose: true }],
    ]

    it.each(TEST_CASES)('if given %j, then return %o', (args, expected) => {
      expect(mergeConfig(...args)).toEqual(expected)
    })
  })
})
```

## Summary Checklist

When writing tests, ask yourself:

- [ ] Am I using `TEST_CASES` typed as `Array<[Parameters<typeof functionName>, ReturnType<typeof functionName>]>`?
- [ ] Am I using `describe(functionName.name, ...)` instead of a hardcoded string?
- [ ] Am I using `it.each(TEST_CASES)` with the standard message format?
- [ ] Are my test cases grouped with descriptive comments?
- [ ] Am I using constants for common values instead of magic values?
- [ ] Have I computed complex values before defining TEST_CASES?
- [ ] If I'm writing individual `it()` blocks, is there a valid reason from section 4?

**If you answered "no" to any of the first 5 questions, refactor your tests to follow the data-driven pattern.**
