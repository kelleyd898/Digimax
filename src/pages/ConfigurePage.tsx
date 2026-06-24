import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, Phone, ArrowRight, AlertTriangle, X, MapPin, User, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── EXTENDED & SIMPLIFIED SERVICE DATABASE ──────────────────────────────────
// Covers all 12 Online & Offline operational workspace services
const deviceDatabase = [
  // ── ONLINE / DIGITAL SOLUTIONS ──
  {
    name: 'High-Speed Mesh Wi-Fi Setup',
    category: 'Online & Network Support',
    services: [
      { name: 'Router Installation & ISP Connection', description: 'Connecting and authenticating your main internet link securely.', price: 79 },
      { name: 'Wi-Fi Range Extension & Boosters', description: 'Deploying multi-node mesh extenders to fix office dead zones.', price: 99 },
      { name: 'Password Security & Firewall Hardening', description: 'Setting up strong access keys and anti-hacking network protections.', price: 59 },
      { name: 'Isolated Guest Network Setup', description: 'Creating a separate, limited network for company visitors.', price: 39 },
    ],
  },
  {
    name: 'Office Printer & Scanner Support',
    category: 'Online & Network Support',
    services: [
      { name: 'Initial Setup & Wireless Connection', description: 'Unboxing hardware and linking the device to your main office Wi-Fi.', price: 89 },
      { name: 'Team Computer Print Sharing', description: 'Configuring all staff laptops so they can print wirelessly instantly.', price: 49 },
      { name: 'Print Alignment & Quality Calibration', description: 'Cleaning internal rollers and fixing blurred paper output issues.', price: 39 },
      { name: 'Scan-to-Cloud Integration', description: 'Setting up shortcuts to route scanned docs directly to Google Drive.', price: 49 },
    ],
  },
  {
    name: 'New Computer Workstation Setup',
    category: 'Online & Network Support',
    services: [
      { name: 'Operating System Clean Installation', description: 'Setting up secure accounts on a fresh Windows or Mac computer.', price: 89 },
      { name: 'Business Apps & Software Kits', description: 'Installing web browsers, security suites, and office utilities.', price: 59 },
      { name: 'Data Migration from Previous Device', description: 'Safely moving local documents, media, and records onto new drives.', price: 99 },
      { name: 'Performance Boost & Startup Tuning', description: 'Removing background bloatware apps to ensure maximum speed.', price: 69 },
    ],
  },
  {
    name: 'Business Email & Team Chat Setup',
    category: 'Online & Network Support',
    services: [
      { name: 'Custom Domain Email Mapping', description: 'Configuring official company inboxes (name@yourbrand.com) via Google Workspace.', price: 49 },
      { name: 'Calendar Synchronization', description: 'Setting up shared team schedules for viewing real-time availability.', price: 45 },
      { name: 'Two-Factor Authentication Security', description: 'Adding biometric or phone app login keys to block data leaks.', price: 39 },
    ],
  },
  {
    name: 'Cloud Storage & Automatic Backup',
    category: 'Online & Network Support',
    services: [
      { name: 'Cloud Storage Account Architecture', description: 'Setting up shared drive structures across multiple departments.', price: 49 },
      { name: 'Continuous Background Sync Loop', description: 'Configuring client computers to auto-save files to the cloud.', price: 55 },
      { name: 'Accidental File Deletion Recovery Plan', description: 'Setting up version history logs to instantly restore lost data.', price: 79 },
    ],
  },

  // ── OFFLINE / PHYSICAL FACILITY MANAGEMENT ──
  {
    name: 'Office Deep Cleaning Workspace',
    category: 'Offline & Facility Operations',
    services: [
      { name: 'Hardware & Desk Disinfection', description: 'Sanitizing desktop frames, shared keyboards, and office chairs.', price: 69 },
      { name: 'Carpet Machine Vacuum & Wash', description: 'Deep shampooing dirt lanes and treating textile stains.', price: 89 },
      { name: 'Window Glass & Blind Dusting', description: 'Polishing partition dividers and main glass panels inside rooms.', price: 59 },
    ],
  },
  {
    name: 'Corporate Kitchen & Chef Setup',
    category: 'Offline & Facility Operations',
    services: [
      { name: 'Daily Meal Program Execution', description: 'Onsite placement of vetted cooks to serve nutritious breakfast & lunch.', price: 199 },
      { name: 'Breakroom Pantry Stocking Routine', description: 'Managing snack line logistics, fresh milk bars, and inventory scales.', price: 49 },
      { name: 'Executive Meeting Fine Catering', description: 'Providing gourmet snack plates and premium beverages for board members.', price: 99 },
    ],
  },
  {
    name: 'Handyman Repairs & AC Servicing',
    category: 'Offline & Facility Operations',
    services: [
      { name: 'Air Conditioner Tuning & Filters Change', description: 'Cleaning core dust meshes and inspecting drainage line logs.', price: 79 },
      { name: 'Electrical Switch & Light Panel Repair', description: 'Replacing broken ceiling lights and diagnostic terminal troubleshooting.', price: 59 },
      { name: 'Cabinet Carpentry & Lock Replacement', description: 'Assembling modular tables or repairing broken drawer locks.', price: 69 },
    ],
  },
  {
    name: 'CCTV Camera & Security Surveillance',
    category: 'Offline & Facility Operations',
    services: [
      { name: 'HD Security Camera Angle Mounting', description: 'Positioning lenses at critical workspace access nodes.', price: 119 },
      { name: 'Recording Storage NVR Configuration', description: 'Setting up local server memory cycles to capture event footage.', price: 89 },
      { name: 'Mobile App View Synchronization', description: 'Linking live streams directly to management smartphone applications.', price: 69 },
    ],
  },
  {
    name: 'Pest Control & Data Line Protection',
    category: 'Offline & Facility Operations',
    services: [
      { name: 'Odor-Free General Insect Mist Spray', description: 'Safe application that cleans kitchen count lines and workspaces.', price: 89 },
      { name: 'Rodent Cable Guarding Framework', description: 'Placing secure wire guards to stop mice from destroying data links.', price: 65 },
    ],
  },
  {
    name: 'Office Shifting & Packing Fleet',
    category: 'Offline & Facility Operations',
    services: [
      { name: 'Anti-Static Screen Asset Bubble Wrapping', description: 'Wrapping delicate server units and screen blocks safely.', price: 149 },
      { name: 'Modular Desk Dismantling & Build', description: 'Taking down partition walls and reassembling them at the new site.', price: 199 },
      { name: 'Closed Container Vehicle Truck Transit', description: 'Providing heavy truck hauling safely protected against weather.', price: 249 },
    ],
  }
];

// ─── POPULAR SEARCH SUGGESTIONS ──────────────────────────────────────────────
const popularSearches = [
  'High-Speed Mesh Wi-Fi Setup',
  'Office Printer & Scanner Support',
  'New Computer Workstation Setup',
  'Office Deep Cleaning Workspace',
  'Corporate Kitchen & Chef Setup',
  'Handyman Repairs & AC Servicing',
  'CCTV Camera & Security Surveillance',
  'Office Shifting & Packing Fleet'
];

type BookingState = 'form' | 'loading' | 'success';

// ─── BOOKING MODAL COMPONENT ──────────────────────────────────────────────────
function BookingModal({
  total,
  deviceName,
  selectedServiceNames,
  onClose,
}: {
  total: number;
  deviceName: string;
  selectedServiceNames: string[];
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [state, setState] = useState<BookingState>('form');
  const [form, setForm] = useState({ name: '', email: '', location: '' });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.location) return;
    setState('loading');
    setTimeout(() => {
      setState('success');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(9, 9, 11, 0.7)', backdropFilter: 'blur(6px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="bg-white w-full max-w-lg relative rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.18)' }}
        >
          {state === 'form' && (
            <>
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 md:p-8 border-b border-zinc-100 bg-zinc-50/50">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                    Continue to Booking
                  </p>
                  <h2 className="font-sans text-xl font-black tracking-tight text-zinc-900">
                    {deviceName}
                  </h2>
                  <p className="font-sans text-xs text-zinc-500 mt-1">
                    {selectedServiceNames.length} solution{selectedServiceNames.length !== 1 ? 's' : ''} selected · <span className="text-zinc-900 font-black">${total}</span>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-zinc-900 transition-colors duration-200 p-1 rounded-lg hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Selected Services Layout Summary */}
              <div className="px-6 md:px-8 pt-6 pb-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2.5">
                  Selected Workspace Tasks
                </p>
                <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {selectedServiceNames.map((s) => (
                    <li key={s} className="flex items-start gap-2 font-sans text-xs text-zinc-600 leading-snug">
                      <span className="text-zinc-400 font-bold shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Input Form Fields */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-3.5 pt-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Your Assignment Details
                </p>

                {/* Full Name Input */}
                <div className="flex border border-zinc-200 rounded-xl bg-white focus-within:border-zinc-900 transition-colors overflow-hidden">
                  <div className="flex items-center pl-4 text-zinc-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="flex-1 px-4 py-3.5 font-sans text-sm bg-transparent outline-none placeholder:text-zinc-400"
                  />
                </div>

                {/* Email Address Input */}
                <div className="flex border border-zinc-200 rounded-xl bg-white focus-within:border-zinc-900 transition-colors overflow-hidden">
                  <div className="flex items-center pl-4 text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="flex-1 px-4 py-3.5 font-sans text-sm bg-transparent outline-none placeholder:text-zinc-400"
                  />
                </div>

                {/* Office/Home Location Input */}
                <div className="flex border border-zinc-200 rounded-xl bg-white focus-within:border-zinc-900 transition-colors overflow-hidden">
                  <div className="flex items-center pl-4 text-zinc-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Workspace Address (City, ZIP)"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    className="flex-1 px-4 py-3.5 font-sans text-sm bg-transparent outline-none placeholder:text-zinc-400"
                  />
                </div>

                {/* Interactive Submit Trigger */}
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.location}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-sans text-xs font-bold px-6 py-4 rounded-xl hover:bg-zinc-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2 shadow-sm"
                >
                  Confirm Operations Scheduling · ${total}
                  <ArrowRight className="w-3 h-3" />
                </button>

                <p className="font-sans text-[10px] text-zinc-400 text-center leading-relaxed">
                  An operations specialist will coordinate lines with you within 24 hours to secure your scheduling matrix.
                </p>
              </div>
            </>
          )}

          {/* LOADING SYSTEM STATE */}
          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center py-24 px-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-10 h-10 text-zinc-900" />
              </motion.div>
              <p className="font-sans text-base font-black text-zinc-900 mt-6">Processing Booking Request</p>
              <p className="font-sans text-xs text-zinc-400 mt-1.5">Encrypting data logs safely…</p>
            </div>
          )}

          {/* SUCCESS STATUS FEEDBACK */}
          {state === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 px-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <CheckCircle2 className="w-14 h-14 text-zinc-900" strokeWidth={1.2} />
              </motion.div>
              <p className="font-sans text-xl font-black tracking-tight text-zinc-900 mt-6">
                Booking Logged Successfully
              </p>
              <p className="font-sans text-xs text-zinc-500 mt-2 leading-relaxed max-w-xs">
                Your dispatch metrics are queued. Our operations manager will reach out within 24 hours.
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 mt-8">Redirecting home layout…</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN CONFIGURE CONFIGURATION PAGE ────────────────────────────────────────
export default function ConfigurePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});
  const [bookingDevice, setBookingDevice] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return deviceDatabase.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleService = (deviceName: string, serviceName: string) => {
    const key = `${deviceName}-${serviceName}`;
    setSelectedServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSelectedTotal = (deviceName: string) => {
    const device = deviceDatabase.find((d) => d.name === deviceName);
    if (!device) return 0;
    return device.services.reduce((sum, s) => {
      const key = `${deviceName}-${s.name}`;
      return sum + (selectedServices[key] ? s.price : 0);
    }, 0);
  };

  const getSelectedServiceNames = (deviceName: string) => {
    const device = deviceDatabase.find((d) => d.name === deviceName);
    if (!device) return [];
    return device.services
      .filter((s) => selectedServices[`${deviceName}-${s.name}`])
      .map((s) => s.name);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* DYNAMIC FORM SCHEDULING DISPATCH CONTAINER */}
      {bookingDevice && (
        <BookingModal
          deviceName={bookingDevice}
          total={getSelectedTotal(bookingDevice)}
          selectedServiceNames={getSelectedServiceNames(bookingDevice)}
          onClose={() => setBookingDevice(null)}
        />
      )}

      {/* SEARCH SYSTEM ACTION BLOCK */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">Workspace Assessment</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-4">
              Find Your Solution
            </h1>
            <p className="font-sans text-base text-zinc-500 max-w-xl leading-relaxed mb-10">
              Search for any digital hardware connection profile or physical facility operation checklist to review clear pricing grids.
            </p>
          </motion.div>

          {/* SEARCH FIELD GRID LAYOUT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mb-8"
          >
            <div className="flex border border-zinc-300 bg-white rounded-xl focus-within:border-zinc-900 shadow-sm transition-colors overflow-hidden">
              <div className="flex items-center pl-4 text-zinc-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solutions (e.g., Wi-Fi, Printer, Office Cleaning, Deep Repairs)"
                className="flex-1 px-4 py-4 font-sans text-sm bg-transparent outline-none placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center pr-4 text-zinc-400 hover:text-zinc-900 transition-colors duration-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* POPULAR DEFAULTS DISPLAY MAP */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Popular Requests
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="font-sans text-xs font-semibold text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 hover:bg-white hover:border-zinc-900 hover:text-zinc-900 hover:shadow-sm transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* RENDER DYNAMIC SEARCH STREAM TIERS */}
      <AnimatePresence>
        {searchQuery && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-50 border-t border-zinc-200"
          >
            <div className="max-w-[1440px] mx-auto section-padding py-16 md:py-24">
              {results.length === 0 ? (
                <div className="text-center py-16 bg-white border border-zinc-200 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
                  <p className="font-sans text-xl font-black text-zinc-900 mb-2">No matching profiles located</p>
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed">
                    Try adjusting search parameters or contact our physical New York desk coordinates for a custom assessment list.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {results.map((device) => (
                    <motion.div
                      key={device.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Item Header */}
                      <div className="p-6 md:p-8 border-b border-zinc-100 bg-zinc-50/20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-sans text-xl font-black tracking-tight text-zinc-900">
                              {device.name}
                            </h3>
                            <span className="inline-block font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded mt-1.5">
                              {device.category}
                            </span>
                          </div>
                          {getSelectedTotal(device.name) > 0 && (
                            <div className="text-left md:text-right bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-sm animate-fade-in">
                              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">Selected Total</p>
                              <p className="font-sans text-2xl font-black tracking-tighter">
                                ${getSelectedTotal(device.name)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Services Sub-tier Map row */}
                      <div className="p-6 md:p-8">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                          Available Checklist Frameworks
                        </p>
                        <div className="space-y-3">
                          {device.services.map((service) => {
                            const key = `${device.name}-${service.name}`;
                            const isSelected = selectedServices[key];

                            return (
                              <button
                                key={service.name}
                                onClick={() => toggleService(device.name, service.name)}
                                className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all duration-200 text-left ${
                                  isSelected
                                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                                    : 'border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50/50'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <div
                                    className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                                      isSelected ? 'border-white bg-white text-zinc-900' : 'border-zinc-300'
                                    }`}
                                  >
                                    {isSelected && <Check className="w-3 h-3 text-zinc-900 stroke-[3px]" />}
                                  </div>
                                  <div>
                                    <p className={`font-sans text-sm font-black leading-tight ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                                      {service.name}
                                    </p>
                                    <p className={`font-sans text-xs mt-1 leading-normal ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                                <span className={`font-sans text-lg font-black tracking-tight flex-shrink-0 ml-4 ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                                  ${service.price}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Bottom Summary validation trigger link */}
                        {getSelectedTotal(device.name) > 0 && (
                          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-zinc-100 pt-6">
                            <div className="flex items-start gap-2 text-zinc-400 max-w-xl">
                              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <p className="font-sans text-[11px] leading-relaxed">
                                Independent technology implementation and customized workspace facility assistance operations. For core manufacturer hardware product warranty details, coordinate lines directly with standard device brand hosts.
                              </p>
                            </div>
                            <button
                              onClick={() => setBookingDevice(device.name)}
                              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 text-white font-sans text-xs font-bold px-6 py-3.5 rounded-xl hover:bg-zinc-800 transition-all duration-200 flex-shrink-0 shadow-sm"
                            >
                              Continue to Booking
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FALLBACK BOTTOM CUSTOM CALL BLOCK */}
      {!searchQuery && (
        <section className="bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
            <div className="text-center max-w-2xl mx-auto bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900 mb-3">
                Custom Workspace Requirements?
              </h2>
              <p className="font-sans text-sm text-zinc-500 leading-relaxed mb-8">
                We design and support specialized parameters for virtually all modern business technology setups and offline building utilities. Contact our desks for custom project matrices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+18005550199"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 text-white font-sans text-xs font-bold px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all duration-200 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  +1 (800) 555-0199
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}