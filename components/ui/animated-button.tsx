"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// We need to use a different approach to ensure events work properly
export function AnimatedButton({
    children,
    className,
    scaleAmount = 0.95,
    springConfig = { stiffness: 500, damping: 25, mass: 1 },
    ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
    scaleAmount?: number
    springConfig?: {
        stiffness?: number
        damping?: number
        mass?: number
    }
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.03,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                }
            }}
            whileTap={{
                scale: scaleAmount,
                transition: {
                    type: "spring",
                    stiffness: springConfig.stiffness,
                    damping: springConfig.damping,
                    mass: springConfig.mass
                }
            }}
        >
            <Button
                className={cn(className)}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    )
}

export function AnimatedIconButton({
    children,
    className,
    scaleAmount = 0.85,
    springConfig = { stiffness: 500, damping: 20, mass: 1 },
    ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
    scaleAmount?: number
    springConfig?: {
        stiffness?: number
        damping?: number
        mass?: number
    }
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                }
            }}
            whileTap={{
                scale: scaleAmount,
                transition: {
                    type: "spring",
                    stiffness: 700,
                    damping: 15,
                    mass: 0.8,
                    velocity: 5
                }
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                mass: 1
            }}
        >
            <Button
                className={cn(className)}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    )
} 