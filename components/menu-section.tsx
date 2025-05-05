import type { MenuItem } from "@/lib/menu-data"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { Badge } from "@/components/ui/badge"

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
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl text-stone-800 dark:text-stone-100">{item.name}</h3>
                {item.labels && item.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.labels.includes("Chef's Recommended") && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                          <path d="M10 1a6 6 0 00-6 6v.5c0 1.316.244 2.603.706 3.804l.098.196c.199.38.431.743.696 1.084l.045.06c.18.23.379.447.593.65l6.208 6.2a1.25 1.25 0 001.768 0l6.208-6.2c.214-.203.413-.42.593-.65l.045-.06c.265-.341.497-.704.696-1.084l.098-.196A11.342 11.342 0 0022 7.5V7a6 6 0 00-6-6h-6z" />
                        </svg>
                        Chef's Pick
                      </Badge>
                    )}
                    {/* Template for future label types */}
                    {item.labels.includes("Spicy") && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Spicy
                      </Badge>
                    )}
                    {item.labels.includes("Vegan") && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Vegan
                      </Badge>
                    )}
                  </div>
                )}
              </div>
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
