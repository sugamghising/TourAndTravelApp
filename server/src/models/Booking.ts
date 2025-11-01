import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
    user: Schema.Types.ObjectId;
    tour: Schema.Types.ObjectId;
    date: Date;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'paid' | 'unpaid';
}

const bookingSchema = new Schema<IBooking>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tour: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);