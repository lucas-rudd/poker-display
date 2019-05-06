import * as mongoose from 'mongoose'
import { PokerPlayerMongooseSchema } from './schemas'


export interface IPokerPlayer extends mongoose.Document {
    _id: string;
    fistName: string;
    lastName: string;
    winnings: number;
    image: string;
    country: string;
}


export const PokerPlayer = mongoose.model<IPokerPlayer>("PokerPlayer", PokerPlayerMongooseSchema);

