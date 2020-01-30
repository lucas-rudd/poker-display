import * as mongoose from 'mongoose';
import { PokerPlayerMongooseSchema } from './schemas';

export interface IPokerPlayer {
    _id: string;
    fistName: string;
    lastName: string;
    winnings: number;
    image: string;
    country: string;
}

export type PokerPlayerDocument = mongoose.Document & IPokerPlayer;

export const PokerPlayer = mongoose.model<PokerPlayerDocument>('PokerPlayer', PokerPlayerMongooseSchema);
