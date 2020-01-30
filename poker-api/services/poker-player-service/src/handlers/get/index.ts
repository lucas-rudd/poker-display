import { injectable } from 'inversify';
import { Route, Get, Query } from 'tsoa';
import { PokerPlayerService } from '../../service';
import { SortingOptions, QueryOptions, IPokerPlayer } from '../../models';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { RestHandler, createRestHandler } from '@poker-api/base-handlers';
import { resolve } from '@poker-api/container';

@Route()
@injectable()
class GetPokerPlayerHandler {
    constructor(private readonly pokerPlayerService: PokerPlayerService) {}

    @Get('poker-players')
    public async getPokerPlayers(
        @Query('sortField') sortField?: string,
        @Query('order') order?: string,
        @Query('queryField') queryField?: string,
        @Query('query') query?: string
    ): Promise<IPokerPlayer[]> {
        let sortQuery = {} as SortingOptions;
        let findQuery = {} as QueryOptions;
        if (order && sortField) {
            sortQuery = { order, sortField };
        }
        if (query && queryField) {
            findQuery = { query, queryField };
        }
        const pokerPlayers = await this.pokerPlayerService.getPokerPlayers(findQuery, sortQuery);
        return pokerPlayers;
    }
}

export const getPokerPlayers = (e: APIGatewayEvent, ctx: Context) =>
    createRestHandler(e, ctx, async function(this: RestHandler) {
        this.ctx.callbackWaitsForEmptyEventLoop = false;
        const sortingOptions: SortingOptions = this.getQueryStringParameters();
        const queryOptions: QueryOptions = this.getQueryStringParameters();
        try {
            const pokerPlayers = await resolve(GetPokerPlayerHandler).getPokerPlayers(
                sortingOptions.sortField,
                sortingOptions.order,
                queryOptions.queryField,
                queryOptions.query
            );
            return this.ok(pokerPlayers);
        } catch (e) {
            return this.error(e);
        }
    });
