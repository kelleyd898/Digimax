import { Link } from 'react-router';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  // UPDATE: Simplified service titles and mapped them to user-friendly slugs
  services: [
    { label: 'Wi-Fi & Internet Setup', href: '/services/wifi-and-internet' },
    { label: 'Printer Support & Repair', href: '/services/printer-support-and-repair' },
    { label: 'New PC & Laptop Setup', href: '/services/computer-optimization' },
    { label: 'Business Email Setup', href: '/services/business-email-setup' },
    { label: 'Office Deep Cleaning', href: '/services/deep-cleaning' },
    { label: 'Handyman & Repairs', href: '/services/office-maintenance' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/process' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Book a Service', href: '/configure' },
  ],
  support: [
    { label: 'Search Services', href: '/configure' },
    { label: 'Contact Support', href: 'tel:+18005550199', isExternal: true }, // Updated to US Toll-Free Protocol
    { label: 'FAQs', href: '/process' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white border-t border-zinc-800">
      <div className="max-w-[1440px] mx-auto section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* BRAND & CONTACT COLUMN */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-lg">
                <span className="text-zinc-900 font-sans text-xs font-black">DM</span>
              </div>
              <span className="font-sans text-sm font-black tracking-tight">
                Digi-Maxia
              </span>
            </div>
            {/* UPDATE: Balanced jargon-free corporate bio covering online & offline models */}
            <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
              Complete technology setup and physical facility management solutions for modern workplaces—delivered securely online or in-person with absolute consistency.
            </p>
            <div className="flex flex-col gap-3">
              {/* UPDATE: Added authentic US structured communication details */}
              <a href="tel:+18005550199" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-sans text-xs">
                <Phone className="w-3 h-3 text-zinc-500" />
                +1 (800) 555-0199
              </a>
              <a href="mailto:hello@Digi-Maxia.com" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-sans text-xs">
                <Mail className="w-3 h-3 text-zinc-500" />
                hello@Digi-Maxia.com
              </a>
              {/* UPDATE: Swapped global matrix tag for clean US geographical scope */}
              <span className="flex items-center gap-2 text-zinc-400 font-sans text-xs">
                <MapPin className="w-3 h-3 text-zinc-500" />
                Fifth Avenue, New York, NY, USA
              </span>
            </div>
          </div>

          {/* SERVICES COLUMN */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY COLUMN */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      className="font-sans text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="font-sans text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM META BAR */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            All Rights Reserved &copy; {new Date().getFullYear()}
          </p>
          {/* UPDATE: Re-worded disclaimer to cover general office solutions instead of hardware affiliations */}
          <p className="font-sans text-[10px] text-zinc-600 text-center md:text-right">
            Independent workplace technology configurations and onsite facility management service group.
          </p>
        </div>
      </div>
    </footer>
  );
}