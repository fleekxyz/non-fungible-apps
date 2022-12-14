import { Card, CardBody } from '@chakra-ui/react';
import { TileInfo } from '../tile-info';

export const CardAttributes = ({
  heading,
  info,
}: {
  heading: string;
  info: string;
}) => (
  <Card
    mr="10px"
    mb="5px"
    direction={{ base: 'column', sm: 'row' }}
    overflow="hidden"
    variant="outline"
    width="200px"
  >
    <CardBody width="200px">
      <TileInfo size="sm" heading={heading} info={info} width={160} />
    </CardBody>
  </Card>
);

