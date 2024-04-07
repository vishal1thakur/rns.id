import express from "express";
import * as dotenv from "dotenv";
import { connectToMongoDB } from "./database/index";
import medGasRouter from "./medgas/routes/medgas.routes";
import { runCron } from "./medgas/utils/scraper";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});

// MedGas routes
app.use("/medgas", medGasRouter);

connectToMongoDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            runCron();
        });
    })
    .catch(console.error);

export default app;
