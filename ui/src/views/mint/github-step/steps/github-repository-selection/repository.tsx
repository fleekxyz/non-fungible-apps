import { Button, Separator } from '@/components';
import {
  githubActions,
  Repository as RepositoryType,
  useAppDispatch,
} from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { RepoRow } from './github-repository-selection';

type RepositoryProps = {
  repository: RepositoryType;
  index: number;
  length: number;
};
export const Repository = ({ repository, index, length }: RepositoryProps) => {
  const { setGithubStep, setRepositoryName } = Mint.useContext();

  const dispatch = useAppDispatch();

  const handleSelectRepo = () => {
    setRepositoryName(repository);
    setGithubStep(3);
    dispatch(githubActions.setQueryState('idle'));
  };
  return (
    <>
      <RepoRow
        repo={repository.name}
        button={
          <Button
            colorScheme="blue"
            variant="outline"
            css={{ py: '$1', height: '$5', borderRadius: '$md' }}
            onClick={handleSelectRepo}
          >
            Use for NFA
          </Button>
        }
      />
      {index < length - 1 && <Separator />}
    </>
  );
};
