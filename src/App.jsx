import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, Menu, X, Instagram, 
  Twitter, Facebook, MessageCircle, ArrowRight, 
  Star, ShieldCheck, Truck, RotateCcw, Filter,
  ChevronDown, ExternalLink, Plus, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sample Data ---
const PRODUCTS = [
  { id: 1, name: "Alpha Elite Watch", price: 299, category: "Accessories", img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 2, name: "Omega Sound Pro", price: 159, category: "Tech", img: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, name: "Minimalist Leather Bag", price: 120, category: "Fashion", img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, name: "Smart Vision Shades", price: 85, category: "Accessories", img: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 5, name: "Ultra-Light Laptop Case", price: 45, category: "Tech", img: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 6, name: "Classic Noir Wallet", price: 65, category: "Fashion", img: "https://images.pexels.com/photos/4452533/pexels-photo-4452533.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const WHATSAPP_NUMBER = "+50940000000"; 

// --- Shared Components ---

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const moveCursor = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (outlineRef.current) {
        outlineRef.current.style.left = `${e.clientX}px`;
        outlineRef.current.style.top = `${e.clientY}px`;
        outlineRef.current.style.transform = `translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] hidden lg:block" style={{ transform: 'translate(-50%, -50%)' }} />
      <div ref={outlineRef} className="fixed w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9998] transition-transform duration-100 hidden lg:block" />
    </>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => (
  <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-2xl font-black tracking-tighter text-secondary">
        ALPHA<span className="text-primary">OMEGA</span>
      </div>
      <div className="hidden md:flex space-x-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
        <a href="#" className="hover:text-primary transition-colors">Home</a>
        <a href="#shop" className="hover:text-primary transition-colors">Shop</a>
        <a href="#about" className="hover:text-primary transition-colors">About</a>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-slate-500 hover:text-primary transition-colors"><Search size={20} /></button>
        <button className="bg-primary text-white p-2 rounded-full shadow-lg shadow-primary/20"><ShoppingBag size={20} /></button>
        <button className="md:hidden text-slate-500"><Menu size={24} /></button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-6 md:px-12 bg-slate-50 overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block italic">Exclusive Collection 2026</span>
        <h1 className="text-5xl md:text-8xl font-black text-secondary leading-none tracking-tighter mb-8 uppercase">
          Elegance in <br /> 
          <span className="text-primary italic">Every Detail.</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-12">
          Discover a curated selection of premium products designed for those who value quality and minimalist aesthetics.
        </p>
        <div className="flex flex-wrap gap-6">
          <a href="#shop" className="bg-secondary text-white font-black py-5 px-10 rounded-2xl flex items-center group shadow-xl transition-all hover:bg-primary">
            EXPLORE CATALOG <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </motion.div>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="rounded-[60px] overflow-hidden shadow-2xl border-8 border-white"
        >
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            className="w-full aspect-[4/5] object-cover"
            alt="Product Showcase"
          />
        </motion.div>
        <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl hidden md:block">
           <div className="text-3xl font-black text-secondary mb-1 uppercase tracking-tighter">Premium</div>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Quality Guaranteed</p>
        </div>
      </div>
    </div>
  </section>
);

const ProductCard = ({ product }) => {
  const message = encodeURIComponent(`Hello! I'm interested in the *${product.name}* (Price: $${product.price}). Is it available?`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[40px] overflow-hidden product-shadow transition-all group"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.img} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={product.name} 
        />
        <div className="absolute top-6 left-6">
           <span className="bg-white/90 backdrop-blur-md text-secondary text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">{product.category}</span>
        </div>
        <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors shadow-lg">
           <Heart size={20} />
        </button>
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-secondary font-black py-4 px-8 rounded-2xl flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl"
           >
             BUY ON WHATSAPP <MessageCircle className="ml-3 text-primary" size={18} />
           </a>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-xl font-black text-secondary tracking-tight">{product.name}</h4>
          <span className="text-xl font-bold text-primary">${product.price}</span>
        </div>
        <div className="flex items-center space-x-1 mb-6 text-yellow-400">
           {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
           <span className="text-slate-400 text-xs ml-2 font-bold">(24 Reviews)</span>
        </div>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl border border-slate-100 font-bold text-sm text-secondary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all uppercase tracking-widest"
        >
          Check Availability
        </a>
      </div>
    </motion.div>
  );
};

const ProductCatalog = () => (
  <section id="shop" className="py-32 px-6 md:px-12 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <h2 className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Collection</h2>
          <h3 className="text-4xl md:text-7xl font-black text-secondary tracking-tighter uppercase">Featured <br /> Selection.</h3>
        </div>
        <div className="flex space-x-4">
           <button className="flex items-center space-x-2 px-6 py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-500 hover:border-primary transition-all">
              <Filter size={18} /> <span>Filter</span>
           </button>
           <button className="flex items-center space-x-2 px-6 py-3 border border-slate-100 rounded-xl text-sm font-bold text-slate-500 hover:border-primary transition-all">
              <span>Sort By</span> <ChevronDown size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      
      <div className="mt-20 text-center">
         <button className="bg-secondary text-white font-black py-6 px-16 rounded-2xl text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
            View All Products
         </button>
      </div>
    </div>
  </section>
);

const TrustFeatures = () => {
  const features = [
    { title: "Secure Order", desc: "Order directly through WhatsApp with a verified human agent.", icon: <ShieldCheck size={36} /> },
    { title: "Local Delivery", desc: "Fast and reliable shipping across Port-au-Prince and beyond.", icon: <Truck size={36} /> },
    { title: "Satisfaction", desc: "We guarantee the quality of every single item we deliver.", icon: <RotateCcw size={36} /> }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-primary mb-8 shadow-xl">
               {f.icon}
            </div>
            <h4 className="text-2xl font-black text-secondary mb-4 uppercase tracking-tight">{f.title}</h4>
            <p className="text-slate-500 font-light leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-secondary text-white pt-32 pb-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="lg:col-span-1">
          <div className="text-2xl font-black tracking-tighter mb-8">ALPHA<span className="text-primary">OMEGA</span></div>
          <p className="text-slate-400 font-light leading-relaxed mb-10">
            Defining the new standard for premium local shopping. Quality first, always.
          </p>
          <div className="flex space-x-6 text-slate-500">
             <Instagram className="hover:text-primary transition-colors cursor-pointer" />
             <Twitter className="hover:text-primary transition-colors cursor-pointer" />
             <Facebook className="hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>
        <div>
          <h5 className="text-sm font-black uppercase tracking-widest mb-10">Quick Links</h5>
          <ul className="space-y-6 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition-colors">Catalog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-black uppercase tracking-widest mb-10">Customer Care</h5>
          <ul className="space-y-6 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-black uppercase tracking-widest mb-10">Newsletter</h5>
          <div className="flex flex-col space-y-4">
             <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary transition-colors" />
             <button className="bg-primary text-white font-black py-5 rounded-2xl text-xs uppercase tracking-widest">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] pt-12 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© 2026 ALPHAOMEGA EXCLUSIVE — HAITI</p>
        <p className="italic">Crafted with Excellence by Daky_400$/day</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="selection:bg-primary selection:text-white">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <TrustFeatures />
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
}

export default App;
