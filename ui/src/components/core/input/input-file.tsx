import { Flex } from '../../layout';
import { dripStitches } from '../../../theme/stitches';
import { useRef, useState } from 'react';
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
  my: '$1h',

  '&:hover': {
    borderColor: '$gray8',
  },
});

export const InputFileStyled = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null); //TODO: do it with redux

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.files && e.target.files.length > 0 && setFile(e.target.files[0]);
  };
  return (
    <>
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
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
    </>
  );
};
