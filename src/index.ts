import cli from './components/cli';

// Start the CLI application
cli.start().catch((error: Error) => {
    console.error('Application error:', error.message);
    process.exit(1);
}); 