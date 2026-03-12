# UBCPRINT Stage 3 Patch

تم في هذه المرحلة تنفيذ CRUD حقيقي للآتي:

- المنتجات
- المستخدمون والموظفون
- العملاء

## المسارات الجديدة/المحدثة

### المنتجات
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`

### المستخدمون
- `/users`
- `/users/new`
- `/users/[id]`

### العملاء
- `/accounting/customers`
- `/accounting/customer/new`
- `/accounting/customer/[id]`

## ما تم تنفيذه

- إنشاء / تعديل / حذف / تعطيل المنتجات
- إنشاء / تعديل / تفعيل / تعطيل / حذف المستخدمين الداخليين
- إنشاء / تعديل / حذف العملاء
- ربط العميل بحساب بوابة دخول Client Portal
- حماية الحذف عند وجود سجلات مرتبطة
- تحديث لوحات الأدمن والموظفين لتسهيل الوصول

## ملاحظات تشغيل

بعد رفع الملفات نفذ:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run build
pm2 restart ubcprint
```

إذا كان اسم عملية PM2 مختلف:

```bash
pm2 list
pm2 restart <name>
```
