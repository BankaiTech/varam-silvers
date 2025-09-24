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
  metadataBase: new URL('https://varamsilvers.com'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/images/varam_silvers_logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/varam_silvers_logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/varam_silvers_logo.png',
    apple: [
      { url: '/images/varam_silvers_logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Varam Silvers - Luxury Silver Jewelry for Children',
    description: 'Discover our exquisite collection of handcrafted silver jewelry designed specifically for children.',
    type: 'website',
    url: 'https://varamsilvers.com',
    siteName: 'Varam Silvers',
    images: [
      {
        url: '/images/varam_silvers_logo.png',
        width: 1200,
        height: 630,
        alt: 'Varam Silvers - Kids Silver Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varam Silvers - Luxury Silver Jewelry for Children',
    description: 'Discover our exquisite collection of handcrafted silver jewelry designed specifically for children.',
    images: ['/images/varam_silvers_logo.png'],
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