"use client"

import { X, Minus, Plus, ShoppingBag, ArrowLeft, Layers, List, ChefHat, Flame, MinusCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useState, useMemo } from "react"
import { CustomerInfoForm } from "@/components/cart/customer-info-form"
import { OrderSummary } from "@/components/cart/order-summary"
import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import { AnimatedButton, AnimatedIconButton } from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { Toggle } from "@/components/ui/toggle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { CartItem } from "@/lib/cart-context"
import { Leaf, Egg, Drumstick } from "lucide-react"

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, totalSavings, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "categorized">("list")

  const handleCheckout = () => {
    if (items.length > 0) {
      setShowCheckout(true)
    }
  }

  const handleBackToOrder = () => {
    setShowCheckout(false)
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
  }

  const handleClose = () => {
    setIsCartOpen(false)
    if (orderPlaced) {
      setTimeout(() => {
        setShowCheckout(false)
        setOrderPlaced(false)
        clearCart()
      }, 500)
    }
  }

  // Group items by category
  const categorizedItems = useMemo(() => {
    const groupedItems: Record<string, CartItem[]> = {}

    items.forEach(item => {
      // Simple category detection based on item name or description
      // In a real app, you'd have proper category data from your backend
      let category = "Other"

      if (/shake|coffee|tea|lemonade|soda|punch|juice/i.test(item.name)) {
        category = "Drinks"
      } else if (/fries|toast|sandwich|burger|pizza/i.test(item.name)) {
        category = "Fast Food"
      } else if (/paneer|dal|roti|naan|rice|biryani/i.test(item.name)) {
        category = "Indian"
      } else if (/noodle|manchurian|momos|spring roll|chilli/i.test(item.name)) {
        category = "Chinese"
      } else if (/pasta|pizza|lasagna/i.test(item.name)) {
        category = "Italian"
      } else if (/cake|pastry|ice cream|brownie/i.test(item.name)) {
        category = "Desserts"
      }

      if (!groupedItems[category]) {
        groupedItems[category] = []
      }

      groupedItems[category].push(item)
    })

    // Sort categories alphabetically
    return Object.keys(groupedItems)
      .sort()
      .map(category => ({
        category,
        items: groupedItems[category]
      }))
  }, [items])

  const renderCartItem = (item: CartItem) => (
    <motion.div
      key={item.name}
      className="flex justify-between items-start py-3 border-b border-stone-100 dark:border-stone-700 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-1.5">
          {/* Dietary type indicators - before the name */}
          {item.labels && (
            <div className="flex gap-0.5 mr-1">
              {/* Only show non-veg, egg, and vegan indicators */}
              {item.labels.includes("Non-Vegetarian") && (
                <Drumstick className="h-3.5 w-3.5 text-red-700" strokeWidth={2.5} />
              )}
              {item.labels.includes("Eggetarian") && (
                <Egg className="h-3.5 w-3.5 text-amber-600" strokeWidth={2.5} />
              )}
              {item.labels.includes("Vegan") && (
                <Leaf className="h-3.5 w-3.5 text-teal-600" strokeWidth={2.5} />
              )}
            </div>
          )}

          <h4 className="font-display text-base font-medium">{item.name}</h4>

          {/* Special labels - after the name */}
          {item.labels && (
            <div className="flex gap-0.5 ml-1">
              {item.labels.includes("Chef's Recommended") && (
                <ChefHat className="h-3.5 w-3.5 text-amber-900" strokeWidth={2.5} />
              )}
              {item.labels.includes("Spicy") && (
                <Flame className="h-3.5 w-3.5 text-red-800" strokeWidth={2.5} />
              )}
              {item.originalPrice && (
                <MinusCircle className="h-3.5 w-3.5 text-green-800" strokeWidth={2.5} />
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
        <NumberFlowGroup>
          <div className="flex items-baseline gap-1 mt-1">
            {item.originalPrice ? (
              <>
                <span className="text-xs text-muted-foreground line-through mr-1">
                  ₹<NumberFlow value={item.originalPrice} />
                </span>
                <span className="text-sm font-semibold">₹</span>
                <span className="text-sm font-semibold font-variant-numeric tabular-nums">
                  <NumberFlow value={item.price} />
                </span>
                <span className="text-xs text-green-600 ml-1 font-medium">
                  ({Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off)
                </span>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold">₹</span>
                <span className="text-sm font-semibold font-variant-numeric tabular-nums">
                  <NumberFlow value={item.price} />
                </span>
              </>
            )}
            <span className="text-xs text-muted-foreground font-variant-numeric tabular-nums ml-1">
              × <NumberFlow value={item.quantity} />
            </span>
          </div>
        </NumberFlowGroup>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <div style={{ display: "inline-block" }}>
          <AnimatedIconButton
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeItem(item.name)}
            scaleAmount={0.7}
            springConfig={{ stiffness: 700, damping: 15, mass: 0.8 }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </AnimatedIconButton>
        </div>
        <div className="flex items-center">
          <div style={{ display: "inline-block" }}>
            <AnimatedIconButton
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.name, item.quantity - 1)}
              scaleAmount={0.7}
              springConfig={{ stiffness: 700, damping: 15, mass: 0.8 }}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </AnimatedIconButton>
          </div>
          <span className="mx-1 w-6 text-center text-sm font-variant-numeric tabular-nums">{item.quantity}</span>
          <div style={{ display: "inline-block" }}>
            <AnimatedIconButton
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.name, item.quantity + 1)}
              scaleAmount={0.7}
              springConfig={{ stiffness: 700, damping: 15, mass: 0.8 }}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </AnimatedIconButton>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <Sheet open={isCartOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="flex items-center">
            {showCheckout && !orderPlaced && (
              <div style={{ display: "inline-block" }}>
                <AnimatedIconButton
                  variant="ghost"
                  size="icon"
                  className="mr-2 -ml-2"
                  onClick={handleBackToOrder}
                  scaleAmount={0.8}
                  springConfig={{ stiffness: 700, damping: 15, mass: 0.8 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to order</span>
                </AnimatedIconButton>
              </div>
            )}
            <ShoppingBag className="mr-2 h-5 w-5" />
            {showCheckout ? (orderPlaced ? "Order Confirmed" : "Checkout") : "Your Order"}
          </SheetTitle>
        </SheetHeader>

        {orderPlaced ? (
          <OrderSummary items={items} totalPrice={totalPrice} totalSavings={totalSavings} />
        ) : showCheckout ? (
          <CustomerInfoForm onSubmit={handlePlaceOrder} onBack={handleBackToOrder} />
        ) : (
          <>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">Add items from the menu to get started</p>
                </motion.div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-end mb-3 space-x-2">
                  <span className="text-sm text-muted-foreground">View:</span>
                  <div className="flex border rounded-lg overflow-hidden">
                    <Toggle
                      pressed={viewMode === "list"}
                      onClick={() => setViewMode("list")}
                      className="rounded-none border-0 px-2 data-[state=on]:bg-muted"
                      aria-label="List view"
                    >
                      <List className="h-4 w-4 mr-1" />
                      <span className="text-xs">List</span>
                    </Toggle>
                    <Toggle
                      pressed={viewMode === "categorized"}
                      onClick={() => setViewMode("categorized")}
                      className="rounded-none border-0 px-2 data-[state=on]:bg-muted"
                      aria-label="Category view"
                    >
                      <Layers className="h-4 w-4 mr-1" />
                      <span className="text-xs">Categories</span>
                    </Toggle>
                  </div>
                </div>

                {viewMode === "list" ? (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {items.map(renderCartItem)}
                  </motion.div>
                ) : (
                  <Accordion type="multiple" defaultValue={categorizedItems.map(c => c.category)} className="w-full">
                    {categorizedItems.map(category => (
                      <AccordionItem key={category.category} value={category.category} className="border-b">
                        <AccordionTrigger className="py-3 hover:no-underline">
                          <div className="flex items-baseline justify-between w-full pr-2">
                            <span>{category.category}</span>
                            <span className="text-xs text-muted-foreground font-variant-numeric tabular-nums">
                              {category.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pb-1">
                            {category.items.map(renderCartItem)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </>
            )}

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between font-variant-numeric tabular-nums">
                <span className="text-base">Subtotal</span>
                <span className="text-base font-semibold">₹<NumberFlow value={totalPrice + totalSavings} format={{ maximumFractionDigits: 2 }} /></span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-green-600 font-medium font-variant-numeric tabular-nums">
                  <span className="text-base">Total Savings ({Math.round((totalSavings / (totalPrice + totalSavings)) * 100)}% off)</span>
                  <span className="text-base font-semibold">-₹<NumberFlow value={totalSavings} format={{ maximumFractionDigits: 2 }} /></span>
                </div>
              )}

              <div className="flex justify-between font-medium font-variant-numeric tabular-nums border-t pt-4">
                <span className="text-lg">Total</span>
                <span className="text-lg font-bold">₹<NumberFlow value={totalPrice} format={{ maximumFractionDigits: 2 }} /></span>
              </div>

              <div style={{ display: "block" }}>
                <AnimatedButton
                  className="w-full mt-6"
                  size="lg"
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  scaleAmount={0.95}
                  springConfig={{ stiffness: 500, damping: 17, mass: 1 }}
                >
                  Checkout
                </AnimatedButton>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
