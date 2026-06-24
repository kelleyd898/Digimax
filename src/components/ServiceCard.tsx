import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Wifi, Printer, Monitor, Mail, Home, Camera, ArrowRight } from 'lucide-react';
import type { Service } from '../data/services';

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Printer,
  Monitor,
  Mail,
  Home,
  Camera,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Monitor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group block border border-zinc-200 hover:border-zinc-900 transition-all duration-0 bg-white"
      >
        <div className="aspect-[3/2] overflow-hidden bg-zinc-100">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-0">
              <Icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-0" />
            </div>
          </div>
          <h3 className="font-sans text-lg md:text-xl font-bold tracking-tight text-zinc-900 mb-2">
            {service.title}
          </h3>
          <p className="font-mono text-xs text-zinc-500 leading-relaxed mb-4">
            {service.subtitle}
          </p>
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature) => (
              <li key={feature} className="font-mono text-[11px] text-zinc-400 flex items-start gap-2">
                <span className="text-accent mt-0.5">&bull;</span>
                {feature}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-900 group-hover:text-accent transition-colors duration-0">
            Learn More
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
