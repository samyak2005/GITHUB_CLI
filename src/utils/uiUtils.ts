import chalk from 'chalk';
import { GitHubUser, GitHubRepo } from '../types/github';

class UIUtils {
    public displayUserInfo(user: GitHubUser, username: string): void {
        const url = `https://github.com/${username}`;
        console.log(chalk.green('\n✅ User found!'));
        console.log(`👉 GitHub Profile: ${chalk.blue.underline(url)}`);
        console.log(`📦 Public Repositories: ${chalk.yellow(user.public_repos)}`);
        console.log(`👥 Followers: ${chalk.yellow(user.followers)}`);
        
        
        if (user.bio) {
            console.log(`📝 Bio: ${chalk.cyan(user.bio)}`);
        }
        if (user.location) {
            console.log(`📍 Location: ${chalk.cyan(user.location)}`);
        }
    }

    public displayLatestRepo(repo: GitHubRepo | undefined): void {
        if (repo) {
            console.log(
                `🆕 Latest Repo: ${chalk.green(repo.name)} (${chalk.blue.underline(repo.html_url)})`
            );
        } else {
            console.log(chalk.gray('ℹ️ User has no public repositories.'));
        }
    }

    public displayError(message: string): void {
        console.log(chalk.red(message));
    }

    public displayExit(): void {
        console.log(chalk.green('\n👋 Exiting the GitHub user checker. Have a great day!'));
    }
}

export default new UIUtils(); 