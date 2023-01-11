import { Card, CardBody, Tooltip } from '@chakra-ui/react';
import { TileInfo } from '../tile-info';

type CardAttributesProps = {
  heading: string;
  info: string;
};

export const CardAttributes = ({ heading, info }: CardAttributesProps) => (
  <Card
    mr="0.625em"
    mb="0.3em"
    direction={{ base: 'column', sm: 'row' }}
    overflow="hidden"
    variant="outline"
    width="12.5em"
  >
    <Tooltip label={info} bg="gray">
      <CardBody width="12.5em">
        <TileInfo size="sm" heading={heading} info={info} widthText={160} />
      </CardBody>
    </Tooltip>
  </Card>
);
