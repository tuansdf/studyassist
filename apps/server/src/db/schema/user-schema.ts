import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userSchema = pgTable("_user", {
  id: bigserial({ mode: "number" }).primaryKey(),
  username: text("username").unique(),
  email: text("email"),
  password: text("password"),
  name: text("name"),
  status: text("status"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    precision: 3,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    precision: 3,
    mode: "date",
  })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
