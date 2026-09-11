'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: 'Mouse Pad Gamer RGB Extended 80x30cm',
    category: 'Gamer',
    price: 62.50,
    image: 'https://images.unsplash.com/photo-1616588589676-63b3bd497957?w=500&auto=format&fit=crop&q=60',
    description: 'Base em borracha antiderrapante, superfície em tecido micro-texturizado e iluminação LED RGB com diversos modos de luz.',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Suporte Ergonômico de Alumínio para Notebook',
    category: 'Escritório',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
    description: 'Design dobrável em liga de alumínio, melhora a postura e proporciona melhor refrigeração para o seu dispositivo.',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Kit de Chaves de Precisão e Solda para Placas',
    category: 'Suporte Técnico',
    price: 187.50,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
    description: 'Jogo completo de ferramentas para manutenção de smartphones, placas de circuitos e eletrônicos em geral.',
    rating: 4.7,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeBase64: string } | null>(null);

  const categories = ['Todos', 'Gamer', 'Escritório', 'Suporte Técnico'];

  const filteredProducts = productsData.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleGerarPix = async () => {
    try {
      const res = await fetch('/api/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const data = await res.json();
      if (data.qrCode) {
        setPixData({ qrCode: data.qrCode, qrCodeBase64: data.qrCodeBase64 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '15px' }}>
      {/* Cabeçalho */}
      <header style={{ maxWidth: '1000px', margin: '0 auto 20px auto', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '22px', color: '#111827', fontWeight: 'bold' }}>⚡ TechDrop Store</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', position: 'relative' }}
        >
          🛒 Carrinho ({cart.reduce((a, b) => a + b.quantity, 0)})
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Barra de Pesquisa */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Filtros de Categoria */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '5px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                backgroundColor: selectedCategory === cat ? '#2563eb' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#4b5563',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grade de Produtos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() => setSelectedProduct(product)}
                style={{ width: '100%', height: '180px', objectFit: 'cover', cursor: 'pointer' }}
              />
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 'bold' }}>{product.category}</span>
                <h2
                  onClick={() => setSelectedProduct(product)}
                  style={{ fontSize: '15px', margin: '6px 0', color: '#1f2937', cursor: 'pointer', height: '42px', overflow: 'hidden' }}
                >
                  {product.name}
                </h2>
                <div style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '10px' }}>⭐ {product.rating} / 5.0</div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>R$ {product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal do Detalhes do Produto */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '450px', width: '100%', padding: '20px', position: 'relative' }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
            <h2 style={{ fontSize: '18px', marginTop: '15px', color: '#1f2937' }}>{selectedProduct.name}</h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>{selectedProduct.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#059669' }}>R$ {selectedProduct.price.toFixed(2)}</span>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer do Carrinho / Checkout */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '400px', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>{isCheckout ? 'Finalizar Pedido (Pix)' : 'Seu Carrinho'}</h2>
              <button onClick={() => { setIsCartOpen(false); setIsCheckout(false); setPaymentSuccess(false); setPixData(null); }} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
            </div>

            {!isCheckout ? (
              <>
                <div style={{ flexGrow: 1, overflowY: 'auto', padding: '15px 0' }}>
                  {cart.length === 0 ? (
                    <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '40px' }}>Seu carrinho está vazio.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.product.name}</div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>
                            {item.quantity}x R$ {item.product.price.toFixed(2)}
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remover</button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                      <span>Total:</span>
                      <span style={{ color: '#059669' }}>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCheckout(true);
                        handleGerarPix();
                      }} 
                      style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                    >
                      Avançar para Pagamento
                    </button>
                  </div>
                )}
              </>
            ) : paymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <span style={{ fontSize: '50px' }}>✅</span>
                <h3 style={{ color: '#059669', marginTop: '10px' }}>Pagamento Confirmado!</h3>
                <p style={{ color: '#4b5563', fontSize: '14px' }}>Seu pedido foi processado e já está em preparação para envio.</p>
              </div>
            ) : (
              <div style={{ paddingTop: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 10px 0' }}>Escaneie o QR Code abaixo ou copie a chave Pix para pagar R$ {cartTotal.toFixed(2)}:</p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pixData?.qrCode || 'Gerando...')}`} 
                    alt="QR Code Pix" 
                    style={{ width: '180px', height: '180px', borderRadius: '8px' }} 
                  />
                </div>
                <div style={{ backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '8px', fontSize: '12px', wordBreak: 'break-all', fontFamily: 'monospace', marginBottom: '15px' }}>
                  {pixData?.qrCode || "Gerando chave Pix..."}
                </div>
                <button onClick={() => setPaymentSuccess(true)} style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto' }}>
                  Simular Confirmação de Pagamento
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
