import type { MenuItem } from "@/lib/menu-data"

interface MenuSectionProps {
  title: string
  items: MenuItem[]
}

export function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {items.map((item, index) => (
          <div key={index} className="border-b border-stone-100 pb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-display text-xl text-stone-800">{item.name}</h3>
              <span className="font-body text-lg text-stone-700">₹{item.price}</span>
            </div>
            <p className="font-body text-stone-500 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
