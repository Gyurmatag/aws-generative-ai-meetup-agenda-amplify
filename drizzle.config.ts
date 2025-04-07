import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  driver: 'aws-data-api',
  dialect: 'postgresql',
  dbCredentials: {
    database: process.env.DB_NAME!,
    secretArn: process.env.DB_SECRET_ARN!,
    resourceArn: process.env.DB_CLUSTER_ARN!,
  },
} satisfies Config; 