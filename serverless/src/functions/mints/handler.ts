import {
  APIGatewayProxyResult,
  APIGatewayEvent,
  ///APIGatewayEventRequestContext,
} from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { initPrisma, prisma } from '@libs/prisma';
import { contractInstance, web3, provider } from '@libs/nfa-contract';
import { isTheSignatureValid } from '@libs/verify-signature';
import { ethers } from 'ethers';
import { ENS } from '@ensdomains/ensjs';

export const submitNFA = async (
  event: APIGatewayEvent
  ///context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body === null || event.body === undefined) {
      return formatJSONResponse(422, {
        message: 'Required parameters were not passed.',
      });
    }

    const data = JSON.parse(event.body);

    if (
      data.ens === undefined ||
      data.owner === undefined ||
      data.name === undefined
    ) {
      throw Error('Required arguments are not passed.');
    }

    const BigNumber = ethers.BigNumber;
    const utils = ethers.utils;
    const labelHash = utils.keccak256(utils.toUtf8Bytes(data.ens));

    const nfaInfo = {
      createdAt: new Date().toISOString(),
      ens: data.ens,
      ensTokenId: BigNumber.from(labelHash),
      owner: data.owner,
      name: data.name,
      id: 1, // TODO: Change it to a real calculated value.
      contractTransactionHash: undefined,
    };

    const ens = new ENS();
    await ens.setProvider(provider);

    if ((await ens.getAddress(ens)) !== nfaInfo.owner) {
      throw Error(
        'The passed owner argument is not the owner of the passed ENS value.'
      );
    }

    //initPrisma();

    try {
      const transaction = await contractInstance.importNFA(
        nfaInfo.name,
        nfaInfo.ensTokenId,
        nfaInfo.ens,
        nfaInfo.id
      );
    } catch (error) {
      // catch transaction error
      console.error(error);
    }

    return formatJSONResponse(200, {
      nfaInfo,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
};
