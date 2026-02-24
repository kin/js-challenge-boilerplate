# JSDoc Pattern

## Required Structure

````typescript
/**
 * [Action-oriented description in present tense]. [Special behaviors/context].
 * @group [GroupName]
 *
 * @param {TypeAnnotation} paramName - [Purpose and special values]
 * @param {TypeAnnotation} [optionalParam] - [Description]
 * @returns {ReturnType} [What's returned and edge cases]
 *
 * @example
 * ```typescript
 * functionName(args)
 * // Returns: result
 *
 * functionName(edgeCase)
 * // Returns: edgeResult
 * ```
 */
````

## Rules

**Description**:

- Present tense action verbs ("Gets", "Converts", "Checks")
- Include special behaviors, wildcards, edge cases in description

**@group**: Always include (e.g., `Url`, `Data`, `String`, `Path`)

**@param**:

- Full TypeScript types in braces: `{string | null}`, `{Record<K, V>}`, `{string | URL}`
- Square brackets for optional: `{string} [optionalParam]`
- Mention special values (`'*'` wildcards, `null` handling) explicitly
- **ACCURACY CHECK**: Types must match the actual function parameter types exactly

**@returns**:

- Full return type with edge cases (empty arrays, null, undefined)
- **ACCURACY CHECK**: Return type must match the actual function return type

**@example**:

- Always include 1-2 realistic examples with `// Returns:` comments
- Show edge cases or special values
- **ACCURACY CHECK**: Examples must show actual parameters and correct usage - verify function signature before writing examples

## Special Cases

**Alias functions** - Only `@group` and inline link reference:

```typescript
/**
 * @group GroupName
 * Alias {@link UtilName.originalFunction}
 */
is: (value: unknown): value is null | undefined => EmptyUtil.isEmpty(value)
```

**Getter/setter pairs** - Single JSDoc on getter:

````typescript
/**
 * Gets or sets the timeout in milliseconds. Setting triggers cleanup of pending operations.
 * @group Config
 * @param {number | null} value - Timeout in ms. Null disables the timeout.
 * @returns {number} The current timeout in milliseconds
 * @example
 * ```typescript
 * config.timeout // Returns: 3000
 * config.timeout = 5000 // Sets timeout
 * ```
 */
get timeout(): number { return this._timeout }
set timeout(value: number | null) { ... }
````

## Quick Reference

**Simple function**:

````typescript
/**
 * Converts string to uppercase and trims whitespace.
 * @group String
 * @param {string | null} input - String to process
 * @returns {string} Uppercase, trimmed string or empty if null
 * @example
 * ```typescript
 * processString('  hello  ') // Returns: "HELLO"
 * ```
 */
````

**With special values**:

````typescript
/**
 * Searches collection based on criteria. Key '*' returns all values.
 * @group Data
 * @param {Record<string, string | null>} criteria - Search criteria. Use '*' as wildcard
 * @param {string[] | null} [collection] - Collection to search (defaults to global)
 * @returns {Record<string, string[]>} Matching results per criteria key
 * @example
 * ```typescript
 * searchCollection({ name: 'John' }, ['John Smith'])
 * // Returns: { name: ['John Smith'] }
 * searchCollection({ '*': null }, ['a', 'b'])
 * // Returns: { '*': ['a', 'b'] }
 * ```
 */
````
