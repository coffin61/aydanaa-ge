// app/shop/page.js
import Link from 'next/link';
import ProductCard from '../../components/ProductCard'; 
import { supabase } from '../../lib/supabase'; // 👈 اضافه کردن اتصال به دیتابیس

// ----------------------------------------------------
// تابع واکشی تمام محصولات از Supabase
// ----------------------------------------------------
async function getAllProducts() {
    const { data: products, error } = await supabase
        .from('products') 
        .select('*');      
        // در اینجا هیچ محدودیت یا فیلتری اعمال نمی‌کنیم تا همه محصولات بیایند

    if (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
    return products;
}

export default async function ShopPage() {

    const products = await getAllProducts(); // واکشی تمام محصولات واقعی

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
                    
                    {/* ۱. ستون کناری (Sidebar) برای فیلترها (این بخش نیازمند Client Component و منطق فیلتر است) */}
                    <aside className="sidebar">
                        <div className="filter-box">
                            <h3><i className="fa-solid fa-filter"></i> فیلتر محصولات</h3>

                            {/* فیلتر دسته‌بندی (داده تستی) */}
                            <div className="filter-group">
                                <h4>دسته‌بندی‌ها</h4>
                                <ul>
                                    <li><Link href="/shop">همه محصولات ({products.length})</Link></li>
                                    <li><Link href="/category/decorative">دکوراتیو</Link></li>
                                    <li><Link href="/category/serving">سرو و پذیرایی</Link></li>
                                    <li><Link href="/category/jars">بانکه و شمع</Link></li>
                                </ul>
                            </div>
                            
                            {/* فیلتر قیمت (داده تستی) */}
                            <div className="filter-group">
                                <h4>محدوده قیمت</h4>
                                <input type="range" min="100000" max="3000000" step="10000" />
                                <p>از ۱۸۰,۰۰۰ تا ۲,۵۰۰,۰۰۰ تومان</p>
                            </div>

                            {/* فیلتر رنگ (داده تستی) */}
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
                                    {/* در یک پروژه واقعی، انتخاب این گزینه باید یک فیلتر جدید به Supabase بفرستد */}
                                    <option value="price-asc">ارزان‌ترین</option>
                                    <option value="price-desc">گران‌ترین</option>
                                </select>
                            </div>
                        </div>

                        {/* لیست محصولات */}
                        <div className="product-list category-list">
                            {products.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={{
                                        ...product,
                                        images: product.image_url // نگاشت image_url به images برای سازگاری با ProductCard
                                    }}
                                />
                            ))}
                        </div>
                        
                        {/* pagination - صفحه‌بندی (داده تستی) */}
                        <div className="pagination">
                            <Link href="#" className="page-link current">۱</Link>
                            <Link href="#" className="page-link">۲</Link>
                            <Link href="#" className="page-link next-prev"><i className="fa-solid fa-chevron-left"></i></Link>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    );
}