// app/page.js

import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { supabase } from '../lib/supabase'; // مسیردهی یک سطح به عقب: صحیح برای app/page.js
// import ProductCard from '../components/ProductCard'; // کامپوننت‌های خود را ایمپورت کنید
// import HeroSection from '../components/HeroSection'; 


// ----------------------------------------------------
// مثال: تابع واکشی محصولات جدید
// ----------------------------------------------------
async function getNewArrivals() {
    noStore(); 
    try {
        const { data: products, error } = await supabase
            .from('aydanaa')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(8);

        if (error) {
            console.error("Error fetching new arrivals:", error);
            return [];
        }
        return products;
    } catch (e) {
        console.error("Critical Catch: Error fetching new arrivals:", e);
        return [];
    }
}

// ----------------------------------------------------
// کامپوننت اصلی صفحه
// ----------------------------------------------------
export default async function HomePage() {
    // ⚠️ خطوط واکشی داده را uncomment کنید:
    // const newArrivals = await getNewArrivals();
    
    return (
        <div className="homepage-content">
            {/* ⚠️ محتوای کامل و اصلی UI خود را اینجا قرار دهید */}
            
            {/* مثال بخش Hero (که در آخرین تصویر دیده شد): */}
            <section className="hero-section" style={{ minHeight: '400px', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>به فروشگاه صراحی خوش آمدید</h1>
                <p>ظروف دست‌ساز و با کیفیت.</p>
                {/* دکمه مشاهده محصولات */}
                <Link href="/shop" className="btn btn-primary" style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '15px' }}>مشاهده محصولات</Link>
            </section>
            
            {/* ⚠️ بخش محصولات جدید را بر اساس منطق خود uncomment کنید: */}
            {/* {newArrivals.length > 0 && (
                 <section className="new-arrivals">
                      <h2>جدیدترین محصولات</h2>
                      <div className="product-list">
                         {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
                      </div>
                 </section>
            )} */}

        </div>
    );
}