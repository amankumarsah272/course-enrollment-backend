import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const studentPassword = await bcrypt.hash('Student@123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            passwordHash: adminPassword,
            role: 'ADMIN',
        },
        create: {
            name: 'Admin',
            email: 'admin@example.com',
            passwordHash: adminPassword,
            role: 'ADMIN',
        },
    });

    await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {
            passwordHash: studentPassword,
            role: 'STUDENT',
        },
        create: {
            name: 'Student',
            email: 'student@example.com',
            passwordHash: studentPassword,
            role: 'STUDENT',
        },
    });

    console.log('Admin and Student accounts seeded successfully!');
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });