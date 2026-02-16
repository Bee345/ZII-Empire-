
import React, { useState, useMemo } from 'react';
import { UserRole, Product, CartItem } from '../types';
import { STYLE_CATEGORIES } from '../constants';

interface MarketplaceProps {
  role: UserRole;
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  onCheckout: (payment: string, address: string) => void;
  onAddProduct: (p: Product) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ 
  role, products, cart, wishlist, onAddToCart, onToggleWishlist, onRemoveFromCart, onCheckout, onAddProduct 
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: STYLE_CATEGORIES[0], description: '', image: '' });
  const [checkoutData, setCheckoutData] = useState({ address: '', payment: 'Card' });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!p.isApproved && role !== UserRole.ADMIN) return false;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, products, role]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Product = {
      ...newProduct,
      id: `P-${Date.now()}`,
      reviews: [],
      isApproved: false,
      creatorId: 'current'
    };
    onAddProduct(p);
    setShowAddProduct(false);
    alert("Item submitted for Admin Approval!");
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">Empire Marketplace</h1>
          <p className="text-gray-500">Premium African craftsmanship curated for the world.</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <input 
            type="text" placeholder="Search designs..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-5 py-3 border border-gray-100 bg-white rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-900"
          />
          {(role === UserRole.MAKER || role === UserRole.WORKER) && (
            <button onClick={() => setShowAddProduct(true)} className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">Sell Item</button>
          )}
          <button onClick={() => setShowCart(true)} className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm relative">
            <span className="text-xl">🛒</span>
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{cart.length}</span>}
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-3 pb-8 no-scrollbar">
        {['All', ...STYLE_CATEGORIES].map(cat => (
          <button 
            key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-blue-900 text-white shadow-md' : 'bg-white border border-gray-100 text-gray-500 hover:border-blue-900'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(p => (
          <div key={p.id} className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={p.image || 'https://picsum.photos/400/500?random='+p.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              {!p.isApproved && <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">PENDING</span>}
              <button onClick={() => onToggleWishlist(p.id)} className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${wishlist.includes(p.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-red-500'}`}>
                {wishlist.includes(p.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-blue-900 uppercase mb-1 tracking-widest">{p.category}</p>
                <h3 className="font-bold text-gray-900 mb-2 leading-tight h-10 overflow-hidden">{p.name}</h3>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-blue-900">${p.price}</span>
                <button onClick={() => onAddToCart(p)} className="bg-gray-900 text-white p-3 rounded-2xl hover:bg-blue-900 shadow-xl transition-all">🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 opacity-30">
          <p className="text-6xl mb-4">🏜️</p>
          <p className="text-xl font-bold">No items found</p>
        </div>
      )}

      {showAddProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
          <form onSubmit={handleAddProduct} className="bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Add Item for Approval</h2>
            <input placeholder="Product Name" required className="w-full p-4 border rounded-2xl" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Price ($)" required className="w-full p-4 border rounded-2xl" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
              <select className="p-4 border rounded-2xl" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                {STYLE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <input placeholder="Image URL (e.g. Unsplash/Picsum)" className="w-full p-4 border rounded-2xl" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
            <textarea placeholder="Product Description" className="w-full p-4 border rounded-2xl h-24" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            <div className="flex space-x-3 pt-4">
              <button type="button" onClick={() => setShowAddProduct(false)} className="flex-1 py-4 font-bold text-gray-500">Cancel</button>
              <button type="submit" className="flex-1 py-4 bg-blue-900 text-white font-bold rounded-2xl">Submit Item</button>
            </div>
          </form>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full p-8 flex flex-col shadow-2xl animate-slide-in">
            <h2 className="text-2xl font-bold mb-8 text-blue-900">Cart</h2>
            <div className="flex-grow overflow-y-auto space-y-6">
              {cart.map(i => (
                <div key={i.id} className="flex space-x-4 border-b pb-4">
                  <img src={i.image} className="w-20 h-24 object-cover rounded-xl" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm">{i.name}</h4>
                    <p className="text-xs text-gray-400">Qty: {i.quantity}</p>
                    <p className="font-bold text-blue-900 mt-2">${i.price * i.quantity}</p>
                  </div>
                  <button onClick={() => onRemoveFromCart(i.id)} className="text-red-300 hover:text-red-600">×</button>
                </div>
              ))}
            </div>
            {cart.length > 0 ? (
              <div className="pt-6">
                <div className="flex justify-between font-bold text-xl mb-6"><span>Total</span><span>${cartTotal}</span></div>
                <button onClick={() => { setShowCart(false); setShowCheckout(true); }} className="w-full py-5 bg-blue-900 text-white font-bold rounded-[30px] shadow-xl">Checkout</button>
              </div>
            ) : <p className="text-center py-20 text-gray-300">Your cart is empty</p>}
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Finalize Order</h2>
            <textarea placeholder="Full Shipping Address" className="w-full p-4 border rounded-2xl h-24" value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              {['Card', 'Mobile Pay'].map(p => (
                <button key={p} onClick={() => setCheckoutData({...checkoutData, payment: p})} className={`p-4 border rounded-2xl font-bold ${checkoutData.payment === p ? 'bg-blue-50 border-blue-900 text-blue-900' : ''}`}>{p}</button>
              ))}
            </div>
            <button onClick={() => { onCheckout(checkoutData.payment, checkoutData.address); setShowCheckout(false); }} className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl">Confirm Purchase</button>
            <button onClick={() => setShowCheckout(false)} className="w-full text-gray-400 text-sm font-bold">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
