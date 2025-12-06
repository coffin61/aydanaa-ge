'use client';
import ProductCard from './ProductCard'; // از کارت محصول مرحله قبل استفاده می‌کنیم

// داده‌های تستی (جایگزین داده‌های دیتابیس شما)
const dummyProducts = [
    // داده‌های نمونه محصول ۱
    { id: 1, name: 'بانکه سه تایی پروانه‌ای', slug: 'banke-parvane', price: 1320000, discountedPrice: 1290000, category: 'بانکه', images: ['/images/product-1.jpg'] },
    // داده‌های نمونه محصول ۲
    { id: 2, name: 'ست چای‌خوری گل‌دار', slug: 'tea-set-goli', price: 2500000, discountedPrice: 2250000, category: 'سرویس', images: ['/images/product-2.jpg'] },
    // داده‌های نمونه محصول ۳
    { id: 3, name: 'دیوارکوب کالیگرافی', slug: 'divarkoob-calli', price: 395000, discountedPrice: null, category: 'دکوراتیو', images: ['/images/product-3.jpg'] },
    // داده‌های نمونه محصول ۴
    { id: 4, name: 'لیوان آدمکی دست‌ساز', slug: 'livan-adamak', price: 470000, discountedPrice: 450000, category: 'لیوان', images: ['/images/product-4.jpg'] },
    // اضافه کردن چند محصول دیگر برای پر کردن اسلایدر
    { id: 5, name: 'کاسه بزرگ دست‌ساز', slug: 'kase-bozorg', price: 550000, discountedPrice: null, category: 'کاسه', images: ['/images/product-5.jpg'] },
    { id: 6, name: 'شمع معطر سرامیکی', slug: 'sham-moatar', price: 180000, discountedPrice: 150000, category: 'شمع', images: ['/images/product-6.jpg'] },
];

const ProductSlider = () => {
    return (
        <section className="section special-offers">
            <div className="container">
                <h3 className="section-title">✨ شگفت‌انگیزترین پیشنهاد هفته ✨</h3>
                <div className="product-slider-wrapper"> 
                    <div className="product-list is-slider"> 
                        {dummyProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductSlider;