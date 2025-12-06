import Link from 'next/link';
import Image from 'next/image';

// این کامپوننت داده‌های محصول را از دیتابیس (یا Props) دریافت می‌کند
const ProductCard = ({ product }) => {
    
    // منطق محاسبه تخفیف
    const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
    const discountPercentage = hasDiscount 
        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
        : 0;

    return (
        <div className="product-card">
            
            {hasDiscount && <span className="badge">-{discountPercentage}%</span>}

            {/* از تگ Image نِکست برای بهینه‌سازی تصاویر استفاده می‌شود */}
            <Image 
                src={product.images[0] || '/images/default-product.jpg'}
                alt={product.name}
                width={300} // عرض و ارتفاع مناسب برای کارت محصول
                height={300}
                layout="responsive"
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
            <button className="btn btn-add-to-cart">
                افزودن به سبد
            </button>
            <Link href={`/product/${product.slug}`} className="quick-view-btn">مشاهده سریع</Link>
        </div>
    );
}

export default ProductCard;