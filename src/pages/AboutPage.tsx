import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Phone, Shield, Clock, Star, CheckCircle, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';

// UPDATE: Rewrote descriptions to perfectly fit the combined Online (Tech) & Offline (Ground) operations
const values = [
  { 
    icon: Shield, 
    title: 'Trust & Transparency', 
    desc: 'No hidden fees or surprise costs. Every single recommendation is clear, upfront, and focused on your actual business needs.' 
  },
  { 
    icon: Clock, 
    title: 'Absolute Punctuality', 
    desc: 'We strictly respect your time. Whether it is a remote support call or an in-person deep cleaning session, we arrive exactly when scheduled.' 
  },
  { 
    icon: Star, 
    title: 'Operational Excellence', 
    desc: 'Our goal is your everyday comfort. We ensure your internet networks run fast, devices connect smoothly, and your floors stay sparkling clean.' 
  },
  { 
    icon: CheckCircle, 
    title: 'Full Accountability', 
    desc: 'No messy handovers. You receive clear summary sheets, step-by-step checklists, and passwords for all services we manage.' 
  },
  { 
    icon: Users, 
    title: 'Clear Team Training', 
    desc: 'We explain things simply without confusing tech jargon, giving your team full control over your updated systems and tools.' 
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">About Us</p>
            {/* UPDATE: Replaced heavy jargon with a powerful, hybrid corporate headline */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-6 max-w-4xl">
              Complete Tech Support & Workplace Care
            </h1>
            <p className="font-sans text-base text-zinc-500 max-w-2xl leading-relaxed">
              Since 2011, we have been the trusted all-in-one partner for businesses that need fast, secure internet setups on the digital side—and pristine, professional maintenance on the physical side.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/about-story.jpg"
                alt="Professional team handling office systems and environment setups"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 mb-6">
                Making Workspaces Work Seamlessly
              </h2>
              {/* UPDATE: Cleaned up sentences from 'technical architecture logs' to conversational real business values */}
              <div className="space-y-4 font-sans text-sm text-zinc-600 leading-relaxed">
                <p>
                  What started as a small team fixing persistent internet issues and printer errors has grown into a comprehensive service group. We believe that a productive team requires both flawless digital tools and a healthy, clean office environment.
                </p>
                <p>
                  Over the past decade, we have supported thousands of workspaces. From setting up secure cloud shared drives and corporate business emails to placing professional culinary chefs and running regular handyman utilities, our team manages everything smoothly.
                </p>
                <p>
                  We took out the stress of deal-hunting with multiple vendors. By combining expert remote technical support with reliable local ground operations, we provide a single, premium channel to keep your office safe, functional, and deeply optimized.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Our Values"
            subtitle="The fundamental standards we bring to every home, commercial site, and business infrastructure project."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                
                className="bg-zinc-50/50 border border-zinc-200 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:border-zinc-300 transition-all duration-300"
              >
                <value.icon className="w-8 h-8 text-zinc-400 mb-5" />
                <h3 className="font-sans text-lg font-black tracking-tight text-zinc-900 mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: '2011', label: 'Established' },
              { stat: '2,400+', label: 'Services Delivered' }, // Fixed from 'Environments Deployed'
              { stat: '4.9/5', label: 'Client Rating' },
              { stat: 'USA Scope', label: 'Local & Remote Help' }, // Synced to US operations
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-sans text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 mb-1">
                  {item.stat}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL PAGE CTA */}
      <section className="bg-zinc-900">
        <div className="max-w-[1440px] mx-auto section-padding py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-6">
              Optimize Your Workspace Operations
            </h2>
            <p className="font-sans text-sm text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Join hundreds of modern business admins and team leaders who count on us for reliable workflows and pristine environments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/configure"
                className="w-full sm:w-auto bg-white text-zinc-900 font-sans text-xs font-bold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all duration-200"
              >
                Book a Session
              </Link>
              <a
                href="tel:+18005550199"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-700 text-white font-sans text-xs font-bold px-8 py-4 rounded-xl hover:border-white hover:bg-zinc-800 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                +1 (800) 555-0199
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}