import { MenuCategory, MenuItem, SubCategory } from '@/lib/menu-data';
import { FilterOption } from '@/components/menu-filter';

// Extract all unique filter labels from menu items
export function extractUniqueFilters(
  categories: MenuCategory[]
): FilterOption[] {
  const filterCounts: Map<string, number> = new Map();

  // Count occurrences of each label
  categories.forEach((category) => {
    // Handle items directly in category
    if (category.items) {
      category.items.forEach((item) => {
        countItemLabels(item, filterCounts);
      });
    }

    // Handle items in subcategories
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.items.forEach((item) => {
          countItemLabels(item, filterCounts);
        });
      });
    }
  });

  // Add special filter for items with discount
  const discountedItems = findDiscountedItems(categories);
  if (discountedItems > 0) {
    filterCounts.set('Discount', discountedItems);
  }

  // Convert to array of filter options
  return Array.from(filterCounts.entries())
    .map(([value, count]) => ({
      label: formatFilterLabel(value),
      value,
      count,
    }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

// Helper to count item labels
function countItemLabels(item: MenuItem, filterCounts: Map<string, number>) {
  if (item.labels && item.labels.length > 0) {
    item.labels.forEach((label) => {
      const currentCount = filterCounts.get(label) || 0;
      filterCounts.set(label, currentCount + 1);
    });
  }
}

// Helper to format filter labels
function formatFilterLabel(value: string): string {
  switch (value) {
    case "Chef's Recommended":
      return "Chef's Pick";
    case 'Discount':
      return 'On Discount';
    default:
      return value;
  }
}

// Count items with discount
function findDiscountedItems(categories: MenuCategory[]): number {
  let count = 0;

  categories.forEach((category) => {
    // Handle items directly in category
    if (category.items) {
      category.items.forEach((item) => {
        if (item.originalPrice) count++;
      });
    }

    // Handle items in subcategories
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.items.forEach((item) => {
          if (item.originalPrice) count++;
        });
      });
    }
  });

  return count;
}

// Filter items based on selected filters
export function filterItems(
  items: MenuItem[],
  selectedFilters: string[]
): MenuItem[] {
  if (selectedFilters.length === 0) return items;

  return items.filter((item) => {
    // Check for discounted items
    const isDiscounted = selectedFilters.includes('Discount')
      ? item.originalPrice !== undefined
      : false;

    // Check for label matches
    const hasMatchingLabel = item.labels
      ? item.labels.some((label) => selectedFilters.includes(label))
      : false;

    return isDiscounted || hasMatchingLabel;
  });
}

// Filter subcategories based on selected filters
export function filterSubcategories(
  subcategories: SubCategory[],
  selectedFilters: string[]
): SubCategory[] {
  if (selectedFilters.length === 0) return subcategories;

  return subcategories
    .map((subcategory) => {
      const filteredItems = filterItems(subcategory.items, selectedFilters);
      return {
        ...subcategory,
        items: filteredItems,
      };
    })
    .filter((subcategory) => subcategory.items.length > 0);
}
