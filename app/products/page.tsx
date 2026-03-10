"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { QuickQuoteButton } from "@/components/quick-quote-button"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { allProducts } from "@/lib/cart-store"
import {
  Printer,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "جميع المنتجات", count: allProducts.length, link: null },
    { id: "print", name: "الطباعة الورقية", count: allProducts.filter(p => p.category === "print").length, link: null },
    { id: "apparel", name: "الملابس المطبوعة", count: allProducts.filter(p => p.category === "apparel").length, link: null },
    { id: "promo", name: "المنتجات الترويجية", count: allProducts.filter(p => p.category === "promo").length, link: null },
    { id: "events", name: "المجموعات والفعاليات", count: allProducts.filter(p => p.category === "events").length, link: null },
    { id: "signage", name: "اللافتات والبنرات", count: allProducts.filter(p => p.category === "signage").length, link: null },
  ]

  // Filter products based on category and search
  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <WebsiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">المنتجات</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-l from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">المنتجات الترويجية</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            اكتشف مجموعتنا الواسعة من المنتجات المطبوعة والترويجية بأعلى جودة وأفضل الأسعار
          </p>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  تصفية حسب
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-slate-700 mb-3">الفئات</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      cat.link ? (
                        <Link
                          key={cat.id}
                          href={cat.link}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:bg-blue-50 text-slate-600 hover:text-blue-700"
                        >
                          <span>{cat.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {cat.count}
                          </Badge>
                        </Link>
                      ) : (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {cat.count}
                          </Badge>
                        </button>
                      )
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-slate-700 mb-3">نطاق السعر</h4>
                  <div className="flex gap-2">
                    <Input placeholder="من" className="text-center" />
                    <Input placeholder="إلى" className="text-center" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                    تطبيق
                  </Button>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">التقييم</h4>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-slate-600">وأعلى</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 sm:w-80">
<Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="ابحث في المنتجات..." 
                  className="pr-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">{filteredProducts.length} منتج</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-50"}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-50"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    الترتيب
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow block ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Product Image */}
                    <div
                      className={`relative bg-gradient-to-br from-slate-100 to-slate-200 ${
                        viewMode === "list" ? "w-48 h-48" : "aspect-square"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Printer className="h-16 w-16 text-slate-300" />
                      </div>
                      {product.badge && (
                        <Badge className={`absolute top-3 right-3 ${product.badgeColor} text-white`}>
                          {product.badge}
                        </Badge>
                      )}
                      <div className="absolute top-3 left-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                        <Heart className="h-4 w-4 text-slate-600" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-slate-400">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">{product.price} ج.م</span>
                          {product.originalPrice && (
                            <span className="text-sm text-slate-400 line-through">{product.originalPrice} ج.م</span>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                          <ShoppingCart className="h-4 w-4" />
                          <span className="hidden sm:inline">طلب</span>
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="px-8 bg-transparent">
                  عرض المزيد من المنتجات
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
