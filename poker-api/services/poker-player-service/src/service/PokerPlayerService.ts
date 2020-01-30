import 'reflect-metadata';
import { MongoDBClient } from '../database';
import { PokerPlayer, SortingOptions, IPokerPlayer, QueryOptions } from '../models';
import { injectable } from 'inversify';

@injectable()
export class PokerPlayerService {
    constructor(private readonly db: MongoDBClient) {}

    public async getPokerPlayers(
        queryOptions: QueryOptions = { queryField: '', query: '' },
        sortingOptions: SortingOptions = { sortField: '', order: '' }
    ): Promise<IPokerPlayer[]> {
        const { sortField, order } = sortingOptions;
        const { queryField, query } = queryOptions;
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log('finding poker player');
            return await PokerPlayer.find({ [<string>queryField]: query }).sort({ [<string>sortField]: order });
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

    public async deletePokerPlayer(pokerPlayer: IPokerPlayer): Promise<IPokerPlayer> {
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log(`attempting to delete poker player ${pokerPlayer}`);
            const deletedPokerPlayer = await PokerPlayer.findOneAndDelete({ _id: pokerPlayer._id });
            if (!deletedPokerPlayer) {
                throw new Error('NOT FOUND');
            } else {
                return deletedPokerPlayer;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
