// app/page.js

import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { supabase } from '../lib/supabase'; // مطمئن شوید مسیر ایمپورت supabase درست است
// import YourComponent from '../components/YourComponent'; // کامپوننت‌های UI خود را اینجا ایمپورت کنید

// ----------------------------------------------------
// مثال: تابع واکشی محصولات جدید (با استفاده از noStore و try...catch)
// ----------------------------------------------------
async function getNewArrivals() {
    noStore(); // برای اطمینان از واکشی داده‌های جدید در هر درخواست (SSR)
    try {
        // حتماً نام جدول را به 'aydanaa' تغییر دهید
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
        // مدیریت خطاهای شبکه یا پارس JSON در زمان اجرا
        console.error("Critical Catch: Error fetching new arrivals:", e);
        return [];
    }
}

// ----------------------------------------------------
// کامپوننت اصلی صفحه
// ----------------------------------------------------
export default async function HomePage() {
    // ⚠️ اگر در صفحه اصلی از واکشی داده استفاده می‌کنید، آن را اینجا فراخوانی کنید
    // const newArrivals = await getNewArrivals();
    
    return (
        <div className="homepage-content">
            {/* ⚠️ محتوای اصلی و کامل صفحه خانگی (شامل Header, Hero Section و لیست محصولات) 
                   که قبلاً در این فایل داشتید را اینجا جایگزین کنید.
            */}
            
            <section className="hero-section" style={{ minHeight: '400px', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>به فروشگاه صراحی خوش آمدید</h1>
                <p>ظروف دست‌ساز و با کیفیت.</p>
                <Link href="/shop" className="btn btn-primary" style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '15px' }}>مشاهده محصولات</Link>
            </section>
            
            {/* {newArrivals.length > 0 && (
                 <section className="new-arrivals">
                      <h2>جدیدترین محصولات</h2>
                      {... نمایش محصولات جدید با کامپوننت ProductCard ...}
                 </section>
            )}
            */}

        </div>
    );
}