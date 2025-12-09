// app/page.js

import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
// مطمئن شوید که تمام کامپوننت‌های UI اینجا ایمپورت شده‌اند (مانند ProductCard, HeroSection, etc.)
// import YourComponent from '../components/YourComponent'; 

// ----------------------------------------------------
// مثال: تابع واکشی محصولات جدید (لطفاً از try...catch استفاده کنید)
// ----------------------------------------------------
async function getNewArrivals() {
    noStore();
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
        console.error("Critical Catch: Error fetching new arrivals:", e);
        return [];
    }
}

// ----------------------------------------------------
// کامپوننت اصلی صفحه
// ----------------------------------------------------
export default async function HomePage() {
    // const newArrivals = await getNewArrivals();
    
    return (
        <div className="homepage-content">
            {/* ⚠️ محتوای کامل صفحه اصلی و تمام کامپوننت‌های UI خود را اینجا قرار دهید */}
            
            <section className="hero-section">
                <h1>به فروشگاه صراحی خوش آمدید</h1>
                <p>ظروف دست‌ساز و با کیفیت.</p>
                <Link href="/shop" className="btn btn-primary">مشاهده محصولات</Link>
            </section>
            
            {/* <section className="new-arrivals">
                 {... نمایش محصولات جدید با کامپوننت ProductCard ...}
            </section> */}

        </div>
    );
}