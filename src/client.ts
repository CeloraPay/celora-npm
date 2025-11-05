import { request } from './utils/request';
import { CreatePaymentBody, IPayment, ApiResponse } from './types';

export class Celora {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async createPayment(body: CreatePaymentBody): Promise<string> {
        const data = await request<ApiResponse<IPayment>>(
            `${this.baseUrl}/payments`,
            'POST',
            { 'apiKey': this.apiKey },
            body
        );

        return data.result.paymentAddr;
    }

    async checkFinalize(address: string): Promise<boolean> {
        const data = await request<ApiResponse<IPayment>>(
            `${this.baseUrl}/payments/${address}`,
            'GET',
            { 'apiKey': this.apiKey }
        );

        return data.result.finalized;
    }
}
