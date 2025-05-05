import type { MenuItem } from "@/lib/menu-data"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

interface MenuSectionProps {
  title: string
  items: MenuItem[]
}

export function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {items.map((item, index) => (
          <div key={index} className="border-b border-stone-100 dark:border-stone-700 pb-4 flex flex-col">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-display text-xl text-stone-800 dark:text-stone-100">{item.name}</h3>
              <span className="font-body text-lg text-stone-700 dark:text-stone-200">₹{item.price}</span>
            </div>
            <p className="font-body text-stone-500 dark:text-stone-400 text-sm mb-3">{item.description}</p>
            <div className="flex justify-end mt-auto">
              <AddToCartButton item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
