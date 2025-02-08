import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      reviews: {
        create: [
          {
            locationName: "Central Park",
            locationAddress: "New York, NY",
            placeId: "ChIJ4zGFAZpYwokRGUGph3Mf37k",
            type: "SHARED",
            rating: 4,
            content: "Great place, very clean!",
            accessible: true,
            changingTable: true,
            genderNeutral: true,
            clothTowels: false,
            handDryer: true,
            notClean: false,
            published: true,
            viewCount: 100,
          },
          {
            locationName: "Times Square",
            locationAddress: "New York, NY",
            placeId: "ChIJmQJIxlVYwokRLgeuocVOGVU",
            type: "MENS",
            rating: 3,
            content: "Crowded but decent.",
            accessible: false,
            changingTable: false,
            genderNeutral: false,
            clothTowels: true,
            handDryer: false,
            notClean: true,
            published: false,
            viewCount: 50,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
