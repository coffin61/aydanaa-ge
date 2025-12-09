// app/shop/page.js

import { supabase } from '../../../lib/supabase';
import ProductCard from '../../components/ProductCard';
import { unstable_noStore as noStore } from 'next/cache';

// ----------------------------------------------------
// تابع واکشی تمام محصولات (با مدیریت خطا)
// ----------------------------------------------------
async function getAllProducts() {
    noStore();
    try {
        // حتماً نام جدول را به 'aydanaa' تغییر دهید
        const { data: products, error } = await supabase
            .from('aydanaa')
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

// ----------------------------------------------------
// کامپوننت اصلی صفحه
// ----------------------------------------------------
export default async function ShopPage() {
    const products = await getAllProducts();

    return (
        <div className="container shop-page">
            <h1 style={{padding: '30px 0'}}>فروشگاه</h1>
            
            {products.length === 0 ? (
                <p style={{textAlign: 'center'}}>محصولی برای نمایش وجود ندارد یا خطایی در اتصال به دیتابیس رخ داده است.</p>
            ) : (
                <div className="product-list-grid">
                    {/* ⚠️ کامپوننت‌های ProductCard خود را اینجا رندر کنید */}
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={{
                                ...product,
                                images: product.image_url // یا آرایه تصاویر واقعی
                            }} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}