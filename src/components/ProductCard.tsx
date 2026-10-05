import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  const getRoastColor = (roast: string) => {
    switch (roast) {
      case 'Light': return 'bg-amber-100 text-amber-800';
      case 'Medium-Light': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-amber-200 text-amber-900';
      case 'Dark': return 'bg-espresso/10 text-espresso';
      default: return 'bg-latte/30 text-mocha';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-latte/20 animate-fadeIn">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Add Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-cream text-espresso rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-warm hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-cream/90 backdrop-blur-sm text-espresso text-xs font-medium rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-base sm:text-lg font-semibold text-espresso leading-tight">
            {product.name}
          </h3>
          <span className="text-lg font-semibold text-amber-warm whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-mocha/70 mb-3">{product.origin} · {product.weight}</p>

        {/* Tasting Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span key={note} className="px-2 py-0.5 bg-cream-dark/60 text-mocha text-xs rounded-full">
              {note}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getRoastColor(product.roast)}`}>
            {product.roast} Roast
          </span>
          <button
            onClick={() => onViewDetails(product)}
            className="text-sm font-medium text-mocha hover:text-espresso transition-colors underline underline-offset-2 decoration-latte"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
