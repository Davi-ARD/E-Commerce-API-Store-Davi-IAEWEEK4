export default function ProductCard({ product, onAddToCart, formatPrice }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4 bg-gray-50"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}