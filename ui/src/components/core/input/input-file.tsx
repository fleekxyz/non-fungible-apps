import { Flex } from '../../layout';
import { dripStitches } from '../../../theme/stitches';
import { forwardRef, useRef, useState } from 'react';
import { Icon } from '../icon';
import { Form } from '../../../components/form/form';

const { styled } = dripStitches;

const BorderInput = styled('div', {
  borderStyle: 'solid',
  borderColor: '$gray7',
  width: '$22',
  height: '$22',
  transition: 'border-color 0.2s ease-in-out',
  borderWidth: '$default',
  borderRadius: '$lg',
  zIndex: '$docked',
  my: '$1h',

  '&:hover': {
    borderColor: '$gray8',
  },
});

const DEFAULT_MAX_FILE_SIZE = 10; // in KB

// The file size must be capped to a size that the contract can handle
const validateFileSize = (
  file: File,
  maxSize = DEFAULT_MAX_FILE_SIZE
): boolean => {
  return file.size <= 1024 * maxSize;
};

type InputFileProps = {
  value: File | null;
  onChange: (file: File | null) => void;
} & React.ComponentProps<typeof Flex>;

export const StyledInputFile = forwardRef<HTMLDivElement, InputFileProps>(
  ({ value: file, onChange, css, ...props }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setErrorMessage(null);

      if (e.target.files && e.target.files.length > 0) {
        if (validateFileSize(e.target.files[0])) onChange(e.target.files[0]);
        else {
          onChange(null);
          setErrorMessage('File size is too big');
        }
      }
    };

    return (
      <>
        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            ...(css || {}),
          }}
          ref={ref}
          {...props}
          onClick={() => inputFileRef.current?.click()}
        >
          {file ? (
            <img
              className="absolute w-14 h-14"
              src={URL.createObjectURL(file)}
              alt="logo"
            />
          ) : (
            <Icon name="upload" size="md" css={{ position: 'absolute' }} />
          )}
          <BorderInput />

          <input
            type="file"
            className="hidden"
            accept={'.svg'}
            ref={inputFileRef}
            onChange={handleFileChange}
          />
        </Flex>
        {errorMessage && <Form.Error>{errorMessage}</Form.Error>}
      </>
    );
  }
);
