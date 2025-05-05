"use client"

import type { MenuItem, SubCategory, MenuCategory } from "@/lib/menu-data"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { useCart } from "@/lib/cart-context"

interface MenuItemProps {
  item: MenuItem
}

function MenuItemCard({ item }: MenuItemProps) {
  const { items: cartItems } = useCart()

  // Animation variants for each item
  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1
      }
    }
  }

  // Pulse animation variants
  const pulseVariant: Variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  // Check if item is in cart
  const isInCart = cartItems.some(cartItem => cartItem.name === item.name)
  const quantity = cartItems.find(cartItem => cartItem.name === item.name)?.quantity || 0;

  return (
    <motion.div
      className={`flex flex-col relative overflow-hidden p-4 rounded-lg mb-2 ${isInCart
        ? 'border-none bg-white/50 dark:bg-stone-700/50 shadow-sm'
        : 'border-b border-stone-200 dark:border-stone-700 hover:bg-white dark:hover:bg-stone-700/50 transition-colors duration-200'
        }`}
      variants={itemVariant}
    >
      {/* Highlight background for items in cart */}
      <AnimatePresence>
        {isInCart && (
          <motion.div
            key="highlight"
            className="absolute inset-0 rounded-lg z-0 border border-transparent shadow-sm"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pulseVariant}
            style={{
              backgroundColor: 'hsl(var(--primary) / 0.05)',
              borderColor: 'hsl(var(--primary) / 0.2)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          />
        )}
      </AnimatePresence>
      <div className="flex justify-between items-baseline mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-xl text-stone-800 dark:text-stone-100 font-medium">{item.name}</h3>
          {item.labels && item.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.labels.includes("Chef's Recommended") && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path d="M10 1a6 6 0 00-6 6v.5c0 1.316.244 2.603.706 3.804l.098.196c.199.38.431.743.696 1.084l.045.06c.18.23.379.447.593.65l6.208 6.2a1.25 1.25 0 001.768 0l6.208-6.2c.214-.203.413-.42.593-.65l.045-.06c.265-.341.497-.704.696-1.084l.098-.196A11.342 11.342 0 0022 7.5V7a6 6 0 00-6-6h-6z" />
                  </svg>
                  Chef's Pick
                </Badge>
              )}
              {/* Template for future label types */}
              {item.labels.includes("Spicy") && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  Spicy
                </Badge>
              )}
              {item.labels.includes("Vegan") && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Vegan
                </Badge>
              )}
            </div>
          )}
        </div>
        <span className="font-body text-lg text-stone-800 dark:text-stone-200 font-semibold">₹{item.price}</span>
      </div>
      <p className="font-body text-stone-500 dark:text-stone-400 text-sm mb-4 relative z-10">{item.description}</p>
      <div className="flex justify-end mt-auto relative z-10">
        <AddToCartButton item={item} />
      </div>
    </motion.div>
  )
}

interface SubCategoryProps {
  subcategory: SubCategory
}

function SubCategorySection({ subcategory }: SubCategoryProps) {
  // Animation variants for the container
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  }

  // Animation variants for the subcategory header
  const headerVariant: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  return (
    <div className="mb-14 last:mb-8">
      <motion.div
        className="relative mb-6"
        variants={headerVariant}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-display text-2xl text-stone-800 dark:text-stone-100 inline-block">
            {subcategory.name}
          </h3>
          <div className="h-px bg-amber-500 flex-1 opacity-70"></div>
        </div>
        <div className="mt-2 mb-5 pl-2 border-l-2 border-amber-500">
          {subcategory.description && (
            <p className="text-sm text-stone-600 dark:text-stone-300 mb-1">
              {subcategory.description}
            </p>
          )}
          <p className="text-sm text-stone-500 dark:text-stone-400 italic">
            {subcategory.items.length} item{subcategory.items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-stone-50 dark:bg-stone-800/50 p-5 rounded-lg"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {subcategory.items.map((item: MenuItem, index: number) => (
          <MenuItemCard key={index} item={item} />
        ))}
      </motion.div>
    </div>
  )
}

interface MenuSectionProps {
  title: string
  category: MenuCategory | MenuItem[]
}

export function MenuSection({ title, category }: MenuSectionProps) {
  // Animation variants for the container
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  }

  // Title animation variant
  const titleVariant: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }

  const renderTitle = () => (
    <motion.div
      className="mb-8"
      variants={titleVariant}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-3xl font-display text-stone-800 dark:text-stone-100 inline-block relative">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-amber-500 rounded-full"></span>
      </h2>
    </motion.div>
  );

  // If category has items directly (old structure or category without subcategories)
  if (Array.isArray(category)) {
    return (
      <div className="mb-12">
        {renderTitle()}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-5 bg-stone-50 dark:bg-stone-800/50 rounded-lg"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {category.map((item: MenuItem, index: number) => (
            <MenuItemCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    );
  }

  // New structure with subcategories
  if (category.items) {
    return (
      <div className="mb-12">
        {renderTitle()}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-5 bg-stone-50 dark:bg-stone-800/50 rounded-lg"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {category.items.map((item: MenuItem, index: number) => (
            <MenuItemCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    );
  }

  // New structure with subcategories
  if (category.subcategories) {
    return (
      <div className="mb-12">
        {renderTitle()}
        {category.subcategories.map((subcategory: SubCategory, index: number) => (
          <SubCategorySection key={index} subcategory={subcategory} />
        ))}
      </div>
    );
  }

  return null;
}
