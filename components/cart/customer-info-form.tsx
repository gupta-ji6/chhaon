"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { motion } from "framer-motion"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  tableNumber: z.string().optional(),
  specialInstructions: z.string().optional(),
})

type CustomerInfoFormProps = {
  onSubmit: () => void
  onBack?: () => void
}

export function CustomerInfoForm({ onSubmit, onBack }: CustomerInfoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      tableNumber: "",
      specialInstructions: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values)
    onSubmit()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tableNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table Number (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your table number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instructions (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or dietary requirements"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <div style={{ display: "block" }}>
              <AnimatedButton
                type="submit"
                className="w-full"
                size="lg"
                scaleAmount={0.97}
                springConfig={{ stiffness: 400, damping: 20 }}
              >
                Place Order
              </AnimatedButton>
            </div>

            {onBack && (
              <div style={{ display: "block" }}>
                <AnimatedButton
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={onBack}
                  scaleAmount={0.97}
                  springConfig={{ stiffness: 400, damping: 20 }}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Order
                </AnimatedButton>
              </div>
            )}
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
