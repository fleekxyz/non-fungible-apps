import { Button, Card, Flex, Icon } from '@/components';
import { useRef } from 'react';
// @ts-ignore
import ColorThief from 'colorthief';
import { Mint } from '../../../../mint.context';

export const ColorPicker = () => {
  const { appLogo, logoColor, setLogoColor } = Mint.useContext();
  const inputColorRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLogoLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const colorArray = new ColorThief().getColor(imageRef.current);
    const hexColor = `#${colorArray
      .map((c: number) => c.toString(16).padStart(2, '0'))
      .join('')}`;
    setLogoColor(hexColor);
  };

  const handleColorPickerClick = () => {
    inputColorRef.current?.click();
  };

  return (
    <Card.Text css={{ height: '$22', mt: '$6' }}>
      <div className="relative">
        <Flex css={{ gap: '$3h' }}>
          <span>Primary Color</span>
          {/* TODO crate color picker component */}
          <Button
            leftIcon={
              <Icon name="square" css={{ color: `${logoColor || 'FFFFFF'}` }} />
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
            }}
            onClick={handleColorPickerClick}
          >
            {logoColor.toUpperCase() || '#FFFFFF'}
          </Button>
          <input
            ref={inputColorRef}
            className="absolute right-16 top-0h"
            type="color"
            value={logoColor}
            onChange={(e) => setLogoColor(e.target.value)}
          />
        </Flex>
      </div>

      <img
        className="hidden"
        src={appLogo}
        ref={imageRef}
        onLoad={handleLogoLoad}
        style={{ width: '50px', height: '50px' }}
      />
    </Card.Text>
  );
};
