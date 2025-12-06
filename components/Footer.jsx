import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-columns">
                    {/* ستون ۱: دسترسی سریع */}
                    <div className="footer-col">
                        <h4>دسترسی سریع</h4>
                        <ul>
                            <li><Link href="/about">درباره ما</Link></li>
                            <li><Link href="/faq">سوالات متداول</Link></li>
                            <li><Link href="/track-order">پیگیری سفارش</Link></li>
                        </ul>
                    </div>
                    {/* ستون ۲: دسته‌بندی‌ها */}
                    <div className="footer-col">
                        <h4>دسته‌بندی‌ها</h4>
                        <ul>
                            <li><Link href="/category/serving">سرو و پذیرایی</Link></li>
                            <li><Link href="/category/decorative">دکوراتیو</Link></li>
                            <li><Link href="/category/gift">کادوئی</Link></li>
                        </ul>
                    </div>
                    {/* ستون ۳: ارتباط با ما */}
                    <div className="footer-col contact-info-footer">
                        <h4>ارتباط با ما</h4>
                        <p><i className="fa-solid fa-location-dot"></i> آدرس: خیابان رودکی، کوچه ملک محمدی...</p>
                        <p><i className="fa-solid fa-whatsapp"></i> واتساپ: ۰۹۱۲۳۵۴۳۷۷۸</p>
                        <div className="social-links">
                            <a href="https://instagram.com/Aydaana" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-telegram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; ۱۴۰۲ - تمامی حقوق برای آیدانا محفوظ است.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;