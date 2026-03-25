import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock } from 'lucide-react';
import Navbar from '../components/ui/Navbar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = await login(email, password);
            if (role === 'ADMIN') navigate('/admin');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col pt-20 bg-transparent">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 md:p-10 rounded-[2rem] border glass shadow-2xl"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl border" style={{ background: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--border-default)' }}>
                            <Shield size={32} strokeWidth={2} style={{ color: 'var(--brand-primary)' }} />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Secure Portal</h2>
                    <p className="text-center mb-8 font-medium" style={{ color: 'var(--text-secondary)' }}>Authenticate your identity to continue.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Email Address</label>
                            <input 
                                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl p-4 focus:outline-none focus:ring-2 font-medium shadow-sm border transition-all"
                                style={{ background: 'var(--bg-base)', borderColor: 'var(--border-default)', color: 'var(--text-primary)', outlineColor: 'var(--brand-primary)' }}
                                placeholder="name@institution.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Security Key</label>
                            <input 
                                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl p-4 focus:outline-none focus:ring-2 font-medium shadow-sm border transition-all"
                                style={{ background: 'var(--bg-base)', borderColor: 'var(--border-default)', color: 'var(--text-primary)', outlineColor: 'var(--brand-primary)' }}
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full py-4 mt-6 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group" style={{ background: 'var(--brand-primary)' }}>
                            Authenticate Identity <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm font-medium border-t pt-6" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}>
                        No active identity? <span onClick={() => navigate('/register')} className="font-bold cursor-pointer hover:underline" style={{ color: 'var(--brand-primary)' }}>Initialize Account</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}