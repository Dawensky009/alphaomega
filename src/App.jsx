import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, Menu, X, Instagram, 
  Twitter, Facebook, MessageCircle, ArrowRight, 
  Star, ShieldCheck, Truck, RotateCcw, Filter,
  ChevronDown, ExternalLink, Plus, Heart, ArrowUp,
  Tag, Zap, Eye, ChevronRight, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Real Product Data mapping from your folder ---
const PRODUCTS = [
  { id: 1, name: "Premium Leather Bag", price: 120, category: "Fashion", img: "/products/bag.jpeg" },
  { id: 2, name: "Urban Style Bag", price: 135, category: "Fashion", img: "/products/bag2.jpeg" },
  { id: 3, name: "Classic Tote Bag", price: 150, category: "Fashion", img: "/products/bag3.jpeg" },
  { id: 4, name: "Nightlife Carry", price: 90, category: "Fashion", img: "/products/bag5.jpeg" },
  { id: 5, name: "Executive Briefcase", price: 195, category: "Fashion", img: "/products/bag7.jpeg" },
  { id: 6, name: "Mini Chic Purse", price: 75, category: "Fashion", img: "/products/bag77.jpeg" },
  { id: 7, name: "Sovereign Satchel", price: 160, category: "Fashion", img: "/products/bag778.jpeg" },
  { id: 8, name: "Daily Essential Bag", price: 110, category: "Fashion", img: "/products/bag9.jpeg" },
  { id: 9, name: "Luxe Explorer Bag", price: 140, category: "Fashion", img: "/products/bag990.jpeg" },
  { id: 10, name: "Junior Adventure Set", price: 45, category: "Kids", img: "/products/kids0.jpeg" },
  { id: 11, name: "Toddler Alpha Kit", price: 30, category: "Kids", img: "/products/kids1.jpeg" },
  { id: 12, name: "Omega Baby Collection", price: 55, category: "Kids", img: "/products/kids2.jpeg" },
  { id: 13, name: "Kids Smart Casual", price: 65, category: "Kids", img: "/products/kids4.jpeg" },
  { id: 14, name: "Little Princess Outfit", price: 85, category: "Kids", img: "/products/kidsgirsl001.jpeg" },
  { id: 15, name: "Young King Suit", price: 95, category: "Kids", img: "/products/kidsmale00.jpeg" },
  { id: 16, name: "Modern Kid Style", price: 70, category: "Kids", img: "/products/kidsmale003.jpeg" },
  { id: 17, name: "Active Kid Gear", price: 60, category: "Kids", img: "/products/kidsmale01.jpeg" },
  { id: 18, name: "Elite Family Set", price: 120, category: "Combo", img: "/products/both_001.jpeg" },
  { id: 19, name: "Luxe Fashion Item 1", price: 110, category: "Fashion", img: "/products/WhatsApp Image 2026-03-14 at 7.11.46 PM.jpeg" },
  { id: 20, name: "Luxe Fashion Item 2", price: 130, category: "Fashion", img: "/products/WhatsApp Image 2026-03-14 at 7.11.47 PM.jpeg" },
  { id: 21, name: "Luxe Fashion Item 3", price: 140, category: "Fashion", img: "/products/WhatsApp Image 2026-03-14 at 7.11.48 PM.jpeg" },
];

const WHATSAPP_NUMBER = "15613182408"; 

// --- Shared Components ---

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;
    const moveCursor = (e) => {
      if (dotRef.current) { dotRef.current.style.left = `${e.clientX}px`; dotRef.current.style.top = `${e.clientY}px`; }
      if (outlineRef.current) { outlineRef.current.style.left = `${e.clientX}px`; outlineRef.current.style.top = `${e.clientY}px`; outlineRef.current.style.transform = `translate(-50%, -50%)`; }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return (
    <>
      <div ref={dotRef} className="fixed w-2 h-2 bg-[#10B981] rounded-full pointer-events-none z-[9999] hidden lg:block" style={{ transform: 'translate(-50%, -50%)' }} />
      <div ref={outlineRef} className="fixed w-10 h-10 border border-[#10B981]/30 rounded-full pointer-events-none z-[9998] transition-transform duration-100 hidden lg:block" />
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
        <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 md:w-14 md:h-14 bg-[#10B981] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [{ name: "New Arrivals", href: "#home" }, { name: "Catalog", href: "#shop" }, { name: "About", href: "#about" }];
  const handleLinkClick = (href) => { setIsOpen(false); const element = document.querySelector(href); if (element) { element.scrollIntoView({ behavior: 'smooth' }); } };
  return (
    <nav className="fixed w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3 md:py-4 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick("#home"); }} className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 uppercase">ALPHA<span className="text-[#10B981]">OMEGA</span></a>
        <div className="hidden lg:flex space-x-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          {navLinks.map((link) => ( <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }} className="hover:text-[#10B981] transition-colors">{link.name}</a> ))}
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="text-slate-400 hover:text-[#10B981] transition-colors"><Search size={20} /></button>
          <div className="relative">
             <button className="bg-[#10B981] text-white w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg shadow-[#10B981]/20 transition-transform hover:scale-110"><ShoppingBag size={18} md:size={20} /></button>
             <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-900 z-[110]"> {isOpen ? <X size={24} /> : <Menu size={24} />} </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-0 left-0 w-full min-h-screen bg-white z-[105] flex flex-col items-center justify-center lg:hidden" >
            <div className="flex flex-col items-center space-y-8 text-center">
               {navLinks.map((link) => ( <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }} className="text-2xl font-black text-slate-900 uppercase tracking-[0.2em] hover:text-[#10B981] transition-all" > {link.name} </a> ))}
               <a href="#shop" onClick={(e) => { e.preventDefault(); handleLinkClick("#shop"); }} className="bg-[#10B981] text-white font-black py-4 px-12 rounded-2xl text-sm uppercase tracking-widest shadow-xl" > SHOP NOW </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    { title: "Alpha Signature Bags", subtitle: "2026 Collection", price: "$120", img: "/products/bag.jpeg" },
    { title: "Junior Explorer Line", subtitle: "Premium Kids Gear", price: "$45", img: "/products/kids0.jpeg" }
  ];
  return (
    <section id="home" className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 md:py-20">
        <div className="lg:col-span-4 z-20 order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} >
            <div className="flex items-center space-x-3 mb-6"> <span className="w-10 h-[1px] bg-[#10B981]"></span> <span className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.4em]">Elite Collective</span> </div>
            <h1 className="text-4xl md:text-8xl font-black text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 md:mb-10 uppercase"> UPGRADE <br /> <span className="text-[#10B981] italic">YOUR STYLE.</span> </h1>
            <div className="space-y-6 md:space-y-8 mb-10">
               <div className="flex items-start space-x-4"> <div className="bg-white p-3 rounded-2xl shadow-sm text-[#10B981] flex-shrink-0"><Tag size={20} /></div> <div> <h4 className="font-black text-slate-900 text-sm uppercase">Handpicked Pieces</h4> <p className="text-slate-400 text-xs">Curated for maximum quality and visual impact.</p> </div> </div>
               <div className="flex items-start space-x-4"> <div className="bg-white p-3 rounded-2xl shadow-sm text-[#10B981] flex-shrink-0"><MessageCircle size={20} /></div> <div> <h4 className="font-black text-slate-900 text-sm uppercase">WhatsApp Orders</h4> <p className="text-slate-400 text-xs">Direct human contact for every single purchase.</p> </div> </div>
            </div>
            <a href="#shop" className="inline-flex items-center space-x-4 group"> <div className="bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:bg-[#10B981] group-hover:scale-110"> <ArrowRight size={24} /> </div> <span className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-2 border-[#10B981] pb-1">Browse Items</span> </a>
          </motion.div>
        </div>
        <div className="lg:col-span-8 relative h-[400px] sm:h-[500px] md:h-[750px] flex items-center order-1 lg:order-2">
           <AnimatePresence mode="wait">
             <motion.div key={activeBanner} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }} className="w-full h-full rounded-[40px] md:rounded-[60px] overflow-hidden relative shadow-2xl border-4 border-white" >
                <img src={banners[activeBanner].img} className="w-full h-full object-cover" alt="Showcase" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6">
                   <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/20 w-full md:w-auto">
                      <p className="text-[8px] md:text-[10px] font-black text-[#10B981] uppercase tracking-widest mb-1 md:mb-2">{banners[activeBanner].subtitle}</p>
                      <h3 className="text-xl md:text-5xl font-black text-white tracking-tighter uppercase mb-3 md:mb-4">{banners[activeBanner].title}</h3>
                      <div className="flex items-center space-x-4"> <span className="text-[#10B981] font-black text-[8px] md:text-[10px] uppercase tracking-widest flex items-center gap-1"><Eye size={12} md:size={14} /> Details</span> </div>
                   </div>
                   <div className="flex space-x-2 md:space-x-4"> <button onClick={() => setActiveBanner((prev) => (prev + 1) % banners.length)} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl hover:bg-[#10B981] hover:text-white transition-all"> <ChevronRight size={24} /> </button> </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
  const message = encodeURIComponent(`Hello AlphaOmega! I want to order: *${product.name}*. Is it available?`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  return (
    <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[30px] md:rounded-[40px] overflow-hidden product-shadow transition-all group" >
      <div className="aspect-square overflow-hidden relative">
        <img src={product.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
        <div className="absolute top-4 left-4 md:top-6 md:left-6"> <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1 rounded-full uppercase tracking-widest">{product.category}</span> </div>
        <button className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors shadow-lg"> <Heart size={18} /> </button>
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
           <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white font-black py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl text-xs md:text-base uppercase" > WhatsApp <MessageCircle className="ml-2 md:ml-3 text-[#10B981]" size={16} md:size={18} /> </a>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-2 md:mb-4"> <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase line-clamp-1">{product.name}</h4> </div>
        <div className="flex items-center space-x-1 mb-4 md:mb-6 text-yellow-400"> {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)} <span className="text-slate-400 text-[8px] md:text-[10px] ml-2 font-black uppercase tracking-widest italic">Authentic</span> </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 font-bold text-[8px] md:text-[10px] text-slate-900 flex items-center justify-center hover:bg-[#10B981] hover:text-white hover:border-[#10B981] transition-all uppercase tracking-[0.2em]" > Check Availability </a>
      </div>
    </motion.div>
  );
};

const ProductCatalog = () => (
  <section id="shop" className="py-20 md:py-32 px-4 md:px-12 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 text-center md:text-left">
        <div> <h2 className="text-[#10B981] text-[10px] font-black uppercase tracking-[0.5em] mb-4">The Catalog</h2> <h3 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">PREMIUM <br /> SELECTION.</h3> </div>
        <button className="flex items-center space-x-3 px-6 py-3 md:px-8 md:py-4 bg-slate-50 rounded-xl md:rounded-2xl text-[10px] font-black text-slate-500 hover:text-[#10B981] transition-all uppercase tracking-widest w-full md:w-auto justify-center"> <Filter size={18} /> <span>All Categories</span> </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"> {PRODUCTS.map(p => ( <ProductCard key={p.id} product={p} /> ))} </div>
      <div className="mt-12 md:mt-20 text-center"> <button className="bg-slate-900 text-white font-black py-5 px-12 md:py-6 md:px-16 rounded-2xl md:rounded-[30px] text-[10px] uppercase tracking-[0.3em] hover:bg-[#10B981] transition-all shadow-2xl w-full md:w-auto"> Explore More </button> </div>
    </div>
  </section>
);

const TrustSection = () => {
  const feats = [
    { t: "Fast Delivery", d: "Reliable shipping across Port-au-Prince and regions.", i: <Truck /> },
    { t: "Secure Checkout", d: "Order directly through WhatsApp verified human chat.", i: <ShieldCheck /> },
    { t: "Elite Quality", d: "Every item is hand-inspected for absolute perfection.", i: <Star /> }
  ];
  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-12 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {feats.map((f, i) => (
          <div key={i} className="flex flex-col items-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[30px] md:rounded-[40px] bg-white flex items-center justify-center text-[#10B981] mb-6 md:mb-8 shadow-xl transition-transform group-hover:scale-110"> {React.cloneElement(f.i, { size: 36 })} </div>
            <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 uppercase tracking-tight italic">{f.t}</h4>
            <p className="text-slate-500 font-light leading-relaxed text-sm max-w-[250px]">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-24 md:pt-40 pb-12 px-4 md:px-12 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-32">
        <div className="lg:col-span-1">
          <div className="text-2xl md:text-3xl font-black tracking-tighter mb-8 md:mb-10 uppercase">ALPHA<span className="text-[#10B981]">OMEGA</span></div>
          <p className="text-slate-400 font-light leading-relaxed mb-10 max-w-xs text-sm mx-auto md:mx-0"> Defining the new standard for premium local shopping. Quality first, always. </p>
          <div className="flex justify-center md:justify-start space-x-6 text-slate-500"> <Instagram className="hover:text-[#10B981] transition-colors cursor-pointer" size={24} /> <Twitter className="hover:text-[#10B981] transition-colors cursor-pointer" size={24} /> <Facebook className="hover:text-[#10B981] transition-colors cursor-pointer" size={24} /> </div>
        </div>
        <div> <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 text-slate-500">Links</h5> <ul className="space-y-4 md:space-y-6 text-white text-xs md:text-sm font-bold uppercase tracking-widest"> <li><a href="#home">New Arrivals</a></li> <li><a href="#shop">Best Sellers</a></li> <li><a href="#about">About Us</a></li> </ul> </div>
        <div className="hidden sm:block"> <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 text-slate-500">Service</h5> <ul className="space-y-4 md:space-y-6 text-white text-xs md:text-sm font-bold uppercase tracking-widest"> <li><a href="#">WhatsApp Support</a></li> <li><a href="#">Shipping</a></li> <li><a href="#">FAQ</a></li> </ul> </div>
        <div> <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 text-slate-500">Newsletter</h5> <div className="flex flex-col space-y-4 md:space-y-6"> <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 p-5 rounded-xl md:rounded-2xl outline-none focus:border-[#10B981] transition-all text-xs text-center md:text-left" /> <button className="bg-[#10B981] text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] uppercase tracking-[0.3em]">Subscribe</button> </div> </div>
      </div>
      <div className="text-[8px] md:text-[9px] text-slate-600 font-black uppercase tracking-[0.4em] md:tracking-[0.5em] pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"> <p>© 2026 ALPHAOMEGA EXCLUSIVE — HAITI</p> <p className="italic">Crafted with Excellence by Daky_400$/day</p> </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="selection:bg-[#10B981] selection:text-white bg-slate-50">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  );
}

export default App;
