import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, isClosing, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-latte/20">
          <div>
            <h2 className="font-serif text-xl font-bold text-espresso">Your Cart</h2>
            <p className="text-sm text-mocha/60">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-espresso hover:bg-cream-dark transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-cream-dark flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-latte" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-serif text-lg text-espresso mb-1">Your cart is empty</p>
              <p className="text-sm text-mocha/60">Add some delicious coffee to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-white rounded-xl border border-latte/10">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-semibold text-espresso truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-mocha/60 mt-0.5">{item.product.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-cream-dark rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-espresso hover:bg-white transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="text-xs font-semibold text-espresso w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-espresso hover:bg-white transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-amber-warm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="self-start p-1 text-mocha/40 hover:text-espresso transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-latte/20 bg-white/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-mocha/70">Subtotal</span>
              <span className="text-sm font-medium text-espresso">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-mocha/70">Shipping</span>
              <span className="text-sm font-medium text-espresso">{total >= 50 ? 'Free' : '$5.99'}</span>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-latte/20">
              <span className="font-serif text-lg font-bold text-espresso">Total</span>
              <span className="text-xl font-bold text-amber-warm">${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}</span>
            </div>
            {total < 50 && (
              <p className="text-xs text-caramel mt-2 text-center">
                Add ${(50 - total).toFixed(2)} more for free shipping!
              </p>
            )}
            <button
              onClick={onCheckout}
              className="w-full mt-4 py-3.5 bg-espresso text-cream font-medium rounded-full hover:bg-espresso-light transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
