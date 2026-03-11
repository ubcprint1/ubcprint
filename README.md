# UBC Print

مشروع UBC Print يجمع بين:
- موقع العميل العام
- بوابة العميل
- لوحة الموظفين
- لوحة الأدمن

## روابط الدخول
- العميل: `/client/login`
- الموظفون: `/staff/login`
- الأدمن: `/admin/login`

## بيانات تجريبية
- Admin: `admin@example.com` / `Admin@123456`
- Staff: `sales@example.com` / `Admin@123456`
- Client: `client@example.com` / `Admin@123456`

## تشغيل المشروع
```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run build
npm start
```
