import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function initPrisma() {
  // Connect the client
  await prisma.$connect();
}

initPrisma()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
