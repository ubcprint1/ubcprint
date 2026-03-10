# UBC Print Full Stack

نسخة محسنة من مشروع المطبعة مع Frontend واسع + Backend foundation كامل.

## التشغيل
1. انسخ `.env.example` إلى `.env`
2. ثبت الحزم: `npm install`
3. جهز القاعدة: `npm run db:push`
4. أنشئ بيانات تجريبية: `npm run db:seed`
5. شغل التطوير: `npm run dev`

## بيانات الدخول
- admin@example.com / Admin@123456
- sales@example.com / Admin@123456
- operator@example.com / Admin@123456

## الـ Backend الموجود
- Auth API
- Orders CRUD
- Customers CRUD
- Quotes CRUD
- Invoices CRUD + payments
- Machines CRUD
- Employees API
- Tasks API
- Products API
- Attendance API
- Production Jobs API
- Dashboard/Reports summary

## ملاحظات
هذه النسخة أقوى كأساس Full Stack، لكن بعض صفحات الواجهة ما زالت تعرض بيانات UI/Mock إلى أن يتم ربطها بالكامل مع الـ APIs.
