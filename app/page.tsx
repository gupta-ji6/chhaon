import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuSection } from "@/components/menu-section"
import { menuData } from "@/lib/menu-data"
import { ModeToggle } from "@/components/mode-toggle"
import { CartButton } from "@/components/cart/cart-button"
import { CartSidebar } from "@/components/cart/cart-sidebar"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-stone-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src="/images/mountain-cafe.jpg"
          alt="Chhaon Rooftop Cafe"
          fill
          priority
          className="object-cover brightness-[0.85] dark:brightness-[0.7]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-2 tracking-wide">Chhaon</h1>
          <p className="font-body text-xl md:text-2xl italic">Rooftop Cafe & Restaurant</p>
        </div>

        {/* Mode Toggle and Cart Button - Positioned in the top right corner */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <CartButton />
          <ModeToggle />
        </div>

        {/* Cart Sidebar */}
        <CartSidebar />
      </div>

      {/* Menu Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12 text-stone-800 dark:text-stone-100">
          Our Menu
        </h2>

        <Tabs defaultValue="drinks" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto mb-8 bg-stone-100 dark:bg-stone-800">
            <TabsTrigger
              value="drinks"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Drinks
            </TabsTrigger>
            <TabsTrigger
              value="breakfast"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Breakfast
            </TabsTrigger>
            <TabsTrigger
              value="munchies"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Munchies
            </TabsTrigger>
            <TabsTrigger
              value="snacks"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Snacks
            </TabsTrigger>
            <TabsTrigger
              value="chinese"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Chinese
            </TabsTrigger>
            <TabsTrigger
              value="main"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Main Course
            </TabsTrigger>
            <TabsTrigger
              value="dessert"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Dessert
            </TabsTrigger>
            <TabsTrigger
              value="pizza"
              className="font-body text-sm md:text-base data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
            >
              Pizza
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drinks">
            <MenuSection title="Drinks" items={menuData.drinks} />
          </TabsContent>

          <TabsContent value="breakfast">
            <MenuSection title="Breakfast" items={menuData.breakfast} />
          </TabsContent>

          <TabsContent value="munchies">
            <MenuSection title="Munchies" items={menuData.munchies} />
          </TabsContent>

          <TabsContent value="snacks">
            <MenuSection title="Snacks" items={menuData.snacks} />
          </TabsContent>

          <TabsContent value="chinese">
            <MenuSection title="Chinese" items={menuData.chinese} />
          </TabsContent>

          <TabsContent value="main">
            <MenuSection title="Main Course" items={menuData.mainCourse} />
          </TabsContent>

          <TabsContent value="dessert">
            <MenuSection title="Dessert" items={menuData.dessert} />
          </TabsContent>

          <TabsContent value="pizza">
            <MenuSection title="Pizza" items={menuData.pizza} />
          </TabsContent>
        </Tabs>
      </section>

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
