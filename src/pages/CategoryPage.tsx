import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, Product } from '../data/products';

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ onAddToCart, onAddToWishlist }) => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [category]);

  useEffect(() => {
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sorted = sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  }, [sortBy]);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'men':
        return "Men's Collection";
      case 'women':
        return "Women's Collection";
      case 'accessories':
        return 'Accessories';
      case 'sale':
        return 'Sale Items';
      default:
        return 'Products';
    }
  };

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case 'men':
        return 'Discover our signature collection of men\'s hoodies, designed for comfort and style.';
      case 'women':
        return 'Explore our curated selection of women\'s hoodies, crafted for the modern lifestyle.';
      case 'accessories':
        return 'Complete your look with our carefully selected accessories.';
      case 'sale':
        return 'Don\'t miss out on these limited-time offers on premium hoodies.';
      default:
        return 'Browse our complete collection of premium hoodies.';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="heading-section text-foreground mb-4">
            {getCategoryTitle(category || '')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getCategoryDescription(category || '')}
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} products
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-border hover:border-primary transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mb-8 p-6 border border-border bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Under $50</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Over $100</span>
                  </label>
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <label key={size} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <div className="space-y-2">
                  {['Black', 'Charcoal', 'Sand', 'Cream', 'Navy'].map((color) => (
                    <label key={color} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;