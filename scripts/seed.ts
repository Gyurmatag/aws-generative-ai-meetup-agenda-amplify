import { db } from '../lib/db'
import { talks } from '../lib/db/schema'
import { RDSDataClient, ExecuteStatementCommand } from '@aws-sdk/client-rds-data'

const rdsClient = new RDSDataClient({
  region: process.env.APP_REGION,
  credentials: {
    accessKeyId: process.env.APP_ACCESS_KEY_ID!,
    secretAccessKey: process.env.APP_SECRET_ACCESS_KEY!,
  },
});

async function createDatabaseIfNotExists() {
  try {
    const command = new ExecuteStatementCommand({
      resourceArn: process.env.DB_CLUSTER_ARN,
      secretArn: process.env.DB_SECRET_ARN,
      sql: "CREATE DATABASE meetup_agenda;",
      database: "postgres"
    });

    await rdsClient.send(command);
    console.log('Database created successfully');
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', error);
      throw error;
    }
  }
}

async function seed() {
  try {
    await createDatabaseIfNotExists();
    
    // Clear existing data
    await db.delete(talks);

    // Insert new data
    await db.insert(talks).values([
      {
        time: "17:00 - 17:30",
        title: "Kapunyitás",
        speaker: "",
        iconName: "Users",
        iconColor: "text-gray-500",
        current: false,
      },
      {
        time: "17:30 - 18:00",
        title: "Keynote: Mastering Prompt Engineering for Smarter Interactions",
        speaker: "Kacper Dąbrowski, AWS",
        iconName: "Lightbulb",
        iconColor: "text-amber-500",
        current: false,
      },
      {
        time: "18:00 - 18:40",
        title: "GenAI security",
        speaker: "Czirok László, TC2",
        iconName: "Shield",
        iconColor: "text-emerald-500",
        current: false,
      },
      {
        time: "18:40 - 19:10",
        title: "AWS Amplify vs Vercel vs Cloudflare Pages / Workers",
        speaker: "Varga György, Shiwaforce",
        iconName: "Cloud",
        iconColor: "text-sky-500",
        current: true,
      },
      {
        time: "19:10",
        title: "Generative AI kvíz, nyereményekkel",
        speaker: "",
        iconName: "Gift",
        iconColor: "text-purple-500",
        current: false,
      },
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed(); 