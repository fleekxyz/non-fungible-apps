import { Card, Flex } from '@/components';
import { useRef } from 'react';
// @ts-ignore
import ColorThief from 'colorthief';

type ColorPickerProps = {
  file: string;
  color: string;
  setColor: (color: string) => void;
};

export const ColorPicker = ({ file, color, setColor }: ColorPickerProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLogoLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const colorArray = new ColorThief().getColor(imageRef.current);
    const hexColor = `#${colorArray
      .map((c: number) => c.toString(16).padStart(2, '0'))
      .join('')}`;
    setColor(hexColor);
  };

  return (
    <Card.Text css={{ height: '$22', mt: '$6' }}>
      <Flex css={{ gap: '$3h' }}>
        <span>Primary Color</span>
        {/* TODO crate color picker component */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </Flex>
      <img
        className="hidden"
        src={file}
        ref={imageRef}
        onLoad={handleLogoLoad}
        style={{ width: '50px', height: '50px' }}
      />
    </Card.Text>
  );
};
