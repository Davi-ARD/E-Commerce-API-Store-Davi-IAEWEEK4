import { Package, ShoppingCart } from 'lucide-react';

export default function Header({ cartCount, onCartClick, currency, onCurrencyChange }) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-8 h-8" />
            <h1 className="text-2xl font-bold">E-Commerce API Store</h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-blue-700 px-3 py-2 rounded-lg"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="IDR">IDR (Rp)</option>
            </select>
            <button
              onClick={onCartClick}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center gap-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}