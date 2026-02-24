# Copilot Instructions

All code produced for this project must comply with the rules in `.github/code-standards.instructions.md`, `.github/jsdoc.instructions.md`, and `.github/testing.instructions.md`. Read those files before writing any code.

## Non-negotiable rules (summary)

- **TypeScript strict** — explicit return types, parameter types, and member accessibility on every declaration; no `any`
- **`type` over `interface`** — never use `interface`
- **Linting** — every file must pass `npm run lint`; no implicit arrow returns, always curly braces, `===` only, no semicolons, single quotes
- **JSDoc** — required on every exported function/class/method/type; include `@group`, exact `@param`/`@returns` types, and `@example`
- **Testing** — all unit tests use a typed `TEST_CASES` array iterated with `forEach` or `it.each`; individual `it()` only for mocks/spies/side-effects
- **Architecture** — single responsibility per service/component; dependency injection via the framework's DI mechanism; standalone/self-contained components
- **Error handling** — explicit error types; no thrown generic `Error`; services return typed result objects

## Before finishing any task

Run through the checklist in `code-standards.instructions.md` Section 8 mentally and confirm every item passes.
