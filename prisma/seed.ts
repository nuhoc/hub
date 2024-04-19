import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createMany({
    data: [{ name: "sleep" }, { name: "climb" }, { name: "bags" }],
    skipDuplicates: true,
  });
  const newGear = await prisma.gearModel.createMany({
    data: [
      { brand: "REI", model: "Zephyr 25 Sleeping Bag" },
      { brand: "Mountain Hardwear", model: "Bishop Pass 0 Sleeping Bag" },
      { brand: "Black Diamond", model: "MiniWire Carabiner" },
      { brand: "Black Diamond", model: "9.9mm Non-Dry Rope" },
    ],
    skipDuplicates: true,
  });
  const gearCategories = await prisma.categoriesOnGear.createMany({
    data: [
      { gearId: 1, categoryId: 1 },
      { gearId: 2, categoryId: 1 },
      { gearId: 3, categoryId: 2 },
      { gearId: 4, categoryId: 2 },
    ],
    skipDuplicates: true,
  });

  const gearInstances = await prisma.gearInstance.createMany({
    data: [
      { gearModelId: 1 },
      { gearModelId: 1 },
      { gearModelId: 1 },
      { gearModelId: 2 },
      { gearModelId: 2 },
      { gearModelId: 2 },
      { gearModelId: 2 },
      { gearModelId: 3 },
      { gearModelId: 3 },
      { gearModelId: 4 },
    ],
  });
  console.log({ categories, newGear, gearCategories, gearInstances });
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
