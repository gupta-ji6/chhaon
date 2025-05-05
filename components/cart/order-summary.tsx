import type { CartItem } from "@/lib/cart-context"
import { CheckCircle } from "lucide-react"

type OrderSummaryProps = {
  items: CartItem[]
  totalPrice: number
}

export function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-medium">Thank You!</h3>
        <p className="text-center text-muted-foreground mt-2">
          Your order has been received and will be prepared shortly.
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-4">Order Summary</h4>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.name} className="flex justify-between text-sm">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>A staff member will come to your table to confirm your order.</p>
        <p className="mt-2">For any changes, please speak to our staff.</p>
      </div>
    </div>
  )
}
