import { useState } from 'react';
import { Link } from 'react-router';
import { Shield, Clock, Handshake, Zap, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Star,
  Calendar,
  CheckCircle,
  ArrowRight,
  Wifi,
  Phone,
  Search,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import { services, testimonials, processSteps } from '../data/services';

const trustBadges = [
  { icon: Zap, label: 'Fast Response', sub: 'Active 12-min reply window' },
  { icon: Shield, label: 'Secure Support', sub: 'Fully encrypted tech handling' },
  { icon: Handshake, label: 'Flat-Rate Pricing', sub: 'Upfront rates, zero surprises' },
  { icon: Clock, label: 'Flexible Dispatch', sub: 'After-hours slots available' },
  { icon: ThumbsUp, label: 'Guaranteed Care', sub: '100% satisfaction checkoff' },
];

const stepIcons = [Calendar, Wifi, CheckCircle];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <Header />
{/* ========================================== */}
      {/* --- HERO SECTION ------------------------- */}
      {/* ========================================== */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
        {/* Background Visual Wrapper */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-poster.jpg"
            className="w-full h-full object-cover opacity-25"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto section-padding pt-32 pb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            
            className="text-xs font-mono uppercase tracking-widest text-zinc-400 text-center mb-6"
          >
            Complete Tech Support & On-Site Facility Care
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="hero-headline text-center mb-6 text-zinc-900 font-black tracking-tighter text-5xl md:text-7xl leading-none"
          >
            YOUR
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_#18181b]">GO-TO EXPERT</span>
          </motion.h1>

          {/* UPDATE: Simplified description copy by dropping words like 'operational environments' */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-sans text-sm md:text-base text-zinc-500 text-center max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Expert setup for your office networks, printers, and computers securely online—plus professional deep cleaning, everyday handyman repairs, and complete facility maintenance on-site.
          </motion.p>

          {/* DYNAMIC SEARCH BOARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-xl mx-auto mb-10 px-4"
          >
            {/* UPDATE: Added sleek rounded borders and a solid micro box shadow */}
            <div className="flex border border-zinc-300 bg-white rounded-xl shadow-md overflow-hidden focus-within:border-zinc-900 transition-colors">
              <div className="flex items-center pl-4 text-zinc-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                
                placeholder="Search services (e.g., Wi-Fi setup, Printer repair, Office cleaning)..."
                className="flex-1 px-4 py-4 font-sans text-sm bg-transparent outline-none placeholder:text-zinc-400"
              />
              <Link
                to="/configure"
                
                className="bg-zinc-900 text-white px-7 py-4 font-sans text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors duration-200 flex items-center shrink-0"
              >
                Search
              </Link>
            </div>
          </motion.div>

          {/* QUICK CREDIBILITY HIGHLIGHTS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-zinc-500 font-sans text-xs font-medium"
          >
            <span className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200/60 shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              4.9/5 Rating
            </span>
            <span className="text-zinc-300 hidden sm:inline">&bull;</span>
            {/* UPDATE: Replaced environment metrics text */}
            <span className="text-zinc-600 font-semibold">2,400+ Services Delivered</span>
            <span className="text-zinc-300 hidden sm:inline">&bull;</span>
            <span className="text-zinc-600 font-semibold">Same-Day Booking Available</span>
          </motion.div>
        </div>
      </section>


      {/* ========================================== */}
      {/* --- TRUST BAR ---------------------------- */}
      {/* ========================================== */}
      <section className="border-t border-zinc-200 bg-zinc-50/50">
        <div className="max-w-[1440px] mx-auto section-padding py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                
                className="flex items-center gap-3 bg-white border border-zinc-150 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 md:justify-center"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                  <badge.icon className="w-4 h-4 text-zinc-700" />
                </div>
                <div>
                  <p className="font-sans text-xs font-black text-zinc-900 leading-tight">{badge.label}</p>
                  {/* UPDATE: Transformed layout typography to keep descriptions modern and sharp */}
                  <p className="font-sans text-[11px] font-medium text-zinc-400 tracking-tight mt-0.5">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SERVICES GRID */}
      <section id="services" className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <SectionHeader
            eyebrow="What We Do"
            title="Deployment & Systems Integration"
            subtitle="Six specialized areas of expertise to ensure your enterprise environment operates with absolute harmony."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-t border-zinc-200">
  <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
    {/* Comment shifted outside the props list */}
    {/* UPDATE: Changed 'Three steps' and 'digital' to match the new 5-step hybrid model */}
{/* UPDATE: Changed 'Three steps' and 'digital' to match the new 5-step hybrid model */}
<SectionHeader
  eyebrow="Simple Process"
  title="How It Works"
  subtitle={`${processSteps.length} simple steps to get your online tech and offline facilities running flawlessly.`}
/>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative mt-16">
      {processSteps.map((step, i) => {
        const StepIcon = stepIcons[i];
        return (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center px-4"
          >
            {i < processSteps.length - 1 && (
              <div className="hidden lg:block absolute top-12 right-0 translate-x-1/2 z-10">
                <ArrowRight className="w-5 h-5 text-zinc-300" />
              </div>
            )}
            
            <div className="w-24 h-24 bg-zinc-100 flex items-center justify-center mx-auto mb-6 rounded-xl">
              {StepIcon && <StepIcon className="w-10 h-10 text-zinc-700" />}
            </div>
            
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
              Step {step.number}
            </p>
            
            <h3 className="font-sans text-xl font-black tracking-tight text-zinc-900 mb-3">
              {step.title}
            </h3>
            
            <p className="font-sans text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/* MID-SECTION VIDEO SHOWCASE */}
      <section className="bg-zinc-100">
  <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-3"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-video object-cover rounded-xl"
        >
          <source src="/videos/mid-texture.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2"
      >
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">Since 2011</p>
        
        {/* UPDATE: Changed heading to fit both online and offline services */}
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 mb-6">
          Complete Tech & Office Solutions
        </h2>
        
        {/* UPDATE: Simplified description by removing tech jargon like 'software matrices' */}
        <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-8">
          Over a decade of experience managing both digital networks and physical workspaces. Whether you need fast Wi-Fi and printer troubleshooting support or professional office cleaning and everyday maintenance, we keep your business running smoothly.
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-sans text-3xl font-black tracking-tighter text-zinc-900">2,400+</p>
            {/* UPDATE: Changed 'Deployments' to 'Services Delivered' to sound all-inclusive */}
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">Services Delivered</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-black tracking-tighter text-zinc-900">4.9/5</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">Client Rating</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-black tracking-tighter text-zinc-900">12 min</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">Avg Response</p>
          </div>
          <div>
            <p className="font-sans text-3xl font-black tracking-tighter text-zinc-900">98%</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">Success Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <section className="bg-white border-t border-zinc-200">
  <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
    <SectionHeader
      eyebrow="Client Feedback"
      title="What People Say"
      subtitle="Real experiences shared by local business owners, workspace administrators, and management teams."
    />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.author}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-zinc-50/50 border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-zinc-300 transition-all duration-300"
        >
          <div>
            {/* UPDATE: Stars group paired with an authentic Verification Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="inline-flex items-center font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                ✓ Verified Booking
              </span>
            </div>

            {/* UPDATE: Quote texture switched to professional serif/sans variant with proper color weight */}
            <p className="font-sans text-[15px] text-zinc-600 leading-relaxed italic mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>

          {/* UPDATE: Author section with dynamically generated Initial Circles as real Profile Placeholders */}
          <div className="border-t border-zinc-100 pt-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-sans font-bold text-xs uppercase select-none shrink-0">
              {t.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-sans text-sm font-black text-zinc-900">{t.author}</p>
              <p className="font-sans text-[11px] font-medium text-zinc-400 tracking-tight mt-0.5">{t.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* PRICING PREVIEW */}
      <section className="bg-zinc-50 border-t border-zinc-200">
  <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
    <SectionHeader
      eyebrow="Transparent Pricing"
      title="Simple, Flat Rates"
      subtitle="Clear upfront pricing with absolutely no hidden fees. Choose the support plan that fits your current workspace needs."
    />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
      {[
        { 
          name: 'Basic Remote Support', 
          price: 89, 
          unit: '/session', 
          features: [
            'Secure screen-sharing assistance',
            '45-60 minute resolution window',
            '7 days of free follow-up support',
            'Best for quick email & software fixes'
          ] 
        },
        { 
          name: 'Standard In-Person Visit', 
          price: 149, 
          unit: '/session', 
          features: [
            'Expert visits your home or office',
            '60-90 minute high-quality setup',
            '14 days of free follow-up support',
            'Perfect for Wi-Fi, printers, or deep cleaning'
          ], 
          popular: true 
        },
        { 
          name: 'Premium VIP Support Pack', 
          price: 199, 
          unit: '/session', 
          features: [
            'Flexible hybrid (Remote + In-Person)',
            'Extended 90-minute session time',
            '30 days of priority emergency help',
            'Full configuration logs & login list delivered'
          ] 
        },
      ].map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
       
          className={`bg-white border ${
            plan.popular ? 'border-zinc-900 shadow-xl lg:scale-105 relative z-10' : 'border-zinc-200 shadow-sm'
          } rounded-2xl p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300`}
        >
          <div>
            {plan.popular ? (
              <span className="inline-block font-mono text-[9px] font-bold uppercase tracking-wider text-white bg-zinc-900 px-2.5 py-1 rounded-full mb-4">
                ★ Most Popular
              </span>
            ) : (
              <div className="h-7 mb-4 block" /> // Padding block to keep alignment uniform across cards
            )}
            
            <h3 className="font-sans text-xl font-black tracking-tight text-zinc-900 mb-2">{plan.name}</h3>
            
            <div className="flex items-baseline justify-center gap-0.5 mb-6 border-b border-zinc-100 pb-6">
              <span className="font-sans text-5xl font-black tracking-tighter text-zinc-900">${plan.price}</span>
              <span className="font-sans text-sm font-medium text-zinc-400">{plan.unit}</span>
            </div>

            {/* UPDATE: Replaced the cluttered paragraph with an elegant and scannable check-list */}
            <ul className="space-y-3.5 text-left mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-sans text-xs text-zinc-600 leading-tight">
                  <span className="text-zinc-400 font-bold shrink-0 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/configure"
            
            className={`inline-block w-full font-sans text-xs font-bold text-center py-3.5 rounded-xl transition-all duration-200 ${
              plan.popular 
                ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md' 
                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
            }`}
          >
            Book This Session
          </Link>
        </motion.div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link
        to="/pricing"
        className="inline-flex items-center gap-2 font-sans text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors group"
      >
        View Full Custom Pricing List
        <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </div>
</section>

     {/* 1. OUR EXPERTISE SECTION */}
      <section className="bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <SectionHeader
            eyebrow="Our Core Focus"
            title="What We Take Care Of"
            subtitle="From managing your digital setup to handling daily office utilities, we cover everything."
          />
          <div className="border-t border-zinc-200 mt-12">
            {[
              { num: '01', title: 'WI-FI & NETWORK MANAGEMENT', desc: 'Setting up high-speed routers, secure office VPNs, and expanding range to eliminate dead zones.' },
              { num: '02', title: 'PRINTER & GADGET SUPPORT', desc: 'Fixing offline printers, clearing paper jams, installing drivers, and connecting your whole team wirelessly.' },
              { num: '03', title: 'PROFESSIONAL OFFICE CLEANING', desc: 'Deep sanitization, dusting, floor polishing, and restroom cleaning for a fresh work environment.' },
              { num: '04', title: 'HANDYMAN & MAINTENANCE REPAIRS', desc: 'On-call electrical troubleshooting, plumbing, AC filter cleaning, and basic workspace carpentry.' },
              { num: '05', title: 'CATERING & KITCHEN MANAGEMENT', desc: 'Placing professional chefs, structuring healthy daily menus, and managing your office pantry stocks.' },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
               
                className="group flex flex-col md:flex-row md:items-center justify-between gap-2 py-6 border-b border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all duration-300 cursor-default px-4 -mx-4"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-500">{item.num}</span>
                  <span className="font-sans text-sm md:text-base font-black tracking-tight">{item.title}</span>
                </div>
                {/* UPDATE: Switched text font to font-sans for clean layout scanning */}
                <span className="font-sans text-xs text-zinc-500 group-hover:text-zinc-300 max-w-md text-left md:text-right leading-relaxed">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FINAL CTA SECTION */}
      <section className="bg-zinc-900">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* UPDATE: Changed heading to reflect total workspace management */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6">
              Ready to Run a Hassle-Free Office?
            </h2>
            {/* UPDATE: Simplified description text */}
            <p className="font-sans text-sm text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Book your support session today. From configuring your tech infrastructure to keeping your physical workspace pristine, we handle it all seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                to="/configure"
                
                className="w-full sm:w-auto bg-white text-zinc-900 font-sans text-xs font-bold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all duration-200"
              >
                Book a Service Session
              </Link>
              <a
                href="tel:1800123456"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-700 text-white font-sans text-xs font-bold px-8 py-4 rounded-xl hover:border-white hover:bg-zinc-800 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Contact Operations
              </a>
            </div>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              Average response time: 12 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. SPECS BAR SECTION */}
      <section className="bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Track Record</p>
              <p className="font-sans text-base font-bold text-zinc-900">Serving Spaces Since 2011</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Core Capabilities</p>
              {/* UPDATE: Replaced the operating systems list with actual daily services managed */}
              <p className="font-sans text-sm font-medium text-zinc-600 mt-0.5">Wi-Fi Networks, Printers, Deep Cleaning, Catering & Repairs</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Service Coverage</p>
              {/* UPDATE: Fixed scope to match hybrid in-person and remote workflows */}
              <p className="font-sans text-sm font-medium text-zinc-600 mt-0.5">On-Site Local Visits & Secure Remote Tech Assistance</p>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}