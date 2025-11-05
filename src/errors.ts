export class CeloraError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'CeloraError';
    }
}
