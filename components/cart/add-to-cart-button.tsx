"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { MenuItem } from "@/lib/menu-data"
import { Minus, Plus } from "lucide-react"

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
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700"
        onClick={() => updateQuantity(item.name, quantity - 1)}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>

      <span className="w-8 text-center text-sm font-medium">{quantity}</span>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700"
        onClick={() => addItem(item)}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className="h-8 rounded-full px-3 text-primary hover:bg-primary/10 border-primary/20"
      onClick={() => addItem(item)}
    >
      <Plus className="h-4 w-4 mr-1" />
      Add to Order
    </Button>
  )
}
