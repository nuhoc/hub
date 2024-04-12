import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { id: 1, name: "Sleeping Bag" },
      { id: 2, name: "Backpack" },
      { id: 3, name: "Climbing" },
    ],
    skipDuplicates: true,
  });
  const newGear = await prisma.gear.createMany({
    data: [
      { id: 1, brand: "REI", model: "Zephyr 25 Sleeping Bag" },
      { id: 2, brand: "REI", model: "Zephyr 25 Sleeping Bag" },
      {
        id: 3,
        brand: "REI",
        model: "Zephyr 25 Sleeping Bag",
        notes: "Broken zipper",
      },
      {
        id: 4,
        brand: "Mountain Hardwear",
        model: "Bishop Pass 0 Sleeping Bag",
      },
      {
        id: 5,
        brand: "Mountain Hardwear",
        model: "Bishop Pass 0 Sleeping Bag",
      },
      { id: 6, brand: "Black Diamond", model: "MiniWire Carabiner" },
      { id: 7, brand: "Black Diamond", model: "MiniWire Carabiner" },
      {
        id: 8,
        brand: "Black Diamond",
        model: "MiniWire Carabiner",
        rentable: false,
      },
      {
        id: 9,
        brand: "Black Diamond",
        model: "MiniWire Carabiner",
        rentable: false,
      },
      {
        id: 10,
        brand: "Black Diamond",
        model: "9.9mm Non-Dry Rope",
        notes: "Retired",
        rentable: false,
      },
    ],
    skipDuplicates: true,
  });
  const gearCategories = await prisma.categoriesOnGear.createMany({
    data: [
      { gearId: 1, categoryId: 1 },
      { gearId: 2, categoryId: 1 },
      { gearId: 3, categoryId: 1 },
      { gearId: 4, categoryId: 1 },
      { gearId: 5, categoryId: 1 },
      { gearId: 6, categoryId: 3 },
      { gearId: 7, categoryId: 3 },
      { gearId: 8, categoryId: 3 },
      { gearId: 9, categoryId: 3 },
      { gearId: 10, categoryId: 3 },
    ],
    skipDuplicates: true,
  });
  console.log({ categories, newGear, gearCategories });
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
