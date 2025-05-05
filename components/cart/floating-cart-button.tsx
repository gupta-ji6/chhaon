"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { motion } from "framer-motion"
import NumberFlow from "@number-flow/react"

export function FloatingCartButton() {
    const { totalItems, setIsCartOpen } = useCart()

    return (
        <motion.div
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <Button
                variant="default"
                size="lg"
                className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center"
                onClick={() => setIsCartOpen(true)}
            >
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white dark:bg-stone-800 text-primary font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center text-xs border-2 border-primary">
                        <NumberFlow value={totalItems} />
                    </span>
                )}
                <span className="sr-only">Open cart</span>
            </Button>
        </motion.div>
    )
} 