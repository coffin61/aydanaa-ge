// app/product/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import QuantitySelector from '../../../components/QuantitySelector'; 
import { supabase } from '../../../lib/supabase'; // 👈 اضافه کردن اتصال به دیتابیس

// ----------------------------------------------------
// تابع واکشی داده از Supabase بر اساس Slug
// ----------------------------------------------------
async function getProductBySlug(slug) {
    // از متد .eq برای فیلتر کردن بر اساس ستون 'slug' استفاده می‌کنیم
    const { data: productData, error } = await supabase
        .from('products') 
        .select('*')      
        .eq('slug', slug) // فیلتر: جایی که slug در دیتابیس برابر slug دریافتی باشد
        .single();         // انتظار داریم فقط یک نتیجه برگردد

    if (error) {
        console.error("Error fetching product:", error);
        return null;
    }
    return productData;
}

// ----------------------------------------------------
// Server Component اصلی صفحه محصول
// ----------------------------------------------------
// Next.js به طور خودکار پارامترهای مسیر را در 'params' قرار می‌دهد
export default async function ProductPage({ params }) {
    
    // واکشی داده‌های واقعی از دیتابیس
    const product = await getProductBySlug(params.slug); 

    // مدیریت خطا در صورت پیدا نشدن محصول
    if (!product) {
        return (
            <div className="container" style={{textAlign: 'center', padding: '50px'}}>
                <h1>محصول مورد نظر یافت نشد!</h1>
                <p>لطفاً آدرس را بررسی کنید یا به <Link href="/shop">فروشگاه</Link> مراجعه نمایید.</p>
            </div>
        );
    }
    
    // حالا product حاوی داده‌های واقعی از Supabase است
    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

    return (
        <div className="product-page">
            <div className="container">
                {/* مسیر یابی (Breadcrumb) */}
                <div className="breadcrumb">
                    <Link href="/">خانه</Link> / 
                    <Link href={`/category/${product.category}`}>{product.category}</Link> / 
                    <span>{product.name}</span>
                </div>

                {/* بخش اصلی محصول */}
                <div className="product-detail-grid">
                    
                    {/* ستون چپ: گالری تصاویر */}
                    <div className="product-gallery">
                        {/* تصویر اصلی - استفاده از اولین URL از آرایه image_url */}
                        <div className="main-image">
                            {product.image_url && product.image_url.length > 0 && (
                                <Image 
                                    src={product.image_url[0]} 
                                    alt={product.name} 
                                    width={600} 
                                    height={600} 
                                    layout="responsive" 
                                    objectFit="cover"
                                />
                            )}
                        </div>
                        {/* تصاویر کوچک (Thumbnail) */}
                        <div className="thumbnails">
                            {product.image_url && product.image_url.map((imgSrc, index) => (
                                <Image 
                                    key={index}
                                    src={imgSrc} 
                                    alt={`${product.name} - ${index + 1}`} 
                                    width={100} 
                                    height={100} 
                                    objectFit="cover"
                                />
                            ))}
                        </div>
                    </div>

                    {/* ستون راست: اطلاعات محصول */}
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        
                        {/* امتیاز دهی (داده تستی) */}
                        <div className="rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                            <i className="fa-regular fa-star"></i>
                            <span className="review-count">(۳۲ دیدگاه)</span>
                        </div>

                        <p className="short-description">{product.shortDescription || 'توضیحات کوتاه این محصول به زودی اضافه خواهد شد.'}</p>

                        {/* باکس قیمت */}
                        <div className="price-box product-page-price">
                            {hasDiscount && (
                                <span className="old-price product-page-old-price">
                                    {product.price.toLocaleString('fa-IR')} تومان
                                </span>
                            )}
                            <span className="current-price">
                                {hasDiscount 
                                    ? product.discountedPrice.toLocaleString('fa-IR') 
                                    : product.price.toLocaleString('fa-IR')} 
                                {' '} تومان
                            </span>
                        </div>
                        
                        {/* وضعیت موجودی (به فرض اضافه کردن ستون stock به دیتابیس) */}
                        <div className="stock-status">
                            {product.stock && product.stock > 0 ? (
                                <span className="in-stock"><i className="fa-solid fa-check"></i> موجود در انبار (موجودی: {product.stock})</span>
                            ) : (
                                <span className="out-of-stock"><i className="fa-solid fa-xmark"></i> ناموجود</span>
                            )}
                        </div>

                        {/* انتخاب تعداد و افزودن به سبد خرید */}
                        {product.stock > 0 && (
                            <div className="cart-actions">
                                {/* کامپوننت Client برای مدیریت State تعداد */}
                                <QuantitySelector initialQuantity={1} maxQuantity={product.stock || 10} /> 
                                <button className="btn btn-primary btn-add-to-cart-page">
                                    <i className="fa-solid fa-cart-shopping"></i> افزودن به سبد خرید
                                </button>
                            </div>
                        )}

                        {/* ویژگی‌های کلیدی (به فرض اضافه کردن ستون features به دیتابیس) */}
                        <div className="product-features-list">
                            <h4>ویژگی‌های محصول:</h4>
                            <ul>
                                {/* فرض می‌کنیم ویژگی‌ها در دیتابیس در یک آرایه متنی به نام 'features' ذخیره شده‌اند */}
                                {product.features ? product.features.map((feature, index) => (
                                    <li key={index}><i className="fa-solid fa-circle-check"></i> {feature}</li>
                                )) : <li><i className="fa-solid fa-circle-check"></i> جزئیات فنی به زودی تکمیل خواهد شد.</li>}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* بخش توضیحات کامل و دیدگاه‌ها */}
                <div className="product-tabs">
                    <h3 className="tab-title">توضیحات کامل</h3>
                    <p className="full-description">{product.description}</p>
                    
                    <h3 className="tab-title">دیدگاه مشتریان</h3>
                    {/* ... بخش دیدگاه‌ها ... */}
                </div>

            </div>
        </div>
    );
}