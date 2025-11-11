import { CreditCard, CheckCircle, Loader } from 'lucide-react';
import React from 'react';

export default function Payment({ 
  isOpen, 
  onClose, 
  total,
  formatPrice,
  onPaymentSuccess 
}) {
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [cardName, setCardName] = React.useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!cardNumber || !expiry || !cvv || !cardName) {
      alert('Harap lengkapi semua data pembayaran');
      return;
    }

    setPaymentStatus('processing');
    
    setTimeout(() => {
      setPaymentStatus('success');
      
      setTimeout(() => {
        onPaymentSuccess();
        resetForm();
      }, 2000);
    }, 2000);
  };

  const resetForm = () => {
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setCardName('');
    setPaymentStatus('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Pembayaran
        </h2>

        {paymentStatus === '' && (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nama Pemegang Kartu
              </label>
              <input
                type="text"
                placeholder="Davi Ardian"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength="50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Nomor Kartu
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '');
                  if (/^\d*$/.test(value) && value.length <= 16) {
                    setCardNumber(formatCardNumber(value));
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Tanggal Kadaluarsa
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }
                    if (value.length <= 5) {
                      setExpiry(value);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 3) {
                      setCvv(value);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="3"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Total Pembayaran:
                </span>
                <span className="font-bold text-2xl text-blue-600">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Bayar Sekarang
              </button>
            </div>
          </form>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center py-12">
            <Loader className="inline-block animate-spin h-16 w-16 text-blue-600 mb-4" />
            <p className="text-gray-600 text-lg font-medium">
              Memproses pembayaran...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Mohon tunggu sebentar
            </p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">
              Pembayaran Berhasil!
            </p>
            <p className="text-gray-600">
              Terima kasih atas pembelian Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}