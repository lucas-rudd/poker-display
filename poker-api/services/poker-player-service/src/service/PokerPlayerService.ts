import 'reflect-metadata';
import { MongoDBClient } from '../database';
import { PokerPlayer, SortingOptions, IPokerPlayer} from "../models";
import { injectable } from 'inversify';

@injectable()
export class PokerPlayerService {
    constructor(private readonly db: MongoDBClient) {}
    public async getPokerPlayers(sortingOptions: SortingOptions = { sortField: '', order: '' }) {
        const { sortField, order } = sortingOptions;
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log('database initalized');
            return await PokerPlayer.find().sort({[sortField]: order});
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    public async putPokerPlayer(pokerPlayer: IPokerPlayer) {
        try {
            console.log('initalizing database');
            await this.db.init();
            console.log('database initalized');
            console.log(`attempting to create/modify poker player ${pokerPlayer}`);
            return PokerPlayer.findOneAndUpdate({ _id: pokerPlayer._id }, { $set: pokerPlayer }, {
                new: true,
                upsert: true
            }).then((result) => {
                console.log(result);
                return result;
            }).catch((err) => {
                console.log(err);
                throw err;
            })
        } catch(err) {
            console.log(err);
            throw err;
        }

    }

}