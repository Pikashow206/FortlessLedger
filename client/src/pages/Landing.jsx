import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from '../components/ui/Navbar';

// FIXED: Added CheckCircle2 and Lock to the imports!
import { 
  ShieldCheck, Clock, CheckCircle2, Lock, Database, Search, 
  Vault, Activity, ArrowRight, ChevronRight, Fingerprint 
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }) };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const slideRight = { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } };

const TiltCard = ({ children, className = "", intensity = 8 }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `perspective(1000px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02,1.02,1.02)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)"; };
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`will-change-transform ${className}`} style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, box-shadow 0.3s ease" }}>
      {children}
    </div>
  );
};

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.3]);

  return (
    <div className="w-full bg-transparent pt-20">
      <Navbar />

      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .shimmer-text { background: linear-gradient(90deg, var(--brand-primary) 0%, #34d399 50%, var(--brand-primary) 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
        .glow-emerald { box-shadow: 0 0 30px rgba(5, 150, 105, 0.15), 0 0 60px rgba(5, 150, 105, 0.05); }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative min-h-[90vh] flex items-center bg-transparent">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible">
              <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--brand-primary)" }}></span>
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--brand-primary)" }}>Enterprise Banking Engine</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight" style={{ color: "var(--text-primary)" }}>
                Wealth Management,
                <br /><span className="shimmer-text">Made Immutable</span>
                <br />& Secure
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} className="mt-6 text-lg leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
                Execute atomic transfers, view real-time forensic audits, and ensure absolute data integrity with our ACID-compliant corporate ledger.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <Link to="/register" className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-white rounded-xl text-[15px] font-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5" style={{ background: "var(--brand-primary)" }}>
                  Open an Account <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/login" className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[15px] font-bold border transition-all duration-300 hover:-translate-y-0.5" style={{ background: "var(--bg-card)", borderColor: "var(--border-default)", color: "var(--text-primary)" }}>
                  <ShieldCheck size={16} style={{ color: "var(--brand-primary)" }} /> Access Portal
                </Link>
              </motion.div>

              {/* Trust Stats */}
              <motion.div custom={4} variants={fadeUp} className="mt-12 flex items-center gap-8">
                {[
                  { icon: <ShieldCheck size={14}/>, value: "100%", label: "Secure" },
                  { icon: <Clock size={14}/>, value: "24/7", label: "Audit Trail" },
                  { icon: <CheckCircle2 size={14}/>, value: "Zero", label: "Data Loss" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ background: "var(--bg-card)", borderColor: "var(--border-default)", color: "var(--brand-primary)" }}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-base font-bold leading-tight" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                      <p className="text-[11px] uppercase font-bold tracking-wide" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — 3D Preview */}
            <motion.div initial="hidden" animate="visible" variants={slideRight} className="hidden lg:block relative" style={{ perspective: "1200px" }}>
              <TiltCard className="rounded-3xl p-7 relative z-10 glow-emerald" style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                <div className="flex items-center gap-3 mb-5 border-b pb-5" style={{ borderColor: "var(--border-default)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg text-white" style={{ background: "var(--text-primary)" }}>
                    <Vault size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Total Liquidity</p>
                    <p className="text-2xl font-bold font-mono" style={{ color: "var(--text-primary)" }}>$12,450,000.00</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(5, 150, 105, 0.1)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-primary)" }}></span>
                    <span className="text-[10px] font-bold" style={{ color: "var(--brand-primary)" }}>Synced</span>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="px-4 py-3 rounded-2xl border flex justify-between items-center" style={{ background: "var(--bg-hover)", borderColor: "var(--border-default)" }}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "var(--brand-primary)" }}><ArrowRight size={14}/></div>
                        <div>
                            <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Transfer Sent</p>
                            <p className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>Tx: a8f9...3b21</p>
                        </div>
                    </div>
                    <p className="font-mono font-bold" style={{ color: "var(--brand-primary)" }}>-$250,000.00</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-1">
                  <span className="text-[11px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>Integrity</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-hover)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#059669]" />
                  </div>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-[12px] font-bold" style={{ color: "var(--brand-primary)" }}>100%</motion.span>
                </div>
              </TiltCard>

              {/* Floating Badges */}
              {[
                { top: "-24px", right: "-24px", icon: <Fingerprint size={16}/>, title: "Forensic Log", sub: "Triggers active", delay: 0 },
                { bottom: "-24px", left: "-24px", icon: <Database size={16}/>, title: "Double Entry", sub: "Balanced books", delay: 1 },
                { top: "45%", right: "-48px", icon: <Activity size={16}/>, title: "Velocity Guard", sub: "Monitoring", delay: 2 },
              ].map((badge, idx) => (
                <motion.div key={idx} animate={{ y: [0, idx % 2 === 0 ? -8 : 10, 0] }} transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut", delay: badge.delay }} className="absolute z-20" style={{ top: badge.top, right: badge.right, bottom: badge.bottom, left: badge.left }}>
                  <div className="px-4 py-3 rounded-xl flex items-center gap-3 border shadow-xl" style={{ background: "var(--bg-card)", borderColor: "var(--border-default)" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(5, 150, 105, 0.1)", color: "var(--brand-primary)" }}>
                      {badge.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{badge.title}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{badge.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-24 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4" style={{ background: "var(--bg-hover)", color: "var(--brand-primary)" }}>
              Platform Features
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-extrabold leading-tight" style={{ color: "var(--text-primary)" }}>
              Institutional Grade, <span style={{ color: "var(--brand-primary)" }}>Built for Scale</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base" style={{ color: "var(--text-secondary)" }}>
              Everything you need to run a secure, compliant financial ecosystem without race conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Lock size={20}/>, title: "Atomic Transfers", desc: "No race conditions. Database locks guarantee transaction integrity.", tag: "Security" },
              { icon: <Database size={20}/>, title: "Double-Entry", desc: "Every cent is tracked across sender and receiver simultaneously.", tag: "Ledger" },
              { icon: <Search size={20}/>, title: "Forensic Analytics", desc: "Automated triggers log every balance and state change.", tag: "Audit" }
            ].map((f, idx) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-30px" }} custom={idx * 0.3} variants={fadeUp}>
                <TiltCard intensity={5} className="h-full rounded-2xl p-7 border group transition-all duration-300 relative overflow-hidden" style={{ background: "var(--bg-card)", borderColor: "var(--border-default)", boxShadow: "var(--shadow-sm)" }}>
                  <div className={`absolute top-0 left-0 w-1 h-full rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`} style={{ background: "var(--brand-primary)" }} />
                  <div className="relative z-10">
                    <span className="inline-block text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-4 border" style={{ background: "var(--bg-hover)", borderColor: "var(--border-default)", color: "var(--text-secondary)" }}>{f.tag}</span>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg text-white" style={{ background: "var(--brand-primary)" }}>
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <TiltCard intensity={3} className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-16 sm:px-16 sm:py-20 text-center relative" style={{ background: "var(--text-primary)" }}>
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: "var(--bg-card)" }}>
                    Ready to Upgrade Your <br/>Financial Infrastructure?
                  </h2>
                  <p className="mt-5 max-w-lg mx-auto text-base" style={{ color: "var(--text-secondary)" }}>
                    Join enterprise institutions already relying on FortressLedger. Start free today.
                  </p>
                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link to="/register" className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[15px] font-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5" style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>
                      Open Account <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}