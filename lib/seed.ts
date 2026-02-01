import { prisma } from './prisma';

export async function seedDatabase() {
    console.log('🌱 Seeding database...');

    // Create demo user
    const user = await prisma.user.upsert({
        where: { email: 'demo@fooocus.studio' },
        update: {},
        create: {
            email: 'demo@fooocus.studio',
            name: 'Demo User',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        },
    });

    console.log('✅ Created user:', user.email);

    // Create Sara influencer profile
    const influencer = await prisma.influencerProfile.upsert({
        where: { id: 'sara-influencer-001' },
        update: {},
        create: {
            id: 'sara-influencer-001',
            userId: user.id,
            name: 'Sara',
            bio: '24yo lifestyle influencer | Coffee & Travel ☕✈️ | Living my best life',
            instagramHandle: '@sara.ai',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClhh608Vn2JRlIxLY1KtS0AXJCh3ThnnjRJm2Qznil7DRMSHwNMuojoOd7fs657jhD6crzr9cjAfbDfdjHCuJCCjbTuxh_iKuyJ4o3RCD8qWxNTTCiy5pCjlzCsHf5rL5EotzFGfKmlYx8teob1steG2RKtBj4bXyYxC5kUB2ozDtX_qvQnlkHUUkWk1dUkfKfYLMCy8Wr--p8S1oSzWE-6HUiDJh3wy-OmKyWjg1zgFamd26um-BWwAT4QgnPlOXzGLn0An0LlQXF',
            metadata: {
                age: 24,
                style: 'modern casual',
                interests: ['coffee', 'travel', 'fashion', 'photography'],
                physicalAttributes: {
                    hair: 'long brown',
                    eyes: 'brown',
                    ethnicity: 'mixed',
                },
            },
        },
    });

    console.log('✅ Created influencer:', influencer.name);

    // Create initial analytics snapshot
    await prisma.analyticsSnapshot.upsert({
        where: { id: 'initial-snapshot' },
        update: {},
        create: {
            id: 'initial-snapshot',
            influencerId: influencer.id,
            followersCount: 12450,
            followingCount: 892,
            postsCount: 0,
            engagementRate: 0,
            likesTotal: 0,
            commentsTotal: 0,
            reach: 0,
            impressions: 0,
        },
    });

    console.log('✅ Created initial analytics');

    // Create sample prompt templates
    const templates = [
        {
            context: 'Coffee Shop',
            basePrompt: '(masterpiece, best quality), realistic photo of Sara, 24yo influencer',
            compiledPrompt: '(masterpiece, best quality), realistic photo of Sara, 24yo influencer, sitting in a modern cafe, drinking matcha latte, wearing oversized beige hoodie, soft natural lighting, depth of field, 8k uhd',
            logicGates: { camera: 'DSLR', lighting: 'natural', mood: 'casual' },
        },
        {
            context: 'Travel',
            basePrompt: '(masterpiece, best quality), realistic photo of Sara, 24yo influencer',
            compiledPrompt: '(masterpiece, best quality), realistic photo of Sara, 24yo influencer, at scenic mountain viewpoint, golden hour lighting, wearing hiking outfit, backpack, candid smile, cinematic composition, 8k uhd',
            logicGates: { camera: 'DSLR', lighting: 'golden hour', mood: 'adventurous' },
        },
        {
            context: 'Fashion',
            basePrompt: '(masterpiece, best quality), realistic photo of Sara, 24yo influencer',
            compiledPrompt: '(masterpiece, best quality), realistic photo of Sara, 24yo influencer, urban street fashion, wearing trendy outfit, city background, editorial photography, professional lighting, 8k uhd',
            logicGates: { camera: 'Film', lighting: 'studio', mood: 'confident' },
        },
    ];

    for (const template of templates) {
        await prisma.llmPrompt.create({
            data: {
                influencerId: influencer.id,
                context: template.context,
                basePrompt: template.basePrompt,
                compiledPrompt: template.compiledPrompt,
                logicGates: template.logicGates,
                isTemplate: true,
                usageCount: 0,
            },
        });
    }

    console.log('✅ Created prompt templates');

    console.log('🎉 Database seeded successfully!');
    return influencer;
}

// Run if called directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('Done!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error seeding database:', error);
            process.exit(1);
        });
}
