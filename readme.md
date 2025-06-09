## Overview

This test automation framework is built with Playwright to test the [Todo application](https://demo.playwright.dev/todomvc). The project uses the Page Object Model pattern for better test maintainability and reusability.

## Prerequisites

- Node.js 20+
- Git

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/RedHawkNinja/automation.git
   cd automation
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install --with-deps
   ```

## Project Structure

```
.
├── .github/workflows/       # GitHub Actions workflows
├── mocked-api/              # Mock API responses
├── page-objects/            # Page Object Models
├── playwright-report/       # Test reports
├── test-data/               # Test data in JSON format
├── test-results/            # Test execution results
├── tests/                   # Test files
├── utilities/               # Utility functions for tests
└── playwright.config.ts     # Playwright configuration file
```

## Running Tests

Run all tests with:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright todo.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

View the last test report:

```bash
npx playwright show-report
```

## Configuration

The Playwright configuration is in playwright.config.ts. Key settings include:

- Base URL: `https://demo.playwright.dev/todomvc`
- Browsers: Chromium and Firefox
- Screenshots: Taken only on test failures

## CI/CD Integration

This project includes a GitHub Actions workflow in playwright.yml that:

1. Runs on pushes to main/master branch and pull requests
2. Sets up Node.js environment
3. Installs dependencies
4. Runs Playwright tests
5. Uploads test reports as artifacts

## Test Data

Test data is maintained in JSON files under the test-data directory:

- inputData.json
- userData.json

## Tools and Technologies

- [Playwright](https://playwright.dev/) - Web testing and automation framework
- TypeScript - Programming language
- Page Object Model - Design pattern for test organization
- GitHub Actions - CI/CD pipeline
