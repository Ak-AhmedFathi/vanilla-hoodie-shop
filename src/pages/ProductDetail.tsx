import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Share, Truck, RotateCcw, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { getProductById, Product } from '../data/products';

interface ProductDetailProps {
  onAddToCart: (product: Product, size?: string, quantity?: number) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart, onAddToWishlist }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
      if (foundProduct?.sizes?.[0]) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!isLoading && product) {
      // GSAP animations
      const tl = gsap.timeline();
      
      gsap.set([imageRef.current, contentRef.current, ctaRef.current], {
        y: 50,
        opacity: 0
      });

      tl.to(imageRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.2)
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.4);
    }
  }, [isLoading, product]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, selectedSize, quantity);
      
      // Success animation
      gsap.to(ctaRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const handleAddToWishlist = () => {
    if (product && onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="btn-fashion">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div ref={imageRef} className="space-y-4">
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Thumbnail Gallery (placeholder) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted opacity-50">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div ref={contentRef} className="space-y-6">
            {/* Title and Price */}
            <div>
              <div className="text-sm text-muted-foreground tracking-wide uppercase mb-2">
                {product.category}
              </div>
              <h1 className="heading-section text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-foreground">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-destructive text-destructive-foreground px-3 py-1 text-sm font-medium tracking-wide uppercase">
                    Sale
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-fashion text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border font-medium text-sm transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-fashion"
                disabled={product.sizes && !selectedSize}
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              
              <div className="flex gap-4">
                <button
                  onClick={handleAddToWishlist}
                  className="flex-1 btn-fashion-outline flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </button>
                <button className="flex-1 btn-fashion-outline flex items-center justify-center gap-2">
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t">
              {product.material && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
              )}
              
              {/* Features */}
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                  <span>Free shipping on orders over $75</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-5 h-5 text-muted-foreground" />
                  <span>30-day easy returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span>2-year quality guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;