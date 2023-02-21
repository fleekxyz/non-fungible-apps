import { useGithubStore } from '@/store';
import { Octokit } from 'octokit';

export type UseGithubOptions = {
  onError: (error: Error) => void;
};

export const useGithub = ({ onError }: UseGithubOptions) => {
  const { token } = useGithubStore();

  const octokit = new Octokit({
    auth: token,
  });

  const fetchUser = async () => {
    try {
      const { data } = await octokit.request('GET /user');

      return data;
    } catch (error) {
      onError(error as Error);
    }
  };

  const fetchOrgs = async () => {
    try {
      const { data } = await octokit.request('GET /user/orgs');

      return data;
    } catch (error) {
      onError(error as Error);
    }
  };

  const fetchRepos = async (url: string) => {
    try {
      const repos = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      return repos;
    } catch (error) {
      onError(error as Error);
    }
  };

  const fetchBranches = async (owner: string, repo: string) => {
    try {
      const branches = await octokit
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
    } catch (error) {
      onError(error as Error);
    }
  };

  return { fetchUser, fetchOrgs, fetchRepos, fetchBranches };
};
