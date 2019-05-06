import { APIGatewayEvent, Callback, Context, ProxyResult } from 'aws-lambda';

export abstract class RestHandler {
    protected e: APIGatewayEvent;
    protected ctx: Context;
    protected cb: Callback;
    private defaultHeaders: {} = {
        'Access-Control-Allow-Headers': 'X-Requested-With, X-Api-Client, X-Api-Client-version',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
    };

    constructor(e: APIGatewayEvent, ctx: Context, cb: Callback) {
        this.e = e;
        this.ctx = ctx;
        this.cb = cb;
    }

    protected ok(body?: {}): void {
        this.cb(null, this.respond(200, body));
    }

    protected created(body: {}): void {
        this.cb(null, this.respond(201, body));
    }

    protected accepted(body?: {}): void {
        this.cb(null, this.respond(202, body));
    }

    protected notFound(error: Error): void {
        this.cb(null, this.respond(404, { error: error.message }));
    }

    protected error(error: Error): void {
        this.cb(null, this.respond(500, { error: error.message }));
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

    protected respond(statusCode: number, body?: {}): ProxyResult {
        return {
            statusCode,
            headers: this.defaultHeaders,
            body: JSON.stringify(body)
        };
    }
}
