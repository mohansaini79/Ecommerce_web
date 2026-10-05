import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-cream/80 backdrop-blur-sm rounded-full flex items-center justify-center text-espresso hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover md:rounded-l-3xl"
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col">
            <span className="text-sm text-caramel font-medium uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mb-2">
              {product.name}
            </h2>
            <p className="text-mocha/70 text-sm mb-4">{product.origin} · {product.weight}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-warm' : 'text-latte/40'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-mocha/70">{product.rating}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-mocha/80 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Tasting Notes */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-mocha/60 mb-2">Tasting Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-3 py-1.5 bg-cream-dark border border-latte/30 text-espresso text-sm rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Roast Level */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-mocha/60 mb-2">Roast Level</h4>
              <div className="flex gap-1">
                {['Light', 'Medium-Light', 'Medium', 'Dark'].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full ${
                      ['Light', 'Medium-Light', 'Medium', 'Dark'].indexOf(level) <=
                      ['Light', 'Medium-Light', 'Medium', 'Dark'].indexOf(product.roast)
                        ? 'bg-espresso'
                        : 'bg-latte/30'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-mocha/60 mt-1">{product.roast}</p>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-auto pt-4 border-t border-latte/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-espresso">${product.price.toFixed(2)}</span>
                
                {/* Quantity */}
                <div className="flex items-center gap-3 bg-cream-dark rounded-full px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-espresso hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-sm font-semibold text-espresso w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-espresso hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-espresso text-cream font-medium rounded-full hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
