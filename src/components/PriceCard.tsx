import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Check } from 'lucide-react';

interface PriceCardProps {
  name: string;
  price: number;
  unit: string;
  features: string[];
  popular?: boolean;
  index: number;
}

export default function PriceCard({ name, price, unit, features, popular = false, index }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={`relative border ${popular ? 'border-zinc-900' : 'border-zinc-200'} bg-white p-8 md:p-10`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white font-mono text-[10px] uppercase tracking-widest px-4 py-1">
          Most Popular
        </div>
      )}
      <h3 className="font-sans text-lg font-bold tracking-tight text-zinc-900 mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">
          ${price}
        </span>
        <span className="font-mono text-xs text-zinc-500">{unit}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span className="font-mono text-xs text-zinc-600 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/configure"
        className={`block w-full text-center font-mono text-[11px] uppercase tracking-widest py-3 px-6 transition-colors duration-0 ${
          popular
            ? 'bg-zinc-900 text-white hover:bg-accent'
            : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
        }`}
      >
        Select Plan
      </Link>
    </motion.div>
  );
}
