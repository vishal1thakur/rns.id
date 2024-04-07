import { Request, Response } from "express";
import { MedGas } from "../model/medgas.model";
import { EType } from "../store/enum/type.enum";
import { savePricingData } from "../utils/scraper";
// Function to get all MedGas documents
export async function getAllMedGas(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";

        const skip = (page - 1) * pageSize;

        const sort: any =
            sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };

        const medGasList = await MedGas.find({})
            .skip(skip)
            .limit(pageSize)
            .sort(sort);
        const lastCronEntry = await MedGas.findOne({ type: EType.CRON }).sort({
            createdAt: -1,
        });

        const totalCount = await MedGas.countDocuments();

        res.json({
            data: medGasList,
            totalCount,
            lastCronEntry,
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

// Function to create a new MedGas document
export async function currentMedGasEntry(req: Request, res: Response) {
    try {
        // Create a new MedGas document
        const newMedGas = await savePricingData(EType.USER);
        // Respond back with the created document
        console.log(newMedGas);
        res.status(201).json(newMedGas);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}
