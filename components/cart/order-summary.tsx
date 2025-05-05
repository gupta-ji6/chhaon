"use client"

import type { CartItem } from "@/lib/cart-context"
import { CheckCircle } from "lucide-react"
import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import { motion } from "framer-motion"

type OrderSummaryProps = {
  items: CartItem[]
  totalPrice: number
  totalSavings?: number
}

export function OrderSummary({ items, totalPrice, totalSavings = 0 }: OrderSummaryProps) {
  const discountPercentage = totalPrice > 0 ? Math.round((totalSavings / (totalPrice + totalSavings)) * 100) : 0

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center py-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            delay: 0.2,
          }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        </motion.div>
        <motion.h3
          className="text-xl font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Thank You!
        </motion.h3>
        <motion.p
          className="text-center text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your order has been received and will be prepared shortly.
        </motion.p>
      </motion.div>

      <motion.div
        className="border rounded-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
      >
        <h4 className="font-medium mb-4">Order Summary</h4>

        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex justify-between text-sm font-variant-numeric tabular-nums"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <span>
                <NumberFlow value={item.quantity} /> × {item.name}
                {item.originalPrice && (
                  <span className="text-xs text-green-600 ml-1 font-medium">
                    ({Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off)
                  </span>
                )}
              </span>
              <NumberFlowGroup>
                <span>
                  {item.originalPrice ? (
                    <>
                      <span className="text-xs line-through text-muted-foreground mr-1">
                        ₹<NumberFlow value={item.originalPrice * item.quantity} format={{ maximumFractionDigits: 2 }} />
                      </span>
                      <span className="font-semibold">
                        ₹<NumberFlow value={item.price * item.quantity} format={{ maximumFractionDigits: 2 }} />
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">₹<NumberFlow value={item.price * item.quantity} format={{ maximumFractionDigits: 2 }} /></span>
                  )}
                </span>
              </NumberFlowGroup>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-between font-variant-numeric tabular-nums mt-4 pt-4 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + items.length * 0.1 }}
        >
          <span className="text-base">Subtotal</span>
          <span className="text-base font-semibold">₹<NumberFlow value={totalPrice + totalSavings} format={{ maximumFractionDigits: 2 }} /></span>
        </motion.div>

        {totalSavings > 0 && (
          <motion.div
            className="flex justify-between text-green-600 font-medium mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + items.length * 0.1 }}
          >
            <span className="text-base">Total Savings ({discountPercentage}% off)</span>
            <span className="text-base font-semibold">-₹<NumberFlow value={totalSavings} format={{ maximumFractionDigits: 2 }} /></span>
          </motion.div>
        )}

        <motion.div
          className="border-t mt-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + items.length * 0.1 }}
        >
          <div className="flex justify-between font-medium font-variant-numeric tabular-nums">
            <span className="text-lg">Total</span>
            <span className="text-lg font-bold">₹<NumberFlow value={totalPrice} format={{ maximumFractionDigits: 2 }} /></span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + items.length * 0.1 }}
      >
        <p>A staff member will come to your table to confirm your order.</p>
        <p className="mt-2">For any changes, please speak to our staff.</p>
      </motion.div>
    </motion.div>
  )
}
