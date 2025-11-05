## @celora/sdk

A lightweight and fully-typed TypeScript SDK for interacting with the **Celora Payment API**.  
This package provides an easy and reliable way to create payments and check their finalization status.

---

## Features

- Clean and minimal OOP architecture  
- Written entirely in TypeScript  
- Secure API key handling  
- Fully typed responses and requests  
- No external dependencies  

---

## Installation

```bash
npm install @celora/sdk
```

or

```bash
yarn add @celora/sdk
```

---

## Initialization

Import and initialize the SDK with your API key and base API URL.

```ts
import { Celora } from '@celora/sdk';

const celora = new Celora('YOUR_API_KEY', 'https://api.celora.com');
```

---

## Create a Payment

The `createPayment` method creates a new payment session and returns a `paymentAddr` (the address to which the user should send funds).

```ts
const paymentAddress = await celora.createPayment({
  token: 'USDC',
  amount: '50',
  currency: 'usd',
  descriptions: 'Test purchase',
  isTransferFiat: false,
  redirectUrl: 'https://example.com/payment-success/:address'
});

console.log('Payment address:', paymentAddress);
```

### Response Example

The API returns the following structure:

```json
{
  "message": "Get payment successfully",
  "result": {
    "amount": "50",
    "currency": "usd",
    "finalized": false,
    "isTransfer": false,
    "redirectUrl": "https://example.com/payment-success",
    "expiredTime": 1730795400000,
    "descriptions": "Test purchase",
    "initialAmount": "50",
    "isTransferFiat": false,
    "depositedAmount": 0,
    "user": "653bd2c9e9a...",
    "token": "USDC",
    "status": "pending",
    "invoiceId": "INV-00001",
    "paymentAddr": "0x123456..."
  }
}
```

You only need to use `paymentAddr` from the result.

---

## Check Payment Finalization

The `checkFinalize` method allows you to verify whether a payment is completed.

```ts
const finalized = await celora.checkFinalize(paymentAddr);
console.log('Is payment finalized:', finalized);
```

This method returns a boolean:

* `true` if the payment has been finalized
* `false` if the payment is still pending

It is recommended to **create a route in your backend** (for example `/check-payment/:address`) and use this function there to securely check the payment status for your users.

---

## Types

### CreatePaymentBody

```ts
{
  token: string;
  amount: string;
  currency: string;
  descriptions: string;
  isTransferFiat: boolean;
  redirectUrl: string;
}
```

### IPayment

```ts
{
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
```

---

## Best Practices

* Never expose your API key in frontend code. Always use it on the backend.
* Always verify payment finalization on your server before confirming an order or providing access.
* Use HTTPS for all redirect URLs to ensure security.
* Store `paymentAddr` and `invoiceId` in your database for tracking and verification.

---

## Example Workflow

1. Initialize the SDK using your API key and base URL.
2. Call `createPayment` to generate a new payment address.
3. Display the returned address to the user or redirect them to the payment page.
4. Create a backend route for checking payment status.
5. Inside that route, use `checkFinalize(address)` to confirm whether the payment has been completed.
6. Once finalized, update your database or mark the payment as complete.


```
