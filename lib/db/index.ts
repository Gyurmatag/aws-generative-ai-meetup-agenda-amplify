import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';
import * as schema from './schema';

const client = new RDSDataClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const db = drizzle(client, {
  database: process.env.DB_NAME!,
  secretArn: process.env.DB_SECRET_ARN!,
  resourceArn: process.env.DB_CLUSTER_ARN!,
  schema,
}); 