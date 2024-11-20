import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Plus } from 'lucide-react';

const Products = () => {
  const sidebarOpen = useSelector((state: RootState) => state.dashboard.sidebarOpen);

  const products = [
    { id: 1, name: 'Premium Laptop', price: 1299, stock: 45, category: 'Electronics' },
    { id: 2, name: 'Wireless Headphones', price: 199, stock: 82, category: 'Audio' },
    { id: 3, name: 'Smart Watch', price: 299, stock: 28, category: 'Wearables' },
    { id: 4, name: 'Gaming Mouse', price: 79, stock: 124, category: 'Accessories' },
  ];

  return (
    <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
      <div className="p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Management</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <Plus size={20} />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Price</span>
                <span className="font-medium">${product.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Stock</span>
                <span className="font-medium">{product.stock} units</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Category</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100">
                  Edit
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;