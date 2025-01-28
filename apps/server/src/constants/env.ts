import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().min(1),
  DB_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_ACCESS_LIFETIME: z.coerce.number().min(1),
  JWT_REFRESH_LIFETIME: z.coerce.number().min(1),
  OPENAI_API_KEY: z.coerce.string().min(1),
  ENV: z.string().min(1),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("ENV ERRORS:");
  parsed.error.errors.forEach((error) => {
    console.error(` - ${error.path.join(", ")}: ${error.message}`);
  });
  process.exit(1);
}

export const Env = parsed.data;
