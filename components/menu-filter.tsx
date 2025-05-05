"use client"

import React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export type FilterOption = {
    label: string
    value: string
    count?: number
    color?: string
}

export interface MenuFilterProps {
    filters: FilterOption[]
    selectedFilters: string[]
    onFilterChange: (filters: string[]) => void
    className?: string
    isGlobal?: boolean
    globalFilters?: string[]
}

export function MenuFilter({
    filters,
    selectedFilters,
    onFilterChange,
    className = "",
    isGlobal = false,
    globalFilters = [],
}: MenuFilterProps) {
    // Toggle filter selection with improved handling of global vs local
    const toggleFilter = (value: string) => {
        if (!isGlobal) {
            // This is a category-level filter
            if (globalFilters.includes(value)) {
                // If the filter is active at global level
                if (selectedFilters.includes(value)) {
                    // If locally selected too, we're just removing our local selection
                    onFilterChange([...selectedFilters.filter(f => f !== value)])
                } else {
                    // If not locally selected, this means we want to specifically disable
                    // a global filter for this category
                    onFilterChange([...selectedFilters, value])
                }
            } else {
                // Normal toggle for non-global filters
                if (selectedFilters.includes(value)) {
                    onFilterChange(selectedFilters.filter(f => f !== value))
                } else {
                    onFilterChange([...selectedFilters, value])
                }
            }
        } else {
            // Global filter - simple toggle
            if (selectedFilters.includes(value)) {
                onFilterChange(selectedFilters.filter(f => f !== value))
            } else {
                onFilterChange([...selectedFilters, value])
            }
        }
    }

    // Clear all filters
    const clearFilters = () => {
        onFilterChange([])
    }

    // Get badge color based on label
    const getBadgeColor = (option: FilterOption) => {
        if (option.color) return option.color

        // Default colors based on common filter labels
        switch (option.value) {
            case "Chef's Recommended":
                return "bg-amber-900 text-amber-50 hover:bg-amber-800"
            case "Spicy":
                return "bg-red-800 text-red-50 hover:bg-red-700"
            case "Vegan":
                return "bg-green-700 text-green-50 hover:bg-green-600"
            case "Discount":
                return "bg-green-800 text-green-50 hover:bg-green-700"
            default:
                return isGlobal
                    ? "bg-indigo-700 text-indigo-50 hover:bg-indigo-600"
                    : "bg-stone-700 text-stone-50 hover:bg-stone-600"
        }
    }

    // Determine if a filter should appear selected
    // A category filter could be selected locally or globally
    const isFilterSelected = (value: string) => {
        return selectedFilters.includes(value) || (globalFilters.includes(value) && !isGlobal)
    }

    if (filters.length === 0) return null;

    return (
        <div className={`${className} mb-4`}>
            {/* Filter section title */}
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-stone-600 dark:text-stone-300">
                    {isGlobal ? "Filter menu by:" : "Filter this category by:"}
                </div>
                {selectedFilters.length > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 underline"
                    >
                        Clear {isGlobal ? "all" : ""} filters
                    </button>
                )}
            </div>

            {/* Filter pills in scrollable container */}
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-700 scrollbar-track-transparent">
                {filters.map((option) => {
                    const isSelected = isFilterSelected(option.value);
                    const isGloballySelected = !isGlobal && globalFilters.includes(option.value);

                    return (
                        <Badge
                            key={option.value}
                            variant={isSelected ? "default" : "outline"}
                            className={`whitespace-nowrap py-1.5 px-3 ${isSelected
                                ? `${getBadgeColor(option)} cursor-pointer ${isGloballySelected ? "ring-2 ring-offset-2 ring-indigo-300 dark:ring-indigo-600" : ""}`
                                : `bg-transparent cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 ${isGlobal
                                    ? "border-indigo-300 dark:border-indigo-700 text-stone-600 dark:text-stone-300"
                                    : "border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300"
                                }`
                                }`}
                            onClick={() => toggleFilter(option.value)}
                        >
                            {option.label}
                            {option.count !== undefined && ` (${option.count})`}
                            {isSelected && !isGloballySelected && (
                                <X className="w-3 h-3 ml-1.5 inline-block" />
                            )}
                            {isGloballySelected && (
                                <span className="ml-1.5 text-xs inline-block">(global)</span>
                            )}
                        </Badge>
                    );
                })}
            </div>
        </div>
    )
}