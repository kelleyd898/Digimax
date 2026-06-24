import { useNavigate } from "react-router";
import { Download, ChevronDown, ChevronUp, Printer, Wifi, AlertTriangle, Settings, Droplets, Zap, RotateCcw, FileText, Monitor } from "lucide-react";
import { useState } from "react";

// ─── Short codes only — zero brand names anywhere ─────────────────────────────
// h  = vendor one
// ca = vendor two
// ep = vendor three
// br = vendor four

const vendorCards = [
  { code: "h",  route: "/guide/h",  img: "/images/vendors/h-logo.png",  color: "#0096D6", label: "Vendor H"  },
  { code: "br", route: "/guide/br", img: "/images/vendors/br-logo.png", color: "#2D3092", label: "Vendor BR" },
  { code: "ep", route: "/guide/ep", img: "/images/vendors/ep-logo.png", color: "#00629B", label: "Vendor EP" },
  { code: "ca", route: "/guide/ca", img: "/images/vendors/ca-logo.png", color: "#CC0000", label: "Vendor CA" },
];

// ─── Guide sections shown below brand selector ────────────────────────────────
const guideSections = [
  {
    id: "not-printing",
    icon: Printer,
    title: "Printer Not Printing",
    symptom: "You send a job but nothing comes out — printer is on, no errors shown.",
    content: [
      {
        heading: "Clear the print queue",
        body: "Windows: Control Panel → Devices and Printers → right-click printer → See what's printing → cancel every job. Mac: System Settings → Printers & Scanners → Open Print Queue → delete all. A single stuck job silently blocks every print behind it.",
      },
      {
        heading: "Take the printer back online",
        body: "Windows: right-click printer → uncheck 'Use Printer Offline'. This one step resolves roughly 40% of cases. The printer goes offline silently after any network drop — even a brief one.",
      },
      {
        heading: "Restart the Print Spooler service (Windows)",
        body: "Press Win + R → type services.msc → find Print Spooler → right-click → Restart. This clears corrupted queue data that the cancel button cannot remove.",
      },
      {
        heading: "Confirm the correct printer is selected",
        body: "In the print dialog, verify the dropdown shows your physical printer — not Microsoft Print to PDF, OneNote, or a fax driver. Windows switches defaults silently after updates.",
      },
      {
        heading: "Check physical connections",
        body: "USB: unplug and firmly replug both ends. WiFi: verify printer and computer are on the same band. A common trap — printer on 2.4GHz, laptop on 5GHz. Same router, different subnets, cannot find each other.",
      },
      {
        heading: "Reinstall the driver cleanly",
        body: "Device Manager → Printers → right-click → Uninstall device → check delete driver software. Restart. Then go to the official support site, search your exact model number from the sticker on the printer's bottom, download the latest Full Feature driver, install fresh.",
      },
    ],
    tip: "Restart both printer and computer before anything else. This alone resolves about 30% of printing issues — it costs 60 seconds and you avoid all the steps above.",
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "WiFi Not Connecting or Keeps Dropping",
    symptom: "Printer shows offline, won't connect, or drops connection randomly.",
    content: [
      {
        heading: "Run the Wireless Setup Wizard on the printer",
        body: "On the printer touchscreen: Settings → Network → Wireless Setup Wizard. Select your network name and type the password carefully — passwords are case-sensitive. If your network doesn't appear, confirm the 2.4GHz band is active.",
      },
      {
        heading: "Confirm 2.4GHz — most printers do not support 5GHz",
        body: "Log into your router admin page (usually 192.168.1.1). Ensure a separate 2.4GHz network name is available. If your router combines both bands under one SSID, the printer may try 5GHz and fail silently.",
      },
      {
        heading: "Assign a fixed IP address to the printer",
        body: "Router admin → DHCP settings → find the printer by MAC address (on the sticker on the back) → assign a reserved IP like 192.168.1.150. Dynamic IPs change on every router restart — this permanently stops the 'printer disappeared' problem.",
      },
      {
        heading: "Delete and re-add the printer on your computer",
        body: "Settings → Printers & Scanners → select the printer → Remove. Then Add device and let it discover automatically. This forces the computer to find the current IP instead of using a cached old one.",
      },
      {
        heading: "Check signal strength",
        body: "On the printer: Settings → Network → Wireless Status or print a Network Configuration Page. Signal below 50% causes random drops. Move the printer closer to the router or add a WiFi extender between them.",
      },
    ],
    tip: "Print a Network Configuration Page from the printer's settings — no computer needed. It shows the exact IP address, signal strength, and which network the printer is actually on. Faster than any other diagnostic step.",
  },
  {
    id: "paper-jam",
    icon: AlertTriangle,
    title: "Paper Jam — Real and Ghost Jams",
    symptom: "Printer shows paper jam error. Paper may be visible, or the error persists after clearing.",
    content: [
      {
        heading: "Power off before reaching inside",
        body: "Turn the printer fully off and unplug it before removing paper. The feed mechanism has moving gears — powering on while your hand is inside damages rollers or causes injury.",
      },
      {
        heading: "Pull paper only in the forward direction",
        body: "Pull in the direction paper normally travels — forward, never backward. Backward force tears paper and leaves fragments that will trigger the jam sensor again on the next print.",
      },
      {
        heading: "Check every access door with a flashlight",
        body: "Open the rear panel, front tray, output slot, and cartridge door. A 1cm torn piece retriggers the sensor as reliably as a full page. Use a flashlight to see all corners. Remove fragments with tweezers — never tape.",
      },
      {
        heading: "Reset the sensor after clearing (ghost jam fix)",
        body: "After removing all paper: power off → unplug → wait 60 seconds → plug in → power on. The 60-second wait forces optical sensors to fully reset. Pressing power off then on immediately does not clear sensor memory.",
      },
      {
        heading: "Clean the pickup rollers",
        body: "Dampen a lint-free cloth with distilled water. Wipe the rubber pickup rollers inside the paper tray while rotating them by hand. Glazed or dirty rollers are the number one cause of repeat jams — cleaning them takes two minutes.",
      },
    ],
    tip: "Fan your paper stack before loading — riffle through the edges so every sheet separates. In humid environments, sheets stick together and feed as clumps, causing jams on every print.",
  },
  {
    id: "print-quality",
    icon: Droplets,
    title: "Poor Print Quality — Streaks, Fading, Wrong Colors",
    symptom: "Pages show horizontal lines, faded patches, streaks, or colors look off.",
    content: [
      {
        heading: "Run the built-in nozzle cleaning utility",
        body: "Printer software → Maintenance → Clean Printhead or Nozzle Cleaning. Run the full cycle, print a test page, repeat if needed. Two or three passes are sometimes required. Each cycle uses a small amount of ink.",
      },
      {
        heading: "Print a nozzle check pattern",
        body: "Maintenance → Nozzle Check → print. The test grid shows every ink color as rows of lines. Any row with gaps indicates that color nozzle is clogged. You will know exactly which color needs attention.",
      },
      {
        heading: "Check real ink or toner levels",
        body: "Open printer software and check levels. For toner: remove the cartridge and gently rock it side to side — this redistributes powder and can extend life by 10–20%. For ink tanks: look at the physical tank window rather than trusting the software estimate.",
      },
      {
        heading: "Match paper type in print settings exactly",
        body: "Print Properties → Paper/Quality → Media Type. Select the type that matches what is loaded. Printing on photo paper with the plain paper setting — or vice versa — causes incorrect ink volume and streaking. This setting alone accounts for many quality problems.",
      },
      {
        heading: "Run printhead alignment",
        body: "After any cartridge change: Maintenance → Align Printhead. The printer prints a calibration pattern and self-corrects the physical position of nozzles. Fixes color-shifted, banded, and blurry prints from cartridge replacements.",
      },
      {
        heading: "Manual printhead soak (last resort)",
        body: "If software cleaning fails: remove the printhead. Set it nozzle-side down in a shallow dish of warm distilled water for 10 minutes — just enough to cover the nozzle plate. Dry completely with lint-free cloth, reinstall, run one cleaning cycle.",
      },
    ],
    tip: "Print at least one color page per week if the printer sits idle. Inkjet nozzles dry out when unused — a weekly page keeps ink flowing and prevents the clogging that requires multiple cleaning cycles.",
  },
  {
    id: "driver",
    icon: Settings,
    title: "Driver Installation Problems",
    symptom: "Printer not recognized, driver fails to install, or shows Driver Unavailable.",
    content: [
      {
        heading: "Download from the official support site only",
        body: "Never use third-party driver sites — they bundle malware. Go directly to the manufacturer support page, enter your exact model number from the sticker on the printer's bottom or back, select your OS version, and download the Full Feature Software — not just the Basic Driver.",
      },
      {
        heading: "Remove all previous drivers before reinstalling",
        body: "Device Manager → Printers → right-click printer → Uninstall device → check delete driver software. Settings → Printers & Scanners → remove the printer. Restart the computer. Only install the new driver after the reboot.",
      },
      {
        heading: "Run the installer as Administrator",
        body: "Right-click the installer file → Run as administrator. Standard user accounts fail to install printer drivers silently — no error, nothing installs. Administrator mode gives the installer the system access it requires.",
      },
      {
        heading: "Pause antivirus during installation",
        body: "Right-click antivirus in system tray → pause protection for 10 minutes. Some security software quarantines driver installer components. Re-enable immediately after installation completes.",
      },
      {
        heading: "Use the Add Printer wizard",
        body: "Settings → Bluetooth & Devices → Printers & Scanners → Add a printer or scanner. Let Windows search for 2 minutes. If it finds the printer, it downloads a compatible driver from Windows Update automatically.",
      },
    ],
    tip: "Your model number is on a sticker on the bottom or back — not the product line name on the front. The driver for one model is often incompatible with nearby models in the same line.",
  },
  {
    id: "cartridge",
    icon: Zap,
    title: "Cartridge Not Recognized",
    symptom: "After installing a cartridge: not recognized, incompatible cartridge, or shows empty immediately.",
    content: [
      {
        heading: "Remove ALL protective tape and clips",
        body: "New cartridges have orange plastic clips AND clear tape over the copper contact strip. Both must be fully removed. The contact tape blends in — run your finger along the copper strip and feel for any tape edge. A single corner of tape remaining causes not recognized.",
      },
      {
        heading: "Clean the copper contacts",
        body: "Fold a dry lint-free cloth and gently wipe the copper strip on the cartridge in one smooth stroke. Then wipe the matching contacts inside the printer. Fingerprint oil on contacts is the second most common cause of not recognized after tape.",
      },
      {
        heading: "Remove and reinstall the cartridge 2–3 times",
        body: "The printer scans installed cartridges each time the cartridge door closes. Remove the cartridge, close the door, open, reinstall. Repeat two or three times. Each attempt is a fresh read — a single failed attempt does not mean the cartridge is bad.",
      },
      {
        heading: "Confirm cartridge is in the correct slot",
        body: "Slots are labeled or color-coded: Black, Cyan, Magenta, Yellow. Cyan in the Magenta slot causes immediate rejection. Remove all cartridges and reinstall each one in the slot matching its label. Each should click firmly into place.",
      },
      {
        heading: "Check for a blocking firmware update",
        body: "Manufacturers release firmware updates that disable non-original cartridges. If the cartridge worked before a recent printer update, this is likely the cause. Options: contact the cartridge supplier for a chip update, or use original cartridges.",
      },
    ],
    tip: "Original cartridges have a hologram or QR code on packaging verifiable on the manufacturer website. Counterfeit cartridges sold as genuine frequently cause permanent printhead damage within weeks.",
  },
  {
    id: "scanning",
    icon: RotateCcw,
    title: "Scanner Not Working",
    symptom: "Scan button does nothing, scanner not found in software, or scans come out blank.",
    content: [
      {
        heading: "Install Full Feature Software — not just the basic driver",
        body: "When downloading from the support site, choose Full Feature Software. The basic driver installs printing only. Scanning requires a scanner driver, scanning application, and sometimes an OCR module — all only in the full package.",
      },
      {
        heading: "Use the manufacturer's scanning application",
        body: "The scan button on the printer is linked to the official app, not third-party software. Install and open the official scanning app for your model. Try scanning from within the app rather than pressing the physical button.",
      },
      {
        heading: "Enable Scan to PC on the printer itself",
        body: "Many printers ship with this off. On the printer touchscreen: Settings or Scan → Scan to PC → toggle On. This must be done on the printer — not from the computer. Without it, the printer ignores all scan commands.",
      },
      {
        heading: "Allow scanning software through the firewall",
        body: "Control Panel → Windows Defender Firewall → Allow an app → find the printer scanning software → check both Private and Public columns. Firewall blocks are silent — the scanner appears to do nothing with no error shown.",
      },
      {
        heading: "Clean the scanner glass",
        body: "Spray glass cleaner on a microfiber cloth — never directly on the glass. Wipe in one direction. Also clean the white underside of the document lid — it reflects light and streaks on it appear in every scan.",
      },
    ],
    tip: "For WiFi scanning, confirm WSD Scan is enabled in the printer's network settings. Without it, WiFi scanning fails completely even when WiFi printing works fine.",
  },
  {
    id: "slow",
    icon: Monitor,
    title: "Printer Printing Very Slowly",
    symptom: "Long delay before printing starts, or pages take much longer than expected.",
    content: [
      {
        heading: "Switch print quality to Standard or Normal",
        body: "Print Properties → Quality → Standard or Normal. Best quality renders at 1200 DPI — processing takes 3–5× longer than Standard. For everyday documents, Standard is visually identical at reading distance.",
      },
      {
        heading: "Check WiFi signal strength",
        body: "Weak WiFi slows data transfer to the printer — it sits idle waiting for data between pages. If signal is below 50%, move the printer closer to the router. A USB cable transfers data at full speed regardless of network.",
      },
      {
        heading: "Switch to black and white (grayscale)",
        body: "Print Properties → Color → Grayscale. Color processing calculates ink ratios for four cartridges per pixel. Grayscale is 40–60% faster on most inkjet models for text documents.",
      },
      {
        heading: "Reduce image resolution in your file",
        body: "For documents with many photos, reduce image resolution to 150 DPI (screen output) or 300 DPI (print quality) before printing. Images at 600 DPI+ create large data files that overwhelm the printer's processor.",
      },
      {
        heading: "Clear the queue and print one job at a time",
        body: "Cancel all queued jobs, restart the printer, then resend only the document needed. Multiple queued jobs compete for printer RAM and slow processing for everything that follows.",
      },
    ],
    tip: "If the first page always takes 30+ seconds but subsequent pages are fast, the printer is waking from sleep mode. Disable sleep mode in printer settings if you print frequently throughout the day.",
  },
  {
    id: "duplex",
    icon: FileText,
    title: "Two-Sided (Duplex) Printing Not Working",
    symptom: "Only one side prints, or pages come out in the wrong order.",
    content: [
      {
        heading: "Confirm your model supports automatic duplex",
        body: "Check the spec sheet on the support site for your model number — look for 'Automatic 2-Sided Printing: Yes/No'. If No, the printer only supports manual duplex where you reload paper yourself.",
      },
      {
        heading: "Enable duplex in the printer driver settings",
        body: "In print dialog → Printer Properties or More Settings → Layout or Finishing → Print on Both Sides → Long Edge Binding (standard) or Short Edge Binding (calendar style). The driver setting must be enabled separately from any in-app setting.",
      },
      {
        heading: "Manual duplex workaround",
        body: "Print odd-numbered pages first. Flip the stack (do a marked test page to learn the correct orientation for your specific printer). Print even-numbered pages. Works on every printer, same result as automatic.",
      },
      {
        heading: "Check paper weight",
        body: "Most duplex units handle up to 90gsm reliably. Heavier cardstock jams the flip mechanism. Check model specifications — duplex weight limits are often lower than main tray limits.",
      },
    ],
    tip: "If duplex prints pages out of order, check for a Reverse Page Order setting in your print dialog or PDF viewer — this conflicts with the printer driver's duplex page sequencing.",
  },
];

// ─── Accordion item ───────────────────────────────────────────────────────────
function GuideAccordion({
  section,
  isOpen,
  onToggle,
}: {
  section: typeof guideSections[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;
  return (
    <div className="border border-zinc-200 bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-zinc-50 transition-colors gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-zinc-100">
            <Icon className="w-5 h-5 text-zinc-600" />
          </div>
          <div>
            <p className="font-sans text-sm font-bold text-zinc-900">{section.title}</p>
            <p className="font-mono text-xs text-zinc-500 mt-0.5">{section.symptom}</p>
          </div>
        </div>
        {isOpen
          ? <ChevronUp className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
        }
      </button>

      <AnimatePresenceWrapper isOpen={isOpen}>
        <div className="border-t border-zinc-100 px-6 pb-8">
          <div className="mt-6 space-y-5">
            {section.content.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-zinc-800 text-white font-mono text-xs font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-zinc-900 mb-1">{item.heading}</p>
                  <p className="font-mono text-xs text-zinc-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 p-4 bg-zinc-50 border-l-4 border-zinc-800">
            <p className="font-mono text-xs text-zinc-700 leading-relaxed">
              <span className="font-bold text-zinc-900">Tip: </span>{section.tip}
            </p>
          </div>
        </div>
      </AnimatePresenceWrapper>
    </div>
  );
}

// Simple animation wrapper to keep AnimatePresence out of the main tree
import { AnimatePresence, motion } from "framer-motion";
function AnimatePresenceWrapper({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GuideIndex() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero — plain white, professional ── */}
      <div className="border-b border-zinc-200 bg-white py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 mb-6"
        >
          Select Your Printer Model
        </motion.h1>

        {/* Download button — matches screenshot style */}
        <motion.a
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          href="#download"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "#0096D6" }}
        >
          <Download className="w-4 h-4" />
          Download Your Printer Drivers
        </motion.a>
      </div>

      {/* ── Brand cards row ── */}
      <div className="bg-white py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {vendorCards.map((v, i) => (
              <motion.button
                key={v.code}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(v.route)}
                className="flex items-center justify-center bg-white border-2 border-zinc-200 hover:border-zinc-400 transition-all duration-150 cursor-pointer"
                style={{ minHeight: 160, borderRadius: 2 }}
              >
                {/* Logo image — no text */}
                <img
                  src={v.img}
                  alt={v.label}
                  className="max-w-[110px] max-h-[60px] w-auto h-auto object-contain"
                  onError={(e) => {
                    // Fallback: colored text code if image missing
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const span = document.createElement("span");
                    span.style.cssText = `font-size:28px;font-weight:900;color:${v.color};font-family:sans-serif;letter-spacing:-1px`;
                    span.textContent = v.code.toUpperCase();
                    t.parentElement?.appendChild(span);
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider section ── */}
      <div className="bg-zinc-50 border-t border-b border-zinc-200 py-14 px-6 text-center">
        <h2 className="font-sans text-2xl md:text-3xl font-black tracking-tighter text-zinc-900 mb-2">
          Need Help For Printer &amp; Scanner
        </h2>
        <p className="font-mono text-sm text-zinc-500">
          Step-by-step guides for the most common issues — no technician needed.
        </p>
      </div>

      {/* ── Guide content — accordion ── */}
      <div className="bg-white py-14 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
              Troubleshooting Guide
            </p>
            <h3 className="font-sans text-xl font-black tracking-tight text-zinc-900">
              Common Issues &amp; How to Fix Them
            </h3>
          </div>

          <div className="space-y-3">
            {guideSections.map((section) => (
              <GuideAccordion
                key={section.id}
                section={section}
                isOpen={openId === section.id}
                onToggle={() => setOpenId(openId === section.id ? null : section.id)}
              />
            ))}
          </div>

          {/* Bottom note */}
          <p className="font-mono text-[10px] text-zinc-400 text-center mt-10 leading-relaxed">
            Independent configuration guide. Not affiliated with any printer manufacturer.
          </p>
        </div>
      </div>

    </div>
  );
}