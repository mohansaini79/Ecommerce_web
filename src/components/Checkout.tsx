import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onClose, onComplete }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total >= 50 ? 0 : 5.99;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" />
        <div className="relative bg-cream rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-espresso mb-2">Order Confirmed!</h2>
          <p className="text-mocha/70 mb-2">Thank you for your order.</p>
          <p className="text-sm text-mocha/60 mb-6">
            Order #EB-{Math.random().toString(36).substring(2, 8).toUpperCase()}<br />
            A confirmation email has been sent to {formData.email || 'your inbox'}.
          </p>
          <div className="bg-cream-dark rounded-xl p-4 mb-6">
            <p className="text-xs text-mocha/60 uppercase tracking-wider mb-2">Estimated Delivery</p>
            <p className="font-serif text-lg font-semibold text-espresso">3-5 Business Days</p>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3.5 bg-espresso text-cream font-medium rounded-full hover:bg-espresso-light transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" />
        <div className="relative bg-cream rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-latte/30 border-t-espresso animate-spin" />
          <h2 className="font-serif text-xl font-bold text-espresso mb-2">Processing Payment</h2>
          <p className="text-sm text-mocha/60">Please wait while we process your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-latte/20 rounded-t-3xl z-10">
          <div>
            <h2 className="font-serif text-xl font-bold text-espresso">Checkout</h2>
            <p className="text-sm text-mocha/60">{items.reduce((s, i) => s + i.quantity, 0)} items</p>
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

        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Form */}
            <div className="space-y-5">
              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-espresso mb-3">Contact Information</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                />
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-sm font-semibold text-espresso mb-3">Shipping Address</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                  />
                  <input
                    type="text"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                    />
                    <input
                      type="text"
                      placeholder="ZIP code"
                      value={formData.zip}
                      onChange={(e) => handleChange('zip', e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-sm font-semibold text-espresso mb-3">Payment</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleChange('cvv', e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-latte/40 rounded-xl text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <h3 className="text-sm font-semibold text-espresso mb-3">Order Summary</h3>
              <div className="bg-white rounded-xl border border-latte/20 p-4 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-espresso truncate">{item.product.name}</p>
                      <p className="text-xs text-mocha/60">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-espresso">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-latte/20 pt-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-mocha/70">Subtotal</span>
                    <span className="text-espresso">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-mocha/70">Shipping</span>
                    <span className="text-espresso">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-latte/10">
                    <span className="font-semibold text-espresso">Total</span>
                    <span className="font-bold text-amber-warm">${(total + shipping).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-espresso text-cream font-medium rounded-full hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Place Order — ${(total + shipping).toFixed(2)}
              </button>

              <p className="text-xs text-mocha/50 text-center mt-3">
                🔒 This is a simulated checkout. No real payment is processed.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
