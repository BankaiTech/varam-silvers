import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import ClientLayout from '@/components/ClientLayout';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { WishlistProvider } from '@/context/WishlistContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrencyProvider>
          <WishlistProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </WishlistProvider>
        </CurrencyProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
} 