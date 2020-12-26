export default class AppError {
    readonly message: string | string[];

    readonly statusCode: number;

    constructor(message: string | string[], statusCode = 400) {
        (this.message = message), (this.statusCode = statusCode);
    }
}
