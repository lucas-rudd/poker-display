import { Context, APIGatewayEvent } from 'aws-lambda';
import { resolve } from '@poker-api/container';
import { createRestHandler, RestHandler } from '@poker-api/base-handlers';
import { PutPokerPlayerHandler } from '../put';

export const postPokerPlayer = (e: APIGatewayEvent, ctx: Context) =>
    createRestHandler(e, ctx, async function(this: RestHandler) {
        this.ctx.callbackWaitsForEmptyEventLoop = false;
        try {
            const pokerPlayer = await resolve(PutPokerPlayerHandler).putPokerPlayer(this.getBody());
            return this.created(pokerPlayer);
        } catch (e) {
            return this.error(e);
        }
    });
