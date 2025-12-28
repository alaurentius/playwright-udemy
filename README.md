# Playwright Automation Project

This repository contains automated End-to-End (E2E) tests built with [Playwright](https://playwright.dev/). The project implements the **Page Object Model (POM)** design pattern to ensure scalable and maintainable code.

## Project Structure

Below is an overview of the main directories:

- **`tests/`**: This directory contains the test files (`.spec.js`).
- **`pageobjects/`**: Contains classes representing the application's pages (Page Object Model). Selectors and methods for UI interaction are defined here. A `po-manager.js` class is used to manage page instantiation.
- **`utils/`**: Helper utilities, including:
    - `api-utils.js`: Functions for API interaction (useful for setting up test data).
    - `test-base.js`: Custom test base (Custom Fixtures) extending Playwright functionality.
    - `place-order-test-data.json`: JSON files containing test data.
- **`playwright-report/`**: Automatically generated directory storing HTML reports of test runs.
- **`playwright.config.js`**: The main configuration file for the project.

## Prerequisites

Before running the project, ensure you have the following installed:

1.  **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
2.  **Code Editor**: We recommend [Visual Studio Code](https://code.visualstudio.com/) for the best experience.
    *   *Tip*: Install the **Playwright Test for VSCode** extension for easier debugging and test execution.

## Installation

To set up the project locally, run the following commands in your terminal:

1.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

2.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

3.  **Configure Environment Variables (Optional):**
    If the project uses sensitive data (like credentials), create a `.env` file in the project root.

    Example `.env` file:
    ```properties
    ENV=staging
    BASE_URL=https://rahulshettyacademy.com/client
    USER_EMAIL=your_email@example.com
    USER_PASSWORD=your_password
    ```
    *Note: Ensure `dotenv` is installed if you plan to use it in your configuration: `npm install dotenv`.*

## Configuration

The main configuration file is `playwright.config.js`. Here you can define:
-   **Browsers**: Chromium, Firefox, WebKit.
-   **Timeouts**: Global wait times.
-   **Base URL**: The application's base URL.
-   **Execution Options**: `headless`, `viewport`, `screenshot`, `video`, etc.

### Multiple Configurations
To use different configuration files (e.g., for `dev` or `staging` environments), you can create additional files like `playwright.config1.js` and run them using the `--config` flag:

```bash
npx playwright test --config=playwright.config1.js
```

## Running Tests

### Basic Commands
-   **Run all tests:**
    ```bash
    npx playwright test
    ```

-   **Run in UI Mode:**
    Excellent for beginners to debug, inspect locators, and watch execution step-by-step.
    ```bash
    npx playwright test --ui
    ```

-   **Run with Debugging:**
    Pauses execution at each step.
    ```bash
    npx playwright test --debug
    ```

### NPM Scripts
The project includes predefined scripts in `package.json`. Currently available:

-   `npm test`: specifically runs API tests (`tests/web-api-part1.spec.js`) in headed mode.
    ```bash
    npm test
    ```

### Filtering and Tags (`--grep`)
You can run specific tests using tags in the test title (e.g., `@Web`, `@Api`) or regular expressions.

-   **Run tests with a specific tag:**
    ```bash
    npx playwright test --grep "@Web"
    ```
-   **Run tests WITHOUT a specific tag (grep invert):**
    ```bash
    npx playwright test --grep-invert "@Web"
    ```

### Parallelism and Serialization
By default, Playwright runs tests in parallel.

-   **Configure Workers (Threads):**
    Control parallelism by specifying the number of workers.
    -   In config file: `workers: 4`.
    -   Via CLI:
        ```bash
        npx playwright test --workers=2
        ```
    -   To run **serially** (one by one), use `--workers=1`.

-   **Serial Mode inside a file:**
    If tests in a file depend on each other, force serial execution by adding this to your `.spec.js` file:
    ```javascript
    test.describe.configure({ mode: 'serial' });
    ```

### Retries
Retries help handle flaky tests.

-   **In configuration:** Set `retries: 1` (or more).
-   **Via command line:**
    ```bash
    npx playwright test --retries=2
    ```

## Data Generation with API
To optimize tests and avoid slow UI steps (like repetitive registration or login), `utils/api-utils.js` is used.

-   **`APIUtils`**: This class allows direct backend interaction.
-   **Design Pattern**: We log in via API to get a session token, then create orders (`createOrder`) and inject the token into the browser's `localStorage`. This allows the UI test to start immediately in an authenticated state, saving time and improving stability.

## CI/CD Integration

### Jenkins
In a Jenkins Pipeline (Jenkinsfile), use the following stage to run tests and archive reports.

```groovy
pipeline {
    agent any
    tools {
        nodejs 'node-20' // Ensure Node is installed
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                // Run tests and generate JUnit report for Jenkins
                sh 'npx playwright test --reporter=junit:results.xml'
            }
        }
    }
    post {
        always {
            junit 'results.xml'
            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
```

### Azure DevOps
For Azure Pipelines (`azure-pipelines.yml`), a basic configuration looks like this:

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'
  displayName: 'Install Node.js'

- script: |
    npm ci
    npx playwright install --with-deps
  displayName: 'Install Dependencies & Browsers'

- script: |
    npx playwright test
  displayName: 'Run Playwright Tests'
  env:
    CI: 'true'

- task: PublishTestResults@2
  displayName: 'Publish Test Results'
  condition: succeededOrFailed()
  inputs:
    testResultsFormat: 'JUnit'
    testResultsFiles: 'results.xml'

- task: PublishPipelineArtifact@1
  displayName: 'Publish HTML Report'
  condition: succeededOrFailed()
  inputs:
    targetPath: 'playwright-report'
    artifact: 'playwright-report'
    publishLocation: 'pipeline'
```

## Reporting

After execution finishes, visualize the detailed HTML report with:

```bash
npx playwright show-report
```