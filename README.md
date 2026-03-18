# Kin Policy Scanner

A browser-based tool for uploading a CSV file produced by the Kin document
scanner and viewing the extracted policy numbers.

---

## Requirements

- **Node.js** ≥ 18
- **npm** ≥ 9

No additional global installs are required; the Angular CLI is invoked via npm
scripts.

---

## Setup

```bash
npm install
```

---

## Running the app

```bash
npm start
```

Then open [http://localhost:4200](http://localhost:4200) in your browser.

A sample CSV file (`sample.csv`) is included at the project root for testing.

---

## Running the tests

```bash
npm test
```

Tests run headlessly in ChromeHeadless (configured in `karma.conf.js`). The
suite covers both the `CsvParserService` and the `PolicyUploadComponent`.

---

## Project structure

```
src/app/
  shared-services/
    csv-parser.service.ts           # CSV parsing & file validation logic
    csv-parser.service.test.ts
  shared-components/
    alert/                          # Error alert banner
    badge/                          # Numeric badge
    button/                         # Styled button
    data-table/                     # Policy number results table
    header/                         # App header
    icon/                           # SVG icon wrapper
    section-card/                   # Card container
    section-heading/                # Section heading
    spinner/                        # Loading spinner
  policy/
    policy-upload.component.ts      # Upload UI + drag-and-drop
    policy-upload.component.html
    policy-upload.component.scss
    policy-upload.component.test.ts
  app.component.ts                  # Root shell – mounts PolicyUploadComponent
```

---

## Assumptions & design notes

- The CSV file may contain policy numbers on one or many row. All comma
  separated tokens are flattened into a single ordered list.
- File validation is performed entirely in the browser (extension check and size
  check) before reading any bytes.
- The `.csv` extension is used as the source of truth for type checking rather
  than the browser-reported MIME type, which varies across operating systems.
- Drag-and-drop is supported alongside the traditional file picker.
- The UI uses only the Kin standard color palette defined in `src/styles.scss`
  and is fully responsive down to mobile viewports.
