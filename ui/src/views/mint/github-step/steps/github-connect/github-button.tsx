import { Button, Icon } from '@/components';
import { Mint } from '@/views/mint/mint.context';
import { useFirebase } from './use-firebase';

export const GithubButton = () => {
  const { setGithubStep } = Mint.useContext();

  const handleError = (error: any) => {
    //TODO show toast with error message
    alert(error);
  };

  const handleSuccess = () => {
    setGithubStep(2);
  };

  const { login } = useFirebase({
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleGithubLogin = () => {
    login();
  };

  return (
    <Button
      iconSpacing="59"
      size="lg"
      variant="ghost"
      css={{
        backgroundColor: '$slate4',
        color: '$slate12',
        py: '$2h',
      }}
      onClick={handleGithubLogin}
      rightIcon={
        <Icon name="github" css={{ color: 'white', fontSize: '$4xl' }} />
      }
    >
      GitHub
    </Button>
  );
};
