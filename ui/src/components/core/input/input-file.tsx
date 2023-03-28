import { Flex } from '../../layout';
import { dripStitches } from '../../../theme';
import { forwardRef, useRef } from 'react';
import { Icon } from '../icon';

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

  '&:hover': {
    borderColor: '$gray8',
  },
});

type InputFileProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<typeof Flex>;

export const StyledInputFile = forwardRef<HTMLDivElement, InputFileProps>(
  ({ value: file, onChange, css, ...props }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      onChange(e);
    };

    const handleInputClick = () => {
      inputFileRef.current?.click();
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
          onClick={handleInputClick}
        >
          {file !== '' ? (
            <img className="absolute w-14 h-14" src={file} alt="logo" />
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
      </>
    );
  }
);
