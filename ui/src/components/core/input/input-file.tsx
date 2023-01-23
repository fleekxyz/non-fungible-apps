import { BsCloudUploadFill } from 'react-icons/bs';
import { Flex } from '../../layout';
import { dripStitches } from '../../../theme/stitches';
import { useRef, useState } from 'react';

const { styled } = dripStitches;

const BorderInput = styled('div', {
  borderStyle: 'solid',
  borderColor: '$gray7',
  width: '$20',
  height: '$20',
  transition: 'border-color 0.2s ease-in-out',
  borderWidth: '$default',
  borderRadius: '$lg',
  zIndex: '$docked',

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
        <span className="absolute -z-0">
          <BsCloudUploadFill color="white" />
        </span>
        <BorderInput />
        <input
          type="file"
          className="hidden"
          ref={inputFileRef}
          onChange={handleFileChange}
        />
      </Flex>
    </>
  );
};
