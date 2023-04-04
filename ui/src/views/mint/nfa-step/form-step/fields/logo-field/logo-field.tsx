import { Flex, Form } from '@/components';

import { useMintFormContext } from '../../mint-form.context';

export const LogoField: React.FC = () => {
  const {
    form: { appLogo: appLogoContext, logoColor: logoColorContext },
  } = useMintFormContext();

  const {
    value: [appLogo],
  } = appLogoContext;

  return (
    <Flex css={{ width: '$full', gap: '$4h', alignItems: 'flex-start' }}>
      <Form.Field context={appLogoContext}>
        <Form.Label>Logo</Form.Label>
        <Form.LogoFileInput />
        <Form.Overline />
      </Form.Field>
      <Form.Field context={logoColorContext} css={{ flexGrow: 1 }}>
        <Form.ColorPicker logo={appLogo} />
        <Form.Overline />
      </Form.Field>
    </Flex>
  );
};
