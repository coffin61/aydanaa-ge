import Link from 'next/link';
import ProductCard from '../../components/ProductCard'; 
// در این صفحه از همان کامپوننت کارت محصول استفاده می‌کنیم

// ----------------------------------------------------
// داده‌های تستی کامل‌تر برای لیست محصولات
// ----------------------------------------------------
const allDummyProducts = [
    { id: 1, name: 'بانکه سه تایی پروانه‌ای', slug: 'banke-parvane', price: 1320000, discountedPrice: 1290000, category: 'بانکه', images: ['/images/product-1.jpg'], color: 'کرم' },
    { id: 2, name: 'ست چای‌خوری گل‌دار', slug: 'tea-set-goli', price: 2500000, discountedPrice: 2250000, category: 'سرویس', images: ['/images/product-2.jpg'], color: 'قرمز' },
    { id: 3, name: 'دیوارکوب کالیگرافی', slug: 'divarkoob-calli', price: 395000, discountedPrice: null, category: 'دکوراتیو', images: ['/images/product-3.jpg'], color: 'آبی' },
    { id: 4, name: 'لیوان آدمکی دست‌ساز', slug: 'livan-adamak', price: 470000, discountedPrice: 450000, category: 'لیوان', images: ['/images/product-4.jpg'], color: 'سفید' },
    { id: 5, name: 'کاسه بزرگ دست‌ساز', slug: 'kase-bozorg', price: 550000, discountedPrice: null, category: 'کاسه', images: ['/images/product-5.jpg'], color: 'سفید' },
    { id: 6, name: 'شمع معطر سرامیکی', slug: 'sham-moatar', price: 180000, discountedPrice: 150000, category: 'شمع', images: ['/images/product-6.jpg'], color: 'کرم' },
    { id: 7, name: 'دیس پذیرایی مستطیلی', slug: 'dis-mostatili', price: 890000, discountedPrice: null, category: 'سرو و پذیرایی', images: ['/images/product-7.jpg'], color: 'فیروزه ای' },
    { id: 8, name: 'گلدان مینیمال کوچک', slug: 'goldan-minimal', price: 210000, discountedPrice: null, category: 'دکوراتیو', images: ['/images/product-8.jpg'], color: 'طوسی' },
];

export default function ShopPage() {

    const products = allDummyProducts; // نمایش همه محصولات تستی

    return (
        <div className="shop-page">
            <div className="container">
                {/* مسیر یابی (Breadcrumb) */}
                <div className="breadcrumb">
                    <Link href="/">خانه</Link> / 
                    <span>فروشگاه محصولات سرامیکی</span>
                </div>
                
                <h2>فروشگاه محصولات سرامیکی آیدانا</h2>

                <div className="shop-grid">
                    
                    {/* ۱. ستون کناری (Sidebar) برای فیلترها */}
                    <aside className="sidebar">
                        <div className="filter-box">
                            <h3><i className="fa-solid fa-filter"></i> فیلتر محصولات</h3>

                            {/* فیلتر دسته‌بندی */}
                            <div className="filter-group">
                                <h4>دسته‌بندی‌ها</h4>
                                <ul>
                                    <li><Link href="/category/all">همه محصولات (۸)</Link></li>
                                    <li><Link href="/category/decorative">دکوراتیو (۲)</Link></li>
                                    <li><Link href="/category/serving">سرو و پذیرایی (۳)</Link></li>
                                    <li><Link href="/category/jars">بانکه و شمع (۲)</Link></li>
                                </ul>
                            </div>
                            
                            {/* فیلتر قیمت (در یک Client Component پیچیده‌تر است) */}
                            <div className="filter-group">
                                <h4>محدوده قیمت</h4>
                                {/* اینجا در یک پروژه واقعی باید یک کامپوننت اسلایدر قیمت قرار بگیرد */}
                                <input type="range" min="100000" max="3000000" step="10000" />
                                <p>از ۱۸۰,۰۰۰ تا ۲,۵۰۰,۰۰۰ تومان</p>
                            </div>

                            {/* فیلتر رنگ */}
                            <div className="filter-group">
                                <h4>رنگ</h4>
                                <div className="color-options">
                                    <span className="color-dot white" title="سفید"></span>
                                    <span className="color-dot cream" title="کرم"></span>
                                    <span className="color-dot blue" title="آبی"></span>
                                    <span className="color-dot gray" title="طوسی"></span>
                                    <span className="color-dot red" title="قرمز"></span>
                                </div>
                            </div>
                            
                            <button className="btn btn-primary filter-btn">اعمال فیلتر</button>
                        </div>
                    </aside>

                    {/* ۲. ستون اصلی محتوا و محصولات */}
                    <section className="shop-content">
                        
                        {/* نوار مرتب‌سازی و نمایش */}
                        <div className="toolbar">
                            <span className="product-count">{products.length} محصول یافت شد.</span>
                            <div className="sort-options">
                                <label htmlFor="sort">مرتب‌سازی بر اساس:</label>
                                <select id="sort" className="sort-dropdown">
                                    <option value="default">پیش‌فرض</option>
                                    <option value="price-asc">ارزان‌ترین</option>
                                    <option value="price-desc">گران‌ترین</option>
                                    <option value="newest">جدیدترین</option>
                                </select>
                            </div>
                        </div>

                        {/* لیست محصولات */}
                        <div className="product-list category-list">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        
                        {/* pagination - صفحه‌بندی (برای حجم بالای محصولات) */}
                        <div className="pagination">
                            <Link href="#" className="page-link current">۱</Link>
                            <Link href="#" className="page-link">۲</Link>
                            <Link href="#" className="page-link">۳</Link>
                            <Link href="#" className="page-link next-prev"><i className="fa-solid fa-chevron-left"></i></Link>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    );
}