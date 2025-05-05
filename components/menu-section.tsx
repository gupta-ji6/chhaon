"use client"

import { useState, useEffect, useMemo } from "react"
import type { MenuItem, SubCategory, MenuCategory } from "@/lib/menu-data"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { useCart } from "@/lib/cart-context"
import { Heart, MinusCircle, ChefHat, Flame, Leaf, Egg, Drumstick } from "lucide-react"
import { MenuFilter, FilterOption } from "@/components/menu-filter"
import { extractUniqueFilters, filterItems, filterSubcategories } from "@/lib/filter-utils"

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

  // Calculate discount percentage if originalPrice exists
  const discountPercentage = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

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
          {/* Dietary icons - before the dish name */}
          {item.labels && (
            <div className="flex gap-1">
              {item.labels.includes("Non-Vegetarian") && (
                <div className="inline-flex items-center rounded-full w-5 h-5 justify-center bg-red-700">
                  <Drumstick className="w-3 h-3 text-white" />
                </div>
              )}
              {item.labels.includes("Eggetarian") && (
                <div className="inline-flex items-center rounded-full w-5 h-5 justify-center bg-amber-600">
                  <Egg className="w-3 h-3 text-white" />
                </div>
              )}
              {item.labels.includes("Vegan") && (
                <div className="inline-flex items-center rounded-full w-5 h-5 justify-center bg-teal-600">
                  <Leaf className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          )}

          <h3 className="font-display text-xl text-stone-800 dark:text-stone-100 font-medium">{item.name}</h3>

          {/* Special labels - after the dish name */}
          {(item.labels && item.labels.length > 0) || item.originalPrice ? (
            <div className="flex flex-wrap gap-2 ml-1">
              {item.labels?.includes("Chef's Recommended") && (
                <div className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-amber-900 text-amber-50 shimmer-badge">
                  <ChefHat className="w-3 h-3 mr-1" />
                  Chef's Pick
                </div>
              )}
              {/* Show discount badge if item has originalPrice */}
              {item.originalPrice && (
                <div className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-green-800 text-green-50 shimmer-badge">
                  <MinusCircle className="w-3 h-3 mr-1" />
                  {discountPercentage}% Off
                </div>
              )}
              {/* Template for future label types */}
              {item.labels?.includes("Spicy") && (
                <div className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-red-800 text-red-50 shimmer-badge">
                  <Flame className="w-3 h-3 mr-1" />
                  Spicy
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-end">
          {item.originalPrice ? (
            <>
              <span className="font-body text-sm text-stone-500 dark:text-stone-400 line-through">₹{item.originalPrice}</span>
              <span className="font-body text-lg text-stone-800 dark:text-stone-200 font-semibold">₹{item.price}</span>
            </>
          ) : (
            <span className="font-body text-lg text-stone-800 dark:text-stone-200 font-semibold">₹{item.price}</span>
          )}
        </div>
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
  globalFilters?: string[]
}

export function MenuSection({ title, category, globalFilters = [] }: MenuSectionProps) {
  const [localFilters, setLocalFilters] = useState<string[]>([])

  // Combine global and local filters
  const selectedFilters = useMemo(() => {
    return [...new Set([...globalFilters, ...localFilters])]
  }, [globalFilters, localFilters])

  // Get all available filters for this category
  const availableFilters = useMemo(() => {
    if (Array.isArray(category)) {
      // Extract filters from array of items
      const itemLabels = new Map<string, number>()

      // Count occurrences of each label and discounted items
      category.forEach(item => {
        // Count labels
        if (item.labels && item.labels.length > 0) {
          item.labels.forEach(label => {
            itemLabels.set(label, (itemLabels.get(label) || 0) + 1)
          })
        }

        // Count discounted items
        if (item.originalPrice) {
          itemLabels.set("Discount", (itemLabels.get("Discount") || 0) + 1)
        }
      })

      // Convert to filter options
      return Array.from(itemLabels.entries()).map(([value, count]) => ({
        label: value === "Chef's Recommended" ? "Chef's Pick" :
          value === "Discount" ? "On Discount" : value,
        value,
        count
      })).sort((a, b) => b.count - a.count)
    }

    // Extract filters from category with subcategories
    if ('subcategories' in category || 'items' in category) {
      // Create a temporary category array with just this category
      const tempCategories = [category]
      return extractUniqueFilters(tempCategories)
    }

    return []
  }, [category])

  // Animation variants
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

  // Filter handler - only updates local filters
  const handleFilterChange = (filters: string[]) => {
    setLocalFilters(filters)
  }

  const renderTitle = () => (
    <motion.div
      className="mb-4"
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

  // Render category filters with new styling
  const renderCategoryFilters = () => {
    if (availableFilters.length === 0) return null;

    // Group dietary filters separately
    const dietaryFilters = availableFilters.filter(filter =>
      ["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian"].includes(filter.value)
    );

    const otherFilters = availableFilters.filter(filter =>
      !["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian"].includes(filter.value)
    );

    return (
      <div className="mb-6 p-3 bg-stone-50/80 dark:bg-stone-800/30 rounded-lg border border-stone-200 dark:border-stone-700/50">
        {/* Render dietary filters first if available */}
        {dietaryFilters.length > 0 && (
          <div className="mb-3 border-b border-stone-200 dark:border-stone-700 pb-3">
            <div className="text-sm font-medium text-stone-600 dark:text-stone-300 mb-2">
              Dietary preferences:
            </div>
            <MenuFilter
              filters={dietaryFilters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              className="max-w-full"
              isGlobal={false}
              globalFilters={globalFilters}
            />
          </div>
        )}

        {/* Other filters */}
        {otherFilters.length > 0 && (
          <MenuFilter
            filters={otherFilters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            className="max-w-full"
            isGlobal={false}
            globalFilters={globalFilters}
          />
        )}
      </div>
    );
  };

  // If category has items directly (old structure or category without subcategories)
  if (Array.isArray(category)) {
    const filteredItems = filterItems(category, selectedFilters)

    return (
      <div className="mb-12">
        {renderTitle()}
        {renderCategoryFilters()}

        {filteredItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-5 bg-stone-50 dark:bg-stone-800/50 rounded-lg"
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedFilters.join(',')} // Key to force re-render on filter change
          >
            {filteredItems.map((item: MenuItem, index: number) => (
              <MenuItemCard key={`${item.name}-${index}`} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
            <p className="text-stone-500 dark:text-stone-400">No items match the selected filters</p>
          </div>
        )}
      </div>
    );
  }

  // New structure with items directly in category
  if (category.items) {
    const filteredItems = filterItems(category.items, selectedFilters)

    return (
      <div className="mb-12">
        {renderTitle()}
        {renderCategoryFilters()}

        {filteredItems.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-5 bg-stone-50 dark:bg-stone-800/50 rounded-lg"
            variants={container}
            initial="hidden"
            animate="show"
            key={selectedFilters.join(',')} // Key to force re-render on filter change
          >
            {filteredItems.map((item: MenuItem, index: number) => (
              <MenuItemCard key={`${item.name}-${index}`} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
            <p className="text-stone-500 dark:text-stone-400">No items match the selected filters</p>
          </div>
        )}
      </div>
    );
  }

  // New structure with subcategories
  if (category.subcategories) {
    const filteredSubcategories = filterSubcategories(category.subcategories, selectedFilters)

    return (
      <div className="mb-12">
        {renderTitle()}
        {renderCategoryFilters()}

        {filteredSubcategories.length > 0 ? (
          <>
            {filteredSubcategories.map((subcategory: SubCategory, index: number) => (
              <SubCategorySection key={`${subcategory.name}-${index}`} subcategory={subcategory} />
            ))}
          </>
        ) : (
          <div className="text-center py-8 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
            <p className="text-stone-500 dark:text-stone-400">No items match the selected filters</p>
          </div>
        )}
      </div>
    );
  }

  return null;
}
