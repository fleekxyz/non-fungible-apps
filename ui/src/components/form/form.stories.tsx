import { useState } from 'react';
import { Form } from './form';

export default {
  title: 'Components/Form',
  component: Form,
};

export const Fields = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Form.Field>
        <Form.Label>Label</Form.Label>
        <Form.Input placeholder="Input" />
        <Form.Error>Input error</Form.Error>
      </Form.Field>
      <Form.Field>
        <Form.Label>Label</Form.Label>
        <Form.Textarea placeholder="Textarea" />
        <Form.Error>Textarea error</Form.Error>
      </Form.Field>
      <Form.Field css={{ width: '$24' }}>
        <Form.Label>Label</Form.Label>
        <Form.LogoFileInput value={file} onChange={(file) => setFile(file)} />
      </Form.Field>
    </>
  );
};
