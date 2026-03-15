import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, Menu, X, Instagram, 
  Twitter, Facebook, MessageCircle, ArrowRight, 
  Star, ShieldCheck, Truck, RotateCcw, Filter,
  ChevronDown, ExternalLink, Plus, Heart, ArrowUp,
  Tag, Zap, Eye, ChevronRight, ChevronLeft
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
  <nav className="fixed w-full z-[90] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-2xl font-black tracking-tighter text-secondary">
        ALPHA<span className="text-primary">OMEGA</span>
      </div>
      <div className="hidden lg:flex space-x-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
        <a href="#home" className="hover:text-primary transition-colors">New Arrivals</a>
        <a href="#shop" className="hover:text-primary transition-colors">Catalog</a>
        <a href="#shop" className="hover:text-primary transition-colors">Categories</a>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-slate-400 hover:text-primary transition-colors"><Search size={20} /></button>
        <div className="relative">
           <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-110"><ShoppingBag size={20} /></button>
           <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </div>
        <button className="lg:hidden text-secondary"><Menu size={24} /></button>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    { title: "Premium Watch Collection", subtitle: "Alpha Elite 2026", price: "$299", img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Next Gen Audio Gear", subtitle: "Omega Sound Pro", price: "$159", img: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
  ];

  return (
    <section id="home" className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Info: Store Highlights */}
        <div className="lg:col-span-4 z-20 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
               <span className="w-10 h-[1px] bg-primary"></span>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Curated Luxury</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-secondary leading-[0.9] tracking-tighter mb-10 uppercase">
              UPGRADE <br /> 
              <span className="text-primary italic">YOUR LIFE.</span>
            </h1>
            
            <div className="space-y-8 mb-12">
               <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-primary"><Tag size={20} /></div>
                  <div>
                    <h4 className="font-black text-secondary text-sm uppercase">Exclusive Access</h4>
                    <p className="text-slate-400 text-xs">Handpicked premium items you won't find elsewhere.</p>
                  </div>
               </div>
               <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-primary"><Zap size={20} /></div>
                  <div>
                    <h4 className="font-black text-secondary text-sm uppercase">Instant Support</h4>
                    <p className="text-slate-400 text-xs">Order directly via WhatsApp for lightning fast response.</p>
                  </div>
               </div>
            </div>

            <a href="#shop" className="inline-flex items-center space-x-6 group">
               <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110">
                  <ArrowRight />
               </div>
               <span className="text-sm font-black text-secondary uppercase tracking-widest border-b-2 border-primary pb-1">Shop Collection</span>
            </a>
          </motion.div>
        </div>

        {/* Right Content: Immersive Product Showcase */}
        <div className="lg:col-span-8 relative h-[500px] md:h-[800px] flex items-center order-1 lg:order-2">
           <AnimatePresence mode="wait">
             <motion.div 
               key={activeBanner}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="w-full h-full rounded-[60px] md:rounded-[80px] overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-4 border-white"
             >
                <img 
                  src={banners[activeBanner].img} 
                  className="w-full h-full object-cover"
                  alt="Showcase"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Product Label */}
                <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-6">
                   <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{banners[activeBanner].subtitle}</p>
                      <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">{banners[activeBanner].title}</h3>
                      <div className="flex items-center space-x-4">
                         <span className="text-2xl font-bold text-white">{banners[activeBanner].price}</span>
                         <span className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-1"><Eye size={14} /> View Details</span>
                      </div>
                   </div>
                   <div className="flex space-x-4">
                      <button onClick={() => setActiveBanner((prev) => (prev + 1) % banners.length)} className="w-16 h-16 rounded-full bg-white text-secondary flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all">
                        <ChevronRight />
                      </button>
                   </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
      
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -mr-96 -mt-96"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -ml-48 -mb-48"></div>
    </section>
  );
};

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
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
           <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-white font-black py-4 px-8 rounded-2xl flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl"
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
           <span className="text-slate-400 text-[10px] ml-2 font-black uppercase tracking-widest">Verified Seller</span>
        </div>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl border border-slate-100 font-bold text-[10px] text-secondary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all uppercase tracking-[0.2em]"
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
          <h3 className="text-4xl md:text-7xl font-black text-secondary tracking-tighter uppercase leading-[0.9]">ESSENTIALS <br /> REFINED.</h3>
        </div>
        <div className="flex space-x-4">
           <button className="flex items-center space-x-4 px-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-500 hover:text-primary transition-all uppercase tracking-widest">
              <Filter size={18} /> <span>Filter Items</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      
      <div className="mt-20 text-center">
         <button className="bg-secondary text-white font-black py-6 px-16 rounded-[30px] text-[10px] uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-2xl">
            Explore All Items
         </button>
      </div>
    </div>
  </section>
);

const TrustFeatures = () => {
  const features = [
    { title: "Direct Order", desc: "No complicated checkout. Chat directly with us on WhatsApp.", icon: <MessageCircle /> },
    { title: "Fast Delivery", desc: "Fast and reliable shipping across Port-au-Prince and beyond.", icon: <Truck /> },
    { title: "Elite Quality", desc: "We guarantee the authenticity and quality of every single item.", icon: <ShieldCheck /> }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-[40px] bg-white flex items-center justify-center text-primary mb-8 shadow-xl transition-transform group-hover:scale-110">
               {React.cloneElement(f.icon, { size: 40 })}
            </div>
            <h4 className="text-2xl font-black text-secondary mb-4 uppercase tracking-tight italic">{f.title}</h4>
            <p className="text-slate-500 font-light leading-relaxed text-sm max-w-[250px]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-secondary text-white pt-40 pb-12 px-6 md:px-12 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
        <div className="lg:col-span-1">
          <div className="text-3xl font-black tracking-tighter mb-10">ALPHA<span className="text-primary">OMEGA</span></div>
          <p className="text-slate-400 font-light leading-relaxed mb-12 max-w-xs">
            Defining the new standard for premium local shopping. Quality first, always.
          </p>
          <div className="flex space-x-8 text-slate-500">
             <Instagram className="hover:text-primary transition-colors cursor-pointer" size={24} />
             <Twitter className="hover:text-primary transition-colors cursor-pointer" size={24} />
             <Facebook className="hover:text-primary transition-colors cursor-pointer" size={24} />
          </div>
        </div>
        <div>
          <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-slate-500">Collection</h5>
          <ul className="space-y-6 text-white text-sm font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition-all">New Arrivals</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Best Sellers</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Limited Edition</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-slate-500">Service</h5>
          <ul className="space-y-6 text-white text-sm font-bold uppercase tracking-widest">
            <li><a href="#" className="hover:text-primary transition-all">WhatsApp Concierge</a></li>
            <li><a href="#" className="hover:text-primary transition-all">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-all">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-slate-500">Newsletter</h5>
          <div className="flex flex-col space-y-6">
             <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 p-6 rounded-2xl outline-none focus:border-primary transition-all text-sm font-light" />
             <button className="bg-primary text-white font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.3em]">Join the Elite</button>
          </div>
        </div>
      </div>
      <div className="text-[9px] text-slate-600 font-black uppercase tracking-[0.5em] pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© 2026 ALPHAOMEGA EXCLUSIVE — HAITI</p>
        <p className="italic">Architected with Excellence by Daky_400$/day</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="selection:bg-primary selection:text-white bg-slate-50">
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
