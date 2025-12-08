'use client';
import ProductCard from './ProductCard'; 
// داده‌های تستی را حذف می‌کنیم

// کامپوننت اکنون products را به عنوان props دریافت می‌کند
const ProductSlider = ({ products }) => {
    
    // اگر محصولات در دسترس نبودند، چیزی نمایش نمی‌دهد
    if (!products || products.length === 0) {
        return <div className="section container">هیچ محصولی برای نمایش وجود ندارد.</div>;
    }

    return (
        <section className="section special-offers">
            <div className="container">
                <h3 className="section-title">✨ شگفت‌انگیزترین پیشنهاد هفته ✨</h3>
                <div className="product-slider-wrapper"> 
                    <div className="product-list is-slider"> 
                        {/* نقشه کردن محصولات دریافت شده */}
                        {products.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={{
                                    ...product,
                                    // فرض می‌کنیم در دیتابیس price و image_url داریم
                                    images: product.image_url 
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductSlider;