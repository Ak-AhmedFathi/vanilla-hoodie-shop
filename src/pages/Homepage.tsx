import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { getFeaturedProducts, getNewProducts, getSaleProducts, Product } from '../data/products';
import { Link } from 'react-router-dom';
import collectionBanner from '../assets/collection-banner.jpg';

interface HomepageProps {
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onAddToCart, onAddToWishlist }) => {
  const featuredProducts = getFeaturedProducts(4);
  const newProducts = getNewProducts(4);
  const saleProducts = getSaleProducts(4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <ProductGrid 
        title="Featured"
        products={featuredProducts}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
      />

      {/* Collection Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className="relative h-96 md:h-[500px] bg-cover bg-center rounded-none overflow-hidden"
            style={{ backgroundImage: `url(${collectionBanner})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl mx-auto px-4">
                <h2 className="heading-section mb-4">
                  The Complete Collection
                </h2>
                <p className="text-lg md:text-xl mb-8 font-light leading-relaxed">
                  Discover our full range of premium hoodies, designed for every moment of your day.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/men" 
                    className="btn-fashion bg-white text-black hover:bg-gray-100 inline-block"
                  >
                    Shop Men's Collection
                  </Link>
                  <Link 
                    to="/women" 
                    className="btn-fashion-outline border-white text-white hover:bg-white hover:text-black inline-block"
                  >
                    Shop Women's Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <ProductGrid 
          title="New Arrivals"
          products={newProducts}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      )}

      {/* Sale Items */}
      {saleProducts.length > 0 && (
        <ProductGrid 
          title="Sale"
          products={saleProducts}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      )}

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be the first to know about new drops, exclusive offers, and styling tips.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="btn-fashion">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-playfair text-2xl font-bold mb-4">
                Vanilla Hoodies
              </h3>
              <p className="text-primary-foreground/80 mb-4 max-w-md">
                Premium hoodies crafted for comfort, designed for life. 
                Every piece tells a story of quality and conscious creation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Facebook
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-wide">Shop</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/men" className="hover:text-primary-foreground transition-colors">Men's Hoodies</Link></li>
                <li><Link to="/women" className="hover:text-primary-foreground transition-colors">Women's Hoodies</Link></li>
                <li><Link to="/accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
                <li><Link to="/sale" className="hover:text-primary-foreground transition-colors">Sale</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium mb-4 uppercase tracking-wide">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Care Instructions</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Vanilla Hoodies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;