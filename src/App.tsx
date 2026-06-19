import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Code2, 
  Sparkles, 
  Mail, 
  Phone, 
  ArrowRight, 
  Send, 
  Menu, 
  X, 
  Check, 
  ArrowUpRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { PROJECTS, SERVICES, PROFILE_IMAGE, TESTIMONIALS } from './data';
import { Project, ContactMessage } from './types';
import ProjectDetailModal from './components/ProjectDetailModal';
import BudgetCalculator from './components/BudgetCalculator';
import InboxTray from './components/InboxTray';

export default function App() {
  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected project for modal display
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Tab / Filter for Projects
  const [projectFilter, setProjectFilter] = useState<string>('ALL');
  
  // Toggle to show all 5 projects (instead of initial 3)
  const [showAllProjects, setShowAllProjects] = useState(false);

  // States for Contact Form
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  
  // Refresh flag for local inbox messages trigger
  const [refreshInbox, setRefreshInbox] = useState(false);

  // Secret admin mode - press Ctrl+Shift+I to toggle inbox visibility
  const [showAdminInbox, setShowAdminInbox] = useState(false);

  // Listen for secret key combination
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl + Shift + I = Toggle Admin Inbox
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        setShowAdminInbox(prev => !prev);
        console.log('🔐 Admin Inbox Mode:', !showAdminInbox ? 'Activated' : 'Deactivated');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdminInbox]);

  // Quick action: dynamic apply budget calculator string into contact message
  const handleApplyEstimate = (estimateText: string) => {
    setContactMessage((prev) => {
      if (prev.trim() === '') return estimateText;
      return prev + "\n\n" + estimateText;
    });
    // Smooth scroll to contact form so user can see it!
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit Contact Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    const newMessage: ContactMessage = {
      id: "msg-" + Date.now(),
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      timestamp: new Date().toLocaleString('id-ID', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    try {
      const existing = localStorage.getItem('atmajaya_portfolio_messages');
      const messages = existing ? JSON.parse(existing) : [];
      messages.unshift(newMessage);
      localStorage.setItem('atmajaya_portfolio_messages', JSON.stringify(messages));
      
      // Trigger the inbox refresh
      setRefreshInbox(true);
      
      // Reset form states
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setFormSuccess(true);
      
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);

    } catch (err) {
      console.error("Failed to store message", err);
    }
  };

  // Filter project logic
  const filteredProjects = PROJECTS.filter(project => {
    if (projectFilter === 'ALL') return true;
    return project.tags.some(tag => tag.toUpperCase() === projectFilter.toUpperCase()) || 
           project.category.toUpperCase() === projectFilter.toUpperCase();
  });

  // Limit displayed projects based on the boolean "showAllProjects" or filters
  const displayedProjects = (projectFilter === 'ALL' && !showAllProjects) 
    ? filteredProjects.slice(0, 3) 
    : filteredProjects;

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary-container selection:text-on-background overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav id="navbar" className="fixed top-0 left-0 w-full z-50 bg-background border-b-4 border-on-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto">
          <a href="#" className="font-display text-2xl md:text-3xl font-black tracking-tighter text-on-background relative group">
            PORTFOLIO
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-secondary transition-all group-hover:w-full"></span>
          </a>
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex gap-8 items-center">
            <a 
              href="#work" 
              className="font-label text-sm uppercase font-extrabold text-on-surface hover:text-secondary hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              WORK
            </a>
            <a 
              href="#about" 
              className="font-label text-sm uppercase font-extrabold text-on-surface hover:text-secondary hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              ABOUT
            </a>
            <a 
              href="#services" 
              className="font-label text-sm uppercase font-extrabold text-on-surface hover:text-secondary hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              SERVICES
            </a>
            <a 
              href="#contact" 
              className="font-label text-sm uppercase font-extrabold text-on-surface hover:text-secondary hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              CONTACT
            </a>
            
            <button 
              id="navbar-hire-me-btn"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary-container text-on-primary-container font-label text-xs uppercase font-extrabold px-6 py-2.5 border-2 border-on-surface neubrutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              HIRE ME
            </button>
          </div>

          {/* Mobile Hamburguer Icon */}
          <button 
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(true)} 
            className="md:hidden p-2 bg-primary-container border-2 border-on-surface neubrutal-shadow cursor-pointer"
          >
            <Menu className="w-6 h-6 text-on-background" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div id="mobile-drawer" className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black"
            />
            {/* Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 bg-background border-l-4 border-on-surface p-6 flex flex-col justify-between"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b-2 border-on-surface/10">
                  <span className="font-display font-black text-xl text-on-background">NAVIGASI</span>
                  <button 
                    id="mobile-drawer-close-btn"
                    onClick={() => setMobileMenuOpen(false)} 
                    className="p-1.5 bg-primary-container border-2 border-on-surface shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <a 
                    href="#work" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="font-label text-lg uppercase font-extrabold py-2 hover:text-secondary border-b-2 border-transparent hover:border-on-background"
                  >
                    KARYA TERBARU
                  </a>
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="font-label text-lg uppercase font-extrabold py-2 hover:text-secondary border-b-2 border-transparent hover:border-on-background"
                  >
                    TENTANG SAYA
                  </a>
                  <a 
                    href="#services" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="font-label text-lg uppercase font-extrabold py-2 hover:text-secondary border-b-2 border-transparent hover:border-on-background"
                  >
                    LAYANAN KAMI
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="font-label text-lg uppercase font-extrabold py-2 hover:text-secondary border-b-2 border-transparent hover:border-on-background"
                  >
                    KONTAK HUBUNG
                  </a>
                </div>
              </div>

              <div>
                <button 
                  id="mobile-nav-hire-me-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-secondary text-on-secondary font-label text-sm uppercase font-extrabold py-4 border-2 border-on-surface neubrutal-shadow"
                >
                  Hire Me Now
                </button>
                <p className="text-[10px] text-center mt-4 uppercase font-label">© 2024 DESIGNER. ALL RIGHTS RESERVED.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="pt-20">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[820px] flex flex-col justify-center px-4 md:px-16 max-w-[1280px] mx-auto relative overflow-hidden py-16">
          {/* Heavy Neubrutalist Decorative Circles */}
          <div className="absolute top-10 right-4 lg:right-10 w-48 h-48 lg:w-64 lg:h-64 bg-secondary rounded-full border-4 border-on-surface -z-10 animate-pulse"></div>
          
          <div className="absolute top-20 right-10 lg:right-20 w-48 h-48 lg:w-64 lg:h-64 bg-transparent rounded-full border-4 border-on-surface -z-15 transform translate-x-3 translate-y-3"></div>

          {/* Yellow decorative square */}
          <div className="absolute bottom-5 left-10 lg:left-32 w-40 h-40 bg-primary-container border-4 border-on-surface -z-15 transform rotate-12 hidden md:block"></div>

          <div className="z-10 max-w-4xl space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-label text-sm uppercase text-secondary font-black tracking-widest"
            >
              SELAMAT DATANG DI DUNIA KREATIF
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-4xl sm:text-6xl lg:text-[80px] leading-tight font-black tracking-tight uppercase"
            >
              CREATIVE <br className="hidden sm:block" />
              <span className="bg-primary-container border-4 border-on-surface px-4 py-1 inline-block transform -rotate-2 my-2 sm:my-0">
                DEVELOPER
              </span> &amp; DESIGNER
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-body text-lg md:text-xl max-w-2xl text-on-surface-variant font-medium leading-relaxed"
            >
              Membangun pengalaman digital yang berani, fungsional, dan tak terlupakan. Menggabungkan kode presisi dengan estetika visual yang kuat.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a 
                id="hero-cta-view-work"
                href="#work" 
                className="bg-secondary text-on-secondary font-label text-md uppercase font-black px-8 py-5 border-3 border-on-surface neubrutal-shadow-lg neubrutal-btn-active text-center"
              >
                Lihat Karya Saya
              </a>
              <a 
                id="hero-cta-contact"
                href="#contact" 
                className="bg-white text-on-surface font-label text-md uppercase font-black px-8 py-5 border-3 border-on-surface neubrutal-shadow-lg neubrutal-btn-active text-center"
              >
                Hubungi Kami
              </a>
            </motion.div>
          </div>
        </section>


        {/* ABOUT SECTION */}
        <section id="about" className="bg-surface-container border-y-4 border-on-surface py-20">
          <div className="px-4 md:px-16 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Photo with absolute offset magenta border shadow */}
            <div className="relative max-w-md mx-auto w-full group">
              <div className="absolute inset-0 bg-secondary translate-x-4 translate-y-4 border-4 border-on-surface transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
              
              <div className="relative z-10 border-4 border-on-surface overflow-hidden bg-surface">
                <img 
                  referrerPolicy="no-referrer"
                  src={PROFILE_IMAGE} 
                  alt="Atmajaya - Portrait" 
                  className="w-full aspect-square object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right side: Biography */}
            <div className="space-y-6">
              <span className="font-label text-xs uppercase font-black text-secondary tracking-widest bg-white border border-on-surface px-2 py-1">HALO DUNIA</span>
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase leading-none">
                Halo, Saya <span className="text-secondary">Atmajaya</span>
              </h2>
              
              <p className="font-body text-md md:text-lg text-on-surface-variant leading-relaxed">
                Saya adalah seorang desainer dan pengembang yang berbasis di Jakarta dengan hasrat untuk menciptakan antarmuka yang bersih dan berani. Selama 5 tahun terakhir, saya telah membantu brand global menonjol melalui desain neubrutalisme yang unik.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-primary-fixed border-3 border-on-surface neubrutal-shadow hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <span className="font-display text-4xl font-black block text-on-background">50+</span>
                  <span className="font-label text-xs uppercase font-extrabold text-on-surface-variant block mt-1">PROYEK SELESAI</span>
                </div>
                <div className="p-5 bg-tertiary-fixed border-3 border-on-surface neubrutal-shadow hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <span className="font-display text-4xl font-black block text-on-background">12</span>
                  <span className="font-label text-xs uppercase font-extrabold text-on-surface-variant block mt-1">PENGHARGAAN SITES</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* PROJECTS SECTION */}
        <section id="work" className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-4 border-b-2 border-on-surface/10">
            <div>
              <p className="font-label text-xs font-black text-secondary uppercase tracking-widest mb-1">PORTFOLIO PILIHAN</p>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase">KARYA TERBARU</h2>
            </div>
            
            {/* Interactive Filters */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'UI/UX', 'WEB DEV', 'BRANDING'].map((filter) => (
                <button
                  id={`filter-btn-${filter}`}
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-4 py-2 border-2 border-on-background font-label text-xs uppercase font-black transition-all cursor-pointer ${
                    projectFilter === filter 
                      ? 'bg-secondary text-on-secondary neubrutal-shadow' 
                      : 'bg-white text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* LATEST PROYEK (Large Card - Platform Belanja Masa Depan) */}
            <div className="md:col-span-8 bg-white border-3 border-on-surface neubrutal-shadow-lg overflow-hidden flex flex-col group hover:translate-y-[-4px] transition-transform duration-300">
              <div className="h-64 sm:h-96 w-full overflow-hidden border-b-3 border-on-surface relative">
                <img 
                  referrerPolicy="no-referrer"
                  src={PROJECTS[0].imageUrl} 
                  alt={PROJECTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-secondary text-on-secondary border-2 border-on-surface font-label text-xs uppercase font-bold">
                    HOT PROYEK
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {PROJECTS[0].tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary-container border-2 border-on-surface text-xs font-label uppercase font-extrabold text-on-surface">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-on-background">
                    {PROJECTS[0].title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                    {PROJECTS[0].description}
                  </p>
                </div>

                <div>
                  <button 
                    id="large-project-detail-btn"
                    onClick={() => setSelectedProject(PROJECTS[0])}
                    className="bg-primary-container text-on-primary-container px-6 py-3.5 border-2 border-on-surface font-label text-xs uppercase font-black neubrutal-shadow neubrutal-btn-active cursor-pointer"
                  >
                    Detail Proyek
                  </button>
                </div>
              </div>
            </div>

            {/* SIDE KARYA 1 (Branding Identity - Small Card) */}
            <div className="md:col-span-4 bg-white border-3 border-on-surface neubrutal-shadow-lg overflow-hidden flex flex-col justify-between group hover:translate-y-[-4px] transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden border-b-3 border-on-surface bg-tertiary-fixed flex items-center justify-center relative">
                <img 
                  referrerPolicy="no-referrer"
                  src={PROJECTS[1].imageUrl} 
                  alt={PROJECTS[1].title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-tertiary-container border-2 border-on-surface text-[10px] font-label uppercase font-black text-on-surface">
                    BRANDING
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-on-background mb-2">
                    {PROJECTS[1].title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {PROJECTS[1].description}
                  </p>
                </div>

                <button 
                  id="branding-project-detail-btn"
                  onClick={() => setSelectedProject(PROJECTS[1])}
                  className="flex items-center justify-between w-full p-3 bg-surface-container-low hover:bg-primary-container border-2 border-on-surface font-label text-xs uppercase font-black transition-colors cursor-pointer"
                >
                  <span>Minta Detail</span>
                  <ArrowRight className="w-4 h-4 text-on-background" />
                </button>
              </div>
            </div>

            {/* SIDE KARYA 2 (Web Dev - Small Card) */}
            <div className="md:col-span-4 bg-white border-3 border-on-surface neubrutal-shadow-lg overflow-hidden flex flex-col justify-between group hover:translate-y-[-4px] transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden border-b-3 border-on-surface bg-surface-container flex items-center justify-center relative">
                <img 
                  referrerPolicy="no-referrer"
                  src={PROJECTS[2].imageUrl} 
                  alt={PROJECTS[2].title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-fixed border-2 border-on-surface text-[10px] font-label uppercase font-black text-on-surface">
                    ANALYTICS
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-on-background mb-2">
                    {PROJECTS[2].title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {PROJECTS[2].description}
                  </p>
                </div>

                <button 
                  id="analytics-project-detail-btn"
                  onClick={() => setSelectedProject(PROJECTS[2])}
                  className="flex items-center justify-between w-full p-3 bg-surface-container-low hover:bg-primary-container border-2 border-on-surface font-label text-xs uppercase font-black transition-colors cursor-pointer"
                >
                  <span>Minta Detail</span>
                  <ArrowRight className="w-4 h-4 text-on-background" />
                </button>
              </div>
            </div>

            {/* BOX MIDDLE CARD (Siap Untuk Berinovasi? Magenta background) */}
            <div className="md:col-span-8 bg-secondary border-3 border-on-surface neubrutal-shadow-lg p-6 sm:p-8 flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300 text-white">
              <div className="space-y-4">
                <span className="bg-white text-secondary border-2 border-on-surface px-3 py-1 text-xs font-label font-black uppercase inline-block">
                  HUBUNGAN KOLABORATIF
                </span>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-tight font-black uppercase text-on-secondary">
                  SIAP UNTUK BERINOVASI?
                </h3>
                <p className="font-body text-sm sm:text-base text-secondary-fixed opacity-95 max-w-xl">
                  Mari kita bangun sesuatu yang luar biasa bersama-sama. Saya selalu mencari tantangan baru untuk mengintegrasikan performa web handal dengan estetika ekstrem.
                </p>
              </div>

              <div className="pt-6">
                <button 
                  id="collaborate-now-btn"
                  onClick={() => {
                    const el = document.getElementById('calculator-section-tag');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-on-surface font-label text-xs uppercase font-black px-8 py-4 border-2 border-on-surface neubrutal-shadow neubrutal-btn-active cursor-pointer"
                >
                  MULAI KOLABORASI
                </button>
              </div>
            </div>

          </div>

          {/* Load More additional projects view when showAllProjects or clicking Lihat Semua */}
          {showAllProjects && (
            <motion.div 
              id="extra-projects-grid" 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6"
            >
              {PROJECTS.slice(3).map((project) => (
                <div key={project.id} className="bg-white border-3 border-on-surface neubrutal-shadow-lg overflow-hidden flex flex-col sm:flex-row group hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="h-48 sm:h-auto sm:w-1/3 overflow-hidden border-b-3 sm:border-b-0 sm:border-r-3 border-on-surface">
                    <img 
                      referrerPolicy="no-referrer"
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="px-2 py-0.5 bg-primary-fixed border-2 border-on-surface font-label text-[10px] uppercase font-black text-on-surface">
                        {project.category}
                      </span>
                      <h3 className="font-display text-lg font-black uppercase text-on-background mt-2">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div>
                      <button
                        id={`extra-${project.id}-detail-btn`}
                        onClick={() => setSelectedProject(project)}
                        className="bg-secondary-container/25 text-on-surface px-4 py-2 border-2 border-on-surface font-label text-[10px] uppercase font-extrabold neubrutal-shadow hover:translate-y-[1px] cursor-pointer"
                      >
                        Detail Proyek
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Action "Lihat Semua" toggling panel */}
          <div className="flex justify-center pt-4">
            <button
              id="view-all-projects-toggle-btn"
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="bg-white text-on-surface border-3 border-on-surface px-8 py-4 font-label text-xs uppercase font-black tracking-widest neubrutal-shadow neubrutal-btn-active cursor-pointer"
            >
              {showAllProjects ? 'Sembunyikan Proyek Tambahan' : 'Lihat Semua Karya'}
            </button>
          </div>

        </section>


        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-on-surface text-white my-10">
          <div className="px-4 md:px-16 max-w-[1280px] mx-auto space-y-16">
            
            {/* Header text */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase text-primary-container tracking-tight">
                LAYANAN KAMI
              </h2>
              <div className="h-1 w-24 bg-secondary mx-auto"></div>
              <p className="font-body text-md md:text-lg text-surface-variant font-medium">
                Solusi end-to-end untuk kebutuhan digital Anda dengan gaya yang tak tertandingi.
              </p>
            </div>

            {/* Service cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* SERVICE 1 - UI/UX DESIGN (White background, Magenta text header) */}
              <div className="p-8 md:p-10 bg-white text-on-surface border-4 border-primary-container neubrutal-shadow-lg flex flex-col justify-between space-y-8 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-secondary/10 border-2 border-secondary flex items-center justify-center">
                    <Palette className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                      UI/UX DESIGN
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      Menciptakan antarmuka yang memukau dan pengalaman pengguna yang mulus menggunakan tren desain terbaru.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 pt-4 border-t-2 border-surface-container font-label text-xs font-bold uppercase">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Prototyping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <span>User Research</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <span>Design Systems</span>
                  </li>
                </ul>
              </div>

              {/* SERVICE 2 - WEB DEV (Yellow primary container background, slightly rotated 1 degree) */}
              <div className="p-8 md:p-10 bg-primary-container text-on-surface border-4 border-white neubrutal-shadow-lg flex flex-col justify-between space-y-8 hover:translate-y-[-4px] transition-transform duration-300 md:rotate-1">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-white border-2 border-on-surface flex items-center justify-center">
                    <Code2 className="w-10 h-10 text-on-background" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                      WEB DEV
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      Pengembangan web responsif yang cepat, aman, dan dioptimalkan untuk performa maksimal di semua perangkat.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 pt-4 border-t-2 border-on-surface/20 font-label text-xs font-bold uppercase">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-on-surface shrink-0" />
                    <span>React / Next.js</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-on-surface shrink-0" />
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-on-surface shrink-0" />
                    <span>API Integration</span>
                  </li>
                </ul>
              </div>

              {/* SERVICE 3 - BRANDING (Pink accent container background) */}
              <div className="p-8 md:p-10 bg-secondary-container text-on-surface border-4 border-on-surface neubrutal-shadow-lg flex flex-col justify-between space-y-8 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-secondary/10 border-2 border-secondary flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                      BRANDING
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      Membangun identitas brand yang kuat dan konsisten yang mencerminkan nilai-nilai unik bisnis Anda.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 pt-4 border-t-2 border-on-surface/20 font-label text-xs font-bold uppercase">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-on-surface shrink-0" />
                    <span>Logo Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-on-surface shrink-0" />
                    <span>Brand Strategy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-on-surface shrink-0" />
                    <span>Visual Guides</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Testimonials from previous client branding partners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {TESTIMONIALS.map((test, index) => (
                <div key={index} className="bg-surface-container text-on-surface p-6 border-3 border-on-surface neubrutal-shadow">
                  <p className="font-body text-sm italic leading-relaxed text-on-surface-variant">
                    "{test.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-on-surface/10">
                    <div className={`w-8 h-8 rounded-full border border-on-surface ${test.avatarBg} flex items-center justify-center font-display font-black text-xs`}>
                      {test.name[0]}
                    </div>
                    <div>
                      <span className="block font-label text-xs uppercase font-extrabold text-on-background">{test.name}</span>
                      <span className="block text-[10px] font-label uppercase text-on-surface-variant">{test.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* PROJECTS CALCULATOR SECTION */}
        <section id="calculator-section" className="py-12 px-4 md:px-16 max-w-[1280px] mx-auto space-y-8">
          <div className="text-center sm:text-left max-w-xl">
            <span id="calculator-section-tag" className="font-label text-xs font-black text-secondary uppercase tracking-widest bg-primary-container px-2.5 py-1 border border-on-surface">PLANNING SUITE</span>
            <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-on-background mt-4 mb-2">Simulasikan Ide Proyek Anda</h2>
            <p className="font-body text-sm text-on-surface-variant">
              Gunakan formulir simulasi interaktif ini untuk menakar anggaran awal dan langsung diskusikan hasilnya dengan Atmajaya.
            </p>
          </div>
          
          <BudgetCalculator onApplyEstimate={handleApplyEstimate} />
        </section>


        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-4 md:px-16 max-w-[1280px] mx-auto">
          <div className="bg-surface-container-high border-4 border-on-surface neubrutal-shadow-lg p-6 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Box: Talk Info */}
            <div className="space-y-8">
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight">
                Ayo <span className="text-secondary text-shadow">Ngobrol!</span>
              </h2>
              
              <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                Punya ide gila atau proyek menantang? Saya siap membantu mewujudkannya menjadi kenyataan digital. Isi formulir atau gunakan Kalkulator Proyek untuk memulai.
              </p>

              <div className="flex flex-col gap-4 pt-4">
                <a href="mailto:halo@atmajaya.id" className="flex items-center gap-4 hover:translate-x-2 transition-transform self-start group">
                  <div className="w-12 h-12 bg-primary-container border-2 border-on-surface flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-on-background group-hover:text-white" />
                  </div>
                  <span className="font-label text-md font-extrabold text-on-background group-hover:text-secondary group-hover:underline">
                    halo@atmajaya.id
                  </span>
                </a>

                <a href="tel:+6281234567890" className="flex items-center gap-4 hover:translate-x-2 transition-transform self-start group">
                  <div className="w-12 h-12 bg-secondary-container border-2 border-on-surface flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-on-background group-hover:text-white" />
                  </div>
                  <span className="font-label text-md font-extrabold text-on-background group-hover:text-secondary group-hover:underline">
                    +62 812 3456 7890
                  </span>
                </a>
              </div>

              {/* Extra fun badge decoration */}
              <div className="border-t-2 border-on-surface/10 pt-6 font-label text-xs uppercase font-extrabold text-on-surface-variant space-y-2">
                <p>📍 Berbasis di: Jakarta, Indonesia</p>
                <p>⚡ Kecepatan respon: Di bawah 12 jam</p>
              </div>
            </div>

            {/* Right Box: Form */}
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
              
              {formSuccess && (
                <div id="contact-success-toast" className="p-4 bg-primary-container text-on-primary-container border-2 border-on-surface font-label text-xs font-black uppercase flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" />
                  <span>Pesan Anda Berhasil Dikirim &amp; Disimpan Lokal!</span>
                </div>
              )}

              <div>
                <label className="font-label text-xs uppercase font-extrabold block mb-2 text-on-surface-variant">
                  Nama Lengkap
                </label>
                <input 
                  id="contact-name-input"
                  type="text" 
                  required 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-white border-3 border-on-surface p-4 focus:ring-0 focus:border-secondary transition-all outline-none font-body text-sm font-semibold placeholder:text-on-surface-variant/40"
                />
              </div>

              <div>
                <label className="font-label text-xs uppercase font-extrabold block mb-2 text-on-surface-variant">
                  Email Anda
                </label>
                <input 
                  id="contact-email-input"
                  type="email" 
                  required 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="w-full bg-white border-3 border-on-surface p-4 focus:ring-0 focus:border-secondary transition-all outline-none font-body text-sm font-semibold placeholder:text-on-surface-variant/40"
                />
              </div>

              <div>
                <label className="font-label text-xs uppercase font-extrabold block mb-2 text-on-surface-variant">
                  Pesan Anda
                </label>
                <textarea 
                  id="contact-message-input"
                  required 
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Apa yang bisa saya bantu atau lampirkan hasil kalkulator proyek Anda..."
                  className="w-full bg-white border-3 border-on-surface p-4 focus:ring-0 focus:border-secondary transition-all outline-none font-body text-sm font-semibold placeholder:text-on-surface-variant/40"
                />
              </div>

              <button 
                id="contact-submit-btn"
                type="submit"
                className="bg-secondary text-white font-label text-xs uppercase font-black py-4 border-3 border-on-surface neubrutal-shadow-lg neubrutal-btn-active transition-all cursor-pointer"
              >
                Kirim Pesan Sekarang
              </button>
            </form>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-16 border-t-4 border-on-surface bg-surface-container-highest">
        <div className="flex flex-col gap-12 px-4 md:px-16 max-w-[1280px] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="font-display text-4xl font-black text-on-surface">
              PORTFOLIO
            </span>
            
            <div className="flex flex-wrap gap-8 justify-center">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="font-display text-lg font-extrabold text-on-surface-variant hover:text-secondary transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="font-display text-lg font-extrabold text-on-surface-variant hover:text-secondary transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <a 
                href="https://dribbble.com" 
                target="_blank" 
                rel="noreferrer"
                className="font-display text-lg font-extrabold text-on-surface-variant hover:text-secondary transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <span>DRIBBBLE</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t-2 border-on-surface/10 gap-4">
            <p className="font-label text-xs uppercase font-extrabold text-on-surface-variant">
              © 2024 DESIGNER. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6 font-label text-xs uppercase font-extrabold">
              <a href="#about" className="hover:underline text-on-surface-variant hover:text-secondary">Privacy Policy</a>
              <a href="#services" className="hover:underline text-on-surface-variant hover:text-secondary">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* OVERLAY / DIALOGS WITH ANIMATE PRESENCE */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* OFFLINE LOCAL MESSAGES INBOX TRAY - Hidden by default, press Ctrl+Shift+I to show */}
      {showAdminInbox && (
        <InboxTray 
          triggerRefresh={refreshInbox} 
          onRefreshed={() => setRefreshInbox(false)} 
        />
      )}

    </div>
  );
}
