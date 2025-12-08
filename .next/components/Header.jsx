'use client'; 
// این کامنت نشان می‌دهد که این کامپوننت برای تعاملات کاربر استفاده می‌شود

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    // State برای مدیریت وضعیت باز یا بسته بودن منو در موبایل
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // تابعی برای تغییر وضعیت منو
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="main-header">
            {/* نوار بالایی */}
            <div className="top-bar">
                <div className="container">
                    <div className="contact-info">
                        <i className="fa-solid fa-phone"></i>
                        <span>تماس: ۰۲۱-۸۸۶۹۹</span>
                    </div>
                    <div className="user-actions">
                        <Link href="/login"><i className="fa-solid fa-user"></i> ورود / ثبت نام</Link>
                        <Link href="/wishlist"><i className="fa-solid fa-heart"></i> علاقه‌مندی (۰)</Link>
                    </div>
                </div>
            </div>

            {/* نوار ناوبری اصلی */}
            <div className="nav-bar">
                <div className="container">
                    <Link href="/" className="logo">Aydaana</Link>
                    
                    {/* دکمه منوی همبرگری (فقط در موبایل نمایش داده می‌شود) */}
                    <button className="menu-toggle-btn" onClick={toggleMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    {/* با استفاده از State، کلاس منو را داینامیک می‌کنیم */}
                    <nav className={`main-menu ${isMenuOpen ? 'is-open' : ''}`}>
                        <ul>
                            <li><Link href="/">خانه</Link></li>
                            <li className="has-submenu">
                                <Link href="/category/decorative">دکوراتیو <i className="fa-solid fa-chevron-down"></i></Link>
                                <ul className="submenu">
                                    <li><Link href="/category/wall-sconce">دیوارکوب</Link></li>
                                    <li><Link href="/category/candle">شمع و جاعودی</Link></li>
                                    <li><Link href="/category/mirror">آینه و گلدان</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/shop">سرو و پذیرایی <i className="fa-solid fa-chevron-down"></i></Link></li>
                            <li><Link href="/blog">مجله آیدانا</Link></li>
                            <li><Link href="/contact">تماس با ما</Link></li>
                        </ul>
                    </nav>
                    
                    <div className="cart-search-actions">
                        <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <Link href="/cart" className="cart-widget">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <span className="cart-count">۰</span>
                            <span className="cart-price">۰ تومان</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;