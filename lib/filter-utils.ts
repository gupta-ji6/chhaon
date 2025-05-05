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

  // Make sure we're counting dietary labels
  // even if they're not frequent enough to show up in the main filters
  if (item.labels) {
    if (item.labels.includes('Vegetarian')) {
      const currentCount = filterCounts.get('Vegetarian') || 0;
      filterCounts.set('Vegetarian', currentCount + 1);
    }
    if (item.labels.includes('Vegan')) {
      const currentCount = filterCounts.get('Vegan') || 0;
      filterCounts.set('Vegan', currentCount + 1);
    }
    if (item.labels.includes('Non-Vegetarian')) {
      const currentCount = filterCounts.get('Non-Vegetarian') || 0;
      filterCounts.set('Non-Vegetarian', currentCount + 1);
    }
    if (item.labels.includes('Eggetarian')) {
      const currentCount = filterCounts.get('Eggetarian') || 0;
      filterCounts.set('Eggetarian', currentCount + 1);
    }
  }
}

// Helper to format filter labels
function formatFilterLabel(value: string): string {
  switch (value) {
    case "Chef's Recommended":
      return "Chef's Pick";
    case 'Discount':
      return 'On Discount';
    case 'Vegetarian':
      return 'Vegetarian';
    case 'Vegan':
      return 'Vegan';
    case 'Non-Vegetarian':
      return 'Non-Vegetarian';
    case 'Eggetarian':
      return 'Eggetarian';
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

    // Check for dietary filters
    const hasDietaryFilter = selectedFilters.some((filter) =>
      ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Eggetarian'].includes(filter)
    );

    const matchesDietaryFilter =
      !hasDietaryFilter ||
      (item.labels
        ? item.labels.some(
            (label) =>
              ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Eggetarian'].includes(
                label
              ) && selectedFilters.includes(label)
          )
        : false);

    // Check for other label matches
    const hasOtherFilterMatch = item.labels
      ? item.labels.some(
          (label) =>
            !['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Eggetarian'].includes(
              label
            ) && selectedFilters.includes(label)
        )
      : false;

    // Determine if an item should be shown based on all filter types
    if (hasDietaryFilter) {
      return (
        matchesDietaryFilter &&
        (isDiscounted ||
          hasOtherFilterMatch ||
          !selectedFilters.some(
            (filter) =>
              filter !== 'Vegetarian' &&
              filter !== 'Vegan' &&
              filter !== 'Non-Vegetarian' &&
              filter !== 'Eggetarian' &&
              filter !== 'Discount'
          ))
      );
    }

    // For non-dietary filters
    return isDiscounted || hasOtherFilterMatch;
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
