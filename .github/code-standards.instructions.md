# Code Standards

AI must satisfy every rule below before code is considered complete.

---

## 1. TypeScript

- **`strict: true`** — all parameters and return types must be explicit; no `any`
- **`type` over `interface`** — always use the `type` keyword
- **Explicit member accessibility** — every class member must declare `public`, `private`, or `protected`
- **ES2022** — prefer `??`, `?.`, static class fields, and `#private` notation

```typescript
// ✅
type UserProfile = { id: string; isActive: boolean }

class AuthService {
  private readonly tokenRegex: RegExp = /^[a-z0-9]{32}$/

  public isValid(token: string): boolean {
    return this.tokenRegex.test(token ?? '')
  }
}
```

---

## 2. Linting & Formatting

**All code must pass `npm run lint`.** Rules enforced:

| Rule            | Requirement                                            |
| --------------- | ------------------------------------------------------ |
| Curly braces    | All control structures, even single-statement          |
| Arrow functions | Block body + explicit `return` — no implicit returns   |
| Equality        | `===` / `!==` only; `== null` permitted for null-check |
| Imports         | Sorted: none → all → multiple → single                 |
| Print width     | 160 characters                                         |
| Semicolons      | None                                                   |
| Quotes          | Single only                                            |
| Trailing commas | Always in multiline structures                         |

```typescript
// ✅
const double = (n: number): number => {
  return n * 2
}

if (value === 0) {
  doSomething()
}
```

---

## 3. JSDoc

Required on every exported function, class, method, and type.

````typescript
/**
 * [Present-tense action verb + description. Edge cases if any.]
 * @group [CategoryName]
 *
 * @param {ExactType} paramName - [Purpose]
 * @param {ExactType} [optionalParam] - [Purpose]
 * @returns {ExactReturnType} [What is returned; edge cases]
 *
 * @example
 * ```typescript
 * functionName(arg)
 * // Returns: result
 * ```
 */
````

- Description: present tense — "Parses", "Validates", "Converts"
- `@group` is mandatory
- `@param` and `@returns` types must exactly match the function signature
- Always include at least one `@example`
- Inline comments only for non-obvious algorithms or workarounds (explain _why_, not _what_)

---

## 4. Testing

**Default: data-driven `TEST_CASES` array iterated with `it.each` (or `forEach`).**

```typescript
describe('format.util.ts', () => {
  describe(formatDate.name, () => {
    const TEST_CASES: Array<[Parameters<typeof formatDate>, ReturnType<typeof formatDate>]> = [
      // Valid inputs
      [['2024-01-01'], '01/01/2024'],
      [['2024-12-31'], '12/31/2024'],

      // Invalid
      [['not-a-date'], ''],
      [[''], ''],

      // Edge cases
      [[null], ''],
      [[undefined], ''],
    ]

    TEST_CASES.forEach(([args, expected]) => {
      it(`if given ${JSON.stringify(args)}, then return ${JSON.stringify(expected)}`, () => {
        expect(formatDate(...args)).toEqual(expected)
      })
    })
  })
})
```

**Individual `it()` blocks permitted ONLY for:**

- Mocks/spies requiring specific verification
- Side-effect tests (not pure return values)
- Complex `beforeEach`/`afterEach` setup

**Coverage requirements:** valid inputs, edge cases (`null`, `undefined`, empty, boundary), invalid inputs, error conditions.

---

## 5. Architecture

- **Single Responsibility** — each service or component has one purpose
- **Dependency Injection** — inject dependencies via the framework's DI mechanism; never instantiate collaborators directly
- **Self-contained components** — components declare their own dependencies
- **No mixed concerns** — parsing ≠ validation ≠ API calls

---

## 6. Error Handling

- Define explicit error types; do not throw generic `Error`
- Catch errors in services and return typed result objects

```typescript
type ParseError = { type: 'INVALID_FORMAT' | 'INVALID_LENGTH'; message: string }

export const parseNumber = (line: string): string | ParseError => {
  if (!line) {
    return { type: 'INVALID_FORMAT', message: 'Empty input' }
  }
  // ...
}
```

---

## 7. File & Naming Conventions

```
src/app/
  shared/
    models/        *.model.ts
    services/      *.service.ts  +  *.service.spec.ts
  features/
    <feature>/     *.component.ts  *.component.html  *.component.scss  *.component.spec.ts
```

| Artifact   | Pattern                      |
| ---------- | ---------------------------- |
| Service    | `domainName.service.ts`      |
| Component  | `componentName.component.ts` |
| Model/Type | `modelName.model.ts`         |
| Test       | `*.spec.ts`                  |
| Constants  | `*.const.ts`                 |

---

## 8. Pre-Submission Checklist

- [ ] `npm run build` — no TypeScript errors
- [ ] `npm run lint` — passes with no errors
- [ ] `npm test` — passes with >80% coverage
- [ ] `npm run format` — makes no changes
- [ ] All public exports have JSDoc
- [ ] No `any` types; all parameters/returns typed
- [ ] Tests use `TEST_CASES` array pattern
- [ ] Explicit error types; graceful failures
- [ ] All class members have visibility modifiers

---

## 9. Commands

```bash
npm run format   # eslint + prettier (auto-fix)
npm run lint     # lint checks
npm test         # run tests
npm run build    # compile
npm start        # dev server
```
