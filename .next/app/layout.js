import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header'; // مسیردهی صحیح به کامپوننت Header
import Footer from '../components/Footer'; // مسیردهی صحیح به کامپوننت Footer

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'فروشگاه سرامیک صراحی',
  description: 'فروشگاه آنلاین ظروف دست‌ساز سرامیکی',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        {/* Header در اینجا قرار می‌گیرد تا بالای همه صفحات باشد */}
        <Header /> 
        
        {/* محتوای هر صفحه (page.js) از طریق children اینجا رندر می‌شود */}
        <main>
          {children}
        </main>
        
        {/* Footer در اینجا قرار می‌گیرد */}
        <Footer />
      </body>
    </html>
  );
}