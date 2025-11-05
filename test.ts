import { Celora } from './src/client';

const celora = new Celora('caea25f2677f81de007a8f32200aa58995e33751b0ab22e5f56a221afd5418a0', 'http://localhost:5000');

async function main() {
    // const paymentAddr = await celora.createPayment({
    //     token: 'USDC',
    //     amount: '0.9',
    //     currency: 'usd',
    //     descriptions: 'Purchase test',
    //     isTransferFiat: false,
    //     redirectUrl: 'https://example.com/success'
    // });

    // console.log('Payment Address:', paymentAddr);

    const finalized = await celora.checkFinalize("0xfc66847d781c848e964D9ecb8d3F3fe0AAc9d9Ea");
    console.log('Is Finalized:', finalized);
}

main();
