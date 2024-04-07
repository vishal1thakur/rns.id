import * as express from "express";

import {
    getAllMedGas,
    currentMedGasEntry,
} from "../controller/medgas.controller";

const medGasRouter = express.Router();

medGasRouter.get("/getAll", getAllMedGas);
medGasRouter.get("/fetchCurrent", currentMedGasEntry);

export default medGasRouter;
