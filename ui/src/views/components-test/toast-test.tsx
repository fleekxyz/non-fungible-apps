import { Button, Flex } from '@/components';
import { pushToast } from '@/utils';

export const ToastTest = () => {
  return (
    <Flex css={{ margin: '$22', gap: '$5' }}>
      <h1>ToastTest</h1>
      <Button
        onClick={() => {
          pushToast('error', 'Issue connecting Wallet, please try again.');
        }}
      >
        Toggle Error Toast
      </Button>
      <Button
        onClick={() => {
          pushToast('success', 'Message sent successfully!');
        }}
      >
        Toggle Succes Toast
      </Button>
    </Flex>
  );
};
