import { DropdownItem } from '@/components';
import { useGithubStore } from '@/store';
import { Octokit } from 'octokit';

export const useGithub = () => {
  const { token } = useGithubStore();

  const octokit = new Octokit({
    auth: token,
  });

  const fetchUser = async () => {
    try {
      const { data } = await octokit.request('GET /user');

      return data;
    } catch (error) {
      return error;
    }
  };

  const fetchOrgs = async () => {
    try {
      const { data } = await octokit.request('GET /user/orgs');

      return data;
    } catch (error) {
      return error;
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
      return error;
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
              label: branch.name,
              value: branch.commit.sha,
            } as DropdownItem;
          })
        );

      return branches;
    } catch (error) {
      return error;
    }
  };

  return { fetchUser, fetchOrgs, fetchRepos, fetchBranches };
};
