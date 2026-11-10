# Arsenal & Malmö League Standings

[![GitHub Actions](https://github.com/thulin82/arsenal_malmo_league_standings/actions/workflows/github-actions.yml/badge.svg)](https://github.com/thulin82/arsenal_malmo_league_standings/actions/workflows/github-actions.yml)

A modern TypeScript/Express web application to visualize league standings for Arsenal FC and Malmö FF after each gameweek using interactive Chart.js visualizations.

**Repository:** [thulin82/arsenal_malmo_league_standings](https://github.com/thulin82/arsenal_malmo_league_standings)

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Connecting to the Application](#connecting-to-the-application)
- [Testing](#testing)
- [Code Formatting & Linting](#code-formatting--linting)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js** v18+ (for ES modules and modern JavaScript features)
- **npm** v9+

---

## Installation

### Clone the Repository

```bash
git clone git@github.com:thulin82/arsenal_malmo_league_standings.git
cd arsenal_malmo_league_standings
```

### Install Dependencies

```bash
npm install
```

---

## Configuration

### Environment Variables

The application reads environment variables from `config/config.env`:

```env
URL_M=
URL_A=
PORT=
```

- **`URL_M`** - Data source URL for Malmö FF league standings (from touch-line.com)
- **`URL_A`** - Data source URL for Arsenal FC league standings (from touch-line.com)
- **`PORT`** - Server port (optional, defaults to 4567)

---

## Running the Application

### Development Mode (Recommended)

With hot-reload using `tsx` (TypeScript execution without compilation):

```bash
npm run dev
```

This will:

- Start the Express server with instant TypeScript execution
- Watch for file changes and auto-reload (via nodemon)
- Serve the application at `http://localhost:4567`
- Console shows: `Server running at http://localhost:4567`

### Production Mode

First, build the TypeScript to JavaScript:

```bash
npm run build
```

Then start the compiled application:

```bash
npm start
```

This will:

- Run the compiled JavaScript from the `dist/` directory
- Serve the application at `http://localhost:4567`
- Console shows: `Server running at http://localhost:4567`

---

## Connecting to the Application

### Web Browser

Once the server is running, open your browser and navigate to:

```
http://localhost:4567
```

You'll see the web interface with:

- **Render - Arsenal** button - Displays Arsenal FC league positions over seasons
- **Render - Malmö** button - Displays Malmö FF league positions over seasons
- **All On** button - Shows all data series
- **All Off** button - Hides all data series

### REST API Endpoints

#### Get Arsenal Data

```bash
curl http://localhost:4567/arsenal
```

Response:

```json
{
  "success": true,
  "data": { ... }
}
```

#### Get Malmö Data

```bash
curl http://localhost:4567/malmo
```

Response:

```json
{
  "success": true,
  "data": { ... }
}
```

### Frontend Architecture

The frontend is built with TypeScript (`public/main.ts` and `public/chartData.ts`):

- **ChartData class** - Fetches data from the REST API endpoints
- **Chart.js integration** - Renders interactive line charts with legend and tooltips
- **Event listeners** - Button handlers for interactivity and chart updates
- **Type safety** - Full TypeScript typing for better development experience

---

## Testing

### Run All Tests

```bash
npm run test_console
```

Tests are located in `tests/routes.spec.ts` and verify:

- ✅ `/arsenal` endpoint returns valid JSON
- ✅ `/malmo` endpoint returns valid JSON
- ✅ `/` endpoint returns HTML page

### Run Tests with JSON Report

```bash
npm run test
```

This generates `test-results.json` with detailed test results.

---

## Code Formatting & Linting

This project uses **Prettier** for code formatting and **ESLint** for code quality rules.

### Code Formatting with Prettier

Prettier automatically formats code to maintain consistent style across the project.

#### Check Formatting

```bash
npm run format:check
```

This checks if all files follow Prettier's code style without making changes.

#### Auto-format Files

```bash
npm run format
```

This automatically reformats all files (TypeScript, JSON, YAML, Markdown, etc.) to match the Prettier configuration.

### Linting with ESLint

ESLint checks for code quality issues, unused variables, potential bugs, and adherence to TypeScript best practices.

#### Check Code Quality

```bash
npm run lint
```

This reports any linting issues found in your code.

#### Auto-fix Linting Issues

```bash
npm run lint:fix
```

This automatically fixes many common linting issues (unused imports, formatting, etc.).

### Development Workflow

Before committing, run both tools:

```bash
npm run format        # Format all files
npm run lint:fix      # Fix linting issues
npm run lint          # Verify no remaining issues
```

Or in CI/CD pipelines, check without modifying:

```bash
npm run format:check  # Verify formatting
npm run lint          # Verify linting
```

### Configuration Files

- **`.prettierrc.json`** - Prettier formatting rules
- **`eslint.config.js`** - ESLint rules and configuration (flat config format)

---

## Project Structure

```
arsenal_malmo_league_standings/
├── src/
│   ├── server.ts                  # Express application setup
│   └── routes/
│       └── index.ts               # API route handlers
├── public/
│   ├── index.html                 # Main HTML page
│   ├── main.ts                    # Frontend TypeScript
│   ├── chartData.ts               # Data fetching service
│   ├── css/
│   │   └── style.css              # Application styling
│   ├── main.js                    # Compiled frontend (generated)
│   └── chartData.js               # Compiled data service (generated)
├── tests/
│   └── routes.spec.ts             # Integration tests (Vitest)
├── config/
│   └── config.env                 # Environment configuration
├── dist/                          # Compiled backend JavaScript (generated by npm run build)
├── node_modules/                  # Dependencies
├── package.json                   # Project metadata & dependencies
├── package-lock.json              # Dependency lock file
├── tsconfig.json                  # TypeScript configuration (backend)
├── tsconfig.frontend.json         # TypeScript configuration (frontend)
├── eslint.config.js               # ESLint configuration (flat config)
├── vitest.config.js               # Test configuration
└── .gitignore                     # Git ignore patterns
```

---

## Technology Stack

| Layer                 | Technology                    | Version |
| --------------------- | ----------------------------- | ------- |
| **Runtime**           | Node.js (ES Modules)          | v18+    |
| **Language**          | TypeScript                    | 5.6+    |
| **Backend Framework** | Express.js                    | 4.21+   |
| **Testing**           | Vitest                        | 2.0+    |
| **Linting**           | ESLint                        | 9+      |
| **Frontend**          | Vanilla TypeScript + Chart.js | 3.8+    |
| **HTTP Client**       | Axios                         | -       |
| **Data Processing**   | xml2js                        | -       |

---

## Development Workflow

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Edit TypeScript files** in `src/` (backend) or `public/` (frontend)

3. **Automatic reload** - Changes trigger hot-reload via nodemon

4. **Run tests** (in another terminal):

   ```bash
   npm run test_console
   ```

5. **Check code quality:**

   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix issues
   ```

6. **When ready for production:**
   ```bash
   npm run build
   npm start
   ```

---

## Troubleshooting

### Port Already in Use

If you get `EADDRINUSE: address already in use :::4567`:

**Solution 1:** Use a different port

```bash
PORT=3000 npm run dev
```

**Solution 2:** Kill the existing process

```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill -f "node"
```

### Build Errors

If the build fails:

```bash
# Clear dependencies and reinstall
rm -r node_modules package-lock.json
npm install

# Try building again
npm run build
```

### API Returns 500 Error

Ensure the environment variables in `config/config.env` are properly configured:

- `URL_A` and `URL_M` should be valid URLs pointing to touch-line.com
- Verify that the external data source is accessible from your network
- Check that the external API hasn't changed its response format

### TypeScript Compilation Issues

If you encounter TypeScript errors:

```bash
# Rebuild from scratch
npm run build

# Check for type errors
npx tsc --noEmit
```

---

## Available npm Scripts

```bash
npm start              # Start production server (run npm run build first)
npm run dev            # Start development server with hot-reload
npm run build          # Compile TypeScript to JavaScript
npm run build:copy-public   # Copy public files to dist/
npm run compile:frontend    # Compile frontend TypeScript to JavaScript
npm run format         # Auto-format all files with Prettier
npm run format:check   # Check if files are formatted correctly
npm run test           # Run tests with Vitest
npm run lint           # Check code quality with ESLint
npm run lint:fix       # Auto-fix linting issues with ESLint
```

---

## License

© Markus Thulin 2019-present

---

## Contributing

Issues and pull requests are welcome. Please ensure all tests pass and code is properly formatted and linted before submitting a PR.

```bash
npm run format         # Auto-format code
npm run lint:fix       # Fix linting issues
npm run lint           # Verify no linting issues remain
npm run test           # Run all tests
npm run build
```
