'use client'

import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import { menuData, MenuCategory } from "@/lib/menu-data"
import { MenuSection } from "@/components/menu-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { CartSidebar } from "@/components/cart/cart-sidebar"
import { FloatingCartButton } from "@/components/cart/floating-cart-button"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { MenuFilter, FilterOption } from "@/components/menu-filter"
import { extractUniqueFilters } from "@/lib/filter-utils"
import { Leaf, Egg, Drumstick, UtensilsCrossed } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [selectedGlobalFilters, setSelectedGlobalFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("drinks")
  const [forceRefresh, setForceRefresh] = useState(0)

  // Force refresh of filter data when component mounts
  useEffect(() => {
    setForceRefresh(prev => prev + 1)
  }, [])

  // Get all available filters across all categories
  const globalFilters = useMemo(() => {
    return extractUniqueFilters(menuData.categories)
  }, [forceRefresh])

  // Separate dietary filters from other global filters
  const dietaryFilters = useMemo(() => {
    const dietaryOptions: FilterOption[] = [
      {
        label: "Vegetarian",
        value: "Vegetarian",
        count: globalFilters.find(f => f.value === "Vegetarian")?.count || 0
      },
      {
        label: "Vegan",
        value: "Vegan",
        count: globalFilters.find(f => f.value === "Vegan")?.count || 0
      },
      {
        label: "Non-Vegetarian",
        value: "Non-Vegetarian",
        count: globalFilters.find(f => f.value === "Non-Vegetarian")?.count || 0
      },
      {
        label: "Eggetarian",
        value: "Eggetarian",
        count: globalFilters.find(f => f.value === "Eggetarian")?.count || 0
      }
    ].filter(option => option.count > 0);

    return dietaryOptions;
  }, [globalFilters]);

  // Other filters excluding dietary filters
  const otherGlobalFilters = useMemo(() => {
    return globalFilters.filter(filter =>
      !["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian"].includes(filter.value)
    );
  }, [globalFilters]);

  // Handle dietary preference change
  const handleDietaryChange = (value: string) => {
    // Remove any existing dietary filters
    const nonDietaryFilters = selectedGlobalFilters.filter(
      filter => !["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian", "all"].includes(filter)
    );

    // If value is "all", just use the non-dietary filters
    if (value === "all") {
      setSelectedGlobalFilters(nonDietaryFilters);
    } else {
      // Otherwise add the selected dietary filter
      setSelectedGlobalFilters([...nonDietaryFilters, value]);
    }
  };

  // Get the current dietary preference
  const currentDietaryPreference = useMemo(() => {
    const dietary = selectedGlobalFilters.find(filter =>
      ["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian"].includes(filter)
    );
    return dietary || "all";
  }, [selectedGlobalFilters]);

  // Animation variants for tabs content
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  // Find categories from the new data structure
  const findCategory = (name: string): MenuCategory => {
    const category = menuData.categories.find((cat: MenuCategory) =>
      cat.name.toLowerCase() === name.toLowerCase()
    );

    // Return an empty category if not found to prevent TypeScript errors
    if (!category) {
      return {
        name: name,
        items: []
      };
    }

    return category;
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <main className="min-h-screen bg-white dark:bg-stone-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        {/* <Image
          src="/images/mountain-cafe.jpg"
          alt="Chhaon Rooftop Cafe"
          fill
          priority
          className="object-cover brightness-[0.85] dark:brightness-[0.7]"
        /> */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-2 tracking-wide">Chhaon</h1>
          <p className="font-body text-xl md:text-2xl italic">Rooftop Cafe & Restaurant</p>
        </div>

        {/* Mode Toggle - Positioned in the top right corner */}
        <div className="absolute top-4 right-4 z-10">
          <ModeToggle />
        </div>

        {/* Cart Sidebar */}
        <CartSidebar />
      </div>

      {/* Menu Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-8 text-stone-800 dark:text-stone-100">
          Our Menu
        </h2>

        {/* Global Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Dietary Preferences Select Menu */}
          {dietaryFilters.length > 0 && (
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-900/20">
              <div className="flex flex-col space-y-3">
                <div className="font-medium text-stone-700 dark:text-stone-300">
                  Dietary Preference
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Select value={currentDietaryPreference} onValueChange={handleDietaryChange}>
                      <SelectTrigger className="w-full border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800">
                        <SelectValue placeholder="All dietary types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <span className="flex items-center gap-2">
                            <UtensilsCrossed className="w-3.5 h-3.5 text-stone-500" />
                            All dietary types
                          </span>
                        </SelectItem>
                        {dietaryFilters.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center gap-2">
                              {option.value === "Vegetarian" && (
                                <Leaf className="w-3.5 h-3.5 text-green-700" />
                              )}
                              {option.value === "Vegan" && (
                                <Leaf className="w-3.5 h-3.5 text-teal-600" />
                              )}
                              {option.value === "Eggetarian" && (
                                <Egg className="w-3.5 h-3.5 text-amber-600" />
                              )}
                              {option.value === "Non-Vegetarian" && (
                                <Drumstick className="w-3.5 h-3.5 text-red-700" />
                              )}
                              {option.label} ({option.count})
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <div className="flex flex-wrap gap-3 text-xs text-stone-500 dark:text-stone-400">
                      <div className="flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-green-700" />
                        <span>Veg</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-teal-600" />
                        <span>Vegan</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Egg className="w-3 h-3 text-amber-600" />
                        <span>Egg</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Drumstick className="w-3 h-3 text-red-700" />
                        <span>Non-veg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Global Filters */}
          {otherGlobalFilters.length > 0 && (
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-900/20">
              <MenuFilter
                filters={otherGlobalFilters}
                selectedFilters={selectedGlobalFilters}
                onFilterChange={setSelectedGlobalFilters}
                className="max-w-full"
                isGlobal={true}
              />
            </div>
          )}
        </div>

        <Tabs
          defaultValue="drinks"
          className="w-full"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto mb-8 bg-stone-100 dark:bg-stone-800">
            <TabsTrigger
              value="drinks"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Drinks
            </TabsTrigger>
            <TabsTrigger
              value="breakfast"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Breakfast
            </TabsTrigger>
            <TabsTrigger
              value="munchies"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Munchies
            </TabsTrigger>
            <TabsTrigger
              value="snacks"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Snacks
            </TabsTrigger>
            <TabsTrigger
              value="chinese"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Chinese
            </TabsTrigger>
            <TabsTrigger
              value="main"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Main Course
            </TabsTrigger>
            <TabsTrigger
              value="dessert"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Dessert
            </TabsTrigger>
            <TabsTrigger
              value="pizza"
              className="font-body text-sm md:text-base text-stone-600 dark:text-stone-300 data-[state=active]:text-stone-800 dark:data-[state=active]:text-white"
            >
              Pizza
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent key="drinks" value="drinks">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Drinks"
                  category={findCategory('Drinks')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="breakfast" value="breakfast">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Breakfast"
                  category={findCategory('Breakfast')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="munchies" value="munchies">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Munchies"
                  category={findCategory('Munchies')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="snacks" value="snacks">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Snacks"
                  category={findCategory('Snacks')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="chinese" value="chinese">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Chinese"
                  category={findCategory('Chinese')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="main" value="main">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Main Course"
                  category={findCategory('Main Course')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="dessert" value="dessert">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Dessert"
                  category={findCategory('Dessert')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>

            <TabsContent key="pizza" value="pizza">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <MenuSection
                  title="Pizza"
                  category={findCategory('Pizza')}
                  globalFilters={selectedGlobalFilters}
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </section>

      {/* Floating Cart Button */}
      <FloatingCartButton />

      {/* Footer */}
      <footer className="bg-stone-100 dark:bg-stone-800 py-8 px-4 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl mb-4 text-stone-800 dark:text-stone-100">Chhaon Rooftop Cafe</h2>
          <p className="font-body text-stone-600 dark:text-stone-300 mb-2">Open daily: 7:00 AM - 10:00 PM</p>
          <p className="font-body text-stone-600 dark:text-stone-300">
            Himalayan Heights, Shimla, Himachal Pradesh, India
          </p>
          <p className="font-body text-stone-600 dark:text-stone-300 mt-4">For reservations: +91 98765 43210</p>
        </div>
      </footer>
    </main>
  )
}
