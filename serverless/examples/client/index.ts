import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();

  // Query the total count of tokens
  const allTokens = await prisma.tokens.findMany();
  console.log('Total tokens:');
  console.log(allTokens.length);

  // Query the token associated with tokenId 1
  const tokenOne = await prisma.tokens.findRaw({
    filter: {
      tokenId: 1,
    },
  });
  console.log('Token Id One:');
  console.log(tokenOne);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
