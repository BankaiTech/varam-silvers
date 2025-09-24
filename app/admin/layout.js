import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard - Varam Silvers',
  description: 'Admin panel for managing Varam Silvers jewelry business',
};

export default function AdminLayout({ children }) {
  return (
    <div className={inter.className}>
      <link rel="stylesheet" href="/admin/admin-styles.css" />
      <script src="/admin/admin-script.js" defer></script>
      {children}
    </div>
  );
}
