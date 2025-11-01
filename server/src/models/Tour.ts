import mongoose, { Document, Schema } from "mongoose";

export interface ITour extends Document {
    title: string;
    description: string;
    location: string;
    price: number;
    duration: string;
    images: string[];
    maxGroupSize: number;
    availableDates: Date[];
    createdBy: Schema.Types.ObjectId;
}

const tourSchema = new Schema<ITour>({
    title: { type: String, required: true },
    description: String,
    location: String,
    price: Number,
    duration: String,
    images: [String],
    maxGroupSize: Number,
    availableDates: [Date],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model<ITour>('Tour', tourSchema);