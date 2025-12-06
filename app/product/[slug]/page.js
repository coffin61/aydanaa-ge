import Image from 'next/image';
import Link from 'next/link';
// ما یک Client Component کوچک برای انتخابگر تعداد (Quantity Selector) نیاز داریم
import QuantitySelector from '../../../components/QuantitySelector'; 

// ----------------------------------------------------
// داده‌های تستی (جایگزین واکشی از دیتابیس یا API)
// ----------------------------------------------------
const dummyProductData = {
    id: 1,
    name: 'بانکه سه تایی پروانه‌ای دست‌ساز',
    slug: 'banke-parvane',
    price: 1320000,
    discountedPrice: 1290000,
    category: 'بانکه',
    stock: 5,
    description: 'این ست بانکه سرامیکی دست‌ساز با طرح پروانه، تولیدی انحصاری گالری آیدانا است. لعاب درخشان و کیفیت پخت بالا، این محصول را برای استفاده روزمره و نگهداری انواع مواد غذایی خشک مناسب ساخته است. قابل شستشو در ماشین ظرفشویی و مقاوم در برابر حرارت ماکروفر.',
    shortDescription: 'ظروف درب‌دار سرامیکی، شامل سه سایز مختلف، با طراحی مینیمال و رنگ‌های گرم.',
    images: [
        '/images/product-1.jpg',
        '/images/product-1-side.jpg',
        '/images/product-1-top.jpg',
    ],
    features: [
        'سه سایز (کوچک، متوسط، بزرگ)',
        'جنس: سرامیک دست‌ساز',
        'قابلیت استفاده در ماکروفر و ماشین ظرفشویی',
        'طراحی راست به چپ (RTL)',
    ],
};

// ----------------------------------------------------
// Server Component اصلی صفحه محصول
// ----------------------------------------------------
export default function ProductPage({ params }) {
    // در اینجا params.slug حاوی مقدار 'banke-parvane' است.
    // در یک پروژه واقعی، از این slug برای واکشی داده‌های محصول از دیتابیس استفاده می‌کنیم.
    
    const product = dummyProductData; // استفاده از داده‌های تستی

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
                        {/* تصویر اصلی */}
                        <div className="main-image">
                            <Image 
                                src={product.images[0]} 
                                alt={product.name} 
                                width={600} 
                                height={600} 
                                layout="responsive" 
                                objectFit="cover"
                            />
                        </div>
                        {/* تصاویر کوچک (Thumbnail) */}
                        <div className="thumbnails">
                            {product.images.map((imgSrc, index) => (
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
                        
                        <div className="rating">
                            {/* آیکون ستاره‌ها برای امتیاز دهی */}
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                            <i className="fa-regular fa-star"></i>
                            <span className="review-count">(۳۲ دیدگاه)</span>
                        </div>

                        <p className="short-description">{product.shortDescription}</p>

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
                        
                        <div className="stock-status">
                            {product.stock > 0 ? (
                                <span className="in-stock"><i className="fa-solid fa-check"></i> موجود در انبار (موجودی: {product.stock})</span>
                            ) : (
                                <span className="out-of-stock"><i className="fa-solid fa-xmark"></i> ناموجود</span>
                            )}
                        </div>

                        {/* انتخاب تعداد و افزودن به سبد خرید */}
                        {product.stock > 0 && (
                            <div className="cart-actions">
                                {/* کامپوننت Client برای مدیریت State تعداد */}
                                <QuantitySelector initialQuantity={1} maxQuantity={product.stock} /> 
                                <button className="btn btn-primary btn-add-to-cart-page">
                                    <i className="fa-solid fa-cart-shopping"></i> افزودن به سبد خرید
                                </button>
                            </div>
                        )}

                        {/* ویژگی‌های کلیدی */}
                        <div className="product-features-list">
                            <h4>ویژگی‌های محصول:</h4>
                            <ul>
                                {product.features.map((feature, index) => (
                                    <li key={index}><i className="fa-solid fa-circle-check"></i> {feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* بخش توضیحات کامل و دیدگاه‌ها */}
                <div className="product-tabs">
                    <h3 className="tab-title">توضیحات کامل</h3>
                    <p className="full-description">{product.description}</p>
                    
                    <h3 className="tab-title">دیدگاه مشتریان</h3>
                    {/* در پروژه واقعی، اینجا کامپوننت دیدگاه‌ها رندر می‌شود */}
                    <div className="reviews-section">
                        <p>هنوز دیدگاهی برای این محصول ثبت نشده است. اولین نفری باشید که نظر می‌دهد!</p>
                        <button className="btn btn-primary">ثبت دیدگاه</button>
                    </div>
                </div>

            </div>
        </div>
    );
}