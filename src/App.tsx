import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Cart from "./components/Cart";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { useCart } from "./hooks/useCart";
import { Product } from "./data/products";

const queryClient = new QueryClient();

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    addToCart, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  const handleAddToCart = (product: Product, size?: string, quantity: number = 1) => {
    addToCart(product, size, quantity);
    // Optional: Auto-open cart on add
    // setIsCartOpen(true);
  };

  const handleAddToWishlist = (product: Product) => {
    // Wishlist functionality can be implemented here
    console.log('Added to wishlist:', product);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation cartCount={cartCount} onCartClick={openCart} />
            
            <Routes>
              <Route 
                path="/" 
                element={
                  <Homepage 
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                } 
              />
              <Route 
                path="/product/:id" 
                element={
                  <ProductDetail 
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                } 
              />
              <Route 
                path="/men" 
                element={
                  <CategoryPage 
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                } 
              />
              <Route 
                path="/women" 
                element={
                  <CategoryPage 
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                } 
              />
              <Route 
                path="/accessories" 
                element={
                  <CategoryPage 
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                } 
              />
              <Route 
                path="/sale" 
                element={
                  <CategoryPage 
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Cart
              isOpen={isCartOpen}
              onClose={closeCart}
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              total={cartTotal}
            />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
