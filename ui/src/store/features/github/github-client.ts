import { Octokit } from 'octokit';

import { GithubState } from './github-slice';

export class GithubClient {
  octokit: Octokit;
  token: string;

  constructor(token: string) {
    (this.token = token),
      (this.octokit = new Octokit({
        auth: token,
      }));
  }

  async fetchUser(): Promise<GithubClient.UserData> {
    const { data: userData } = await this.octokit.request('GET /user');

    return {
      value: userData.repos_url,
      label: userData.login,
      avatar: userData.avatar_url,
    };
  }

  async fetchOrgs(): Promise<GithubClient.UserData[]> {
    const { data: organizationsData } = await this.octokit.request(
      'GET /user/orgs'
    );

    return organizationsData.map((org) => {
      return {
        label: org.login,
        value: org.repos_url,
        avatar: org.avatar_url,
      };
    });
  }

  async fetchRepos(url: string): Promise<GithubState.Repository[]> {
    const repos = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());

    return repos.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (repo: any) =>
        ({
          name: repo.name,
          url: repo.html_url,
          defaultBranch: repo.default_branch,
        } as GithubState.Repository)
    );
  }

  async fetchBranches(
    owner: string,
    repo: string
  ): Promise<GithubClient.Branch[]> {
    const branches = await this.octokit
      .request('GET /repos/{owner}/{repo}/branches', {
        owner,
        repo,
      })
      .then((res) =>
        res.data.map((branch) => {
          return {
            name: branch.name,
            commit: branch.commit.sha,
          };
        })
      );

    return branches;
  }
}

export namespace GithubClient {
  export type UserData = {
    value: string;
    label: string;
    avatar: string;
  };

  export type Branch = {
    name: string;
    commit: string;
  };
}
