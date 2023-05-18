// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorThief from 'colorthief';
import { useRef } from 'react';

import { Button, Card, Flex, Icon, Text } from '@/components';

import { ColorPickerStyles as CS } from './color-picker.styles';

export type ColorPickerProps = {
  logoColor: string;
  setLogoColor: (color: string) => void;
  logo: string;
} & React.HTMLAttributes<HTMLInputElement>;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  logoColor,
  logo,
  setLogoColor,
}: ColorPickerProps) => {
  const inputColorRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogoLoad = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const colorArray = new ColorThief().getColor(imageRef.current);
    const hexColor = `#${colorArray
      .map((c: number) => c.toString(16).padStart(2, '0'))
      .join('')}`;
    setLogoColor(hexColor);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogoColor(e.target.value);
  };

  const handleColorPickerClick = (): void => {
    inputColorRef.current?.click();
  };

  return (
    <Card.Text css={{ height: '$22', mt: '$6' }}>
      <CS.Container>
        <Flex css={{ gap: '1px' }}>
          <Text>Primary Color</Text>
          <Button
            leftIcon={
              <Icon name="square" css={{ color: `${logoColor || '$black'}` }} />
            }
            rightIcon={
              <Icon name="chevron-down" css={{ fontSize: '0.625rem' }} />
            }
            css={{
              py: '$1',
              height: '$5',
              borderRadius: '$md',
              color: '$slate12',
              zIndex: '$docked',
              minWidth: '$28',
              gap: '2px',
            }}
            onClick={handleColorPickerClick}
          >
            {logoColor.toUpperCase() || '#000000'}
          </Button>
          <CS.Input
            ref={inputColorRef}
            type="color"
            value={logoColor}
            onChange={handleColorChange}
          />
        </Flex>
      </CS.Container>

      <CS.Image
        src={logo}
        ref={imageRef}
        onLoad={handleLogoLoad}
        style={{ width: '50px', height: '50px' }}
      />
    </Card.Text>
  );
};
