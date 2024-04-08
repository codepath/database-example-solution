const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
]

async function main() {
    console.log(`Start seeding ...`)

    // Clear the table first
    await prisma.user.deleteMany()

    for (const user of users) {
        const userRecord = await prisma.user.create({
            data: user,
        });
        console.log(`Created user with id: ${userRecord.id}`)
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })