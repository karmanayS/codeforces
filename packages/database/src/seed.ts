import { prisma } from "./client";
import { categories, problemsData } from "./seedData";

const ADMIN_USER_ID = "dalXhX1qOsr8XrjajqK0SgjEBY5Cmn85";

async function main() {
  console.log("🌱 Starting database seed...\n");

  console.log("📌 Seeding problem tags...");
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${categories.length} categories\n`);

  //const categoriesFromDb = await prisma.category.findMany();
  //const categoryMap = new Map(categoriesFromDb.map((category) => [category.title, category.id]));

  console.log("📝 Seeding problems...");
  let createdCount = 0;
  let skippedCount = 0;

  for (const question of problemsData) {
    const existing = await prisma.question.findFirst({
      where: { title: question.title },
    });

    if (existing) {
      skippedCount++;
      continue;
    }

    /*
    INFO: (id): id is string, this means: 
    Trust me: if this function returns true, whatever was passed as id is guaranteed to be a string from now on
    */
    // const questionIds = question.category
    //   .map((tagTitle) => tagMap.get(tagTitle))
    //   .filter((id): id is string => id !== undefined);

    /*
    INFO:  
    */
    await prisma.question.create({
      data: {
        title: question.title,
        description: question.description,
        difficulty: question.difficulty,
        timeLimit: question.cpuTimeLimit,
        memoryLimit: question.memoryTimeLimit,
        userId: ADMIN_USER_ID,
        categoryName: question.category,
        visibleTests: {
          create: question.visibleTestCases.map((tc) => ({
            input: tc.input,
            output: tc.output,
          })),
        },
        testCases: {
          create: question.hiddenTestCases.map((tc) => ({
            input: tc.input,
            output: tc.output,
          })),
        },
      },
    });

    createdCount++;
  }

  console.log(`✅ Created ${createdCount} problems`);
  if (skippedCount > 0) {
    console.log(` Skipped ${skippedCount} existing problems`);
  }

  const totalProblems = await prisma.question.count();
  const totalVisibleTestCases = await prisma.visibleTest.count();
  const totalHiddenTestCases = await prisma.testCase.count();

  console.log("\n📊 Database Summary:");
  console.log(`   - Problems: ${totalProblems}`);
  console.log(`   - Visible Test Cases: ${totalVisibleTestCases}`);
  console.log(`   - Hidden Test Cases: ${totalHiddenTestCases}`);
  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });