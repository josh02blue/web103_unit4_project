import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

const createCarsTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price VARCHAR(255) NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            exteriorImage VARCHAR(1024) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            wheelsImage VARCHAR(1024) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            roofImage VARCHAR(1024) NOT NULL,
            interior VARCHAR(255) NOT NULL,
            interiorImage VARCHAR(1024) NOT NULL
        )
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 cars table created successfully");
  } catch (err) {
    console.error("⚠️ error creating cars table", err);
  }
};

// Run the table creation
createCarsTable().then(() => {
  console.log("Database setup complete!");
  process.exit(0);
}).catch((err) => {
  console.error("Database setup failed:", err);
  process.exit(1);
});
