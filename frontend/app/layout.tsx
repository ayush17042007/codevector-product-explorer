import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Product Explorer',
  description: 'Discover products instantly. A premium product browsing experience.',
  keywords: ['products', 'shop', 'explore', 'collection'],
  openGraph: {
    title: 'Product Explorer',
    description: 'Discover products instantly.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-[#050508]`}>
        {children}
      </body>
    </html>
  );
}
