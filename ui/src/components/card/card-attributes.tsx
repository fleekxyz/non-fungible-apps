import { Card, CardBody } from '@chakra-ui/react';
import { TileInfo } from '../tile-info';

type CardAttributesProps = {
  heading: string;
  info: string;
};

export const CardAttributes = ({ heading, info }: CardAttributesProps) => (
  <Card
    mr="10px"
    mb="5px"
    direction={{ base: 'column', sm: 'row' }}
    overflow="hidden"
    variant="outline"
    width="200px"
  >
    <CardBody width="200px">
      <TileInfo size="sm" heading={heading} info={info} widthText={160} />
    </CardBody>
  </Card>
);

