import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import config from '../src/config';

const connectionString = config.database_url;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding database...")

    const superAdminEmail = 'admin@rentnest.com'
    const superAdminPassword = await bcrypt.hash('admin123', 12);

    const existingAdmin = await prisma.user.findUnique({
        where: { email: superAdminEmail }
    })
    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                name: 'Super Admin',
                email: superAdminEmail,
                password: superAdminPassword,
                role: 'ADMIN',
            }
        })
        console.log("Super Admin created successfully!")
    } else {
        console.log("Super Admin already exists!")
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
});