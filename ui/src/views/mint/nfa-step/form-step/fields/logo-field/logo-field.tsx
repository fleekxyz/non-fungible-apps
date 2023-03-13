import { Flex, Form } from '@/components';
import { AppLog } from '@/utils';
import { useState } from 'react';
import { Mint } from '../../../../mint.context';
import { fileToBase64, validateFileSize } from '../../form.utils';
import { ColorPicker } from './color-picker';

export const LogoField = () => {
  const { appLogo, setAppLogo, setLogoColor } = Mint.useContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (validateFileSize(file)) {
        const fileBase64 = await fileToBase64(file);
        setAppLogo(fileBase64);
        setErrorMessage(null);
      } else {
        setAppLogo('');
        setLogoColor('');
        setErrorMessage('File size is too big');
      }
    }
  };
  return (
    <Flex css={{ width: '$full', gap: '$4h', alignItems: 'flex-start' }}>
      <Form.Field>
        <Form.Label>Logo</Form.Label>
        <Form.LogoFileInput value={appLogo} onChange={handleFileChange} />
        {errorMessage && <Form.Error>{errorMessage}</Form.Error>}
      </Form.Field>
      <ColorPicker />
    </Flex>
  );
};
