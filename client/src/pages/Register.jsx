import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Vault, ArrowRight, AlertCircle } from 'lucide-react';
import Navbar from '../components/ui/Navbar';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password, role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col pt-20 bg-transparent">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md p-8 md:p-10 rounded-[2rem] border glass shadow-2xl"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 rounded-2xl border" style={{ background: 'rgba(5, 150, 105, 0.1)', borderColor: 'var(--border-default)' }}>
                            <Vault size={32} strokeWidth={2} style={{ color: 'var(--brand-primary)' }} />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Initialize Account</h2>
                    <p className="text-center mb-8 font-medium" style={{ color: 'var(--text-secondary)' }}>Join the immutable financial network.</p>

                    {error && (
                        <div className="p-4 mb-6 rounded-xl text-sm text-center font-bold flex items-center justify-center gap-2 border" style={{ background: 'rgba(225, 29, 72, 0.1)', borderColor: 'rgba(225, 29, 72, 0.3)', color: '#e11d48' }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Access Level</label>
                            <div className="relative">
                                <select 
                                    value={role} onChange={(e) => setRole(e.target.value)}
                                    className="w-full rounded-xl p-4 focus:outline-none focus:ring-2 font-medium shadow-sm border transition-all appearance-none cursor-pointer"
                                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border-default)', color: 'var(--text-primary)', outlineColor: 'var(--brand-primary)' }}
                                >
                                    <option value="CUSTOMER">Standard Capital Account</option>
                                    <option value="ADMIN">System Administrator</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4" style={{ color: 'var(--text-secondary)' }}>
                                    ▼
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Email Identity</label>
                            <input 
                                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl p-4 focus:outline-none focus:ring-2 font-medium shadow-sm border transition-all"
                                style={{ background: 'var(--bg-base)', borderColor: 'var(--border-default)', color: 'var(--text-primary)', outlineColor: 'var(--brand-primary)' }}
                                placeholder="name@institution.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Cryptographic Key</label>
                            <input 
                                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl p-4 focus:outline-none focus:ring-2 font-medium shadow-sm border transition-all"
                                style={{ background: 'var(--bg-base)', borderColor: 'var(--border-default)', color: 'var(--text-primary)', outlineColor: 'var(--brand-primary)' }}
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full py-4 mt-6 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group" style={{ background: 'var(--brand-primary)' }}>
                            Generate Profile <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                    
                    <p className="mt-8 text-center text-sm font-medium border-t pt-6" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}>
                        Entity already verified? <span onClick={() => navigate('/login')} className="font-bold cursor-pointer hover:underline" style={{ color: 'var(--brand-primary)' }}>Access Portal</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}