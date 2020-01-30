import { IPokerPlayer } from '../../models';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { createRestHandler, RestHandler } from '@poker-api/base-handlers';
import { PokerPlayerService } from '../../service';
import { Body, Delete, Route } from 'tsoa';
import { resolve } from '@poker-api/container';
import { injectable } from 'inversify';

@Route()
@injectable()
class DeletePokerPlayerHandler {
    constructor(private readonly pokerPlayerService: PokerPlayerService) {}

    @Delete('poker-player')
    public async deletePokerPlayer(@Body() body: IPokerPlayer): Promise<IPokerPlayer> {
        if (!body || Object.keys(body).length === 0) {
            throw new Error('Must specify a request body');
        }
        return await this.pokerPlayerService.deletePokerPlayer(body);
    }
}

export const deletePokerPlayer = (e: APIGatewayEvent, ctx: Context) =>
    createRestHandler(e, ctx, async function(this: RestHandler) {
        this.ctx.callbackWaitsForEmptyEventLoop = false;
        try {
            const body: IPokerPlayer = this.getBody<IPokerPlayer>();
            const pokerPlayerResponse = await resolve(DeletePokerPlayerHandler).deletePokerPlayer(this.getBody());
            if (pokerPlayerResponse) {
                console.log(`poker player deleted`);
                return this.accepted(pokerPlayerResponse);
            } else {
                return this.notFound(new Error(`Player with id ${body._id} not found.`));
            }
        } catch (e) {
            return this.error(e);
        }
    });
