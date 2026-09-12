import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ error: 'Token do Mercado Pago não configurado' }, { status: 500 });
    }

    // Chamada HTTP direta para a API do Mercado Pago (evita qualquer erro de importação de biblioteca)
    const mpResponse = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': Math.random().toString(),
      },
      body: JSON.stringify({
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
      }),
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error('Erro Mercado Pago API:', data);
      return NextResponse.json({ error: data.message || 'Erro ao gerar Pix' }, { status: 400 });
    }

    return NextResponse.json({
      id: data.id,
      qrCodeBase64: data.point_of_interaction?.transaction_data?.qr_code_base64,
      qrCode: data.point_of_interaction?.transaction_data?.qr_code,
    });
  } catch (error: any) {
    console.error('Erro interno:', error);
    return NextResponse.json({ error: 'Erro ao processar pagamento' }, { status: 500 });
  }
}
