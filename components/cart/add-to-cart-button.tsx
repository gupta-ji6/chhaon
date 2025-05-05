"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { MenuItem } from "@/lib/menu-data"
import { Minus, Plus } from "lucide-react"
import NumberFlow from "@number-flow/react"
import { AnimatedButton, AnimatedIconButton } from "@/components/ui/animated-button"

type AddToCartButtonProps = {
  item: MenuItem
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { addItem, items, updateQuantity, removeItem } = useCart()

  // Find if the item is already in the cart and get its quantity
  const cartItem = items.find((i) => i.name === item.name)
  const quantity = cartItem?.quantity || 0
  const isInCart = quantity > 0

  return isInCart ? (
    <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 rounded-full p-1 border border-stone-200 dark:border-stone-700">
      <div style={{ display: "inline-block" }}>
        <AnimatedIconButton
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700"
          onClick={() => updateQuantity(item.name, quantity - 1)}
          scaleAmount={0.7}
          springConfig={{ stiffness: 700, damping: 15, mass: 0.8 }}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease quantity</span>
        </AnimatedIconButton>
      </div>

      <span className="w-8 text-center text-sm font-medium font-variant-numeric tabular-nums">
        <NumberFlow value={quantity} />
      </span>

      <div style={{ display: "inline-block" }}>
        <AnimatedIconButton
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700"
          onClick={() => updateQuantity(item.name, quantity + 1)}
          scaleAmount={0.7}
          springConfig={{ stiffness: 700, damping: 15, mass: 0.8 }}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase quantity</span>
        </AnimatedIconButton>
      </div>
    </div>
  ) : (
    <div style={{ display: "inline-block" }}>
      <AnimatedButton
        variant="outline"
        size="sm"
        className="h-8 rounded-full px-3 text-primary hover:bg-primary/10 border-primary/20"
        onClick={() => addItem(item)}
        scaleAmount={0.92}
        springConfig={{ stiffness: 400, damping: 17, mass: 1 }}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add to Order
      </AnimatedButton>
    </div>
  )
}
