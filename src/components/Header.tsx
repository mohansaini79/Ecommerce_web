import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, cartItemCount, onCartClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-latte/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-espresso flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-warm" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2,21H20V19H2M20,8H18V5H6V8H4A2,2 0 0,0 2,10V16A2,2 0 0,0 4,18H18A2,2 0 0,0 20,16V10A2,2 0 0,0 18,8M20,16H4V10H20V16Z"/>
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-espresso leading-tight">Ember & Bloom</h1>
              <p className="text-[10px] sm:text-xs text-mocha/70 tracking-wider uppercase">Specialty Coffee</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 bg-cream-dark/60 border border-latte/40 rounded-full text-sm text-espresso placeholder:text-mocha/50 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60 transition-all"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-espresso text-cream rounded-full hover:bg-espresso-light transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-warm text-espresso text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 bg-cream-dark/60 border border-latte/40 rounded-full text-sm text-espresso placeholder:text-mocha/50 focus:outline-none focus:ring-2 focus:ring-amber-warm/40 focus:border-amber-warm/60 transition-all"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
