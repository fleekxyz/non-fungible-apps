import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({log: ['warn', 'error']});

export async function initPrisma() {
  // Connect the client
  await prisma.$connect();
}

initPrisma()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
