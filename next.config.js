/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // نام دامنه‌های مجاز برای استفاده با کامپوننت Image
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // 👈 دامنه Cloudinary
            },
            // اگر از دامنه‌های دیگری هم برای عکس استفاده می‌کنید، اینجا اضافه کنید
        ],
    },
};

module.exports = nextConfig;