// app/layout.js

import { Inter } from 'next/font/google';
import './globals.css';
// مسیردهی‌های زیر را با دقت بررسی کنید، اگر Header و Footer در پوشه components هستند، مسیردهی زیر صحیح است.
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
        
        {/* Header در اینجا قرار می‌گیرد */}
        <Header /> 
        
        {/* محتوای هر صفحه از طریق children در تگ main رندر می‌شود */}
        <main>
          {children}
        </main>
        
        {/* Footer در اینجا قرار می‌گیرد */}
        <Footer />
        
      </body>
    </html>
  );
}