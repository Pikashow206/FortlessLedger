import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Navbar from '../components/ui/Navbar';

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col pt-20 bg-transparent">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-lg p-10 md:p-14 rounded-[2rem] border glass shadow-2xl text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-5 rounded-3xl border" style={{ background: 'rgba(225, 29, 72, 0.1)', borderColor: 'rgba(225, 29, 72, 0.2)' }}>
                            <ShieldAlert size={48} strokeWidth={1.5} style={{ color: '#e11d48' }} />
                        </div>
                    </div>
                    
                    <h1 className="text-6xl font-extrabold font-mono mb-4" style={{ color: 'var(--text-primary)' }}>404</h1>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Sector Not Found</h2>
                    <p className="mb-10 font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        The ledger coordinates you are looking for do not exist. Please verify the address or return to a secure terminal.
                    </p>

                    <Link to="/" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-1" style={{ background: 'var(--brand-primary)' }}>
                        <ArrowLeft size={18} /> Return to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}