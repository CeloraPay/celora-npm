export interface CreatePaymentBody {
    token: string;
    amount: string;
    currency: string;
    descriptions: string;
    isTransferFiat: boolean;
    redirectUrl: string;
}

export interface IPayment {
    amount: string;
    currency: string;
    finalized: boolean;
    isTransfer: boolean;
    redirectUrl: string;
    expiredTime: number;
    descriptions: string;
    initialAmount: string;
    isTransferFiat: boolean;
    depositedAmount: number;
    user: string;
    token: string;
    status: 'pending' | 'completed' | 'expired' | 'cancelled';
    invoiceId: string;
    paymentAddr: string;
}

export interface ApiResponse<T> {
    message: string;
    result: T;
}
