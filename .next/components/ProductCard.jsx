import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
    
    // 💡 اصلاح ۱: تضمین دسترسی امن به اولین تصویر
    // اگر product.images یک آرایه باشد و حداقل یک عنصر داشته باشد، اولین URL را استفاده کن.
    // در غیر این صورت، از یک تصویر پیش‌فرض استفاده کن.
    const mainImage = (product.images && product.images.length > 0) 
        ? product.images[0] 
        : '/images/default-product.jpg';
    
    // منطق محاسبه تخفیف
    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
    const discountPercentage = hasDiscount 
        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
        : 0;

    return (
        // 💡 اصلاح ۲: لینک دادن کل کارت به صفحه محصول (اختیاری، اما توصیه می‌شود)
        <Link href={`/product/${product.slug}`} passHref> 
            <div className="product-card">
                
                {hasDiscount && <span className="badge">-{discountPercentage}%</span>}

                {/* تگ Image نِکست برای بهینه‌سازی تصاویر */}
                {/* 💡 اصلاح ۳: حذف layout="responsive" و استفاده از fill یا width/height به تنهایی */}
                <Image 
                    src={mainImage}
                    alt={product.name}
                    width={300} 
                    height={300} 
                    // در Next.js 13+, layout="responsive" حذف شده است. 
                    // استفاده از width/height به تنهایی، رفتار شبیه به responsive را با CSS میسر می‌کند.
                    // یا می‌توانید از style={{ width: '100%', height: 'auto' }} استفاده کنید.
                    style={{ width: '100%', height: 'auto' }} 
                />

                <p className="category-name">{product.category}</p>
                <h4>{product.name}</h4>
                
                <div className="price-box">
                    {hasDiscount && <span className="old-price">{product.price.toLocaleString('fa-IR')}</span>}
                    <span className="new-price">
                        {hasDiscount 
                            ? product.discountedPrice.toLocaleString('fa-IR') 
                            : product.price.toLocaleString('fa-IR')} 
                        {' '} تومان
                    </span>
                </div>
                {/* دکمه افزودن به سبد خرید را از لینک کارت جدا نگه می‌داریم */}
                <button className="btn btn-add-to-cart" onClick={(e) => {
                    // e.preventDefault(); 
                    // منطق افزودن به سبد خرید اینجا قرار می‌گیرد
                    console.log(`Add ${product.name} to cart`);
                }}>
                    افزودن به سبد
                </button>
                
                {/* لینک مشاهده سریع غیر ضروری است اگر کل کارت لینک شده باشد */}
                {/* <Link href={`/product/${product.slug}`} className="quick-view-btn">مشاهده سریع</Link> */}
            </div>
        </Link>
    );
}

export default ProductCard;