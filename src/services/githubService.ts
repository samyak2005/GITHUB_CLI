import https from 'https';
import { GitHubUser, GitHubRepo, ApiResponse } from '../types/github';

class GitHubService {
    private baseOptions: https.RequestOptions;

    constructor() {
        this.baseOptions = {
            hostname: 'api.github.com',
            method: 'GET',
            headers: {
                'User-Agent': 'node.js',
            },
        };
    }

    private makeRequest<T>(options: https.RequestOptions): Promise<ApiResponse<T>> {
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        resolve({
                            status: 200,
                            data: JSON.parse(data)
                        });
                    } else if (res.statusCode === 404) {
                        resolve({
                            status: 404,
                            message: 'User not found on GitHub.'
                        });
                    } else {
                        resolve({
                            status: res.statusCode || 500,
                            message: `Unexpected response. Status Code: ${res.statusCode}`
                        });
                    }
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.end();
        });
    }

    public async fetchUserInfo(username: string): Promise<ApiResponse<GitHubUser>> {
        const options: https.RequestOptions = {
            ...this.baseOptions,
            path: `/users/${username}`,
        };

        return this.makeRequest<GitHubUser>(options);
    }

    public async fetchLatestRepo(username: string): Promise<ApiResponse<GitHubRepo[]>> {
        const options: https.RequestOptions = {
            ...this.baseOptions,
            path: `/users/${username}/repos?sort=updated&per_page=1`,
        };

        return this.makeRequest<GitHubRepo[]>(options);
    }
}

export default new GitHubService(); 