import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar, Wifi, CheckCircle, FileText, Headphones, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { processSteps } from '../data/services';

const stepIcons = [Calendar, Wifi, CheckCircle, FileText, Headphones];

export default function ProcessPage() {
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
            <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">Our Process</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-4">
              How It Works
            </h1>
            {/* UPDATE: Replaced jargon text with a highly scannable workflow outline */}
            <p className="font-sans text-sm text-zinc-500 max-w-xl leading-relaxed">
              A simple, reliable five-step workflow designed to get your office networks running and physical workspaces cleaned up without any stress.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE PROCESS WORKFLOW */}
      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <div className="relative">
            {/* Center Line Guide */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 md:-translate-x-px" />

            {processSteps.map((step, i) => {
              const StepIcon = stepIcons[i];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Text Content Block */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    {/* UPDATE: Swapped sharp boxes for rounded-2xl structures with micro shadows */}
                    <div className={`bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 md:p-8 inline-block text-left ${
                      isLeft ? 'md:ml-auto' : 'md:mr-auto'
                    } hover:shadow-md transition-all duration-300`}>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                        Step {step.number}
                      </p>
                      <h3 className="font-sans text-xl md:text-2xl font-black tracking-tight text-zinc-900 mb-3">
                        {step.title}
                      </h3>
                      {/* UPDATE: Changed mono font description blocks to clean standard sans */}
                      <p className="font-sans text-xs md:text-sm text-zinc-500 leading-relaxed max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Node Circle Pin */}
                  {/* UPDATE: Rounded the icon nodes to full circles for a smooth modern layout */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-zinc-900 border-4 border-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    {StepIcon && <StepIcon className="w-4 h-4 text-white" />}
                  </div>

                  {/* Empty Flexible Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* METRICS & PERFORMANCE STATS */}
      <section className="bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: '12 min', label: 'Average Response Time' },
              { stat: '98%', label: 'Service Success Rate' }, // Fixed from 'initial deployment' jargon
              { stat: '30 days', label: 'Priority Support Window' }, // Simplified terminology
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                
                className="text-center bg-zinc-50/50 border border-zinc-200 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <p className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 mb-2">
                  {item.stat}
                </p>
                <p className="font-sans text-xs font-semibold text-zinc-400 tracking-wide mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ACTION CTA */}
      <section className="bg-zinc-900">
        <div className="max-w-[1440px] mx-auto section-padding py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-6">
              Experience Hassle-Free Office Care
            </h2>
            {/* UPDATE: Rewrote descriptive subtext to balance both offline and digital solutions */}
            <p className="font-sans text-sm text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
              All-in-one office support that saves you time, keeps your tech setup online, and ensures your physical environment stays completely spotless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/configure"
                
                className="w-full sm:w-auto bg-white text-zinc-900 font-sans text-xs font-bold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all duration-200 shadow-md"
              >
                Start Your Setup
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