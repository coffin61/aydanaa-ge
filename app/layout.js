// app/layout.js - حتماً با این جایگزین شود

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'فروشگاه سرامیک صراحی',
  description: 'فروشگاه آنلاین ظروف دست‌ساز سرامیکی',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Header /> 
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}