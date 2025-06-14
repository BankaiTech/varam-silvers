import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CurrencyProvider } from '../context/CurrencyContext';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Varam Silvers',
  description: 'Beautiful silver jewelry for little ones',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CurrencyProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 