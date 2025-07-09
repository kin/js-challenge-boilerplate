# Kin OCR - Advanced Policy Validation & Processing

A modern Angular application for validating and processing insurance policy numbers from CSV files. The application provides real-time validation, duplicate detection, and comprehensive reporting capabilities.

## Features

- **CSV File Upload**: Drag & drop or click to upload CSV files
- **Policy Validation**: Validates 9-digit policy numbers using checksum algorithm
- **Duplicate Detection**: Identifies and flags duplicate policy numbers
- **Real-time Search**: Search through policy numbers with instant filtering
- **Sortable Data Table**: Sort by ID, Policy Number, or Result
- **Comprehensive Statistics**: Detailed breakdown of valid, error, invalid, and duplicate policies
- **Policy Submission**: Submit valid and error policies to external API
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

You can check your versions with:
```bash
node --version
npm --version
```

## Installation

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd js-challenge-boilerplate
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```


## Development Server

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`. The development server will automatically reload when you make changes to the source files.

### Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Watch Mode

To build the application in watch mode (automatically rebuilds on changes):

```bash
npm run watch
```

### Running Tests

To run the test suite:

```bash
npm test
```

This will start the Karma test runner and execute all unit tests. The tests will run in watch mode by default, automatically re-running when files change.

### Test Coverage

The test configuration includes coverage reporting. After running tests, you can view coverage reports in the terminal output.


### CSV File Format

The application expects CSV files with policy numbers separated by commas. Example:

```
457500000,664371495,333333333,45750800,555555555
```

### Policy Validation Rules

- **Valid Policy**: 9-digit number that passes checksum validation
- **Error Policy**: 9-digit number that fails checksum validation
- **Invalid Policy**: Number that is not exactly 9 digits
- **Duplicate Policy**: Policy number that appears more than once in the file

### Features Explained

- **Search**: Type in the search box to filter policy numbers in real-time
- **Sort**: Click column headers to sort the data table
- **Reset**: Clear all data and start over with a new file
- **Submit**: Send valid and error policies to the external API

### Browser Compatibility

The application is tested and works with:
- Chrome (recommended)
- Brave
- Firefox
- Safari
- Edge


