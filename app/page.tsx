'use client';

import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Mouse Pad Gamer RGB Extended 80x30cm',
    category: 'Gamer',
    price: 62.50,
    image: 'https://images.unsplash.com/photo-1616588589676-63b3bd497957?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Suporte Ergonômico de Alumínio para Notebook',
    category: 'Escritório',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Kit de Chaves de Precisão e Solda para Placas',
    category: 'Suporte Técnico',
    price: 187.50,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Gamer', 'Escritório', 'Suporte Técnico'];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f4f5f7', minHeight: '100vh', padding: '20px' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto 30px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#111827', fontWeight: 'bold' }}>⚡ TechDrop Store</h1>
        <span style={{ fontSize: '14px', backgroundColor: '#e0e7ff', color: '#3730a3', padding: '6px 12px', borderRadius: '20px', fontWeight: '600' }}>Loja Oficial</span>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' }}>
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
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 'bold', marginBottom: '6px' }}>{product.category}</span>
                <h2 style={{ fontSize: '16px', margin: '0 0 12px 0', color: '#1f2937', lineHeight: '1.4' }}>{product.name}</h2>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>R$ {product.price.toFixed(2)}</span>
                  <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
