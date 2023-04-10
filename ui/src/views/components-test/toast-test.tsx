import { useNavigate } from 'react-router-dom';

import { Button, Flex } from '@/components';
import { pushToast } from '@/utils';

export const ToastTest: React.FC = () => {
  const navigate = useNavigate();
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

      <Button
        onClick={() => {
          pushToast('success', 'Message sent successfully!', {
            onDismiss: () => navigate('/home'),
          });
        }}
      >
        Toggle Succes Toast Dismiss
      </Button>
    </Flex>
  );
};
