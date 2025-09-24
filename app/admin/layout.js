import { Inter } from 'next/font/google';
import './admin-styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard - Varam Silvers',
  description: 'Admin panel for managing Varam Silvers jewelry business',
};

export default function AdminLayout({ children }) {
  return (
    <div className={inter.className}>
      <script src="/admin/admin-script.js" defer></script>
      {children}
    </div>
  );
}
