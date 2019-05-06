import { resolve } from '@poker-api/container';
import { RestHandler } from '@poker-api/base-handlers';
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import { PokerPlayerService } from '../service';
import { SortingOptions } from '../models';
import {IPokerPlayer} from "../models/PokerPlayer";

class PokerPlayerHandler extends RestHandler {

    constructor(e: APIGatewayEvent, ctx: Context, cb: Callback) {
        super(e, ctx, cb);
        this.ctx.callbackWaitsForEmptyEventLoop = false;
    }

    public async getPokerPlayers() {
        const sortingOptions: SortingOptions = this.getQueryStringParameters();
        let sortQuery = {} as SortingOptions;
        if(sortingOptions && sortingOptions.order && sortingOptions.sortField) {
            sortQuery = sortingOptions;
        }
        try {
            const pokerPlayers = await this.pokerPlayerService.getPokerPlayers(sortQuery);
            this.ok(pokerPlayers);
        } catch(e) {
            this.error(e);
        }
    }

    public async putPokerPlayer() {
        try {
            const body: IPokerPlayer = this.getBody<IPokerPlayer>();
            if(!body || Object.keys(body).length === 0) {
                this.error(new Error('Must specify a request body'));
            }
            const pokerPlayerResponse = await this.pokerPlayerService.putPokerPlayer(body);
            console.log(`poker player created`);
            this.created(pokerPlayerResponse)
        } catch(e) {
            this.error(e);
        }
    }

    private get pokerPlayerService(): PokerPlayerService {
        return resolve<PokerPlayerService>(PokerPlayerService);
    }

}

export const getPokerPlayers = (e : APIGatewayEvent, ctx : Context, cb : Callback) => {
    return new PokerPlayerHandler(e, ctx, cb).getPokerPlayers();
}

export const putPokerPlayer = (e: APIGatewayEvent, ctx: Context, cb: Callback) => {
    return new PokerPlayerHandler(e, ctx, cb).putPokerPlayer();
}