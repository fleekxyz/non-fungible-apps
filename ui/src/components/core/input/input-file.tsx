import { forwardRef, useRef } from 'react';

import { Icon } from '../icon';
import { InputFileStyles as S } from './input-file.styles';

type InputFileProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<typeof S.Border>;

export const StyledInputFile = forwardRef<HTMLDivElement, InputFileProps>(
  ({ value: file, onChange, ...props }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      onChange(e);
    };

    const handleInputClick = (): void => {
      inputFileRef.current?.click();
    };

    return (
      <>
        <S.Container onClick={handleInputClick}>
          {file !== '' ? (
            <img className="absolute w-14 h-14" src={file} alt="logo" />
          ) : (
            <Icon name="upload" size="md" css={{ position: 'absolute' }} />
          )}
          <S.Border {...props} ref={ref} />
          <input
            type="file"
            className="hidden"
            accept={'.svg'}
            ref={inputFileRef}
            onChange={handleFileChange}
          />
        </S.Container>
      </>
    );
  }
);

StyledInputFile.displayName = 'StyledInputFile';
