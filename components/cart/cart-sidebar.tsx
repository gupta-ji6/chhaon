"use client"

import { X, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { CustomerInfoForm } from "@/components/cart/customer-info-form"
import { OrderSummary } from "@/components/cart/order-summary"
import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import { AnimatedButton, AnimatedIconButton } from "@/components/ui/animated-button"
import { motion } from "framer-motion"

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

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
                  scaleAmount={0.9}
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
          <OrderSummary items={items} totalPrice={totalPrice} />
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
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {items.map((item) => (
                  <motion.div
                    key={item.name}
                    className="flex justify-between items-start py-3 border-b border-stone-100 dark:border-stone-700 last:border-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="flex-1 pr-4">
                      <h4 className="font-display text-base font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                      <NumberFlowGroup>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-sm font-medium">₹</span>
                          <span className="text-sm font-medium font-variant-numeric tabular-nums">
                            <NumberFlow value={item.price} />
                          </span>
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
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={() => removeItem(item.name)}
                          scaleAmount={0.85}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </AnimatedIconButton>
                      </div>

                      <div className="flex items-center gap-2">
                        <div style={{ display: "inline-block" }}>
                          <AnimatedIconButton
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            scaleAmount={0.8}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </AnimatedIconButton>
                        </div>

                        <span className="w-8 text-center text-sm font-medium font-variant-numeric tabular-nums">
                          <NumberFlow value={item.quantity} />
                        </span>

                        <div style={{ display: "inline-block" }}>
                          <AnimatedIconButton
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            scaleAmount={0.8}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </AnimatedIconButton>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between font-variant-numeric tabular-nums">
                <span>Subtotal</span>
                <span>₹<NumberFlow value={totalPrice} format={{ maximumFractionDigits: 2 }} /></span>
              </div>
              <div className="flex justify-between font-medium font-variant-numeric tabular-nums">
                <span>Total</span>
                <span>₹<NumberFlow value={totalPrice} format={{ maximumFractionDigits: 2 }} /></span>
              </div>

              <div style={{ display: "block" }}>
                <AnimatedButton
                  className="w-full mt-6"
                  size="lg"
                  disabled={items.length === 0}
                  onClick={handleCheckout}
                  scaleAmount={0.97}
                  springConfig={{ stiffness: 400, damping: 20 }}
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
