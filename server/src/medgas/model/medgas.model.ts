import mongoose, { Schema } from "mongoose";
import { EType } from "../store/enum/type.enum";

export interface IMedGas extends Document {
    createdAt: Date;
    nAVAXPrice: string;
    usdPrice: string;
    type: EType;
}

export const medgasSchema: Schema = new Schema<IMedGas>({
    createdAt: {
        type: Date,
        required: true,
    },
    nAVAXPrice: {
        type: String,
        required: true,
    },
    usdPrice: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: EType,
        required: true,
    },
});

export const MedGas = mongoose.model<IMedGas>("MedGas", medgasSchema);
