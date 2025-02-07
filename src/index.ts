// src/index.ts
import "reflect-metadata"; // Ensure this is imported first
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Optionally, you can perform some operations after initialization
    // For example, insert a new user or run queries
  })
  .catch((error) => console.error("Error during Data Source initialization", error));
