import { X, ShoppingCart, CreditCard } from 'lucide-react';

export default function Cart({ 
  cart, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout,
  formatPrice 
}) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Keranjang Belanja
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Keranjang belanja kosong</p>
              <p className="text-gray-400 text-sm mt-2">
                Tambahkan produk untuk melanjutkan belanja
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div 
                  key={item.id} 
                  className="flex gap-4 border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-blue-600 font-bold mb-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="font-semibold min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Proses Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
}