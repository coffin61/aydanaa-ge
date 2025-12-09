// app/product/[slug]/page.js
// این همان نسخه‌ای است که قبلاً به شما دادم و شامل تمام رفع خطاهاست

import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import { supabase } from '../../../lib/supabase';
import { unstable_noStore as noStore } from 'next/cache';

// ----------------------------------------------------
// ۱. تابع تولید مسیرهای استاتیک (با مدیریت خطا)
// ----------------------------------------------------
export async function generateStaticParams() {
    noStore(); 

    // استفاده از try/catch برای جلوگیری از شکست Build به دلیل خطاهای شبکه/JSON
    try {
        // اصلاح نام جدول: aydanaa
        const { data: products, error } = await supabase.from('aydanaa').select('slug');

        if (error) {
            console.error("Supabase Error fetching slugs for static params:", error);
            return []; 
        }
        
        // تبدیل لیست محصولات به فرمت مورد نیاز Next.js
        return products.map((product) => ({
            slug: product.slug,
        }));
    } catch (e) {
        console.error("Critical Catch: Network or Parsing error during generateStaticParams:", e);
        return [];
    }
}

// ----------------------------------------------------
// ۲. تابع واکشی داده برای یک محصول خاص (با مدیریت خطا)
// ----------------------------------------------------
async function getProduct(slug) {
    noStore();

    try {
        // اصلاح نام جدول: aydanaa
        const { data: product, error } = await supabase
            .from('aydanaa') 
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error(`Error fetching product with slug ${slug}:`, error);
            return null;
        }
        return product;
    } catch (e) {
        console.error(`Critical Catch: Error fetching single product ${slug}:`, e);
        return null;
    }
}

// ----------------------------------------------------
// ۳. تابع واکشی محصولات مشابه (با مدیریت خطا)
// ----------------------------------------------------
async function getRelatedProducts(currentProductId) {
    noStore(); 

    try {
        // اصلاح نام جدول: aydanaa
        const { data: products, error } = await supabase
            .from('aydanaa')
            .select('*')
            .neq('id', currentProductId)
            .limit(4);

        if (error) {
            console.error("Error fetching related products:", error);
            return [];
        }
        return products;
    } catch (e) {
        console.error("Critical Catch: Error fetching related products:", e);
        return [];
    }
}


// ----------------------------------------------------
// ۴. کامپوننت اصلی جزئیات محصول
// ----------------------------------------------------
export default async function ProductDetailPage({ params }) {
    
    const product = await getProduct(params.slug);
    
    // اگر محصول پیدا نشد، پیام مناسب نمایش داده می‌شود
    if (!product) {
        return (
             <div className="container" style={{padding: '50px 0', textAlign: 'center'}}>
                 <h1>محصول مورد نظر یافت نشد.</h1>
                 <Link href="/shop" className="btn btn-primary" style={{marginTop: '20px'}}>بازگشت به فروشگاه</Link>
             </div>
        );
    }
    
    const relatedProducts = await getRelatedProducts(product.id);
    
    const productImages = [product.image_url, product.image_url];
    
    return (
        <div className="product-detail-page">
            <div className="container">
                 {/* Breadcrumb - مسیر یابی */}
                 <div className="breadcrumb" style={{padding: '20px 0'}}>
                     <Link href="/">خانه</Link> / 
                     <Link href="/shop">فروشگاه</Link> / 
                     <span>{product.name}</span>
                 </div>

                <div className="product-detail-grid">
                    
                    {/* گالری تصاویر */}
                    <div className="product-gallery">
                        <div className="main-image">
                            {/* فرض می‌کنیم product.name و product.image_url معتبر هستند */}
                            <img src={product.image_url} alt={product.name} /> 
                        </div>
                    </div>

                    {/* اطلاعات محصول */}
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <div className="rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                            <i className="fa-regular fa-star"></i>
                            <span className="review-count">(۳۴ نظر)</span>
                        </div>
                        
                        <p className="short-description">{product.description}</p>
                        
                        <div className="price-box product-page-price">
                             {/* اگر تخفیف دارد */}
                             {product.old_price && <span className="old-price">{product.old_price.toLocaleString()} تومان</span>}
                             <span className="current-price">{product.price.toLocaleString()} تومان</span>
                        </div>
                        
                        <div className="stock-status">
                            <span className="in-stock">
                                <i className="fa-solid fa-check"></i> موجود در انبار
                            </span>
                        </div>
                        
                        <div className="cart-actions">
                            <button className="btn btn-primary btn-add-to-cart-page">
                                <i className="fa-solid fa-cart-shopping"></i> افزودن به سبد خرید
                            </button>
                        </div>
                        
                        <div className="product-features-list">
                            <h4>ویژگی‌های کلیدی</h4>
                            <ul>
                                <li><i className="fa-solid fa-check-circle"></i> قابل شستشو و مقاوم</li>
                                <li><i className="fa-solid fa-check-circle"></i> ساخت ایران، کار دست</li>
                                <li><i className="fa-solid fa-check-circle"></i> ارسال مطمئن</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* بخش تب‌ها (توضیحات و نظرات) */}
                <div className="product-tabs">
                    <h3 className="tab-title">جزئیات کامل محصول</h3>
                    <p className="full-description">{product.full_description || "توضیحات کامل محصول هنوز ثبت نشده است."}</p>
                </div>
                
                {/* محصولات مرتبط */}
                <section className="section related-products">
                    <h3 className="section-title">محصولات مشابه</h3>
                     <div className="product-list">
                         {relatedProducts.map(relProduct => (
                              <ProductCard 
                                 key={relProduct.id} 
                                 product={{
                                     ...relProduct,
                                     images: relProduct.image_url 
                                 }}
                             />
                         ))}
                     </div>
                </section>
                
            </div>
        </div>
    );
}