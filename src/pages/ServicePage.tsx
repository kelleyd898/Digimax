import { useParams, Navigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Phone, Wifi, Printer, Monitor, Mail, Home, Camera } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { services } from '../data/services';

const iconMap: Record<string, React.ElementType> = {
  Wifi, Printer, Monitor, Mail, Home, Camera,
};

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.slug === id);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = iconMap[service.icon] || Monitor;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* SERVICE HERO */}
      <section className="pt-32 pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">Workspace Service Details</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-6 max-w-4xl leading-none">
              {service.title}
            </h1>
            {/* UPDATE: Swapped hard font-mono out for standard sans text layout */}
            <p className="font-sans text-base text-zinc-500 max-w-2xl leading-relaxed mb-8">
              {service.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[21/9] overflow-hidden bg-zinc-100 rounded-2xl shadow-sm border border-zinc-200"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SUB-SERVICES GRID */}
      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <SectionHeader
            eyebrow="What's Included"
            title="Comprehensive Plan Inclusions"
            subtitle="Take an in-depth look at the targeted individual solutions built into this service branch."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-16">
            {service.subServices.map((sub, i) => (
              <motion.div
                key={sub.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                
                className="bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-sans text-lg font-black tracking-tight text-zinc-900 mb-2">
                  {sub.name}
                </h3>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  {sub.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* FULL FEATURE CHECKLIST */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <h3 className="font-sans text-xl font-black tracking-tight text-zinc-900 mb-6 border-b border-zinc-100 pb-4">
              Full Feature Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-zinc-900" />
                  </div>
                  <span className="font-sans text-sm text-zinc-600 leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PRICING TIERS */}
      <section className="bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <SectionHeader
            eyebrow="Pricing Model"
            title="Available Service Tiers"
            subtitle="Transparent and direct flat rates. Choose the operation delivery format that fits best."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            {[
              { name: 'Remote', price: service.pricing.remote, features: ['Secure encrypted session', '45-60 minute resolution window', '7 days of free follow-up support'], isRemote: true },
              { name: 'In-Person Visit', price: service.pricing.inPerson, features: ['Expert visits your workspace location', '60-90 minute total configuration time', '14 days of free follow-up support'], popular: true },
              { name: 'Premium Full-Pack', price: service.pricing.premium, features: ['90-minute extended session window', '30 days of priority help access', 'Full dashboard summary delivered'] },
            ].map((plan, i) => {
              {/* CRITICAL SAFETY CHECK: Handles physical-only tasks where remote operation is impossible */}
              const isOfflineOnly = plan.isRemote && plan.price === 0;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white border ${
                    plan.popular ? 'border-zinc-900 shadow-xl relative md:scale-105 z-10' : 'border-zinc-200'
                  } rounded-2xl p-8 flex flex-col justify-between text-center hover:shadow-2xl transition-all duration-300`}
                >
                  <div>
                    {plan.popular ? (
                      <span className="inline-block font-mono text-[9px] font-bold uppercase tracking-wider text-white bg-zinc-900 px-2.5 py-1 rounded-full mb-4">
                        ★ Recommended
                      </span>
                    ) : (
                      <div className="h-7 mb-4 block" />
                    )}
                    
                    <h3 className="font-sans text-lg font-black tracking-tight text-zinc-900 mb-3">{plan.name}</h3>
                    
                    <div className="flex items-baseline justify-center gap-0.5 mb-6 border-b border-zinc-100 pb-6">
                      {isOfflineOnly ? (
                        <span className="font-sans text-xl font-bold tracking-tight text-zinc-400 py-3">Not Applicable</span>
                      ) : (
                        <>
                          <span className="font-sans text-4xl font-black tracking-tighter text-zinc-900">${plan.price}</span>
                          <span className="font-sans text-xs text-zinc-400 font-medium">/session</span>
                        </>
                      )}
                    </div>

                    <ul className="space-y-3 text-left mb-8">
                      {isOfflineOnly ? (
                        <li className="font-sans text-xs text-zinc-500 leading-relaxed italic text-center">
                          This service is explicitly available for on-site physical execution only.
                        </li>
                      ) : (
                        plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 font-sans text-xs text-zinc-600 leading-tight">
                            <span className="text-zinc-400 font-bold shrink-0">✓</span>
                            {f}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {isOfflineOnly ? (
                    <div className="w-full text-center font-sans text-xs font-bold text-zinc-400 bg-zinc-100 py-3 rounded-xl select-none">
                      In-Person Only
                    </div>
                  ) : (
                    <Link
                      to="/configure"
                      className={`block w-full font-sans text-xs font-bold py-3.5 rounded-xl transition-all duration-200 ${
                        plan.popular ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                      }`}
                    >
                      Book This Service
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACTION CTA BLOCK */}
      <section className="bg-zinc-900">
        <div className="max-w-[1440px] mx-auto section-padding py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-6">
              Ready to Get Started?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/configure"
                className="w-full sm:w-auto bg-white text-zinc-900 font-sans text-xs font-bold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all duration-200 shadow-md"
              >
                Book a Session Now
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

      {/* EXPLORE OTHER SERVICES */}
      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-16">
          <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-6">Explore More Solutions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.filter((s) => s.slug !== id).slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex items-center justify-between bg-white border border-zinc-200 rounded-xl p-4 hover:border-zinc-900 shadow-sm hover:shadow transition-all duration-200"
              >
                <span className="font-sans text-xs font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors line-clamp-1">{s.title}</span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}