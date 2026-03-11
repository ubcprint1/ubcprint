import { allProducts } from "@/lib/products-data"

export const featuredCategories = [
  { title: "التيشرتات", href: "/products/apparel" },
  { title: "الكروت الشخصية", href: "/products" },
  { title: "البروشورات", href: "/products" },
  { title: "الاستيكرات", href: "/products/promo" },
  { title: "البنرات", href: "/products/events" },
  { title: "علب التغليف", href: "/products/promo" },
  { title: "الأكواب", href: "/products/promo" },
  { title: "الرول أب", href: "/products/events" },
]

export const brandNames = ["Epson", "HP", "Canon", "Puma", "Adidas", "Nike"]

export const reviews = [
  { name: "أحمد محمد", city: "القاهرة", text: "خدمة ممتازة والجودة عالية جدًا، التسليم كان في الموعد المحدد." },
  { name: "فاطمة علي", city: "الإسكندرية", text: "أفضل مطبعة تعاملت معها. الطباعة واضحة والألوان رائعة." },
  { name: "محمد حسن", city: "الجيزة", text: "طباعة احترافية وأسعار معقولة جدًا. سأطلب مرة أخرى بالتأكيد." },
]

export const guarantees = [
  "بدون رسوم إعداد",
  "شحن قياسي مجاني",
  "مساعدة خبراء 7 أيام في الأسبوع",
  "مراجعة تصميم مجانية",
  "تصميم وخطوط حصرية",
  "ضمان رضا 100%",
]

export const helpFeatures = [
  { title: "اختيار المنتج", desc: "سنساعدك في اختيار المقاس والخامة المناسبة لطلبك." },
  { title: "مساعدة التصميم", desc: "أرسل فكرتك وسيقوم المصمم بتحويلها إلى تصميم جاهز للطباعة." },
  { title: "طلبات المجموعات", desc: "حلول للشركات والفعاليات والمدارس والفرق." },
  { title: "دعم الطلبات", desc: "متابعة الطلب من التسعير وحتى التسليم." },
]

export const spotlightProducts = allProducts.slice(0, 6)
