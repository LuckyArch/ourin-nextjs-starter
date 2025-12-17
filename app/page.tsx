'use client';

import { motion, useScroll, useMotionValueEvent, useInView } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Zap,
  Palette,
  Code2,
  Layers,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Terminal,
  Cpu,
  MoveUpRight,
  Star,
  Users,
  Download,
  Heart,
  BookOpen,
  Rocket,
  Shield,
  Clock,
  Package,
  Boxes,
  FileCode,
  Type,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Components ---

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/30 blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[100px] animate-float" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
    </div>
  );
}

function FloatingNav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
    >
      <div className={`px-4 md:px-6 py-3 flex items-center justify-between rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300 ${
        scrolled 
          ? 'bg-background/90 border-border/50' 
          : 'bg-background/60 border-white/10'
      }`}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ourin Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-display font-bold text-lg tracking-tight">Ourin</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/70">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#fonts" className="hover:text-foreground transition-colors">Fonts</a>
          <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          <a href="https://github.com/LuckyArch/ourin-nextjs-starter" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="sm" className="rounded-full px-5 hidden sm:flex font-semibold gap-2">
            <Rocket className="w-4 h-4" />
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function StatCard({ icon, value, label, suffix = '' }: { icon: React.ReactNode; value: number; label: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <div className="text-3xl font-display font-bold">
            <AnimatedCounter value={value} suffix={suffix} />
          </div>
          <div className="text-sm text-muted-foreground font-medium">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  className = '', 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group relative p-6 md:p-8 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-card/80 to-muted/20 backdrop-blur-sm ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-primary/10">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-display font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <MoveUpRight className="w-5 h-5 text-primary" />
      </div>
    </motion.div>
  );
}

function FontShowcase() {
  const fonts = [
    { name: 'Outfit', class: 'font-display', desc: 'Modern headings' },
    { name: 'Space Grotesk', class: 'font-space', desc: 'Tech & bold' },
    { name: 'Poppins', class: 'font-poppins', desc: 'Friendly & clean' },
    { name: 'Plus Jakarta Sans', class: 'font-sans', desc: 'Body text' },
    { name: 'Playfair Display', class: 'font-serif', desc: 'Elegant serif' },
    { name: 'JetBrains Mono', class: 'font-mono', desc: 'Code blocks' },
    { name: 'Caveat', class: 'font-hand', desc: 'Handwritten' },
    { name: 'Inter', class: 'font-inter', desc: 'UI labels' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {fonts.map((font, i) => (
        <motion.div
          key={font.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all group"
        >
          <div className={`text-2xl font-bold mb-1 ${font.class} group-hover:text-primary transition-colors`}>
            Aa
          </div>
          <div className="text-sm font-medium">{font.name}</div>
          <div className="text-xs text-muted-foreground">{font.desc}</div>
        </motion.div>
      ))}
    </div>
  );
}

function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const displayCommand = "npx create-next-app -e .../ourin-nextjs-starter";
  const fullCommand = "npx create-next-app -e https://github.com/LuckyArch/ourin-nextjs-starter";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex items-center justify-between w-full max-w-xl mx-auto bg-[#0a0a0a] dark:bg-[#0a0a0a] rounded-2xl p-2 shadow-2xl ring-1 ring-white/10"
    >
      <div className="flex items-center gap-3 pl-4 overflow-hidden">
        <Terminal className="w-4 h-4 text-green-400 shrink-0" />
        <code className="text-xs sm:text-sm text-gray-300 font-mono truncate">
          {displayCommand}
        </code>
      </div>
      
      <button
        onClick={handleCopy}
        className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50 gap-2 text-sm font-medium"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </button>
    </motion.div>
  );
}

function CodeTypewriter({ code }: { code: string }) {
  const [displayedCode, setDisplayedCode] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedCode(code.slice(0, i));
        i++;
        if (i > code.length) clearInterval(interval);
      }, 15);
      return () => clearInterval(interval);
    }
  }, [code, isInView]);

  return (
    <div ref={ref} className="font-mono text-sm leading-relaxed text-blue-400 dark:text-blue-300">
      {displayedCode}
      <span className="animate-pulse inline-block w-2 h-5 bg-primary ml-1 align-middle rounded-sm" />
    </div>
  );
}

// --- Main Page Component ---

export default function Home() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      <FloatingNav />
      
      {/* === Hero Section === */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        <HeroBackground />
        
        <div className="container max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20 text-primary text-sm font-semibold mb-8 hover:bg-primary/20 transition-colors cursor-default"
          >
            <Sparkles className="w-4 h-4" />
            <span>v1.1 — Now with 16 Fonts!</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 md:mb-8 leading-[1.1]"
          >
            The Ultimate{' '}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Next.js
            </span>
            <br />
            Boilerplate
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Ship your startup in record time. Packed with{' '}
            <span className="text-foreground font-semibold">145+ utilities</span>,{' '}
            <span className="text-foreground font-semibold">16 fonts</span>, and{' '}
            <span className="text-foreground font-semibold">premium components</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all gap-2">
              <Rocket className="w-5 h-5" />
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base gap-2 hover:bg-muted/50">
              <Github className="w-5 h-5" />
              Star on GitHub
            </Button>
          </motion.div>

          {/* Copy Command */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-xl px-4"
          >
            <CopyCommand />
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {['Next.js 16', 'React 19', 'TypeScript 5', 'Tailwind 4', 'Framer Motion'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground border border-border/50">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === Stats Section === */}
      <section id="stats" className="py-20 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            <StatCard icon={<Package className="w-6 h-6" />} value={145} suffix="+" label="Utility Functions" />
            <StatCard icon={<Type className="w-6 h-6" />} value={16} label="Google Fonts" />
            <StatCard icon={<Boxes className="w-6 h-6" />} value={15} suffix="+" label="Custom Hooks" />
            <StatCard icon={<FileCode className="w-6 h-6" />} value={850} suffix="+" label="Lines of CSS" />
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section id="features" className="py-20 md:py-28 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 tracking-tight">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete foundation for building modern web applications with best practices baked in.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Turbopack Ready"
              description="Experience 10x faster builds with Next.js Turbopack. Pre-configured for optimal development experience."
              delay={0}
            />
            <FeatureCard 
              icon={<Palette className="w-6 h-6" />}
              title="16 Premium Fonts"
              description="Carefully curated typography system with display, body, serif, mono, and handwriting fonts."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Code2 className="w-6 h-6" />}
              title="145+ Utilities"
              description="Massive library of helper functions for strings, arrays, dates, validation, and more."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Layers className="w-6 h-6" />}
              title="shadcn/ui Ready"
              description="Pre-configured with shadcn/ui for beautiful, accessible components out of the box."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Type Safe"
              description="Strict TypeScript throughout. No 'any' types, full IntelliSense support."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6" />}
              title="15+ Custom Hooks"
              description="Production-ready hooks for debouncing, localStorage, media queries, and more."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* === Fonts Section === */}
      <section id="fonts" className="py-20 md:py-28 bg-muted/30 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Typography</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 tracking-tight">
              16 Beautiful Fonts
            </h2>
            <p className="text-lg text-muted-foreground">
              Pre-loaded with next/font for optimal performance. No layout shift, automatic optimization.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <FontShowcase />
          </div>
        </div>
      </section>

      {/* === Code Section === */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-primary uppercase tracking-wider"
              >
                Developer Experience
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-display font-bold mt-3 mb-6 tracking-tight"
              >
                Code that sparks joy
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0"
              >
                Intuitive utilities and hooks that feel like they should have been built into React.
                <span className="font-hand text-2xl text-primary block mt-3 rotate-[-2deg]">
                  No more utils.ts copy-paste!
                </span>
              </motion.p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm text-sm font-medium">
                  <Check className="w-4 h-4 text-green-500" />
                  Fully Typed
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm text-sm font-medium">
                  <Check className="w-4 h-4 text-green-500" />
                  Tree Shakeable
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm text-sm font-medium">
                  <Check className="w-4 h-4 text-green-500" />
                  Zero Dependencies
                </span>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]"
              >
                <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-4 text-xs font-mono text-gray-500">example.tsx</div>
                </div>

                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm leading-relaxed">
                    <code className="block text-gray-400">
                      <span className="text-purple-400">import</span> {`{`} <span className="text-yellow-300">useDebounce, useLocalStorage</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-400">'@/hooks'</span>;<br />
                      <span className="text-purple-400">import</span> {`{`} <span className="text-yellow-300">formatCurrency, slugify</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-400">'@/lib/utils'</span>;<br />
                      <br />
                      <span className="text-blue-400">export default function</span> <span className="text-yellow-300">App</span>() {`{`}<br />
                      &nbsp;&nbsp;<span className="text-purple-400">const</span> [<span className="text-red-300">query</span>, <span className="text-red-300">setQuery</span>] = <span className="text-yellow-300">useLocalStorage</span>(<span className="text-green-400">'search'</span>, <span className="text-green-400">''</span>);<br />
                      &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-red-300">debouncedQuery</span> = <span className="text-yellow-300">useDebounce</span>(<span className="text-red-300">query</span>, <span className="text-orange-400">300</span>);<br />
                      <br />
                      &nbsp;&nbsp;<CodeTypewriter code={`return (
    <div className="font-display">
      <h1>{formatCurrency(99.99)}</h1>
      <p>{slugify("Hello World!")}</p>
    </div>
  );`} />
                      <br />
                      {`}`}
                    </code>
                  </pre>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA Section === */}
      <section className="py-20 md:py-28 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-violet-500/5 to-fuchsia-500/10 border border-primary/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight relative z-10">
              Ready to ship faster?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto relative z-10">
              Start building your next project with Ourin today. Free, open source, and MIT licensed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button size="lg" className="h-14 px-8 rounded-full text-base font-bold gap-2">
                <Rocket className="w-5 h-5" />
                Start Building
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base gap-2">
                <BookOpen className="w-5 h-5" />
                Read Docs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="py-16 border-t border-border/40 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="Ourin Logo" width={40} height={40} className="rounded-lg" />
                <span className="font-display font-bold text-xl">Ourin</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed mb-4">
                The ultimate Next.js boilerplate for modern web development. Ship your startup in record time.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/LuckyArch/ourin-nextjs-starter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-card border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#fonts" className="hover:text-foreground transition-colors">Fonts</a></li>
                <li><a href="https://github.com/LuckyArch/ourin-nextjs-starter" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><a href="https://github.com/LuckyArch/ourin-nextjs-starter/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">MIT License</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ourin. Built with <Heart className="w-4 h-4 inline text-red-500" /> by{' '}
              <a href="https://github.com/LuckyArch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Fauzan Adyatma P
              </a>
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Star us on GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
