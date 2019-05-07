import { resolve } from '@poker-api/container';
import { RestHandler } from '@poker-api/base-handlers';
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import { PokerPlayerService } from '../service';
import { SortingOptions } from '../models';
import { IPokerPlayer } from '../models/PokerPlayer';
import {QueryOptions} from "../models/QueryOptions";

class PokerPlayerHandler extends RestHandler {
    constructor(e: APIGatewayEvent, ctx: Context, cb: Callback) {
        super(e, ctx, cb);
        this.ctx.callbackWaitsForEmptyEventLoop = false;
    }

    public async getPokerPlayers(): Promise<void> {
        const sortingOptions: SortingOptions = this.getQueryStringParameters();
        const queryOptions: QueryOptions = this.getQueryStringParameters();
        let sortQuery = {} as SortingOptions;
        let findQuery = {} as QueryOptions;
        if (sortingOptions && sortingOptions.order && sortingOptions.sortField) {
            sortQuery = sortingOptions;
        }
        if (queryOptions && queryOptions.query && queryOptions.queryField) {
            findQuery = queryOptions;
        }
        try {
            const pokerPlayers = await this.pokerPlayerService.getPokerPlayers(findQuery, sortQuery);
            this.ok(pokerPlayers);
        } catch (e) {
            this.error(e);
        }
    }

    // public async getPokerPlayer(): Promise<void> {
    //     try {
    //         const { id } = this.getPathParameters();
    //         const pokerPlayer: IPokerPlayer = await this.pokerPlayerService.getPokerPlayer(id);
    //         this.ok(pokerPlayer);
    //     } catch (e) {
    //         this.error(e);
    //     }
    // }

    public async putPokerPlayer(): Promise<void> {
        try {
            const body: IPokerPlayer = this.getBody<IPokerPlayer>();
            if (!body || Object.keys(body).length === 0) {
                this.error(new Error('Must specify a request body'));
            }
            const pokerPlayerResponse = await this.pokerPlayerService.putPokerPlayer(body);
            console.log(`poker player created`);
            this.created(pokerPlayerResponse);
        } catch (e) {
            this.error(e);
        }
    }

    public async deletePokerPlayer(): Promise<void> {
        try {
            const body: IPokerPlayer = this.getBody<IPokerPlayer>();
            if (!body || Object.keys(body).length === 0) {
                this.error(new Error('Must specify a request body'));
            }
            const pokerPlayerResponse = await this.pokerPlayerService.deletePokerPlayer(body);
            if (pokerPlayerResponse) {
                console.log(`poker player deleted`);
                this.accepted(pokerPlayerResponse);
            } else {
                this.notFound(new Error(`Player with id ${body._id} not found.`));
            }
        } catch (e) {
            this.error(e);
        }
    }

    private get pokerPlayerService(): PokerPlayerService {
        return resolve<PokerPlayerService>(PokerPlayerService);
    }
}

export const getPokerPlayers = (e: APIGatewayEvent, ctx: Context, cb: Callback) => {
    return new PokerPlayerHandler(e, ctx, cb).getPokerPlayers();
};

export const putPokerPlayer = (e: APIGatewayEvent, ctx: Context, cb: Callback) => {
    return new PokerPlayerHandler(e, ctx, cb).putPokerPlayer();
};

export const deletePokerPlayer = (e: APIGatewayEvent, ctx: Context, cb: Callback) => {
    return new PokerPlayerHandler(e, ctx, cb).deletePokerPlayer();
};
