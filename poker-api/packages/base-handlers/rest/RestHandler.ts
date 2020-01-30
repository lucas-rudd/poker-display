import { APIGatewayEvent, Callback, Context, APIGatewayProxyResult } from 'aws-lambda';

export abstract class RestHandler {
    private readonly defaultHeaders: {} = {
        'Access-Control-Allow-Headers': 'X-Requested-With, X-Api-Client, X-Api-Client-version',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
    };

    constructor(
        protected readonly e: APIGatewayEvent,
        protected readonly ctx: Context,
        protected readonly cb?: Callback
    ) {}

    protected ok<T>(body?: T, headers?: object): APIGatewayProxyResult {
        return this.respond(200, body, headers);
    }

    protected created<T>(body: T, headers?: object): APIGatewayProxyResult {
        return this.respond(201, body, headers);
    }

    protected accepted<T>(body?: T, headers?: object): APIGatewayProxyResult {
        return this.respond(202, body, headers);
    }

    protected notFound(error: Error, headers?: object): APIGatewayProxyResult {
        return this.respond(404, { error: error.message }, headers);
    }

    protected error(error: Error, headers?: object): APIGatewayProxyResult {
        return this.respond(500, { error: error.message }, headers);
    }

    protected getBody<T>(): T {
        try {
            const body = this.e.body && this.e.body.length ? this.e.body : '{}';
            return JSON.parse(body) as T;
        } catch (error) {
            throw Error('Invalid request body format.');
        }
    }

    protected getHeaders<T extends { [name: string]: string }>(): T {
        return this.e.headers as T;
    }

    protected getPathParameters<T extends { [name: string]: string }>(): T {
        const pathParameters: { [name: string]: string } = {};
        if (this.e.pathParameters) {
            Object.keys(this.e.pathParameters).forEach(k => {
                pathParameters[k] = decodeURIComponent(this.e.pathParameters![k]);
            });
        }
        return pathParameters as T;
    }

    protected getQueryStringParameters<T extends { [name: string]: string }>(): T {
        const queryStringParameters: { [name: string]: string } = {};
        if (this.e.queryStringParameters) {
            Object.keys(this.e.queryStringParameters).forEach(k => {
                queryStringParameters[k] = decodeURIComponent(this.e.queryStringParameters![k]);
            });
        }
        return queryStringParameters as T;
    }

    protected respond<T>(statusCode: number, body?: T, headers?: object): APIGatewayProxyResult {
        return {
            statusCode,
            headers: { ...this.defaultHeaders, ...headers },
            body: JSON.stringify(body)
        };
    }
}
