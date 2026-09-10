'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  // Estado inicial dos produtos
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Mouse Pad Gamer RGB Extended 80x30cm',
      category: 'Gamer',
      price: 62.50,
      image: 'https://images.unsplash.com/photo-1616588589676-63b3bd497957?w=500&auto=format&fit=crop&q=60',
      description: 'Base em borracha antiderrapante e iluminação LED RGB.',
    },
    {
      id: 2,
      name: 'Suporte Ergonômico de Alumínio para Notebook',
      category: 'Escritório',
      price: 90.00,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
      description: 'Design dobrável em liga de alumínio.',
    },
  ]);

  // Formulário de novo produto
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Gamer',
    price: '',
    image: '',
    description: '',
  });

  // Lista simulada de pedidos recebidos
  const [orders] = useState([
    { id: 'ORD-9081', client: 'João Silva', total: 152.50, status: 'Pago (Pix)', date: '10/09/2026' },
    { id: 'ORD-9082', client: 'Maria Oliveira', total: 90.00, status: 'Aguardando Pagamento', date: '10/09/2026' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta! Tente novamente.');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    const createdProduct: Product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      description: newProduct.description,
    };

    setProducts([createdProduct, ...products]);
    setNewProduct({ name: '', category: 'Gamer', price: '', image: '', description: '' });
    alert('Produto cadastrado com sucesso!');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Deseja realmente remover este produto?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '360px', width: '100%' }}>
          <h2 style={{ marginTop: 0, fontSize: '20px', color: '#111827', textAlign: 'center' }}>🔒 Painel do Administrador</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', marginBottom: '20px' }}>Digite a senha para acessar a gestão da loja.</p>
          <input
            type="password"
            placeholder="Senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '15px', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Entrar no Painel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto 20px auto', backgroundColor: '#1e293b', color: '#fff', padding: '15px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>⚙️ TechDrop Admin</h1>
        <button onClick={() => setIsAuthenticated(false)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
          Sair
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Abas de Navegação */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 'products' ? '#2563eb' : '#e5e7eb', color: activeTab === 'products' ? '#fff' : '#374151' }}
          >
            📦 Produtos ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 'orders' ? '#2563eb' : '#e5e7eb', color: activeTab === 'orders' ? '#fff' : '#374151' }}
          >
            📋 Pedidos ({orders.length})
          </button>
        </div>

        {activeTab === 'products' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            {/* Formulário de Cadastro */}
            <form onSubmit={handleAddProduct} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: 'fit-content' }}>
              <h3 style={{ marginTop: 0, fontSize: '16px', color: '#111827' }}>Novo Produto</h3>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Nome do Produto</label>
                <input
                  type="text"
                  placeholder="Ex: Teclado Mecânico"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Categoria</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
                >
                  <option value="Gamer">Gamer</option>
                  <option value="Escritório">Escritório</option>
                  <option value="Suporte Técnico">Suporte Técnico</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="99.90"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>URL da Imagem</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>Descrição</label>
                <textarea
                  placeholder="Detalhes do produto..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box', height: '60px' }}
                />
              </div>
              <button type="submit" style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Cadastrar Produto
              </button>
            </form>

            {/* Lista de Produtos Cadastrados */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0, fontSize: '16px', color: '#111827' }}>Produtos Ativos</h3>
              {products.map((product) => (
                <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px', marginBottom: '12px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {product.category} • <strong style={{ color: '#059669' }}>R$ {product.price.toFixed(2)}</strong>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteProduct(product.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Lista de Pedidos */
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, fontSize: '16px', color: '#111827' }}>Pedidos Recebidos</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#4b5563' }}>
                  <th style={{ padding: '8px' }}>ID</th>
                  <th style={{ padding: '8px' }}>Cliente</th>
                  <th style={{ padding: '8px' }}>Data</th>
                  <th style={{ padding: '8px' }}>Total</th>
                  <th style={{ padding: '8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '10px 8px' }}>{order.client}</td>
                    <td style={{ padding: '10px 8px', color: '#6b7280' }}>{order.date}</td>
                    <td style={{ padding: '10px 8px', fontWeight: 'bold', color: '#059669' }}>R$ {order.total.toFixed(2)}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{ backgroundColor: order.status.includes('Pago') ? '#dcfce7' : '#fef3c7', color: order.status.includes('Pago') ? '#166534' : '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
