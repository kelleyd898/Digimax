import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', light = false }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const textColor = light ? 'text-white' : 'text-zinc-900';
  const subColor = light ? 'text-zinc-300' : 'text-zinc-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className={`${alignClass} mb-12 md:mb-16`}
    >
      {eyebrow && (
        <p className={`text-eyebrow mb-4 ${light ? 'text-zinc-400' : ''}`}>{eyebrow}</p>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 font-mono text-sm ${subColor} max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
