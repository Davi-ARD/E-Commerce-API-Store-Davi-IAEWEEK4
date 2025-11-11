import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Payment from './components/Payment';
import { productApi } from './services/productApi';
import { currencyApi } from './services/currencyApi';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    if (currency !== 'USD') {
      loadExchangeRate(currency);
    } else {
      setExchangeRate(1);
    }
  }, [currency]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products', error);
      alert('Gagal memuat produk. Cek koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await productApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };

  const loadExchangeRate = async (curr) => {
    try {
      const data = await currencyApi.getExchangeRate('USD');
      setExchangeRate(data.rates[curr] || 1);
    } catch (error) {
      console.error('Failed to load exchange rate', error);
      setExchangeRate(1);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowPayment(false);
    alert('Pembayaran berhasil! Terima kasih atas pembelian Anda.');
  };

  const formatPrice = (price) => {
    const converted = price * exchangeRate;
    const symbols = { 
      USD: '$', 
      EUR: '€', 
      GBP: '£', 
      IDR: 'Rp', 
      JPY: '¥' 
    };
    const symbol = symbols[currency] || currency + ' ';
    const decimals = currency === 'IDR' || currency === 'JPY' ? 0 : 2;
    return `${symbol}${converted.toFixed(decimals)}`;
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onCartClick={() => setShowCart(true)}
      />

      <div className="container mx-auto px-4 py-8">

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Memuat produk dari API...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>

      <Cart
        cart={cart}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        formatPrice={formatPrice}
      />

      <Payment
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        total={calculateTotal()}
        formatPrice={formatPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default App;