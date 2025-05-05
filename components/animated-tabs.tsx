"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import * as TabsPrimitive from "@radix-ui/react-tabs"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
        activeTabClassName?: string;
    }
>(({ className, children, activeTabClassName, ...props }, ref) => {
    // Store active tab index for animating the background
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);
    // Store tab refs to measure widths and positions
    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    // Reset refs on children change
    React.useEffect(() => {
        tabRefs.current = tabRefs.current.slice(0, React.Children.count(children));
    }, [children]);

    const updateActiveTabIndex = (index: number) => {
        setActiveTabIndex(index);
    };

    // Calculate background position and width
    const getBackgroundStyles = () => {
        const currentTab = tabRefs.current[activeTabIndex];
        if (!currentTab) return { width: 0, x: 0 };

        const rect = currentTab.getBoundingClientRect();
        const parentRect = currentTab.parentElement?.getBoundingClientRect();

        // Get position relative to the parent container
        const x = rect.left - (parentRect?.left || 0);

        return {
            width: rect.width,
            x: x
        };
    };

    const { width, x } = getBackgroundStyles();

    // Process children to add refs and click handlers
    const processedChildren = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child as React.ReactElement<any>, {
            ref: (el: HTMLButtonElement) => {
                tabRefs.current[index] = el;
            },
            onClick: () => {
                updateActiveTabIndex(index);
                const originalOnClick = (child as any).props.onClick;
                if (originalOnClick) originalOnClick();
            }
        });
    });

    return (
        <TabsPrimitive.List
            ref={ref}
            className={cn(
                "relative inline-flex h-auto items-center justify-center rounded-md bg-stone-100 dark:bg-stone-800 p-1 text-muted-foreground",
                className
            )}
            {...props}
        >
            {/* Animated Background Pill */}
            {width > 0 && (
                <motion.div
                    className={cn(
                        "absolute z-0 rounded-sm bg-white dark:bg-stone-700",
                        activeTabClassName
                    )}
                    initial={false}
                    animate={{
                        width: width,
                        x: x,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 1
                    }}
                    style={{ height: "calc(100% - 8px)" }}
                />
            )}
            {processedChildren}
        </TabsPrimitive.List>
    );
});

TabsList.displayName = "AnimatedTabsList";

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
            className
        )}
        {...props}
    />
));

TabsTrigger.displayName = "AnimatedTabsTrigger";

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent }; 