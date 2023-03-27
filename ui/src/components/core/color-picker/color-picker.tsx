import { Card, Flex } from '@/components';
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

  return (
    <Card.Text css={{ height: '$22', mt: '$6' }}>
      <Flex css={{ gap: '$3h' }}>
        <span>Primary Color</span>
        {/* TODO crate color picker component */}
        <input
          type="color"
          value={logoColor}
          onChange={handleColorChange}
          onBlur={onBlur}
        />
      </Flex>
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
