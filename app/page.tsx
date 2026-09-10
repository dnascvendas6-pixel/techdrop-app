'use client';

import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  category: string;
  selling_price: number;
  cost_price: number;
  image_url: string;
}

const mockProducts: Product[] = [
  { id: '1', title: 'Mouse Pad Gamer RGB Extended 80x30cm', category: 'Gamer', selling_price: 62.50, cost_price: 25.00, image_url: 'https://via.placeholder.com/200' },
  { id: '2', title: 'Suporte Ergonômico de Alumínio para Notebook', category: 'Escritório', selling_price: 90.00, cost_price: 40.00, image_url: 'https://via.placeholder.com/200' },
  { id: '3', title: 'Kit de Chaves de Precisão e Solda para Placas', category: 'Suporte Técnico', selling_price: 187.50, cost_price: 85.00, image_url: 'https://via.placeholder.com/200' }
];

export default function StoreFront() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Gamer', 'Escritório', 'Suporte Técnico'];

  const filteredProducts = selectedCategory === 'Todos'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-400">TechDrop Store</h1>
        <nav className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-full h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center text-slate-500">
                [Imagem: {product.title}]
              </div>
              <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-1 rounded">
                {product.category}
              </span>
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-green-400">
                R$ {product.selling_price.toFixed(2)}
              </span>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Comprar Agora
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
