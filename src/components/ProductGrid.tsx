import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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

interface ProductGridProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  products, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [products]);

  const addToCardsRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section ref={gridRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="heading-section text-foreground mb-4"
          >
            {title}
          </h2>
          <div className="w-24 h-px bg-primary mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => addToCardsRef(el, index)}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {products.length > 8 && (
          <div className="text-center mt-12">
            <button className="btn-fashion-outline">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;