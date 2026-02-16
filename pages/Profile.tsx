
import React, { useState } from 'react';
import { UserProfile, Order, Product } from '../types';

interface ProfileProps {
  profile: UserProfile;
  orders: Order[];
  wishlist: string[];
  products: Product[];
  onUpdateProfile: (p: UserProfile) => void;
  onAddToCart: (p: Product) => void;
  onRemoveWishlist: (id: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, orders, wishlist, products, onUpdateProfile, onAddToCart, onRemoveWishlist }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  const handleSave = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
    alert("Profile Updated!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-blue-900 to-blue-800"></div>
        <div className="px-6 md:px-12 pb-12">
          <div className="relative flex flex-col md:flex-row md:items-end -mt-16 mb-10 space-y-4 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-white p-1 rounded-[40px] shadow-2xl mx-auto md:mx-0">
              <div className="w-full h-full bg-blue-100 rounded-[38px] flex items-center justify-center text-5xl">👤</div>
            </div>
            <div className="flex-grow text-center md:text-left pb-2">
              <h1 className="text-4xl font-bold text-blue-900">{profile.fullName}</h1>
              <p className="text-gray-500">@{profile.username} • {profile.role} • {profile.country}</p>
            </div>
            <div className="flex justify-center md:block">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all ${isEditing ? 'bg-red-50 text-red-600' : 'bg-blue-900 text-white shadow-lg'}`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
              <input className="p-4 border rounded-2xl" placeholder="Full Name" value={editForm.fullName} onChange={e => setEditForm({...editForm, fullName: e.target.value})} />
              <input className="p-4 border rounded-2xl" placeholder="Email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
              <input className="p-4 border rounded-2xl" placeholder="Country" value={editForm.country} onChange={e => setEditForm({...editForm, country: e.target.value})} />
              <input className="p-4 border rounded-2xl" placeholder="Address" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
              <button onClick={handleSave} className="md:col-span-2 py-4 bg-green-600 text-white font-bold rounded-2xl">Save Changes</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Orders</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Wishlist</p>
                <p className="text-3xl font-bold text-gray-900">{wishlist.length}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Join Date</p>
                <p className="text-xl font-bold text-gray-900">{profile.joinDate}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1">Portfolio</p>
                <p className="text-xl font-bold text-blue-900">Active</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center"><span className="mr-3">📦</span> Order History</h2>
          {orders.length === 0 ? (
            <div className="bg-white p-16 rounded-[40px] border border-dashed border-gray-200 text-center opacity-60">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-gray-400">No orders made yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(o => (
                <div key={o.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-blue-900">#{o.id}</h4>
                      <p className="text-xs text-gray-400">{o.date}</p>
                    </div>
                    <span className="text-[10px] bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase">{o.status}</span>
                  </div>
                  <button onClick={() => setSelectedOrder(o)} className="text-blue-900 text-sm font-bold hover:underline">View Order Details →</button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center"><span className="mr-3">❤️</span> My Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <div className="bg-white p-16 rounded-[40px] border border-dashed border-gray-200 text-center opacity-60">
              <p className="text-5xl mb-4">💔</p>
              <p className="text-gray-400">Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {wishlistItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                  <img src={item.image} className="w-full aspect-square object-cover rounded-2xl mb-4" />
                  <h4 className="text-sm font-bold truncate mb-2">{item.name}</h4>
                  <div className="flex justify-between items-center">
                    <button onClick={() => onAddToCart(item)} className="p-2 bg-blue-50 text-blue-900 rounded-xl">🛒</button>
                    <button onClick={() => onRemoveWishlist(item.id)} className="text-xs text-red-500 font-bold">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl relative animate-fade-in">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-8 text-2xl">×</button>
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Order Details #{selectedOrder.id}</h2>
            <div className="space-y-4 mb-8">
              {selectedOrder.items.map(i => (
                <div key={i.id} className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm">{i.name} (x{i.quantity})</span>
                  <span className="font-bold">${i.price * i.quantity}</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-900">${selectedOrder.total}</span>
              </div>
              <p className="text-xs text-gray-500 mt-4">Shipping to: {selectedOrder.shippingAddress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
