import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimized Animation CSS
  const animationStyles = `
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
      20% { opacity: 0.6; } 
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    .floating-heart {
      position: absolute;
      will-change: transform; /* GPU Acceleration */
      animation: float 15s linear infinite;
      bottom: -10%;
      opacity: 0;
    }
  `;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      // Optimized Background: Using gradients instead of blur filters for speed
      style={{
        background: `linear-gradient(rgba(157, 23, 77, 0.8), rgba(157, 23, 77, 0.9)), url('https://images.unsplash.com/photo-1542038784456-1ea0e93ca91b?q=80&w=1920') center/cover no-repeat fixed`
      }}
    >
      <style>{animationStyles}</style>

      {/* --- FLOATING HEARTS (Reduced count to 8 for performance) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="floating-heart text-red-500/50 text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              fontSize: `${20 + Math.random() * 30}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* --- MAIN CARD --- */}
      <div className={`
        relative z-10 max-w-2xl w-full 
        bg-white/5 backdrop-blur-md border border-white/10 
        p-8 md:p-12 rounded-3xl text-center shadow-xl
        transform transition-all duration-1000 ease-out will-change-transform
        ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
      `}>
        
        {/* Bouncing Envelope */}
        <div className="text-7xl mb-6 animate-bounce drop-shadow-lg">💌</div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Hello, <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">My Love.</span>
        </h1>

        {/* --- BODY TEXT --- */}
        <div className="space-y-6 text-blue-50/90 text-lg md:text-xl leading-relaxed mb-10 font-light">
          <p className={`transform transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            We've made so many beautiful memories together, and I can't wait to make countless more.
            Thank you for unlocking our moments.
          </p>
          
          <p className={`transform transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            But now, I have something important to ask you...
          </p>
        </div>

        {/* --- GLOWING BUTTON --- */}
        <Link 
          to="/proposal" 
          className={`
            group relative inline-flex items-center gap-3 px-10 py-5 
            bg-gradient-to-r from-blue-600 to-cyan-600 
            text-white rounded-full font-bold text-xl tracking-wide
            shadow-lg shadow-blue-600/30 
            transition-all duration-300 active:scale-95
            hover:scale-105 hover:-translate-y-1
            transform ${mounted ? 'opacity-100' : 'opacity-0'}
            delay-[1500ms]
          `}
        >
          <span className="relative z-10">Ready?</span>
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

      </div>
      
      <p className="absolute bottom-6 text-blue-400/60 text-xs font-medium uppercase tracking-[0.2em] animate-pulse">
        Made with ❤️ for you
      </p>
    </div>
  );
}