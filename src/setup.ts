import dotenv from "dotenv";

const path = process.env.NODE_ENV === "test" ? ".env.dev" : ".env.dev";

dotenv.config({ path });
