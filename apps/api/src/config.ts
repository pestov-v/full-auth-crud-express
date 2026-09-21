import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
  port: z.number().default(3000),
  apiKey: z.string(),
  databaseUrl: z.string(),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
});

const port = parseInt(process.env.PORT || '4000', 10);
const apiKey = process.env.API_KEY;
const databaseUrl = process.env.DATABASE_URL;
const nodeEnv = process.env.NODE_ENV;

if (!apiKey) {
  throw new Error('API_KEY не встановлено');
}

if (!databaseUrl) {
  throw new Error('DATABASE_URL не встановлено');
}

const config = configSchema.parse({
  port,
  apiKey,
  databaseUrl,
  nodeEnv,
});

export default config;
