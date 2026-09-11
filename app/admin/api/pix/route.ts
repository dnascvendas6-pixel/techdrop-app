import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { amount, email, firstName, lastName, identificationNumber } = await request.json();

    const payment = new Payment(client);

    const response = await payment.create({
      body: {
        transaction_amount: Number(amount),
        description: 'Pedido TechDrop',
        payment_method_id: 'pix',
        payer: {
          email,
          first_name: firstName,
          last_name: lastName,
          identification: {
            type: 'CPF',
            number: identificationNumber,
          },
        },
      },
    });

    return NextResponse.json({
      id: response.id,
      qrCodeBase64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      qrCodeCopyPaste: response.point_of_interaction?.transaction_data?.qr_code,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gerar Pix' }, { status: 500 });
  }
}
