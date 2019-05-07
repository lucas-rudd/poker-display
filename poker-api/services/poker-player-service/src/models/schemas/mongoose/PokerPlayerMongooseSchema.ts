import * as mongoose from 'mongoose';

export const PokerPlayerMongooseSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    winnings: { type: Number, required: true },
    image: { type: String, required: false },
    country: { type: String, required: false }
});
