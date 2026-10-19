import prisma from '../src/utils/prisma';
import bcrypt from 'bcrypt';

async function seed() {
    console.log("Seeding verified demo accounts and diverse listings...");

    const landlordHash = await bcrypt.hash('landlord123', 12);
    const tenantHash = await bcrypt.hash('tenant123', 12);
    const adminHash = await bcrypt.hash('admin123', 12);

    // 1. Standardized Demo Accounts
    const landlord = await prisma.user.upsert({
        where: { email: 'landlord@rentnest.com' },
        update: { password: landlordHash },
        create: {
            name: 'Alexander Landlord',
            email: 'landlord@rentnest.com',
            password: landlordHash,
            role: 'LANDLORD',
            contactNumber: '+880 1711-223344'
        }
    });

    const tenant = await prisma.user.upsert({
        where: { email: 'tenant@rentnest.com' },
        update: { password: tenantHash },
        create: {
            name: 'Sophia Tenant',
            email: 'tenant@rentnest.com',
            password: tenantHash,
            role: 'TENANT',
            contactNumber: '+880 1811-998877'
        }
    });

    await prisma.user.upsert({
        where: { email: 'admin@rentnest.com' },
        update: { password: adminHash },
        create: {
            name: 'Super Admin',
            email: 'admin@rentnest.com',
            password: adminHash,
            role: 'ADMIN',
            contactNumber: '+880 1911-001122'
        }
    });

    // 2. Categories
    const categories = ['Apartment', 'Studio', 'Penthouse', 'Villa', 'Duplex'];
    const catMap = new Map();
    for (const name of categories) {
        let cat = await prisma.category.findFirst({ where: { name } });
        if (!cat) {
            cat = await prisma.category.create({ data: { name } });
        }
        catMap.set(name, cat.id);
    }

    // 3. Properties
    const newProps = [
        {
            title: 'Penthouse Sky Suite',
            description: 'Breathtaking 360-degree city views with floor-to-ceiling panoramic glass, private rooftop terrace, and Italian marble finishes.',
            price: 2800,
            location: 'Gulshan 2, Dhaka',
            bedrooms: 3,
            bathrooms: 3,
            landlordId: landlord.id,
            categoryId: catMap.get('Penthouse')!,
            amenities: ['Private Elevator', 'Rooftop Terrace', '24/7 Security', 'Infinity Pool', 'Gym'],
            images: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
            ]
        },
        {
            title: 'Serene Family Villa with Garden',
            description: 'Spacious 4-bedroom luxury villa surrounded by manicured lawns, covered 2-car garage, and quiet residential neighborhood.',
            price: 3400,
            location: 'Uttara Sector 4, Dhaka',
            bedrooms: 4,
            bathrooms: 4,
            landlordId: landlord.id,
            categoryId: catMap.get('Villa')!,
            amenities: ['Private Garden', '2-Car Garage', 'Solar Backup', 'Maid Room', 'High-Speed Fiber'],
            images: [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
            ]
        },
        {
            title: 'Sunlit Contemporary Apartment',
            description: 'Bright south-facing apartment with open-concept chef kitchen, modern hardwood floors, and close access to top schools and cafes.',
            price: 1650,
            location: 'Dhanmondi 8/A, Dhaka',
            bedrooms: 2,
            bathrooms: 2,
            landlordId: landlord.id,
            categoryId: catMap.get('Apartment')!,
            amenities: ['Balcony', 'Generator Backup', 'CCTV Surveillance', 'Covered Parking', 'Intercom'],
            images: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
            ]
        },
        {
            title: 'Executive Duplex Residence',
            description: 'Two-story luxury duplex featuring double-height ceiling living room, bespoke wooden staircase, and premier gated community.',
            price: 2450,
            location: 'Baridhara DOHS, Dhaka',
            bedrooms: 3,
            bathrooms: 3,
            landlordId: landlord.id,
            categoryId: catMap.get('Duplex')!,
            amenities: ['Double-Height Ceiling', 'Gated Community', 'Kids Play Area', '24/7 Guards', 'Central AC'],
            images: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
            ]
        },
        {
            title: 'Modern Minimalist Studio',
            description: 'Ultra-efficient and designer-furnished studio apartment tailored for young professionals, walking distance to prime commercial hubs.',
            price: 950,
            location: 'Banani 11, Dhaka',
            bedrooms: 1,
            bathrooms: 1,
            landlordId: landlord.id,
            categoryId: catMap.get('Studio')!,
            amenities: ['Fully Furnished', 'Smart Lock', 'High Speed WiFi', 'Laundry Facility', 'Elevator'],
            images: [
                'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
            ]
        }
    ];

    for (const p of newProps) {
        await prisma.property.create({ data: p });
    }

    console.log('Seeded 5 new diverse properties and accounts successfully!');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
