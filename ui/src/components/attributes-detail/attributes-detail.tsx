import { SiteNFTDetail } from '@/types';
import { HStack } from '@chakra-ui/react';
import { CardAttributes } from '../card';

type AttributesDetailProps = {
  owner: string;
  attributes: SiteNFTDetail['attributes'];
  tokendId: string;
};

export const AttributesDetail = ({
  owner,
  attributes,
  tokendId,
}: AttributesDetailProps) => {
  return (
    <HStack shouldWrapChildren display="inline" spacing="0px">
      <CardAttributes heading="Owner" info={owner} />
      {attributes.map((attribute) => (
        <CardAttributes
          key={attribute.trait_type}
          heading={attribute.trait_type}
          info={attribute.value}
        />
      ))}
      <CardAttributes heading="Token ID" info={tokendId} />
    </HStack>
  );
};

