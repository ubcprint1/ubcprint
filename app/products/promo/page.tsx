import Link from "next/link"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { allProducts } from "@/lib/products-data"
import { Gift } from "lucide-react"

export default function PromoPage() {
  const items = allProducts.filter((item) => item.category === "promo")
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2E42]">
      <WebsiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#223982] px-8 py-14 text-center text-white"><h1 className="text-5xl font-black">المنتجات الترويجية</h1><p className="mt-4 text-xl text-white/85">هدايا دعائية ومنتجات ترويجية للهوية التجارية.</p></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex aspect-square items-center justify-center bg-[#EAF0F6] text-[#91A3BD]"><Gift className="h-16 w-16" /></div>
              <div className="p-5"><div className="text-xl font-bold">{item.name}</div><div className="mt-2 text-slate-600">{item.description}</div><div className="mt-4 font-black text-[#223982]">من {item.price} ج.م</div></div>
            </Link>
          ))}
        </div>
      </main>
      <WebsiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
