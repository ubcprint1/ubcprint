import Link from 'next/link'
import { productGroups } from '@/lib/product-catalog'

export function StorefrontHero({ title, description, active }: { title: string; description: string; active?: string }) {
  return (
    <section className="border-b bg-gradient-to-l from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1A2E42] sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {productGroups.map((group) => (
            <Link
              key={group.value}
              href={group.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === group.value ? 'bg-[#223982] text-white' : 'border border-slate-300 bg-white text-slate-700 hover:border-[#223982] hover:text-[#223982]'}`}
            >
              {group.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
