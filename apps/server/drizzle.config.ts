import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { Env } from "./src/constants/env.js";

export default defineConfig({
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: Env.DB_URL,
  },
});
