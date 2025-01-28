import { drizzle } from "drizzle-orm/node-postgres";
import { Env } from "../constants/env.js";

export const db = drizzle(Env.DB_URL);
