import { ShieldCheck } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t mt-auto py-8 relative z-10" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-default)' }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg text-white" style={{ background: 'var(--brand-primary)' }}>
                        <ShieldCheck size={18} />
                    </div>
                    <span className="text-lg font-extrabold" style={{ color: 'var(--text-primary)' }}>
                        Fortress<span style={{ color: 'var(--brand-primary)' }}>Ledger</span>
                    </span>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    © {new Date().getFullYear()} FortressLedger Financial Systems. Engineered for integrity.
                </p>
                <div className="flex gap-6 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    <a href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
                    <a href="#" className="hover:opacity-70 transition-opacity">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}