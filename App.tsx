
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { UserRole, CartItem, Product, Recipe, Order, UserProfile } from './types';
import { STYLE_CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DesignStudio from './pages/DesignStudio';
import Marketplace from './pages/Marketplace';
import RecipeSystem from './pages/RecipeSystem';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { generateAppLogo } from './services/geminiService';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Royal Kente Blouse', price: 120, category: 'African Native', description: 'Hand-woven Kente with silk lining.', image: 'https://picsum.photos/seed/kente/400/500', reviews: [], isApproved: true, creatorId: 'system' },
  { id: '2', name: 'Midnight Silk Wrap', price: 250, category: 'European', description: 'Luxurious midnight blue Italian silk.', image: 'https://picsum.photos/seed/silk/400/500', reviews: [], isApproved: true, creatorId: 'system' },
  { id: '3', name: 'Savannah Linen Suit', price: 340, category: 'Western', description: 'Breathable Egyptian linen for summer.', image: 'https://picsum.photos/seed/linen/400/500', reviews: [], isApproved: true, creatorId: 'system' },
  { id: '4', name: 'Zii Heritage Gown', price: 580, category: 'Modern', description: 'A fusion of tribal prints and contemporary cuts.', image: 'https://picsum.photos/seed/gown/400/500', reviews: [], isApproved: true, creatorId: 'system' },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([]);
  const [logo, setLogo] = useState<string | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: 'R1', name: 'Zii Heritage Gown', status: 'Approved', priority: 'High', worker: 'Jane Doe', materials: ['Silk', 'Gold Thread'], steps: ['Cut', 'Sew'], estimatedTime: '12h', creatorId: 'admin' },
  ]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const generatedLogo = await generateAppLogo();
        setLogo(generatedLogo);
      } catch (e) {
        console.error("Logo generation failed", e);
      }
    };
    loadLogo();
  }, []);

  const handleSignup = (user: UserProfile) => {
    setRegisteredUsers(prev => [...prev, user]);
  };

  const handleLogin = (username: string, role: UserRole) => {
    const user = registeredUsers.find(u => u.username === username && u.role === role) || {
      fullName: 'Default User',
      username,
      email: `${username}@zii.com`,
      country: 'Nigeria',
      state: 'Lagos',
      address: 'Zii Empire HQ',
      department: 'General',
      title: 'Member',
      dob: '1995-01-01',
      gender: 'Other',
      joinDate: new Date().toLocaleDateString(),
      role,
      stats: { ordersCount: 0, wishlistCount: 0, totalSpent: 0, totalEarned: role === UserRole.MAKER ? 0 : undefined }
    };
    setCurrentUser(user as UserProfile);
  };

  const handleLogout = () => setCurrentUser(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);
  const approveProduct = (id: string) => setProducts(prev => prev.map(p => p.id === id ? { ...p, isApproved: true } : p));
  
  const addRecipe = (r: Recipe) => setRecipes(prev => [r, ...prev]);
  const approveRecipe = (id: string) => setRecipes(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));

  const placeOrder = (paymentMethod: string, address: string) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ZE-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total,
      status: 'Processing',
      paymentMethod,
      shippingAddress: address
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    alert("Order Successful!");
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {currentUser && (
          <Navbar 
            role={currentUser.role} 
            onLogout={handleLogout} 
            logo={logo} 
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          />
        )}
        <main className="flex-grow pb-20 md:pb-0">
          <Routes>
            <Route path="/signup" element={<Signup onSignup={handleSignup} logo={logo} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} logo={logo} />} />
            
            <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/signup"} />} />
            
            <Route path="/dashboard" element={currentUser ? <Dashboard role={currentUser.role} orders={orders} /> : <Navigate to="/signup" />} />
            <Route path="/studio" element={currentUser?.role === UserRole.MAKER || currentUser?.role === UserRole.ADMIN ? <DesignStudio onSaveDesign={() => {}} /> : <Navigate to="/dashboard" />} />
            
            <Route path="/shop" element={currentUser ? <Marketplace 
              role={currentUser.role} 
              products={products}
              cart={cart}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              onRemoveFromCart={(id) => setCart(c => c.filter(i => i.id !== id))}
              onCheckout={placeOrder}
              onAddProduct={addProduct}
            /> : <Navigate to="/signup" />} />

            <Route path="/recipes" element={currentUser && currentUser.role !== UserRole.CUSTOMER ? <RecipeSystem 
              role={currentUser.role} 
              recipes={recipes} 
              onAddRecipe={addRecipe}
            /> : <Navigate to="/dashboard" />} />

            <Route path="/admin" element={currentUser?.role === UserRole.ADMIN ? <AdminPanel 
              recipes={recipes} 
              onApproveRecipe={approveRecipe}
              products={products}
              onApproveProduct={approveProduct}
            /> : <Navigate to="/dashboard" />} />

            <Route path="/profile" element={currentUser ? <Profile 
              profile={currentUser} 
              orders={orders} 
              wishlist={wishlist} 
              products={products}
              onUpdateProfile={setCurrentUser}
              onAddToCart={addToCart}
              onRemoveWishlist={toggleWishlist}
            /> : <Navigate to="/signup" />} />
          </Routes>
        </main>
        
        {currentUser && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 md:hidden z-50">
            <Link to="/dashboard" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
              <span className="text-xl">🏠</span> Home
            </Link>
            {(currentUser.role === UserRole.MAKER || currentUser.role === UserRole.ADMIN) && (
              <Link to="/studio" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
                <span className="text-xl">✨</span> Studio
              </Link>
            )}
            <Link to="/shop" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
              <span className="text-xl">🛍️</span> Shop
            </Link>
            <Link to="/profile" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
              <span className="text-xl">👤</span> Me
            </Link>
          </nav>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
