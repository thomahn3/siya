const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = [
    { name: 'Plumbing' },
    { name: 'Electrical' },
    { name: 'Carpentry' },
    { name: 'Gardening' },
    { name: 'House Cleaning' },
    { name: 'Landscaping' },
    { name: 'Pool Services' },
    { name: 'Painting' },
    { name: 'Roof Repair' },
    { name: 'Pest Control' },
    { name: 'Locksmith' },
  ];

  for (const service of services) {
    await prisma.services.create({
      data: service,
    });
  }

  console.log('Services seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
