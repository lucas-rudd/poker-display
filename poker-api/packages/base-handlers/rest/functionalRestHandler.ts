import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { RestHandler } from './RestHandler';

export const createRestHandler = (
    event: APIGatewayProxyEvent,
    context: Context,
    handler: (...args: any[]) => Promise<APIGatewayProxyResult>
) => {
    class Handler extends RestHandler {}
    const restLambdaHandler = new Handler(event, context);
    return handler.call(restLambdaHandler);
};
