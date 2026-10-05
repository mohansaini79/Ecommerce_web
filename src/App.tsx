import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products, categories } from './data/products';
import { Product, CartItem } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartClosing, setIsCartClosing] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => {
    setIsCartClosing(false);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsCartClosing(false);
    }, 300);
  };

  const handleCheckout = () => {
    closeCart();
    setTimeout(() => {
      setIsCheckoutOpen(true);
    }, 350);
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={cartItemCount}
        onCartClick={openCart}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-espresso via-roast to-espresso-light">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(184, 134, 11, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, rgba(198, 142, 76, 0.2) 0%, transparent 50%)`
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-caramel text-sm font-medium uppercase tracking-wider mb-3">Curated with care</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 leading-tight">
              Exceptional Coffee,<br />
              <span className="text-amber-light">Delivered Fresh</span>
            </h2>
            <p className="text-cream/70 text-base sm:text-lg max-w-lg">
              From the world's finest growing regions to your cup. Each bean is carefully selected, expertly roasted, and shipped within 48 hours of roasting.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso">Our Coffees</h3>
            <p className="text-sm text-mocha/60 mt-1">{filteredProducts.length} {filteredProducts.length === 1 ? 'coffee' : 'coffees'} available</p>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-white text-mocha border border-latte/30 hover:border-espresso/30 hover:text-espresso'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard
                  product={product}
                  onViewDetails={setSelectedProduct}
                  onAddToCart={(p) => addToCart(p)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cream-dark flex items-center justify-center">
              <svg className="w-10 h-10 text-latte" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h4 className="font-serif text-lg text-espresso mb-1">No coffees found</h4>
            <p className="text-sm text-mocha/60">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 bg-espresso text-cream rounded-full text-sm hover:bg-espresso-light transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Info Section */}
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl border border-latte/10">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cream-dark flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-serif text-base font-semibold text-espresso mb-1">Fresh Roasted</h4>
            <p className="text-xs text-mocha/60">Roasted to order and shipped within 48 hours</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-latte/10">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cream-dark flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-serif text-base font-semibold text-espresso mb-1">Ethically Sourced</h4>
            <p className="text-xs text-mocha/60">Direct trade relationships with farmers worldwide</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-latte/10">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cream-dark flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="font-serif text-base font-semibold text-espresso mb-1">Free Shipping</h4>
            <p className="text-xs text-mocha/60">Complimentary shipping on orders over $50</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-espresso text-cream/70 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-warm" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2,21H20V19H2M20,8H18V5H6V8H4A2,2 0 0,0 2,10V16A2,2 0 0,0 4,18H18A2,2 0 0,0 20,16V10A2,2 0 0,0 18,8M20,16H4V10H20V16Z"/>
                </svg>
              </div>
              <span className="font-serif text-sm font-semibold text-cream">Ember & Bloom</span>
            </div>
            <p className="text-xs text-cream/40">© 2026 Ember & Bloom Coffee Co. All rights reserved. Simulated store.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity) => addToCart(product, quantity)}
        />
      )}

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        isClosing={isCartClosing}
        onClose={closeCart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {isCheckoutOpen && (
        <Checkout
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
}

export default App;
