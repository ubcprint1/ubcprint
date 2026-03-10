# UBC Print ERP - Roadmap

## الحالي
- واجهة Next.js كاملة نسبيًا
- صفحات الموقع + لوحة تحكم + محاسبة + ماكينات + حضور
- بيانات Mock داخل lib/

## ما تمت إضافته
- Prisma schema أولي للتوسعة إلى PostgreSQL
- Seed file أولي
- API routes أساسية للاختبار والربط
- صفحة تشغيل Production
- مسارات alias للصفحات الشائعة: customers / quotes / employees / tasks

## المطلوب لاحقًا للوصول لنسخة Production
1. ربط تسجيل الدخول بـ NextAuth أو Clerk
2. نقل كل بيانات Zustand/Mock إلى PostgreSQL
3. CRUD حقيقي للطلبات والعملاء والعروض والفواتير
4. رفع ملفات وربط العملاء ببوابة العميل
5. صلاحيات حسب الدور
6. تقارير تشغيلية ومالية حقيقية
