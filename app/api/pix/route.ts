import { NextResponse } from 'next/server';
import MercadoPagoConfig, { Payment } from 'mercadopago';


const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const payment = new Payment(client);

    const response = await payment.create({
      body: {
        transaction_amount: Number(amount),
        description: 'Pedido TechDrop',
        payment_method_id: 'pix',
        payer: {
          email: 'cliente@teste.com',
          first_name: 'Cliente',
          last_name: 'TechDrop',
          identification: {
            type: 'CPF',
            number: '19119119119',
          },
        },
      },
    });

    return NextResponse.json({
      id: response.id,
      qrCodeBase64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      qrCode: response.point_of_interaction?.transaction_data?.qr_code,
    });
  } catch (error: any) {
    console.error('Erro Mercado Pago:', error);
    return NextResponse.json({ error: error.message || 'Erro ao gerar Pix' }, { status: 500 });
  }
}
