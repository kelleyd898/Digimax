export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
  subServices: SubService[];
  pricing: ServicePricing;
}

export interface SubService {
  name: string;
  description: string;
}

export interface ServicePricing {
  remote: number;
  inPerson: number;
  premium: number;
}

export const services: Service[] = [
  // ==========================================
  // --- ONLINE & DIGITAL SERVICES (1 to 6) ---
  // ==========================================
  {
    id: "1",
    slug: "wifi-and-internet",
    title: "High-Speed Wi-Fi & Office Internet Setup",
    subtitle: "Fast and reliable internet for your entire workspace",
    description: "We set up your office internet from scratch. From configuring routers to extending your Wi-Fi range to every single desk, we make sure your team stays online without drops or slowdowns.",
    image: "/images/service-network.jpg",
    icon: "Wifi",
    features: [
      "Router & Modem Configuration (All ISPs)",
      "Wi-Fi Range Extension to Eliminate Dead Zones",
      "Network Password & Guest Access Security",
      "Secure VPN Setup for Secure Remote Staff Access",
      "Bandwidth & Internet Speed Optimization",
      "Isolated Network Creation for Office Visitors"
    ],
    subServices: [
      { name: "Internet Gateway Setup", description: "Connecting your main service provider line to a high-speed router." },
      { name: "Signal Range Extension", description: "Placing boosters so that conference rooms and corners get full bars." },
      { name: "Wi-Fi Security Hardening", description: "Setting up modern password keys and basic firewall rules." }
    ],
    pricing: { remote: 79, inPerson: 129, premium: 169 }
  },
  {
    id: "2",
    slug: "printer-and-hardware-support",
    title: "Dedicated Printer Support & Hardware Repair",
    subtitle: "Fix offline printers, network connections, and paper jams",
    description: "Never let a jammed printer delay your client documentation. We handle wireless network installation, resolve driver conflicts, clear physical paper jams, and set up shared network devices.",
    image: "/images/service-printer.jpg",
    icon: "Printer",
    features: [
      "Fixing 'Printer Offline' & Wi-Fi Disconnect Errors",
      "Wireless Network Printing Config for All Laptops",
      "Printer Driver Installation & Software Updates",
      "Paper Jam Removal & Internal Mechanical Cleaning",
      "Ink Cartridge & Toner Replacement Assistance",
      "Mobile Printing Setup for Smartphones & Tablets"
    ],
    subServices: [
      { name: "Error Diagnostics", description: "Clearing frozen print queues and restoring connection paths." },
      { name: "Network Print Sharing", description: "Linking a main multi-use printer to work with the whole team." },
      { name: "Quality & Alignment Care", description: "Cleaning ink rollers and calibrating prints for crisp text." }
    ],
    pricing: { remote: 49, inPerson: 99, premium: 149 }
  },
  {
    id: "3",
    slug: "computer-optimization",
    title: "New Laptop & PC Setup",
    subtitle: "Start using your new computers with peak speed",
    description: "Bought new computers for your team? We handle everything from the initial Windows or Mac setup to moving your old business files safely and installing the software your business needs to run.",
    image: "/images/service-system.jpg",
    icon: "Monitor",
    features: [
      "Operating System Initialization (Windows & macOS)",
      "Essential Business App & Tool Installations",
      "Safe Profile Data Migration from Old Systems",
      "Speed Optimization & Bloatware Removal",
      "Antivirus Installation & Firewall Configuration",
      "Automated Local Data Backup Configuration"
    ],
    subServices: [
      { name: "Account Profiling", description: "Setting up clean employee logins, passwords, and administration privileges." },
      { name: "Software Kit Deployment", description: "Installing browsers, utility tools, and core business programs." },
      { name: "Data Volume Transfer", description: "Moving files, settings, and local records securely onto new drives." }
    ],
    pricing: { remote: 99, inPerson: 149, premium: 199 }
  },
  {
    id: "4",
    slug: "business-email-setup",
    title: "Business Email & Chat Setup",
    subtitle: "Professional emails and chat channels for your team",
    description: "Stop using basic personal emails for professional business. We set up official company emails (like name@yourcompany.com) using Google Workspace or Microsoft 365, and organize communication tools.",
    image: "/images/service-communication.jpg",
    icon: "Mail",
    features: [
      "Professional Custom Domain Email Configuration",
      "Google Workspace & Microsoft 365 Management",
      "Company-Wide Chat Workspace Setup (Slack/Teams)",
      "Standardized Domain Signatures & Rulesets",
      "Two-Factor Authentication (2FA) Safety Locks",
      "Old Inbox Archive Migration to New Accounts"
    ],
    subServices: [
      { name: "Domain Email Mapping", description: "Configuring verified business mailboxes on your custom domain." },
      { name: "Calendar Synchronizing", description: "Sharing core staff schedules for instant meeting availability checks." },
      { name: "Spam Guard Filters", description: "Enabling filters to block out malicious phishing messages and junk mail." }
    ],
    pricing: { remote: 69, inPerson: 109, premium: 149 }
  },
  {
    id: "5",
    slug: "cloud-storage",
    title: "Cloud Storage & Automatic Backup",
    subtitle: "Keep your important company files safe and accessible",
    description: "Never lose a critical presentation or document again. We organize your digital asset library (Google Drive, OneDrive, or Dropbox) with smart folder setups and schedule background cloud backups.",
    image: "/images/service-media.jpg",
    icon: "Cloud",
    features: [
      "Cloud Storage Architecture Configuration",
      "Structured Shared Folder Tree for Team Units",
      "Automated Continuous Endpoint Computer Backups",
      "File Sharing Permission & Security Restrictions",
      "Accidental File Deletion Recovery Systems",
      "Centralized Secure Password Management Systems"
    ],
    subServices: [
      { name: "Cloud Account Allocation", description: "Provisioning team space allocations with safe quota caps." },
      { name: "Data File Tagging", description: "Structuring simple directories separated for HR, Sales, and Admin." },
      { name: "Automatic Backup Loops", description: "Setting up lightweight sync engines that preserve files in real time." }
    ],
    pricing: { remote: 79, inPerson: 129, premium: 169 }
  },
  {
    id: "6",
    slug: "website-and-google-maps",
    title: "Website Launch & Google Maps Profile",
    subtitle: "Get your business found online by local customers",
    description: "Establish your local presence instantly. We craft clean, mobile-responsive company web pages and pin your storefront or corporate location accurately on Google Maps for local visibility.",
    image: "/images/service-website.jpg",
    icon: "Globe",
    features: [
      "Simple Responsive Business Web Development",
      "Google Business Profile Creation & Map Pinning",
      "Uploading Hours, Brand Photos, and Contact Channels",
      "Custom Domain Connection (.com, .in, or .co)",
      "Basic On-Page Search Engine Optimization (SEO)",
      "Customer Lead Capture Forms Configuration"
    ],
    subServices: [
      { name: "Google Maps Activation", description: "Marking your exact office floor location and submitting verification entries." },
      { name: "Web Landing Page Setup", description: "Publishing essential Home, About, and Services contact hubs." },
      { name: "Local Search Optimization", description: "Polishing descriptions so nearby users locate your brand first." }
    ],
    pricing: { remote: 149, inPerson: 249, premium: 399 }
  },

  // ===========================================
  // --- OFFLINE & FACILITY SERVICES (7 to 12) --
  // ===========================================
  {
    id: "7",
    slug: "deep-cleaning",
    title: "Professional Office Deep Cleaning",
    subtitle: "A spotless, hygienic workspace for your employees",
    description: "Keep your office safe, professional, and completely fresh. Our localized maintenance crews deliver intensive detailing, glass dusting, surface sanitation, and deep carpet treatments.",
    image: "/images/service-cleaning.jpg",
    icon: "Sparkles",
    features: [
      "Desk, Chair, Keyboard, and Hardware Disinfection",
      "Carpet Deep Vacuuming & Machine Shampooing",
      "Window Glass, Blinds, and Partition Cleaning",
      "Cafeteria, Kitchenette, and Restroom Sanitizing",
      "Waste Removal & Eco-Friendly Trash Sorting",
      "Flexible After-Hours or Weekend Scheduling"
    ],
    subServices: [
      { name: "Routine Janitorial Care", description: "Regular dust-and-wipe touchups throughout active office hours." },
      { name: "High-Sanitation Washing", description: "Intensive deep-disinfection target treatment against dust and germs." },
      { name: "Hard Floor Maintenance", description: "Scrubbing, machine buffing, and restoring high-traffic walkways." }
    ],
    pricing: { remote: 0, inPerson: 99, premium: 179 }
  },
  {
    id: "8",
    slug: "corporate-chef",
    title: "Office Chef & Food Catering Services",
    subtitle: "Delicious, healthy meals prepared right at your office",
    description: "Keep your team energetic and satisfied. We place highly skilled professional cooks to manage your in-office cafeteria, run corporate pantries, and curate customized meal programs.",
    image: "/images/service-catering.jpg",
    icon: "Utensils",
    features: [
      "Daily Corporate Lunch & Breakfast Catering",
      "Custom Menu Planning (Healthy & Balanced Diets)",
      "Vetted On-Site Chef & Kitchen Staff Placement",
      "Breakroom Pantry Stocking & Inventory Handling",
      "Executive Board Meeting Fine Dining Treats",
      "Strict Food Safety & Kitchen Cleanliness Inspections"
    ],
    subServices: [
      { name: "Daily Meal Program", description: "Delivering scheduled fresh morning breakfast packages and meal runs." },
      { name: "Pantry Administration", description: "Full provisioning of snack bays, fresh milk, and beverage bars." },
      { name: "Specialized Corporate Menus", description: "Catering gourmet sliders, desserts, and drinks for target mixers." }
    ],
    pricing: { remote: 0, inPerson: 199, premium: 399 }
  },
  {
    id: "9",
    slug: "office-maintenance",
    title: "Handyman, Electrical & Plumbing Repairs",
    subtitle: "Fix office breakdowns instantly without any hassle",
    description: "Do not let leaky pipes or broken lighting delay your core daily routines. Our rapid on-call technical team provides electrical installations, plumbing fixes, cabinetry carpentry, and AC tune-ups.",
    image: "/images/service-maintenance.jpg",
    icon: "Wrench",
    features: [
      "Air Conditioner System Servicing & Filter Swaps",
      "Light Switch, LED Panel, and Core Wiring Fixes",
      "Leaky Washroom Plumbing Repairs & Fittings",
      "Desk Drawer, Cabinet Hinge, and Door Lock Carpentry",
      "Drywall Patching, Paint Touch-ups, & Wall Mounting",
      "Emergency Operations Power Breakdown Audits"
    ],
    subServices: [
      { name: "Electrical Inspection", description: "Assessing distribution boxes, sockets, and server room mains." },
      { name: "Structural Carpentry", description: "Assembling modular office furniture tables, frames, and cabinets." },
      { name: "Plumbing Adjustments", description: "Regulating main lines, drainage paths, and tap flow elements." }
    ],
    pricing: { remote: 49, inPerson: 119, premium: 199 }
  },
  {
    id: "10",
    slug: "cctv-and-security",
    title: "CCTV Camera & Smart Security Installation",
    subtitle: "Protect your space with 24/7 video surveillance",
    description: "Keep a reliable protective guard on your workspace assets. We mount high-definition security cameras, lay safe wiring grids, setup central storage, and route feeds straight to your phone.",
    image: "/images/service-cctv.jpg",
    icon: "Shield",
    features: [
      "HD Security Camera Mounting & Discretely Hidden Wiring",
      "Central Digital Recorder (DVR/NVR) System Layout",
      "Mobile App Linkage for Real-Time Remote Streaming",
      "Infrared Night-Vision & Smart Motion Alarm Tweaks",
      "Biometric Fingerprint & Access Card Entry Installs",
      "Backup Storage Routing for Retaining Video History"
    ],
    subServices: [
      { name: "Camera Layout Planning", description: "Positioning camera units to track all main entryways and halls." },
      { name: "Network Security Link", description: "Syncing recordings over secure web access pipelines for offsite review." },
      { name: "Smart Lock Setup", description: "Fitting automatic magnetic bolt door configurations on priority records areas." }
    ],
    pricing: { remote: 49, inPerson: 149, premium: 249 }
  },
  {
    id: "11",
    slug: "pest-control",
    title: "Office Pest Control & Wire Protection",
    subtitle: "Maintain a pest-free, clean professional layout",
    description: "Protect expensive wooden desks, archive logs, and complex server wiring structures from pest damages. We run odor-free, premium commercial grade pest solutions safe for regular working hours.",
    image: "/images/service-pest.jpg",
    icon: "Bug",
    features: [
      "Anti-Termite Defensive Barriers for Document Assets",
      "Odourless Cockroach Bait Gels for Cafeterias",
      "Targeted Rodent Tracking Blocks near Data Inlets",
      "Non-Toxic Chemical Application Safe for Staff Areas",
      "Flexible Weekend Dispatch to Keep Work Hours Intact",
      "Quarterly or Monthly Preventive Inspection Plans"
    ],
    subServices: [
      { name: "General Pest Purge", description: "Applying targeted non-airborne mist fixes against regular insects." },
      { name: "Data Cable Safeguarding", description: "Securing floor ducts to deter wire-chewing rodents from core lines." },
      { name: "Kitchen Herbal Placements", description: "Using workspace-safe herbal paste remedies behind breakroom items." }
    ],
    pricing: { remote: 0, inPerson: 89, premium: 159 }
  },
  {
    id: "12",
    slug: "office-shifting",
    title: "Office Shifting & Relocation Support",
    subtitle: "Stress-free packing and transit for your business assets",
    description: "Moving into an expanded floor space or new location? Leave the physical labor to our team. We securely box computers, handle transit logistics, transport files, and reconstruct furniture configurations.",
    image: "/images/service-shifting.jpg",
    icon: "Truck",
    features: [
      "Anti-Static Bubble Wrapping for Desktops & Screen Monitors",
      "Reinforced Safe Crates for Active Ledger & Storage Files",
      "Dismantling and Reassembling Large Section Modular Desks",
      "Secure Heavy Asset Lifting (Locker boxes, Safes, Server Racks)",
      "Closed Container Moving Fleets for Total Weather Guard",
      "Guided Unpacking and Workspace Positioning Maps"
    ],
    subServices: [
      { name: "Sensitive Hardware Packing", description: "Enveloping monitors and server components in multi-layered cushioning." },
      { name: "Cubicle Breakdown Support", description: "Unscrewing complex partition layouts and re-erecting them at destinations." },
      { name: "Logistics Vehicle Transit", description: "Providing commercial carrier trucks and tracking for delivery safety." }
    ],
    pricing: { remote: 0, inPerson: 299, premium: 599 }
  }
];

export const deviceDatabase = [
  {
    name: "Heavy-Duty Office Printer & Scanner Array",
    category: "High-Volume Shared Printer",
    services: [
      { name: "Initial Assembly & Network Connection", price: 89, description: "Unboxing the printer and connecting it securely to the office Wi-Fi." },
      { name: "Team Computer Linking", price: 49, description: "Setting up all employee laptops so they can print wirelessly." },
      { name: "Print & Scan Quality Tuning", price: 39, description: "Calibrating print alignments and checking paper feeds." },
      { name: "Scan-to-Cloud Setup", price: 49, description: "Configuring the scanner to send documents straight to Google Drive." }
    ]
  },
  {
    name: "Standard Desktop Computer Workstation",
    category: "Individual Employee Station",
    services: [
      { name: "Computer Setup & Internet Connection", price: 79, description: "Plugging in the monitor, PC, and connecting it safely to the Wi-Fi." },
      { name: "User Account & Profile Setup", price: 39, description: "Creating secure login details for your new staff member." },
      { name: "Essential Apps Installation", price: 29, description: "Installing browsers, office tools, and antivirus software." }
    ]
  },
  {
    name: "Breakroom Coffee & Pantry Hub",
    category: "Office Kitchen Utility",
    services: [
      { name: "Espresso Machine & Appliance Install", price: 99, description: "Setting up commercial coffee machines and microwave stations." },
      { name: "Water Line & Filter Plumbing", price: 49, description: "Connecting appliances directly to fresh water supply lines safely." },
      { name: "Weekly Stocking Service", price: 39, description: "Filling up coffee beans, milk boxes, and basic office snacks." }
    ]
  }
];

export const testimonials = [
  {
    quote: "Exactly what we needed when moving into our new office. Their team sorted out everything—our Wi-Fi is super fast, printers connect instantly, and our workspace is spotless thanks to their cleaning team.",
    author: "Michael R.",
    role: "Office Operations Manager"
  },
  {
    quote: "The technician explained everything very clearly. Our office emails, wireless network printing, and shared cloud backup are fully set up. Saved our team days of tech struggles.",
    author: "Jennifer L.",
    role: "Small Business Owner"
  },
  {
    quote: "Very professional, punctual, and helpful. They handled our computer setups, internet range expansion, and fixed our broken breakroom doors all in one afternoon.",
    author: "David K.",
    role: "IT & Admin Lead"
  }
];

export const processSteps = [
  {
    number: "01",
    title: "Book Your Service",
    description: "Choose your online or offline service on our platform and book a time slot that suits you best."
  },
  {
    number: "02",
    title: "Expert Setup & Fixes",
    description: "Our specialist either joins a remote screen-share or visits your physical office to get the job done."
  },
  {
    number: "03",
    title: "Double-Check Review",
    description: "We test everything right in front of you—whether it's internet speeds or clean floors—to make sure you are 100% happy."
  },
  {
    number: "04",
    title: "Handover & Guides",
    description: "We give you a simple summary list, passwords, and tips on how to manage your new setups easily."
  },
  {
    number: "05",
    title: "Free Follow-Up Support",
    description: "We don't just leave after the job. You get a direct support window to ask questions if anything needs adjustment."
  }
];

export const pricingPlans = [
  {
    name: "Basic Remote Session",
    price: 89,
    unit: "per session",
    features: [
      "Secure online screen-sharing support",
      "Takes around 45-60 minutes to complete",
      "7 days of free follow-up support",
      "Best for quick email, printer connection, or software fixes"
    ],
    popular: false
  },
  {
    name: "Standard In-Person Visit",
    price: 149,
    unit: "per session",
    features: [
      "Expert comes directly to your home or office",
      "Takes around 60-90 minutes to complete",
      "14 days of free follow-up support",
      "Perfect for physical setups like Wi-Fi, printers, or deep cleaning"
    ],
    popular: true
  },
  {
    name: "Premium VIP Support Pack",
    price: 199,
    unit: "per session",
    features: [
      "Mix of both remote and in-person visits",
      "Extended 90-minute session time",
      "30 days of priority emergency help",
      "Full summary list and custom login details delivered"
    ],
    popular: false
  },
  {
    name: "Monthly Office Maintenance",
    price: 149,
    unit: "per month",
    features: [
      "2 regular check-up and fix visits every month",
      "Priority skip-the-line booking anytime",
      "Quarterly safety check for tech & facilities",
      "10% discount on any extra single service"
    ],
    popular: false
  }
];