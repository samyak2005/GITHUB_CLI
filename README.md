# GitHub User Checker

A TypeScript command-line tool to check GitHub user information and their latest repository. NPM COMING UP.

## Features

- Fetch and display user profile information
- Show user's public repositories count and followers
- Display user's bio and location (if available)
- Show the latest updated repository
- Interactive CLI interface with color-coded output
- Written in TypeScript for better type safety and developer experience

## Installation

->Install via npx

```bash
npx gitdig-cli
```

-> Install via npm:

```bash
npm install -g gitdig-cli
gitdig-cli
```

Follow the prompts to:

1. Enter a GitHub username to check
2. View their profile information
3. Choose to check another username or exit

## Development

- `npm run build` - Builds the TypeScript code
- `npm run dev` - Runs the application in development mode with ts-node
- `npm run watch` - Watches for changes and rebuilds automatically

## Dependencies

- chalk: For colored terminal output
- TypeScript and Node.js type definitions
- Node.js built-in modules (https, readline)
