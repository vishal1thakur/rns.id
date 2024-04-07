import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export async function connectToMongoDB() {
    const dbUri = process.env.MONGO_URI || "";
    try {
        await mongoose.connect(dbUri, {
            dbName: "RNSID",
        });
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}
