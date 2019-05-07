import 'reflect-metadata';
import { MongoDBClient } from '../database';
import { PokerPlayer, SortingOptions, IPokerPlayer } from '../models';
import { injectable } from 'inversify';

@injectable()
export class PokerPlayerService {
    constructor(private readonly db: MongoDBClient) {}

    public async getPokerPlayers(
        sortingOptions: SortingOptions = { sortField: '', order: '' }
    ): Promise<IPokerPlayer[]> {
        const { sortField, order } = sortingOptions;
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log('finding poker player');
            return await PokerPlayer.find().sort({ [<string>sortField]: order });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async putPokerPlayer(pokerPlayer: IPokerPlayer): Promise<IPokerPlayer> {
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log(`attempting to create/modify poker player ${pokerPlayer}`);
            return await PokerPlayer.findOneAndUpdate(
                { _id: pokerPlayer._id },
                { $set: pokerPlayer },
                {
                    new: true,
                    upsert: true
                }
            );
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async deletePokerPlayer(pokerPlayer: IPokerPlayer): Promise<IPokerPlayer | null> {
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log(`attempting to delete poker player ${pokerPlayer}`);
            return await PokerPlayer.findOneAndDelete({ _id: pokerPlayer._id });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
