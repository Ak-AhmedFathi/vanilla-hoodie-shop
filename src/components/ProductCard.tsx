import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { gsap } from 'gsap';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.fromTo(actionsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    gsap.to(actionsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Cart fly animation
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Create temporary element for animation
    const flyElement = document.createElement('div');
    flyElement.className = 'fixed w-6 h-6 bg-primary rounded-full z-50 pointer-events-none';
    flyElement.style.left = rect.left + rect.width / 2 + 'px';
    flyElement.style.top = rect.top + rect.height / 2 + 'px';
    document.body.appendChild(flyElement);
    
    // Animate to cart
    gsap.to(flyElement, {
      x: window.innerWidth - 100,
      y: -rect.top + 20,
      scale: 0.3,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        document.body.removeChild(flyElement);
        onAddToCart(product);
      }
    });

    // Button feedback
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }

    // Heart animation
    const button = e.currentTarget;
    gsap.to(button, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  return (
    <div 
      ref={cardRef}
      className="product-card bg-card rounded-none overflow-hidden shadow-[var(--shadow-card)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <div
            ref={imageRef}
            className="product-image w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          
          {/* Overlay */}
          <div 
            ref={overlayRef}
            className="product-overlay absolute inset-0 bg-black/10 opacity-0"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium tracking-wide uppercase">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-medium tracking-wide uppercase">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div 
            ref={actionsRef}
            className="absolute top-4 right-4 flex flex-col gap-2 opacity-0"
          >
            <button
              onClick={handleAddToWishlist}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <Heart className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Add to Cart Button - appears on hover */}
          <div 
            ref={actionsRef}
            className="absolute bottom-4 left-4 right-4 opacity-0"
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-3 px-4 font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-muted-foreground tracking-wide uppercase mb-1">
          {product.category}
        </div>
        <h3 className="font-medium text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;