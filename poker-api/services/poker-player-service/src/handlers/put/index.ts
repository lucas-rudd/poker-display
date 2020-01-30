import { Put, Response, Body, Route } from 'tsoa';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { IPokerPlayer } from '../../models';
import { PokerPlayerService } from '../../service';
import { resolve } from '@poker-api/container';
import { createRestHandler, RestHandler } from '@poker-api/base-handlers';
import { injectable } from 'inversify';

@Route()
@injectable()
export class PutPokerPlayerHandler {
    constructor(private readonly pokerPlayerService: PokerPlayerService) {}

    @Put('poker-player')
    @Response<IPokerPlayer>('201', 'Poker player created')
    public async putPokerPlayer(@Body() body: IPokerPlayer): Promise<IPokerPlayer> {
        if (!body || Object.keys(body).length === 0) {
            throw new Error('Must specify a request body');
        }
        const pokerPlayerResponse = await this.pokerPlayerService.putPokerPlayer(body);
        console.log(`poker player created`);
        return pokerPlayerResponse;
    }
}

export const putPokerPlayer = (e: APIGatewayEvent, ctx: Context) =>
    createRestHandler(e, ctx, async function(this: RestHandler) {
        this.ctx.callbackWaitsForEmptyEventLoop = false;
        try {
            const pokerPlayer = await resolve(PutPokerPlayerHandler).putPokerPlayer(this.getBody());
            return this.created(pokerPlayer);
        } catch (e) {
            return this.error(e);
        }
    });
