import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    usePlural: true, // if your table names are plural (e.g. users, accounts)
    schema,
  }),
  user: {
    modelName: "usersTable", // your users table name
  },
  session: {
    modelName: "sessionsTable", // your sessions table name
  },
  account: {
    modelName: "accountsTable", // your accounts table name
  },
  verification: {
    modelName: "verificationsTable", // your verification table name
  },
  emailAndPassword: {
    enabled: true,
  },
});
