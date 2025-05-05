"use client"

import { X, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { CustomerInfoForm } from "@/components/cart/customer-info-form"
import { OrderSummary } from "@/components/cart/order-summary"

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
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 -ml-2"
                onClick={handleBackToOrder}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to order</span>
              </Button>
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
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Add items from the menu to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start py-3 border-b border-stone-100 dark:border-stone-700 last:border-0">
                    <div className="flex-1 pr-4">
                      <h4 className="font-display text-base font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                      <p className="text-sm font-medium mt-1">₹{item.price}</p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => removeItem(item.name)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>

                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <Button className="w-full mt-6" size="lg" disabled={items.length === 0} onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
