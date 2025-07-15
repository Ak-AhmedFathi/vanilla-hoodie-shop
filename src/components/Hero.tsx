import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import heroImage from '../assets/hero-image.jpg';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([headingRef.current, subtitleRef.current, buttonRef.current], {
      y: 60,
      opacity: 0
    });
    
    gsap.set(imageRef.current, {
      scale: 1.1,
      opacity: 0
    });

    // Animation sequence
    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.3)
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.5)
    .to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.7);

  }, []);

  return (
    <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 
          ref={headingRef}
          className="heading-hero mb-6"
        >
          Comfort
          <br />
          Redefined
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Discover our signature collection of premium hoodies crafted for the modern lifestyle.
        </p>
        
        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/men"
            className="btn-fashion bg-white text-black hover:bg-gray-100 inline-block"
          >
            Shop Men's
          </Link>
          <Link
            to="/women"
            className="btn-fashion-outline border-white text-white hover:bg-white hover:text-black inline-block"
          >
            Shop Women's
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm tracking-wide uppercase font-light">Scroll</span>
          <div className="w-px h-12 bg-white/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;