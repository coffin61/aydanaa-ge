// app/page.js
import Link from 'next/link';
import ProductSlider from '../components/ProductSlider'; 
import { supabase } from '../lib/supabase';
import { unstable_noStore as noStore } from 'next/cache'; // 👈 ایمپورت جدید

// ----------------------------------------------------
// تابع واکشی داده از Supabase
// ----------------------------------------------------
async function getProducts() {
    noStore(); // 👈 اضافه کردن این خط برای جلوگیری از اتصال به دیتابیس در زمان Build

    const { data: products, error } = await supabase
        .from('products') 
        .select('*')      
        .limit(6);        

    if (error) {
        console.error("Error fetching products:", error);
        return []; 
    }
    return products;
}

export default async function HomePage() {
  
  const products = await getProducts();

  return (
    <>
      {/* ۱. بنر اصلی (Hero Section) */}
      <section className="hero-section">
          <div className="container">
              <div className="promo-box">
                  <h2>به دنیای ظروف دست‌ساز سرامیکی آیدانا خوش آمدید!</h2>
                  <p>کیفیت و اصالت در هر قطعه، مخصوص خانه زیبای شما.</p>
                  <div className="features">
                      <span><i className="fa-solid fa-check-circle"></i> قابل استفاده در ماکروفر</span>
                      <span><i className="fa-solid fa-check-circle"></i> ارسال مطمئن به سراسر ایران</span>
                  </div>
                  <Link href="/shop" className="btn btn-primary">مشاهده محصولات</Link>
              </div>
          </div>
      </section>

      {/* ۲. پیشنهاد ویژه (اسلایدر محصولات) */}
      <ProductSlider products={products} /> 

      {/* ۳. بنرهای دسته‌بندی سه‌تایی */}
      <section className="section category-banners">
          <div className="container">
              <div className="banner-group">
                  <Link href="/category/jars" className="banner-item">
                      <img src="/images/placeholder-banner-1.jpg" alt="ظروف درب دار"/> 
                      <p>انواع ظروف درب دار</p>
                  </Link>
                   <Link href="/category/mugs" className="banner-item">
                      <img src="/images/placeholder-banner-2.jpg" alt="ماگ‌های دستساز"/>
                      <p>ماگ‌های دست‌ساز سرامیکی</p>
                  </Link>
                   <Link href="/category/decorative" className="banner-item">
                      <img src="/images/placeholder-banner-3.jpg" alt="دکوراتیو"/>
                      <p>دیوارکوب و دکوراتیو</p>
                  </Link>
              </div>
          </div>
      </section>

      {/* ۴. بخش بلاگ/مجله */}
      <section className="section blog-preview">
          <div className="container">
              <h3 className="section-title">📘 آخرین مقالات مجله</h3>
              <div className="post-list">
                  <div className="post-card">
                      <img src="/images/placeholder-blog-1.jpg" alt="تصویر مقاله ۱"/>
                      <h4>مراحل ساخت ظروف سرامیکی</h4>
                      <p>آموختن هنر سرامیک و لعاب‌کاری می‌تواند بسیار جذاب باشد...</p>
                      <Link href="/blog/post-1" className="read-more">ادامه مطلب <i className="fa-solid fa-arrow-left"></i></Link>
                  </div>
                   <div className="post-card">
                      <img src="/images/placeholder-blog-2.jpg" alt="تصویر مقاله ۲"/>
                      <h4>نحوه انتخاب بهترین لعاب برای سفال</h4>
                      <p>لعاب چیست؟ لعاب روی سفال پوشش روی سفال است که کاملا درخشان و شفاف بوده...</p>
                      <Link href="/blog/post-2" className="read-more">ادامه مطلب <i className="fa-solid fa-arrow-left"></i></Link>
                  </div>
                  <div className="post-card">
                      <img src="/images/placeholder-blog-3.jpg" alt="تصویر مقاله ۳"/>
                      <h4>نگهداری صحیح از ظروف دست‌ساز</h4>
                      <p>برای حفظ کیفیت و زیبایی ظروف سرامیکی دست‌ساز، رعایت چند نکته ساده ضروری است...</p>
                      <Link href="/blog/post-3" className="read-more">ادامه مطلب <i className="fa-solid fa-arrow-left"></i></Link>
                  </div>
              </div>
          </div>
      </section>
    </>
  )
}