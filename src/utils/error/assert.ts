export class ClientError extends Error {
}

export class ServerError extends Error {
}

function error(err: Error | ClientError | ServerError) {
    if (err) {
        throw err;
    }
}

function clientError(name: number, message: string = '') {
    const err = new ClientError(message);
    err.name = name.toString();
    return err;
}

function serverError(name: number, message: string = '') {
    const err = new ServerError(message);
    err.name = name.toString();
    return err;
}

export const ASSERT = {
    error,
    clientError,
    serverError
}