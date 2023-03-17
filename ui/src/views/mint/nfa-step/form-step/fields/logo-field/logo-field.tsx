import { Flex, Form } from '@/components';
import { useMintFormContext } from '../../mint-form.context';
import { ColorPicker } from './color-picker';

export const LogoField = () => {
  const {
    form: { appLogo },
  } = useMintFormContext();

  return (
    <Flex css={{ width: '$full', gap: '$4h', alignItems: 'flex-start' }}>
      <Form.Field context={appLogo}>
        <Form.Label>Logo</Form.Label>
        <Form.LogoFileInput />
        <Form.Overline />
      </Form.Field>
      <ColorPicker />
    </Flex>
  );
};
