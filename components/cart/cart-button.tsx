"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function CartButton() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm"
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingBag className="h-[1.2rem] w-[1.2rem]" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
      <span className="sr-only">Open cart</span>
    </Button>
  )
}
