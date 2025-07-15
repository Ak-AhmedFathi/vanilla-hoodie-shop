import React, { useRef, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  total
}) => {
  const cartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Show cart with animation
      gsap.set([overlayRef.current, cartRef.current], { display: 'block' });
      
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(cartRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power2.out' }
      );
    } else {
      // Hide cart with animation
      if (cartRef.current && overlayRef.current) {
        gsap.to(cartRef.current, {
          x: '100%',
          duration: 0.3,
          ease: 'power2.in'
        });
        
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            if (overlayRef.current && cartRef.current) {
              gsap.set([overlayRef.current, cartRef.current], { display: 'none' });
            }
          }
        });
      }
    }
  }, [isOpen]);

  const handleRemoveItem = (id: string) => {
    // Animate item removal
    const itemElement = document.querySelector(`[data-item-id="${id}"]`);
    if (itemElement) {
      gsap.to(itemElement, {
        x: 300,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => onRemoveItem(id)
      });
    } else {
      onRemoveItem(id);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
        style={{ display: 'none' }}
      />

      {/* Cart Sidebar */}
      <div
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col"
        style={{ display: 'none' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-playfair text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some hoodies to get started
              </p>
              <button
                onClick={onClose}
                className="btn-fashion"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  data-item-id={`${item.id}-${item.size}`}
                  className="flex gap-4 p-4 border border-border rounded-none hover:shadow-md transition-shadow"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-muted overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    {item.size && (
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="font-semibold text-sm">
                      ${item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}
                          className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}
                          className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(`${item.id}-${item.size}`)}
                        className="text-muted-foreground hover:text-destructive transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full btn-fashion">
              Proceed to Checkout
            </button>

            <button
              onClick={onClose}
              className="w-full btn-fashion-outline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;