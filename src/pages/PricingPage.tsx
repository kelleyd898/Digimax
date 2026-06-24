import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import PriceCard from '../components/PriceCard';
import { pricingPlans, services } from '../data/services';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-eyebrow mb-4">Pricing</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-4">
              Transparent Pricing
            </h1>
            <p className="font-mono text-sm text-zinc-500 max-w-xl leading-relaxed">
              No undisclosed metrics. Clear SLA baselines. Select the infrastructure framework that fits your operational scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <PriceCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                unit={plan.unit}
                features={plan.features}
                popular={plan.popular}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto section-padding py-20 md:py-32">
          <SectionHeader
            eyebrow="Service-Specific"
            title="Pricing by Category"
            subtitle="Each architectural tier features calibrated rates based on infrastructure complexity and execution intervals."
          />
          <div className="border-t border-zinc-200">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all duration-0 px-4 -mx-4"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-500 w-4">{service.id}</span>
                  <Link
                    to={`/services/${service.slug}`}
                    className="font-sans text-base font-bold tracking-tight group-hover:text-white"
                  >
                    {service.title}
                  </Link>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500">Remote</p>
                    <p className="font-sans text-sm font-bold">${service.pricing.remote}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500">On-Site</p>
                    <p className="font-sans text-sm font-bold">${service.pricing.inPerson}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500">Premium</p>
                    <p className="font-sans text-sm font-bold">${service.pricing.premium}</p>
                  </div>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hidden md:block text-zinc-400 group-hover:text-accent transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="max-w-[1440px] mx-auto section-padding py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-6">
              Questions About Operational Investments?
            </h2>
            <p className="font-mono text-sm text-zinc-400 mb-8 max-w-lg mx-auto">
              Every systems deployment is unique. Contact our architecture team for a tailored framework quote matching your precise operational scope.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/configure"
                className="bg-white text-zinc-900 font-mono text-[11px] uppercase tracking-widest px-8 py-4 hover:bg-accent hover:text-white transition-colors duration-0"
              >
                Get a Quote
              </Link>
              <a
                href="tel:5551234567"
                className="flex items-center gap-2 border border-zinc-700 text-white font-mono text-[11px] uppercase tracking-widest px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-0"
              >
                <Phone className="w-4 h-4" />
                (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}