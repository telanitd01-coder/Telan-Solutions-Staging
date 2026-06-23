import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Globe, Award, Users, BookOpen, TrendingUp, CheckCircle2, Quote, Sparkles, Rocket, Heart, Play, Pause, Volume2, Maximize, ExternalLink, Calendar, Building2, Target, Server, ShieldCheck, Cpu, Wifi, Database, Network, Lock, MessageCircle, PhoneCall, BarChart3, LayoutDashboard, Wallet, UserCog, Search, CheckSquare, Navigation2, Smile, Zap, MessageSquareText, Trash2, FileText } from 'lucide-react';
import { useState, useEffect, useRef, ChangeEvent, FormEvent, DragEvent, MouseEvent } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import CulturePage from './components/CulturePage';

// --- Shared Components ---


const SectionHeader = ({ title, subtitle, light = false, boldSubtitle = false }: { title: string; subtitle?: string; light?: boolean; boldSubtitle?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-brand-blue'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`max-w-2xl mx-auto text-lg ${light ? 'text-blue-100' : 'text-slate-600'} ${boldSubtitle ? 'font-bold' : ''}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={`h-1 w-20 mx-auto mt-6 rounded-full ${light ? 'bg-brand-gold' : 'bg-brand-gold'}`}
    />
  </div>
);

// --- Navigation ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'About Us', href: '/about', isPage: true },
    { name: 'Technology', href: '/technology', isPage: true },
    { name: 'Culture', href: '/culture', isPage: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-brand-gold/10">
            <img 
              src="https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/logo.png" 
              alt="Telan Solutions Logo" 
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled || !isHomePage ? 'text-brand-blue' : 'text-white'}`}>
            TELAN SOLUTIONS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
             link.isPage ? (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-sm font-medium transition-colors hover:text-brand-gold ${isScrolled || !isHomePage ? 'text-brand-blue' : 'text-white'}`}
              >
                {link.name}
              </Link>
             ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-brand-gold ${isScrolled || !isHomePage ? 'text-brand-blue' : 'text-white'}`}
              >
                {link.name}
              </a>
             )
          ))}
          <Link to="/jobs" className="btn-primary py-2 px-6 text-sm">Apply Now</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
          {isMenuOpen ? 
            <X className={isScrolled || !isHomePage ? 'text-brand-blue' : 'text-white'} /> : 
            <Menu className={isScrolled || !isHomePage ? 'text-brand-blue' : 'text-white'} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white absolute top-full left-0 right-0 shadow-xl border-t border-slate-100"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link key={link.name} to={link.href} onClick={() => setIsMenuOpen(false)} className="text-brand-blue font-medium text-lg">
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-brand-blue font-medium text-lg">
                  {link.name}
                </a>
              )
            ))}
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full text-center">Apply Now</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// --- Data ---

const JOBS_DATA = [
  { 
    id: 1,
    title: "Field Collector", 
    type: "Full-Time", 
    location: "Pasig City", 
    req: "Knows NCR areas well",
    description: "As a Field Collector, you will be responsible for visiting clients and customers at their locations to discuss and collect outstanding balances. This role requires excellent negotiation skills and a strong knowledge of NCR geography.",
    responsibilities: [
      "At least 6 months experience in collections.",
      "Willing to do field work.",
      "With good negotiation and comunication skills.",
      "Familiar with routes and areas is an advantage.",
      "With valid driver's license."
    ]
  },
  { 
    id: 2,
    title: "Repossessor", 
    type: "Full-Time", 
    location: "Pasig City", 
    req: "Knows NCR areas well",
    description: "Repossessors are tasked with recovering collateral for delinquent accounts. This is a high-stakes role that requires professionalism, precision, and adherence to legal protocols during recovery operations.",
    responsibilities: [
      "At least 1 year experience in reposesion.",
      "Knowledgeable in asset recovery procedures.",
      "Physically fit and willing to do field operations.",
      "Strong coordination and problem-solving skills.",
      "With valid driver's license."
    ]
  },
  { 
    id: 3,
    title: "Company Driver", 
    type: "Full-Time", 
    location: "NCR Region", 
    req: "Knows NCR areas well",
    description: "Our Company Drivers ensure safe and timely transportation for staff and assets across the NCR. We are looking for responsible individuals with a clean driving record and a proactive attitude.",
    responsibilities: [
      "At least 1 year driving experience.",
      "With professional driver's license.",
      "Knowledgeable in Metro Manila routes.",
      "Responsible, punctual, and trustworthy.",
      "Can assist in field assignments if needed."
    ]
  },
  { 
    id: 4,
    title: "Account Officer", 
    type: "Full-Time", 
    location: "Pasig City", 
    req: "Experience Preferred",
    description: "Account Officers manage a portfolio of accounts, negotiating payment terms and maintaining professional relationships with customers to ensure successful debt resolution.",
    responsibilities: [
      "Bachelor's degree in any field.",
      "Excellent communication and negotiation skills.",
      "Ability to handle pressure and meet targets.",
      "Proficient in basic MS Office applications.",
      "Previous experience in BPO or collections is an advantage."
    ]
  }
];

// --- Sections ---

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-blue">
    <div className="absolute inset-0 z-0">
      <img 
        src="http://telansolutions.com/wp-content/uploads/2016/08/TELAN-24-642x300.jpg" 
        alt="Telan Solutions Office" 
        className="w-full h-full object-cover opacity-30 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent" />
    </div>

    <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
       
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
          Build Your Career with <span className="text-brand-gold">Purpose</span> at Telan Solutions
        </h1>
        <p className="text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
          Experience growth, professional training, and a supportive environment in one of the Philippines' most trusted Collection Agency.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/jobs" className="btn-primary">Apply Now</Link>
          <a href="#culture" className="btn-outline border-white text-white hover:bg-white hover:text-brand-blue">Explore Telan</a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden lg:block relative"
      >
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
            alt="Team Meeting" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="careers" className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative group lg:pr-8"
        >
          {/* Main Image Container */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 bg-slate-50 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              src="https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/telan-bldg.png"  
              alt="Telan Solutions Office Interior"
              className="w-full h-full object-cover rounded-3xl"
              loading="lazy"
            />
            
            {/* Premium Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Glossy Reflection Guard */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
          </div>

          {/* Abstract Design Accent */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-gold/20 transition-colors duration-500" />
          <div className="absolute -bottom-8 -right-4 w-40 h-40 bg-brand-blue/5 rounded-full blur-[80px] -z-10" />
          
          {/* Decorative Corner Element */}
          <div className="absolute top-10 -right-4 w-32 h-32 bg-brand-gold rounded-3xl -z-10 hidden md:block opacity-20 rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" />
        </motion.div>

        <div>
          <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-4 block">About Telan Solutions</span>
          <h2 className="text-4xl font-bold text-brand-blue mb-6">A Trusted Collection Agency Delivering Results Since 1998</h2>
          <div className="space-y-6 text-slate-600 text-lg">
            <p>
              Telan Solutions is a leading receivables management solutions provider in the Philippines. As the strategic BPO partner of <strong>Telan Hipe Flores Telan & Associates</strong> law firm, we combine legal expertise with operational excellence.
            </p>
            <p>
              With hundreds of employees and growing, we are trusted by major clients across the banking and telecommunications sectors. We pride ourselves on being a company that invests in people, not just performance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-10">
            <div>
              <h4 className="text-3xl font-bold text-brand-blue">25+</h4>
              <p className="text-slate-500">Years of Services</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-brand-blue">Hundreds</h4>
              <p className="text-slate-500">of Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="section-padding bg-brand-blue relative overflow-hidden">
    {/* Animated Decorative BG */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-20 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-[120px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue via-brand-blue/95 to-brand-blue" />
    </div>

    <div className="container-custom relative z-10">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Mission */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl"
        >
          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8">
            <Rocket className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-8 italic">Our <span className="text-brand-gold underline decoration-brand-gold/30 underline-offset-8">Mission</span></h3>
          <div className="space-y-8">
            <div className="flex items-start space-x-5">
              <div className="mt-1.5 w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              </div>
              <p className="text-blue-50 text-xl leading-relaxed font-light">
                To provide our well-known brand of service to our numerous clients to improve the management of their receivables and allow them to focus on their core business.
              </p>
            </div>
            <div className="flex items-start space-x-5">
              <div className="mt-1.5 w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              </div>
              <p className="text-blue-50 text-xl leading-relaxed font-light">
                To create technically proficient and ethically grounded employees by creating platforms and programs for their professional development.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-brand-gold/5 to-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl flex flex-col justify-center relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-gold/10 rounded-full blur-[60px]" />
          
          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-8 italic">Our <span className="text-brand-gold underline decoration-brand-gold/30 underline-offset-8">Vision</span></h3>
          <blockquote className="relative">
            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-brand-gold/10" />
            <p className="text-2xl md:text-3xl font-bold text-white leading-tight italic tracking-tight">
              To be the country's most admired receivables management solutions provider, driven by excellence, innovation, compliance, and client success.
            </p>
          </blockquote>
          <div className="mt-12 h-1.5 w-32 bg-brand-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        </motion.div>
      </div>
    </div>
  </section>
);

const WhyWorkWithUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote: "I am grateful to Telan Solutions for believing in my potential and giving me opportunities to lead, learn, and grow. The company helped me become more efficient, resilient, and confident, while also shaping me into a better individual beyond the workplace.",
      name: "Edwin Devilles",
      role: "Team Manager, Joined 2016",
      images: [
        "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/edwin_devilles.png",

      ]
    },
    {
     quote: "Thank you, Telan Company. Because of your trust in me, I have grown immensely and now truly believe in my ability to achieve my dreams. You gave me the opportunity to develop and reach my fullest potential. Telan has been a profound source of inspiration, constantly reminding me that I am always capable of achieving more.",
      name: "Michael Yamson",
      role: "Team Manager, Joined 2009",
      images: [
        "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/yamson.png",
        
      ]
    },
        {
      quote: "Telan Solutions gave me the tools to succeed. The Account Officer role is challenging but the rewards and the team support make it worth it.",
      name: "Avelino Tabangcura",
      role: "Account Officer, Joined 2000",
      images: [
        "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/avelino-images.png",
        
      ]
    },
        {
       quote: "Working at Telan Solutions as an Admin Officer has been a truly rewarding experience. I’m grateful to be part of a company where management genuinely cares about its employees, not only professionally but also personally.",
      name: "Violet Miranda",
      role: "Admin Officer, Joined 2010",
      images: [
        "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/violet-images.jpg",
        
      ]
    },
    {
      quote: "The supportive environment here at Telan helped me grow from an IT Support to a Senior Network Administrator. It's more than a job, it's a family.",
      name: "Alvin Mangulad",
      role: "Senior Network Administrator, Joined 2001",
      images: [
        "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/src/images/alvin-images.png",
        
      ]
    }
    
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const perks = [
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-gold" />,
      title: "Career Growth",
      desc: "We promote from within. Your performance opens doors to leadership roles."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-gold" />,
      title: "Expert Training",
      desc: "Perfect for fresh graduates. We provide comprehensive skills development."
    },
    {
      icon: <Users className="w-8 h-8 text-brand-gold" />,
      title: "Strong Culture",
      desc: "Found on mentorship and teamwork. You're never alone in your journey."
    },
    {
      icon: <Award className="w-8 h-8 text-brand-gold" />,
      title: "Rewards",
      desc: "Competitive compensation and performance-driven incentives."
    }
  ];

  return (
    <section className="section-padding bg-brand-gray">
      <div className="container-custom">
        <SectionHeader 
          title="Why Work With Us?" 
          subtitle="We don't just hire talent. We build it through continuous support and career development."
          boldSubtitle={true}
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className="mb-6">{perk.icon}</div>
              <h3 className="text-xl font-bold text-brand-blue mb-4">{perk.title}</h3>
              <p className="text-slate-600">{perk.desc}</p>
            </motion.div>
          ))}
        </div>

        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mt-24 p-8 md:p-12 bg-brand-blue rounded-3xl relative overflow-hidden min-h-[450px] flex items-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full"
            >
              <div className="text-white">
                <Quote className="w-12 h-12 text-brand-gold opacity-30 mb-6" />
                <h3 className="text-lg md:text-xl font-bold mb-8 italic leading-relaxed">
                  "{testimonials[currentSlide].quote}"
                </h3>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-bold text-brand-gold text-2xl">{testimonials[currentSlide].name}</p>
                    <p className="text-blue-100">{testimonials[currentSlide].role}</p>
                  </div>
                </div>
              </div>

              <div className={`hidden lg:grid ${testimonials[currentSlide].images.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-3'} gap-4 h-full items-center`}>
                {testimonials[currentSlide].images.map((img, idx) => (
                  <motion.img 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    src={img} 
                    alt="Telan Team" 
                    className={`rounded-[32px] w-full object-cover shadow-2xl border border-white/10 transition-all duration-700 ${
                      testimonials[currentSlide].images.length === 1 
                        ? 'h-[280px] aspect-square object-top' 
                        : idx === 1 ? 'h-48 mt-8' : 'h-40 mt-4'
                    }`} 
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-20">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-brand-gold w-4' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Auto-slide Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
            {!isPaused && (
              <motion.div 
                key={currentSlide}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 15, ease: "linear" }}
                className="h-full bg-brand-gold origin-left"
              />
            )}
            {isPaused && (
              <div 
                className="h-full bg-brand-gold/50"
                style={{ width: '100%', transform: 'scaleX(1)', opacity: 0.3 }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceLifeSection = () => {
  const slides = [
    {
      image: "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/events/xparty/Cparty_intro.JPG",
      title: "Christmas Party 2026",
      description: "Telan Glamorous Christmas, Rock the season. Shine the night.",
    },
    {
      image: "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/events/halloween/H1.jpg",
      title: "Halloween Party",
      description: ".",
    },
    {
      image: "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/events/sportfest/Sportfest_intro.jpg",
      title: "Sportfest",
      description: "Telan yearly sports festival.",
    },
    {
      image: "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/events/training/t1.jpg",
      title: "Training",
      description: ".",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section id="culture" className="section-padding bg-slate-950 text-white overflow-hidden relative min-h-[800px] flex items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            viewport={{ once: true }}
            className="text-brand-gold font-bold uppercase text-[10px] sm:text-xs mb-6 block"
          >
            Our Community & Culture
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
          >
            Experience Life at <span className="text-brand-gold">Telan Solutions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            See the culture, teamwork, events, and opportunities that make Telan Solutions a great place to build your career.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Photo Slider Wrapper */}
          <div className="relative aspect-video rounded-[32px] overflow-hidden bg-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 group-hover:shadow-[0_40px_120px_-10px_rgba(212,175,55,0.15)] transition-all duration-700">
            
            {/* Slides container */}
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/50 pointer-events-none" />
                  
                  {/* Dynamic Slide Content */}
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-20 max-w-3xl">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-brand-gold font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-2 block"
                    >
                     
                    </motion.span>
                    <motion.h3 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl sm:text-3xl font-bold mb-2 text-white leading-tight"
                    >
                      {slides[currentIndex].title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mb-5"
                    >
                      {slides[currentIndex].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link 
                        to="/culture"
                        className="inline-flex items-center space-x-1.5 bg-brand-gold hover:bg-white text-slate-950 hover:text-brand-blue font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all duration-350 shadow-lg shadow-brand-gold/15"
                      >
                        <span>See More Photos</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom Control Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-brand-gold hover:text-slate-950 border border-white/10 hover:border-brand-gold text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-brand-gold hover:text-slate-950 border border-white/10 hover:border-brand-gold text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute top-4 right-4 z-30 flex items-center space-x-1 bg-slate-950/45 backdrop-blur-md p-1.5 rounded-full border border-white/10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-5 bg-brand-gold' : 'w-1.5 bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Autoplay Play/Pause indicator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-slate-950/50 hover:bg-brand-gold hover:text-slate-950 border border-white/10 text-white backdrop-blur-sm opacity-60 hover:opacity-100 transition-all duration-300 hidden sm:block"
              title={isPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Edge Glare */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[32px]" />
          </div>

          {/* Floating Accents */}
          <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl text-brand-gold/20" />
        </motion.div>

        {/* Brand Pillars Overlay */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto pt-10 border-t border-white/5">
          {[
            { label: "Excellence", icon: <Sparkles className="w-5 h-5" /> },
            { label: "Integrity", icon: <TrendingUp className="w-5 h-5" /> },
            { label: "Teamwork", icon: <Users className="w-5 h-5" /> },
            { label: "Accountability", icon: <Award className="w-5 h-5" /> }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex items-center justify-center space-x-3 text-slate-500 hover:text-brand-gold transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                {pillar.icon}
              </div>
              <span className="text-sm font-semibold tracking-wider uppercase">{pillar.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JobOpenings = ({ limit }: { limit?: number }) => {
  const jobs = limit ? JOBS_DATA.slice(0, limit) : JOBS_DATA;

  const [selectedJob, setSelectedJob] = useState<null | typeof JOBS_DATA[0]>(null);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form input and feedback states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [highestEducation, setHighestEducation] = useState('College Graduate');
  const [shortSummary, setShortSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);

  const handleApply = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsApplicationSubmitted(false);
    setUploadedFile(null);
    setIsDragging(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setHighestEducation('College Graduate');
    setShortSummary('');
    setSubmitError(null);
    setShowMailtoFallback(false);
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
   if (!selectedJob) return;

    setIsSubmitting(true);
    setSubmitError(null);

    let fileData = "";
    let filename = "";

    if (uploadedFile) {
      try {
        fileData = await getBase64(uploadedFile);
        filename = uploadedFile.name;
      } catch (err) {
        console.error("Failed to parse file to Base64:", err);
      }
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          highestEducation,
          shortSummary,
          jobTitle: selectedJob.title,
          fileData,
          filename
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
    setIsApplicationSubmitted(true);
        setFullName('');
        setEmail('');
        setPhone('');
        setHighestEducation('College Graduate');
        setShortSummary('');
        setUploadedFile(null);
        setShowMailtoFallback(false);
    setTimeout(() => {
      setSelectedJob(null);
      setIsApplicationSubmitted(false);
        }, 6000);
      } else {
        setSubmitError(data.message || "Failed to submit application. Please try again.");
        setShowMailtoFallback(true);
      }
    } catch (err) {
      setSubmitError("Could not connect to the recruitment system. Please check your internet connection.");
      setShowMailtoFallback(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (e: MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="jobs" className="section-padding bg-brand-gray relative">
      <div className="container-custom">
        <SectionHeader 
          title="Join Our Team" 
          subtitle="Ready to take the next step? Explore our current openings and find your place at Telan Solutions."
        />
        
        <div className="grid gap-4 max-w-4xl mx-auto">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-slate-100 hover:border-brand-gold/50 transition-colors group"
            >
              <div>
                <h3 className="text-xl font-bold text-brand-blue mb-1 group-hover:text-brand-gold transition-colors">{job.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {job.location}</span>
                  <span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> {job.req}</span>
                </div>
              </div>
              <button 
                onClick={() => handleApply(job)}
                className="btn-primary mt-4 md:mt-0 md:px-6 md:py-2 text-sm"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              {/* Job Details Sidebar */}
              <div className="md:w-5/12 bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-slate-200">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="mb-8 p-2 hover:bg-slate-200 rounded-full transition-colors md:hidden absolute top-4 right-4"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>

                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-bold uppercase mb-4">
                    {selectedJob.type}
                  </span>
                  <h3 className="text-3xl font-bold text-brand-blue mb-2">{selectedJob.title}</h3>
                  <div className="flex items-center text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2" /> {selectedJob.location}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-brand-blue mb-2 text-sm uppercase tracking-wider">Description</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{selectedJob.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue mb-2 text-sm uppercase tracking-wider">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold mr-2 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="md:w-7/12 p-8">
                <button 
                   onClick={() => !isSubmitting && setSelectedJob(null)}
                  disabled={isSubmitting}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors hidden md:block disabled:opacity-50"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>

                {!isApplicationSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-6">
                      <h4 className="text-2xl font-bold text-brand-blue">Application Form</h4>
                      <p className="text-slate-500">Please fill in your details to apply for this position.</p>
                    </div>
                    
                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-150 rounded-2xl text-red-600 text-sm font-medium flex items-start space-x-2.5 shadow-sm">
                        <span className="text-base select-none leading-none">⚠️</span>
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all disabled:opacity-60 disabled:bg-slate-50" 
                          placeholder="Juan Dela Cruz" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                         <input 
                          required 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all disabled:opacity-60 disabled:bg-slate-50" 
                          placeholder="juan@example.com" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                         <input 
                          required 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all disabled:opacity-60 disabled:bg-slate-50" 
                          placeholder="+63 9XX XXX XXXX" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Highest Education</label>
                         <select 
                          value={highestEducation}
                          onChange={(e) => setHighestEducation(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent bg-white disabled:opacity-65 disabled:bg-slate-50"
                        >
                          <option value="College Graduate">College Graduate</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="High School">High School</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Upload CV / Resume</label>
                                            
                      {/* Hidden File Input */}
                      <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-file-input"
                        disabled={isSubmitting}
                      />

                      <div 
                        onClick={() => !isSubmitting && handleBrowseFiles()}
                        onDragOver={(e) => !isSubmitting && handleDragOver(e)}
                        onDragLeave={(e) => !isSubmitting && handleDragLeave(e)}
                        onDrop={(e) => !isSubmitting && handleDrop(e)}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 relative ${
                          isSubmitting ? 'cursor-not-allowed opacity-60 bg-slate-50' : 'cursor-pointer group'
                        } ${
                          isDragging 
                            ? 'border-brand-gold bg-brand-gold/10 scale-[1.02]' 
                            : uploadedFile 
                              ? 'border-green-400 bg-green-50/30' 
                              : 'border-slate-200 hover:border-brand-gold bg-transparent'
                        }`}
                        id="file-upload-dropzone"
                      >
                        {uploadedFile ? (
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                         <FileText className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-semibold text-slate-800 max-w-[280px] truncate" title={uploadedFile.name}>
                              {uploadedFile.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            {!isSubmitting && (
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="mt-4 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1"
                              id="remove-file-btn"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove File</span>
                            </button>
                            )}
                          </div>
                        ) : (
                          <div className="transition-all duration-300">
                            <Rocket className={`w-8 h-8 mx-auto mb-2 transition-colors ${
                              isDragging ? 'text-brand-gold animate-pulse' : 'text-slate-300 group-hover:text-brand-gold'
                            }`} />
                        <p className="text-sm font-medium text-slate-600">
                              {isDragging ? 'Drop your file here!' : 'Click to upload or drag and drop'}
                            </p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">PDF, DOCX (Max 5MB)</p>
                             </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Why should we hire you? (Short summary)</label>
                      <textarea 
                        rows={3} 
                        value={shortSummary}
                        onChange={(e) => setShortSummary(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all disabled:opacity-60 disabled:bg-slate-50" 
                        placeholder="Tell us something about your experience..."
                      ></textarea>
                    </div>

                    {showMailtoFallback && (
                      <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 text-sm space-y-4 shadow-sm">
                        <div className="flex items-start space-x-2.5">
                          <span className="text-xl select-none leading-none">💡</span>
                          <div className="space-y-1">
                            <strong className="block font-bold text-amber-900">Static Host Detected &amp; Ready</strong>
                            <p className="text-slate-750 text-xs leading-relaxed">
                              Because this site is running as a static web application on your hosting environment, it cannot process server-side code. Don't worry! We've automatically unlocked direct email delivery. Click below to submit your pre-filled information straight to <strong className="text-brand-blue">it.test@telanlaw.com</strong>.
                            </p>
                          </div>
                        </div>
                        <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                          <a 
                            href={`mailto:it.test@telanlaw.com?subject=${encodeURIComponent(`Job Application: ${fullName || 'Applicant'} - ${selectedJob.title}`)}&body=${encodeURIComponent(
                              `Dear Telan Solutions HR Team,\n\nI am pleased to submit my application for the position of "${selectedJob.title}".\n\nPersonal Details:\n------------------------------------------\n- Full Name: ${fullName || '[Name]'}\n- Email: ${email || '[Email]'}\n- Phone: ${phone || '[Phone]'}\n- Highest Education: ${highestEducation}\n\nCandidate Statement:\n------------------------------------------\n${shortSummary || '[Summary]'}\n\nIMPORTANT ATTACHMENT ACTION REQUIRED:\n------------------------------------------\n[Applicant] Please remember to check that your resume file (${uploadedFile ? uploadedFile.name : 'PDF/DOCX resume file'}) is attached to this email before sending!\n\nBest regards,\n${fullName || 'Applicant'}`
                            )}`}
                            className="flex-1 px-5 py-3.5 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-xl text-sm font-bold uppercase tracking-wider text-center transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg active:scale-[0.98]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Dispatch Application to it.test@telanlaw.com</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setShowMailtoFallback(false);
                              setSubmitError(null);
                            }}
                            className="px-4 py-3 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-center transition-all duration-300"
                          >
                            Reset Form
                          </button>
                        </div>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center space-x-2 disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Application...</span>
                        </>
                      ) : (
                        <span>Submit My Application</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8"
                  >
                     <div className="w-20 h-20 bg-green-150/10 text-green-600 rounded-full flex items-center justify-center border-2 border-green-500/20 mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-3.5xl font-bold text-brand-blue mb-4">Application Sent!</h4>
                    <p className="text-slate-650 text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you for applying for the <span className="font-bold text-brand-blue">{selectedJob.title}</span> position.<br /><br />
                      A copy of your complete application and CV has been forwarded directly to <strong className="text-brand-blue">it.test@telanlaw.com</strong>.<br /><br />
                      Our human resources department will review your profile shortly and reach out.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ApplicationProcess = () => {
  const steps = [
    { title: "1. Submit", desc: "Send us your CV through our portal or email." },
    { title: "2. Screening", desc: "Initial call to discuss your profile." },
    { title: "3. Interview", desc: "Meet the team and show your potential." },
    { title: "4. Offer", desc: "Simple and friendly job placement." },
  ];

  return (
    <section id="apply" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader 
          title="Application Process" 
          subtitle="Clear, friendly, and non-intimidating. We value your time."
        />
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-slate-100 -z-10" />
          {steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-brand-gold transition-colors shadow-sm">
                <span className="text-2xl font-bold text-brand-blue group-hover:text-brand-gold transition-colors">{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-2">{step.title.split(' ')[1]}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-brand-blue relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.1),transparent_50%)]" />
    </div>
    <div className="container-custom relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Start Your Career with Telan Today</h2>
      <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
        Join a company that values your growth as much as you do. Your future starts here.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/jobs" className="btn-primary bg-brand-gold text-slate-900 hover:bg-brand-gold-light border-none px-12 py-4">Apply Now</Link>
        <a href="mailto:hr.recruitment@telanlaw.com" className="btn-outline border-white text-white hover:bg-white hover:text-brand-blue px-12 py-4 flex items-center">
          <Mail className="w-5 h-5 mr-3" /> Contact HR
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-20 pb-10 bg-slate-950 text-slate-300">
    <div className="container-custom">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-brand-gold/10 border border-white/10">
              <img 
                src="https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/logo.png" 
                alt="Telan Solutions Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              TELAN SOLUTIONS
            </span>
          </Link>
          <p className="text-slate-400">
            A premier receivables management firm based in the Philippines, dedicated to excellence and people-first culture.
          </p>
          <div className="flex space-x-4">
            <Globe className="w-5 h-5 cursor-pointer hover:text-brand-gold" />
            <Phone className="w-5 h-5 cursor-pointer hover:text-brand-gold" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-brand-gold" />
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="hover:text-brand-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold">About</Link></li>
            <li><Link to="/culture" className="hover:text-brand-gold">Our Culture</Link></li>
            <li><Link to="/technology" className="hover:text-brand-gold">Technology</Link></li>
            <li><Link to="/jobs" className="hover:text-brand-gold">Open Jobs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Location</h4>
          <div className="space-y-4 text-sm">
            <p className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-brand-gold shrink-0" />
              <span>One San Miguel Avenue Building, Shaw Blvd Ortigas Center, Pasig, <br />NCR, Philippines</span>
            </p>
            <p className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-brand-gold" />
              <span>+63 (02) 8640-6600</span>
            </p>
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-brand-gold" />
              <span>info@telanlaw.com</span>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-white font-bold mb-6">Our Office</h4>
          <div className="relative group">
            {/* Animated Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-blue/20 rounded-[28px] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative w-full h-48 bg-slate-900 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3503112316656!2d121.0560731!3d14.5819777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c83f8f17255d%3A0x633390089851722e!2sOne%20San%20Miguel%20Avenue%20Building!5e0!3m2!1sen!2sph!4v1715570000000!5m2!1sen!2sph"
                 className="w-full h-full border-none grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                 allowFullScreen
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Telan Solutions Office Map"
               />
               
               {/* Subtle Glass Overlay on Edges */}
               <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[24px]" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>© 2026 Telan Solutions. Al Rights Reserved.</p>
        <p className="mt-4 md:mt-0"></p>
      </div>
    </div>
  </footer>
);

const TechnologyPage = () => (
  <main className="pt-24 min-h-screen bg-white">
    {/* Page Header */}
    <section className="bg-brand-blue text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      <div className="container-custom relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
        >
          Powering Results
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-8"
        >
          Our <span className="text-brand-gold">Technology</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
        >
          We leverage cutting-edge communication systems and secure infrastructure to provide world-class receivables management solutions.
        </motion.p>
      </div>
    </section>

    {/* System Logos / Overview */}
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="container-custom">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <div className="bg-white px-8 py-4 rounded-xl shadow-md border border-slate-100 mb-2">
               <span className="text-3xl font-black italic tracking-tighter text-slate-800">VOLARE<span className="text-brand-gold font-bold text-sm align-super">®</span></span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stay Collected</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-white px-8 py-4 rounded-xl shadow-md border border-slate-100 mb-2">
                <span className="text-2xl font-bold tracking-tight text-slate-800 flex items-center">
                  <div className="w-6 h-6 bg-brand-gold rounded-full mr-2" /> Roadie
                </span>
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency Driver</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="bg-white px-8 py-4 rounded-xl shadow-md border border-slate-100 mb-2">
                <span className="text-2xl font-black tracking-tight text-slate-800">AI <span className="text-brand-blue">RUDDER</span></span>
             </div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Voice AI Solutions</p>
          </div>
        </div>
      </div>
    </section>

    {/* Volare System Section */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-blue mb-4">Volare System Advantages</h2>
          <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "V-SMS (Volare SMS)",
              desc: "Integrated SMS feature sends out text messages to debtor's mobile phone without any additional hardware. Configure outbound SMS campaigns automatically based on criteria."
            },
            {
              icon: <PhoneCall className="w-8 h-8" />,
              title: "Predictive Dialer",
              desc: "Directly calls a list of phone numbers and connects a live collector to an answered call for maximum seat productivity."
            },
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: "Productivity Monitoring",
              desc: "Real-time reports on all collectors or teams, updated as the collection process takes place for immediate management visibility."
            },
            {
              icon: <LayoutDashboard className="w-8 h-8" />,
              title: "Simplified Module",
              desc: "A streamlined 2-page core collection screen designed for short learning curves, showing call lists, follow-ups, and debtor details clearly."
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Field Visit",
              desc: "This feature monitors field visit officers on the move as they are sent out to visit debtors, ensuring tracking and accountability."
            },
            {
              icon: <Wallet className="w-8 h-8" />,
              title: "Payment Consolidation",
              desc: "Import payment listings for automated checking against matches received. Commission calculation and reporting are generated automatically."
            },
            {
              icon: <UserCog className="w-8 h-8" />,
              title: "System Access Policy",
              desc: "Detailed access configuration that allows specific reports to be accessed only by certain user groups, ensuring data integrity."
            },
            {
              icon: <Search className="w-8 h-8" />,
              title: "Advanced Search",
              desc: "Search entire database with multi-select capability. Narrow results based on any criteria to reduce search time and expenses."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-brand-blue/5 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-brand-blue mb-3 text-lg leading-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Roadie & AI Rudder Section */}
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Roadie */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
               <h2 className="text-4xl font-bold text-brand-blue mb-2">Roadie Advantages</h2>
               <div className="w-20 h-1 bg-brand-gold rounded-full mx-auto lg:mx-0 mb-8" />
            </div>
            <div className="grid gap-6">
              {[
                { icon: <CheckSquare className="w-6 h-6" />, title: "Task N' Go", desc: "Complete assignments like a wizard with streamlined workflows." },
                { icon: <Award className="w-6 h-6" />, title: "Report to Reward", desc: "Monitor performance in real-time to motivate and reward productivity." },
                { icon: <Navigation2 className="w-6 h-6" />, title: "Coordinate to Navigation", desc: "Smart route planning to ensure field work hits the right place at the right time." }
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Rudder */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
               <h2 className="text-4xl font-bold text-brand-blue mb-2">AI Rudder Advantages</h2>
               <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto lg:mx-0 mb-8" />
            </div>
            <div className="grid gap-6">
              {[
                { icon: <Smile className="w-6 h-6" />, title: "Happy Human Agents", desc: "Reduces workloads and repetitive calls, allowing agents to focus on fulfilling work." },
                { icon: <Zap className="w-6 h-6" />, title: "Boost Revenue & Efficiency", desc: "Automates lead qualification, renewals, reminders, and information verification." },
                { icon: <MessageSquareText className="w-6 h-6" />, title: "Human-like Conversations", desc: "Understands sentiment and intent to accurately respond while staying 100% compliant." }
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </main>
);

const HomePage = () => (
  <>
    <Hero />
    <About />
    <MissionVision />
    <WhyWorkWithUs />
    <ExperienceLifeSection />
    <JobOpenings limit={3} />
    <div className="bg-brand-gray pb-20 text-center">
      <Link to="/jobs" className="btn-outline border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-10">
        View All Openings
      </Link>
    </div>
    <ApplicationProcess />
    <CTASection />
  </>
);

const JobsPage = () => (
  <main className="pt-24 min-h-screen bg-slate-50">
    <section className="bg-brand-blue text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-[100px]" />
      </div>
      <div className="container-custom relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
        >
          Careers at Telan Solutions
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Available <span className="text-brand-gold">Opportunities</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-blue-100 max-w-2xl"
        >
          Find your next career move. We're looking for passionate individuals to join our growing team.
        </motion.p>
      </div>
    </section>

    <JobOpenings />
    
    <ApplicationProcess />
    
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="bg-brand-blue rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Don't see a role for you?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
              We're always looking for talent. Send us your resume anyway and we'll contact you if something fits.
            </p>
            <a href="mailto:hr.recruitment@telanlaw.com" className="btn-primary">Send Open Application</a>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const AboutUsPage = () => (
  <main className="pt-24 min-h-screen bg-white">
    {/* Page Header */}
    <section className="bg-brand-blue text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold rounded-full blur-[100px]" />
      </div>
      <div className="container-custom relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
        >
        Company Profile
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-8"
        >
        <span className="text-brand-gold">Telan Solutions</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-blue-100 max-w-2xl mx-auto"
        >
          Dedicated to excellence since 1998, we bridge the gap between complex receivables management and human-centric service.
        </motion.p>
      </div>
    </section>

    {/* Detailed History/About Content */}
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-stretch">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold text-brand-blue mb-8">Our Heritage & Expertise</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Established in 1998, Telan Solutions blossomed as the strategic BPO arm of the renowned <span className="font-bold text-brand-blue">Telan Hipe Flores Telan & Associates</span> law firm. This unique partnership allows us to leverage legal depth while providing agile, modern collection services.
                </p>
                <p>
                  For over two decades, we have consistently delivered results for the biggest names in the Philippine Banking and Telecommunication industries. Our approach is defined by a rigorous commitment to ethical standards and technical proficiency.
                </p>
                <p>
                  What sets us apart is our people-first philosophy. We believe that a supported, well-trained team is the most effective way to serve our clients and their customers, turning adversarial interactions into successful resolutions.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Building2 className="w-8 h-8" />, title: "Legal Backbone", desc: "Supported by a top-tier law firm for unparalleled compliance." },
                { icon: <Users className="w-8 h-8" />, title: "Unified Team", desc: "Cultural focus on family, mentorship, and collective growth." },
                { icon: <Target className="w-8 h-8" />, title: "Results Driven", desc: "Proven track record with industry leaders since 1998." },
                { icon: <TrendingUp className="w-8 h-8" />, title: "Continuous Innovation", desc: "Embracing technology to stay ahead in receivables management." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="sticky top-32">
                <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl border-2 border-slate-50">
                   <img 
                      src="https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/telan-bldg.png" 
                      className="w-full h-full object-cover" 
                      alt="Telan Solutions Office"
                   />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 p-8 bg-brand-gold rounded-[32px] text-brand-blue shadow-xl">
                   <p className="text-3xl font-bold mb-1">25+</p>
                   <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Years of Service Excellence</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    {/* Director's Statement Section */}
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      {/* Visual background flourishes */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold rounded-full blur-[120px]" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Image with beautiful frames */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white z-10">
              <img 
                src="https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/director_rt1.jpg" 
                alt="Reyman I. Ilagan" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
            
            {/* Elegant Background Accents */}
            <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 bg-brand-gold/10 rounded-[32px] -z-10 blur-xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-brand-gold/30 rounded-tr-[32px]" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-brand-blue/30 rounded-bl-[32px]" />
          </motion.div>

          {/* Right Column: Statement Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center space-x-2 bg-[#003366]/5 text-brand-blue px-4 py-1.5 rounded-full w-fit mb-6 border border-[#003366]/10">
              <Award className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Message from our Director</span>
            </div>
            
            {/* Large quotation mark visual */}
            <span className="text-8xl font-serif text-brand-gold/20 leading-none h-6 block select-none -translate-x-2">&ldquo;</span>
            
            <blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed italic mb-8 relative z-10 pr-4">
              After more than two decades in the banking industry, I chose Telan Solutions because of its exceptional people, strong culture of excellence, and commitment to delivering results. Here, I have the privilege of working alongside highly skilled lawyers and professionals who are setting new standards in collections, recovery, and legal services. Trusted by leading banks and financial institutions, we continue to build a team driven by integrity, innovation, and performance. If you are looking for an environment where talent is valued, growth is encouraged, and impact is recognized, we invite you to join us.
            </blockquote>
            
            <div className="border-t border-slate-200/80 pt-6">
              <h3 className="text-xl font-bold text-brand-blue">Reyman I. Ilagan</h3>
              <p className="text-sm font-semibold text-brand-gold uppercase tracking-wider mt-1">Business Development and Client Service Director</p>
              <p className="text-xs text-slate-400 mt-1">Telan Solutions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Image Marquee Section */}
    <section className="section-padding bg-white overflow-hidden border-y border-slate-100">
      <div className="container-custom">
        <SectionHeader title="Our Existing Clients" />
      </div>
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex space-x-4 px-2"
        >
          {/* Seamless loop of images to create marquee effect */}
          {[
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/BPI.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/Jaccs.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/Maybank.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/Orico.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/PBB.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/PSBANK.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/RCBC.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/SBC.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/PNB.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/east-west.png"
          ].map((url, i) => (
            <div key={`img-1-${i}`} className="w-40 h-24 md:w-56 md:h-32 rounded-xl overflow-hidden shadow-sm border border-slate-100 shrink-0 group">
              <img 
                src={url} 
                alt="Telan Highlights" 
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
          {/* Repeat for seamless transition */}
          {[
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/BPI.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/Jaccs.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/Maybank.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/Orico.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/PBB.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/PSBANK.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/RCBC.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/SBC.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/PNB.png",
            "https://raw.githubusercontent.com/telanidt02-coder/Telan-Solutions/refs/heads/main/images/east-west.png"
          ].map((url, i) => (
            <div key={`img-2-${i}`} className="w-40 h-24 md:w-56 md:h-32 rounded-xl overflow-hidden shadow-sm border border-slate-100 shrink-0 group">
              <img 
                src={url} 
                alt="Telan Highlights" 
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  </main>
);

export default function App() {
  return (
    <BrowserRouter basename="/Telan-Solutions">
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/culture" element={<CulturePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
