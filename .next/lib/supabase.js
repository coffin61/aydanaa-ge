import { createClient } from '@supabase/supabase-js';

// از متغیرهای محیطی که در .env.local تعریف کردیم، استفاده می‌کنیم
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ایجاد کلاینت Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// این کلاینت در سراسر پروژه Next.js ما قابل استفاده است