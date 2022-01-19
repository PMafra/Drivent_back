import dotenv from "dotenv";

const path = process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev";

dotenv.config({ path });
