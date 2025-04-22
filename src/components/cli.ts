import readline from 'readline';
import chalk from 'chalk';
import githubService from '../services/githubService';
import uiUtils from '../utils/uiUtils';

class CLI {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    private async askUsername(): Promise<void> {
        return new Promise((resolve) => {
            this.rl.question(chalk.yellow('🔍 Enter a GitHub username to check: '), async (username: string) => {
                try {
                    const userResponse = await githubService.fetchUserInfo(username);
                    
                    if (userResponse.status === 200 && userResponse.data) {
                        uiUtils.displayUserInfo(userResponse.data, username);
                        const repoResponse = await githubService.fetchLatestRepo(username);
                        
                        if (repoResponse.status === 200 && repoResponse.data) {
                            uiUtils.displayLatestRepo(repoResponse.data[0]);
                        } else {
                            uiUtils.displayError(repoResponse.message || 'Failed to fetch repository data');
                        }
                    } else {
                        uiUtils.displayError(userResponse.message || 'Failed to fetch user data');
                    }
                } catch (error) {
                    uiUtils.displayError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
                resolve();
            });
        });
    }

    private async askToContinue(): Promise<boolean> {
        return new Promise((resolve) => {
            this.rl.question(chalk.cyan('\n❓ Do you want to check another username? (y/n): '), (answer: string) => {
                resolve(answer.toLowerCase() === 'y');
            });
        });
    }

    public async start(): Promise<void> {
        do {
            await this.askUsername();
        } while (await this.askToContinue());

        uiUtils.displayExit();
        this.rl.close();
    }
}

export default new CLI(); 