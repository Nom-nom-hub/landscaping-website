"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Logo from "@/components/Logo";
import ChatBot from "@/components/ChatBot";

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
          onClick={onClose} 
          aria-hidden="true"
        />
      </div>
      
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[320px] bg-white dark:bg-stone-900 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-stone-700">
            <Logo />
            <button 
              onClick={onClose} 
              className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label="Close menu"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-6">
            <button 
              onClick={toggleTheme} 
              className="w-full flex items-center gap-3 px-4 py-3 mb-6 text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              {theme === "light" ? "🌙" : "☀️"} Toggle Theme
            </button>
            
            <nav className="space-y-2 mb-6">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-4 text-lg font-medium text-stone-700 dark:text-stone-200 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 rounded-xl transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="p-6 border-t border-stone-200 dark:border-stone-700">
            <div className="space-y-3">
              <a href="tel:+19412183924" className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-lg">
                📞 (941) 218-3924
              </a>
              <a href="sms:+19412183924" className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-semibold rounded-xl transition-colors">
                💬 Text Us
              </a>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 text-center text-sm text-stone-500">
              <p>📍 Lehigh • Fort Myers • Cape Coral</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const services = [
  { value: "mowing", label: "Lawn Mowing", desc: "Professional grass cutting every visit", price: "Starting $35" },
  { value: "weedeating", label: "Weed Eating", desc: "Edge and trim around obstacles", price: "Starting $20" },
  { value: "hedges", label: "Hedge Trimming", desc: "Shape and trim hedges & shrubs", price: "Starting $30" },
  { value: "blowing", label: "Blowing", desc: "Clean walkways and driveways", price: "Starting $15" },
  { value: "weedcontrol", label: "Weed Control", desc: "Keep your yard weed-free", price: "Starting $40" },
  { value: "landscaping", label: "Landscape Design", desc: "Install shrubs, flowers & more", price: "Call for quote" },
  { value: "removal", label: "Brush & Shrub Removal", desc: "Remove unwanted plants & brush", price: "Starting $50" },
  { value: "clearing", label: "Land Clearing", desc: "Skid steer & lot clearing", price: "Call for quote" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const quoteReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();

  return (
    <main className={`min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-stone-950' : 'bg-stone-50'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-lg shadow-lg shadow-black/5' : 'bg-transparent'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3 group">
              <div className="h-10 transition-transform duration-500 group-hover:scale-105">
                <Logo />
              </div>
            </a>
            
            <div className="hidden lg:flex items-center gap-8">
              {["Services", "About", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} 
                   className="relative text-sm text-stone-600 dark:text-stone-300 hover:text-green-600 dark:hover:text-green-400 tracking-wide transition-all duration-300 font-medium py-2">
                  {item}
                </a>
              ))}
              <div className="flex items-center gap-3 ml-4 pl-8 border-l border-stone-200 dark:border-stone-700">
                <button onClick={toggleTheme} 
                        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 text-sm">
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                <a href="tel:+19412183924" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-green-600/40">
                  <span>📞</span>
                  <span>(941) 218-3924</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 block">
              <a href="tel:+19412183924" className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white text-xl">
                📞
              </a>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-14 h-14 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center shadow-lg border-2 border-stone-300 dark:border-stone-600 active:bg-green-100"
                aria-label="Toggle menu"
                type="button"
              >
                <svg className="w-7 h-7 text-stone-800 dark:text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=85" 
            alt="Perfect lawn"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div ref={heroReveal.ref} className={`relative max-w-[1600px] mx-auto px-8 lg:px-16 pt-32 pb-20 transition-all duration-1000 z-20 ${
          heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-12 h-1 bg-green-500"></div>
                <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">Est. 2021</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-white mb-2">
                On The Land
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-green-500 italic mb-8">
                Lawn Service
              </h2>
              
              <p className="text-lg text-stone-300 leading-relaxed mb-6 max-w-xl">
                Premium lawn care for Lehigh Acres, Fort Myers & Cape Coral. From weekly mowing to land clearing with skid steer—we do it all.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-2 bg-stone-800 text-white text-sm rounded-full border border-stone-700">Lawn Mowing</span>
                <span className="px-4 py-2 bg-stone-800 text-white text-sm rounded-full border border-stone-700">Weed Control</span>
                <span className="px-4 py-2 bg-stone-800 text-white text-sm rounded-full border border-stone-700">Land Clearing</span>
                <span className="px-4 py-2 bg-stone-800 text-white text-sm rounded-full border border-stone-700">Landscape Design</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+19412183924" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all duration-300 text-lg">
                  <span>📞</span>
                  <span>(941) 218-3924</span>
                </a>
                <a href="#contact" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-800 hover:bg-stone-700 text-white font-semibold rounded-lg border border-stone-700 transition-all duration-300">
                  Get Free Quote
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-green-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 border border-green-500/30 shadow-2xl shadow-green-900/20">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600/20 rounded-full mb-4">
                    <span className="text-4xl">🌿</span>
                  </div>
                  <h3 className="text-white font-bold text-lg">Why Choose Us</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: "🛡️", text: "Licensed & Insured" },
                    { icon: "⏱️", text: "12+ Years Experience" },
                    { icon: "💰", text: "Free Estimates" },
                    { icon: "👨‍👩‍👧", text: "Family Owned & Local" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-stone-700/50 rounded-xl px-4 py-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-stone-100 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-stone-600">
                  <p className="text-center text-stone-400 text-xs uppercase tracking-wider mb-3">Service Areas</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Lehigh Acres", "Fort Myers", "Cape Coral", "N Ft Myers", "Estero"].map((area, i) => (
                      <span key={i} className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full border border-green-500/30">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900 to-transparent z-10"></div>
      </section>

      {/* Trust Bar */}
      <section className="bg-green-600 text-white py-4">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium">
            <span className="flex items-center gap-2">✓ Licensed & Insured</span>
            <span className="flex items-center gap-2">✓ 12+ Years Experience</span>
            <span className="flex items-center gap-2">✓ Free Estimates</span>
            <span className="flex items-center gap-2">✓ Family Owned</span>
            <span className="flex items-center gap-2">✓ Local References</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsReveal.ref} className={`py-20 bg-stone-900 text-white transition-all duration-1000 ${statsReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{n: 500, s: "+", l: "Jobs Done"}, {n: 12, s: "+", l: "Years Experience"}, {n: 100, s: "%", l: "Satisfaction"}, {n: 6, s: "", l: "Service Areas"}].map((item, i) => (
              <div key={i} className="transform transition-all duration-700">
                <p className="text-5xl md:text-6xl font-bold text-green-400 mb-2"><AnimatedNumber value={item.n} suffix={item.s} /></p>
                <p className="text-xs tracking-[0.2em] text-stone-400 uppercase">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white dark:bg-stone-950 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] text-green-600 uppercase mb-4 block font-bold">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="text-stone-500">5.0 average from 50+ reviews</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Maria Rodriguez", location: "Lehigh Acres", text: "TJ and his crew are amazing! My lawn looks better than it has in years. They show up on time, do a thorough job, and always clean up after themselves. The prices are fair and the service is top-notch. Highly recommend!", rating: 5 },
              { name: "James Thompson", location: "Fort Myers", text: "Called On The Land for land clearing on my half-acre lot. TJ brought his skid steer and got the whole thing done in one day. Professional, clean work, and the crew was super friendly. Will definitely use them again.", rating: 5 },
              { name: "Sandra Williams", location: "Cape Coral", text: "I've been through three lawn services in two years. TJ and his team are different. They actually care about doing a good job. My hedges look great, edges are crisp, and they text me when they're coming. Finally found our forever lawn guys!", rating: 5 },
              { name: "David Chen", location: "Lehigh Acres", text: "Had them do weed control and prevention treatment. No weeds in my yard for the first time in forever! TJ was honest about what my lawn needed and didn't try to oversell me on services I didn't need. Real pros.", rating: 5 },
              { name: "Patricia Johnson", location: "Fort Myers", text: "My husband and I are seniors and needed someone reliable. On The Land has been servicing our yard for 8 months now and we've never had a problem. TJ is always respectful, does great work, and the yard always looks wonderful.", rating: 5 },
              { name: "Michael Brown", location: "North Fort Myers", text: "Used them for landscape design and installation. TJ helped us pick out plants that would actually survive our Florida heat. The result exceeded our expectations. Fair price for excellent work. Give them a call!", rating: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-8 border border-stone-100 dark:border-stone-800 hover:shadow-xl hover:border-green-200 dark:hover:border-green-800 transition-all duration-300">
                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  ))}
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">{review.name}</p>
                    <p className="text-sm text-stone-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-stone-100 to-white dark:from-stone-900 dark:to-stone-950">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Coming Soon
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">Our Work Gallery</h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">Stunning lawn transformations and landscape projects. Check back soon to see what we can do for your yard!</p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                } ${i === 5 ? 'col-span-2 md:col-span-1' : ''}`}>
                  <div className={`${i === 0 ? 'aspect-square' : 'aspect-[4/3]'} bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-700 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:border-green-400 dark:group-hover:border-green-600`}>
                    <div className="w-16 h-16 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center">
                      <svg className="w-8 h-8 text-stone-400 dark:text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-stone-400 dark:text-stone-500">Photo {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-100/80 via-transparent to-transparent dark:from-stone-900/80 pointer-events-none rounded-3xl"></div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-stone-500 dark:text-stone-400 mb-6">Want to see examples of our work?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+19412183924" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all">
                <span>📞</span>
                <span>Call TJ for Photos</span>
              </a>
              <a href="sms:+19412183924" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-semibold rounded-xl transition-all">
                <span>💬</span>
                <span>Text Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">From regular lawn maintenance to land clearing - we do it all. No job too big or small!</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div key={i} className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-stone-200 dark:border-stone-700 text-center">
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">{s.label}</h3>
                <p className="text-stone-500 text-sm mb-4">{s.desc}</p>
                <div className="flex items-center justify-center gap-2">
                  <a href="tel:+19412183924" className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all">
                    📞 Call
                  </a>
                  <a href="sms:+19412183924" className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 text-sm font-semibold rounded-lg transition-all">
                    💬 Text
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-[1600px] mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Land Clearing or Skid Steer Work?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">We handle lot clearing, brush removal, and heavy equipment jobs. Call or text for a free estimate!</p>
          <a href="tel:+19412183924" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-stone-100 transition-all shadow-lg text-lg">
            📞 Call or Text: (941) 218-3924
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs tracking-[0.3em] text-green-600 uppercase mb-4 block font-bold">About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">
                Your Local Lawn Care
                <br />
                <span className="text-stone-400 font-light italic">Experts</span>
              </h2>
              <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
                <p>
                  <strong className="text-stone-900 dark:text-white">On The Land Lawn Service</strong> has been serving Lehigh, Fort Myers, and Cape Coral since 2021. 
                  With over 12 years of experience, we know what it takes to keep your lawn looking great.
                </p>
                <p>
                  We handle everything from regular grass cutting to full land clearing projects. Licensed and insured for your peace of mind.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["Lawn Mowing", "Weed Eating", "Hedge Trimming", "Land Clearing", "Blowing", "Skid Steer Work"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />{s}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-3xl p-10">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">Service Areas</h3>
              <div className="space-y-3">
                {["Lehigh Acres", "Fort Myers", "Cape Coral", "North Fort Myers", "Estero", "Bonita Springs"].map((area, i) => (
                  <div key={i} className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                    <span className="text-green-500">📍</span> {area}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700">
                <p className="text-sm text-stone-500 mb-2">Questions? We have reviews!</p>
                <p className="font-bold text-stone-900 dark:text-white">Call or text anytime: <span className="text-green-600">(941) 218-3924</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-stone-900">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] text-green-500 uppercase mb-4 block font-bold">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform
              <br />
              <span className="text-green-500">Your Lawn?</span>
            </h2>
            <p className="text-stone-400 mb-10 text-lg">
              Give us a call or send a text. We'll discuss your needs and provide a free estimate.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <a href="tel:+19412183924" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all duration-300 text-xl shadow-lg shadow-green-600/30">
                <span>📞</span>
                <span>(941) 218-3924</span>
              </a>
              <a href="sms:+19412183924" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-stone-800 hover:bg-stone-700 text-white font-semibold rounded-xl border border-stone-700 transition-all duration-300 text-lg">
                <span>💬</span>
                <span>Text Us</span>
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-stone-400">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Lehigh • Fort Myers • Cape Coral</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span>Mon-Sat: 7am - 6pm</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 pb-24 lg:pb-12">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Logo />
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-stone-400 text-sm mb-2">© 2026 On The Land Lawn Service. All rights reserved.</p>
              <a href="https://designsbyteck.com" target="_blank" rel="noopener noreferrer" className="text-xs text-stone-500 hover:text-green-400 transition-colors" style={{fontFamily: 'Georgia, serif', fontStyle: 'italic'}}>
                Designed By Teck AKA twin
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ChatBot />
    </main>
  );
}