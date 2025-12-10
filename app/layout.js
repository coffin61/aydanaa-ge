// app/shop/page.js

import { supabase } from '../../lib/supabase'; // مسیردهی دو سطح به عقب: صحیح برای app/shop/page.js
import ProductCard from '../../components/ProductCard';
import { unstable_noStore as noStore } from 'next/cache';

// تابع واکشی تمام محصولات (با مدیریت خطا)
async function getAllProducts() {
    noStore();
    try {
        const { data: products, error } = await supabase
            .from('aydanaa') // نام جدول اصلاح شده
            .select('*'); 

        if (error) {
            console.error("Error fetching all products:", error);
            return [];
        }
        return products;
    } catch (e) {
        console.error("Critical Catch: Error fetching all products:", e);
        return [];
    }
}

// کامپوننت اصلی صفحه
export default async function ShopPage() {
    const products = await getAllProducts();

    return (
        <div className="container shop-page">
            <h1 style={{padding: '30px 0'}}>فروشگاه</h1>
            
            {products.length === 0 ? (
                <p style={{textAlign: 'center'}}>محصولی برای نمایش وجود ندارد یا خطایی در اتصال به دیتابیس رخ داده است.</p>
            ) : (
                <div className="product-list-grid">
                    {/* رندر ProductCard‌ها */}
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={{
                                ...product,
                                images: product.image_url 
                            }} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
/* app/globals.css - به انتهای فایل اضافه شود */
/* این کد را برای تست اضافه کنید تا دکمه شما بالاتر از هر لایه دیگری قرار گیرد */
.hero-section a.btn-primary {
    position: relative !important;
    z-index: 10000 !important;
}