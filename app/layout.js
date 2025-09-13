import { Playfair_Display, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CurrencyProvider } from '../context/CurrencyContext';
import { AuthProvider } from '../context/AuthContext';
import { LoadingProvider } from '../context/LoadingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import GlobalLoadingOverlay from '../components/GlobalLoadingOverlay';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Removed to fix navbar conflicts
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'Varam Silvers - Luxury Silver Jewelry for Children',
  description: 'Discover our exquisite collection of handcrafted silver jewelry designed specifically for children. Premium quality, elegant designs, and timeless beauty.',
  keywords: 'silver jewelry, children jewelry, luxury jewelry, handcrafted, sterling silver',
  openGraph: {
    title: 'Varam Silvers - Luxury Silver Jewelry for Children',
    description: 'Discover our exquisite collection of handcrafted silver jewelry designed specifically for children.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <AuthProvider>
          <CurrencyProvider>
            <LoadingProvider>
              <PageLoader />
              <GlobalLoadingOverlay />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </LoadingProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 