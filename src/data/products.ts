import menHoodie1 from '../assets/product-hoodie-men-1.jpg';
import womenHoodie1 from '../assets/product-hoodie-women-1.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  description?: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Essential Charcoal Hoodie',
    price: 89,
    originalPrice: 120,
    image: menHoodie1,
    category: "Men's Hoodies",
    isSale: true,
    description: 'Our signature oversized hoodie crafted from premium organic cotton blend. Features a relaxed fit, kangaroo pocket, and ribbed cuffs for ultimate comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Black', 'Navy'],
    material: '80% Organic Cotton, 20% Recycled Polyester'
  },
  {
    id: '2',
    name: 'Soft Sand Hoodie',
    price: 95,
    image: womenHoodie1,
    category: "Women's Hoodies",
    isNew: true,
    description: 'Luxuriously soft hoodie in our signature sand colorway. Designed with a modern cropped fit and subtle dropped shoulders.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Sand', 'Cream', 'Blush'],
    material: '75% Organic Cotton, 25% Modal'
  },
  {
    id: '3',
    name: 'Minimalist Black Hoodie',
    price: 85,
    image: menHoodie1,
    category: "Men's Hoodies",
    description: 'Clean lines meet maximum comfort. This versatile hoodie features our signature weight cotton fleece in classic black.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal'],
    material: '100% Organic Cotton'
  },
  {
    id: '4',
    name: 'Oversized Cream Hoodie',
    price: 92,
    image: womenHoodie1,
    category: "Women's Hoodies",
    description: 'Contemporary oversized silhouette in soft cream. Perfect for layering or wearing solo.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Ivory', 'Off-White'],
    material: '80% Organic Cotton, 20% Recycled Polyester'
  },
  {
    id: '5',
    name: 'Classic Navy Hoodie',
    price: 88,
    originalPrice: 110,
    image: menHoodie1,
    category: "Men's Hoodies",
    isSale: true,
    description: 'Timeless navy hoodie with modern details. Features reinforced seams and premium hardware.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Deep Blue'],
    material: '85% Organic Cotton, 15% Recycled Polyester'
  },
  {
    id: '6',
    name: 'Dusty Rose Hoodie',
    price: 98,
    image: womenHoodie1,
    category: "Women's Hoodies",
    isNew: true,
    description: 'Sophisticated dusty rose tone in our signature relaxed fit. Perfect for effortless everyday style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Dusty Rose', 'Mauve', 'Blush'],
    material: '70% Organic Cotton, 30% Modal'
  },
  {
    id: '7',
    name: 'Vintage Wash Hoodie',
    price: 105,
    image: menHoodie1,
    category: "Men's Hoodies",
    description: 'Expertly washed for that lived-in feel. Each piece is unique with subtle variations in color.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Vintage Black', 'Washed Grey'],
    material: '100% Organic Cotton'
  },
  {
    id: '8',
    name: 'Cloud White Hoodie',
    price: 90,
    image: womenHoodie1,
    category: "Women's Hoodies",
    description: 'Pure cloud white in our signature heavyweight cotton. Features subtle logo embroidery.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cloud White', 'Pearl', 'Ivory'],
    material: '100% Organic Cotton'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products.slice(0, limit);
};

export const getNewProducts = (limit: number = 4): Product[] => {
  return products.filter(product => product.isNew).slice(0, limit);
};

export const getSaleProducts = (limit: number = 4): Product[] => {
  return products.filter(product => product.isSale).slice(0, limit);
};