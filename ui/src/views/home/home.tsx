import { Flex } from '@/components';
import { Form } from '@/components';
import React, { useState } from 'react';

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Flex
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Home</h1>
      <Form.Field css={{ width: '$24' }}>
        <Form.Label>Label</Form.Label>
        <Form.LogoFileInput value={file} onChange={(file) => setFile(file)} />
      </Form.Field>
    </Flex>
  );
};
