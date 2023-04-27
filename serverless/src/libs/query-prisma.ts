import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function initPrisma() {
  // Connect the client
  await prisma.$connect();
}

initPrisma()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
