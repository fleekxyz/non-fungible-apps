import { Button, Card, Flex, Icon } from '@/components';
import { useRef } from 'react';
// @ts-ignore
import ColorThief from 'colorthief';

export type ColorPickerProps = {
  logoColor: string;
  setLogoColor: (color: string) => void;
  logo: string;
} & React.HTMLAttributes<HTMLInputElement>;

export const ColorPicker: React.FC<ColorPickerProps> = ({
  logoColor,
  logo,
  setLogoColor,
  onBlur,
}) => {
  const inputColorRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLogoLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const colorArray = new ColorThief().getColor(imageRef.current);
    const hexColor = `#${colorArray
      .map((c: number) => c.toString(16).padStart(2, '0'))
      .join('')}`;
    setLogoColor(hexColor);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoColor(e.target.value);
  };

  const handleColorPickerClick = () => {
    inputColorRef.current?.click();
  };

  return (
    <Card.Text css={{ height: '$22', mt: '$6' }}>
      <div className="relative">
        <Flex css={{ gap: '$3h', alignItems: 'center' }}>
          <span>Primary Color</span>
          {/* TODO crate color picker component */}
          <Button
            leftIcon={
              <Icon
                name="square"
                css={{ color: `${logoColor || '#000000'}` }}
              />
            }
            rightIcon={
              <Icon name="chevron-down" css={{ fontSize: '0.625rem' }} />
            }
            css={{
              py: '$1',
              height: '$5',
              borderRadius: '$md',
              color: '$slate12',
              zIndex: '$dropdown',
              minWidth: '$28',
            }}
            onClick={handleColorPickerClick}
          >
            {logoColor.toUpperCase() || '#000000'}
          </Button>
          <input
            ref={inputColorRef}
            className="absolute right-16"
            type="color"
            value={logoColor}
            onChange={handleColorChange}
          />
        </Flex>
      </div>

      <img
        className="hidden"
        src={logo}
        ref={imageRef}
        onLoad={handleLogoLoad}
        style={{ width: '50px', height: '50px' }}
      />
    </Card.Text>
  );
};
