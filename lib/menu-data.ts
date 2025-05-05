export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface MenuData {
  drinks: MenuItem[];
  breakfast: MenuItem[];
  munchies: MenuItem[];
  snacks: MenuItem[];
  chinese: MenuItem[];
  mainCourse: MenuItem[];
  dessert: MenuItem[];
  pizza: MenuItem[];
}

export const menuData: MenuData = {
  drinks: [
    {
      name: 'Oreo Shake',
      description: 'Creamy shake blended with Oreo cookies',
      price: 120,
    },
    {
      name: 'Nutella Shake',
      description: 'Rich chocolate hazelnut shake with Nutella',
      price: 150,
    },
    {
      name: 'Kitkat Shake',
      description: 'Delicious shake blended with Kitkat chocolate',
      price: 140,
    },
    {
      name: 'Lemonade',
      description: 'Refreshing lemon juice with water and sugar',
      price: 80,
    },
    {
      name: 'Lemon Soda',
      description: 'Fizzy lemon soda with a hint of mint',
      price: 90,
    },
    {
      name: 'Punch',
      description: 'Fruity punch with seasonal flavors',
      price: 100,
    },
    {
      name: 'Cold Coffee',
      description: 'Chilled coffee blended with ice cream',
      price: 110,
    },
    {
      name: 'Watermelon Juice',
      description: 'Freshly squeezed watermelon juice',
      price: 90,
    },
    {
      name: 'Orange Juice',
      description: 'Freshly squeezed orange juice',
      price: 90,
    },
    {
      name: 'Grape Juice',
      description: 'Freshly squeezed grape juice',
      price: 100,
    },
    {
      name: 'Apple Juice',
      description: 'Freshly squeezed apple juice',
      price: 100,
    },
    {
      name: 'Masala Chai',
      description: 'Traditional spiced Indian tea',
      price: 40,
    },
    {
      name: 'Hot Coffee',
      description: 'Freshly brewed hot coffee',
      price: 50,
    },
    {
      name: 'Ginger Lemon Honey',
      description: 'Soothing hot drink with ginger, lemon and honey',
      price: 60,
    },
    {
      name: 'Hot Chocolate',
      description: 'Rich and creamy hot chocolate',
      price: 80,
    },
    {
      name: 'Kesar Milk',
      description: 'Warm milk flavored with saffron',
      price: 70,
    },
    {
      name: 'Haldi Milk',
      description: 'Warm milk with turmeric and spices',
      price: 60,
    },
  ],
  breakfast: [
    {
      name: 'Aloo Pyaaz Parantha',
      description: 'Stuffed flatbread with potatoes and onions',
      price: 80,
    },
    {
      name: 'Gobhi Parantha',
      description: 'Stuffed flatbread with spiced cauliflower',
      price: 80,
    },
    {
      name: 'Paneer Parantha',
      description: 'Stuffed flatbread with cottage cheese',
      price: 100,
    },
    {
      name: 'Onion Parantha',
      description: 'Stuffed flatbread with spiced onions',
      price: 70,
    },
    {
      name: 'Masala Omelette',
      description: 'Spiced omelette with onions, tomatoes and herbs',
      price: 90,
    },
    {
      name: 'Half Fry Eggs',
      description: 'Half fried eggs served with toast',
      price: 70,
    },
    {
      name: 'Boiled Eggs',
      description: 'Boiled eggs with a sprinkle of spices',
      price: 60,
    },
    {
      name: 'Plain Omelette',
      description: 'Simple fluffy omelette',
      price: 70,
    },
    {
      name: 'Spanish Omelette',
      description: 'Omelette with potatoes, onions and bell peppers',
      price: 120,
    },
    {
      name: 'Cheese Omelette',
      description: 'Omelette filled with melted cheese',
      price: 100,
    },
    {
      name: 'Shakshouka',
      description: 'Eggs poached in spiced tomato sauce',
      price: 150,
    },
    {
      name: 'English Breakfast',
      description: 'Eggs, baked beans, toast, sausage and grilled tomatoes',
      price: 200,
    },
    {
      name: 'Chila',
      description: 'Savory lentil pancake',
      price: 80,
    },
    {
      name: 'Nutella Pancake',
      description: 'Fluffy pancakes topped with Nutella',
      price: 120,
    },
    {
      name: 'Lemon Sugar Pancake',
      description: 'Pancakes with lemon and sugar topping',
      price: 100,
    },
    {
      name: 'Plain Pancake',
      description: 'Classic fluffy pancakes with maple syrup',
      price: 90,
    },
    {
      name: 'Butter Toast',
      description: 'Toasted bread with butter',
      price: 50,
    },
    {
      name: 'Peanut Butter Nutella Toast',
      description: 'Toast with peanut butter and Nutella spread',
      price: 80,
    },
    {
      name: 'Poha',
      description: 'Flattened rice tempered with spices',
      price: 70,
    },
    {
      name: 'Smoothie',
      description: 'Fruit smoothie with yogurt and honey',
      price: 100,
    },
    {
      name: 'Cheese Tomato Toast',
      description: 'Toast with melted cheese and sliced tomatoes',
      price: 80,
    },
    {
      name: 'Aloo Pyaaz Toast',
      description: 'Toast topped with spiced potatoes and onions',
      price: 90,
    },
    {
      name: 'Aloo Poori',
      description: 'Potato curry with deep fried bread',
      price: 100,
    },
    {
      name: 'Oats',
      description: 'Healthy oats cooked with milk',
      price: 80,
    },
    {
      name: 'Muesli Bowl',
      description: 'Muesli served with milk and fruits',
      price: 120,
    },
    {
      name: 'Samose',
      description: 'Fried pastry with spiced potato filling',
      price: 30,
    },
    {
      name: 'Bread Roll',
      description: 'Bread stuffed with spiced potatoes and fried',
      price: 50,
    },
    {
      name: 'Scrambled Eggs',
      description: 'Creamy scrambled eggs served with toast',
      price: 80,
    },
    {
      name: 'Egg Bhurji',
      description: 'Indian style scrambled eggs with spices',
      price: 90,
    },
  ],
  munchies: [
    {
      name: 'Veg Pakode',
      description: 'Assorted vegetables battered and deep fried',
      price: 100,
    },
    {
      name: 'Paneer Pakode',
      description: 'Cottage cheese fritters',
      price: 120,
    },
    {
      name: 'Bread Pakode',
      description: 'Bread slices stuffed and deep fried',
      price: 80,
    },
    {
      name: 'Peanut Masala',
      description: 'Spiced peanuts with herbs and spices',
      price: 70,
    },
    {
      name: 'Veg Frozen Snacks',
      description: 'Assorted vegetarian frozen snacks',
      price: 150,
    },
    {
      name: 'Non-Veg Frozen Snacks',
      description: 'Assorted non-vegetarian frozen snacks',
      price: 200,
    },
    {
      name: 'Sweet Corn Chat',
      description: 'Sweet corn kernels mixed with spices',
      price: 90,
    },
    {
      name: 'Nacho Corn Cheese Chat',
      description: 'Nachos with corn and cheese topping',
      price: 120,
    },
  ],
  chinese: [
    {
      name: 'Chilli Potato',
      description: 'Crispy potatoes tossed in spicy sauce',
      price: 140,
    },
    {
      name: 'Chilli Paneer',
      description: 'Cottage cheese cubes in spicy sauce',
      price: 160,
    },
    {
      name: 'Honey Chilli Potato',
      description: 'Crispy potatoes in sweet and spicy sauce',
      price: 150,
    },
    {
      name: 'Veg Momos',
      description: 'Steamed dumplings with vegetable filling',
      price: 100,
    },
    {
      name: 'Non-Veg Momos',
      description: 'Steamed dumplings with meat filling',
      price: 130,
    },
    {
      name: 'Veg Spring Roll',
      description: 'Crispy rolls with vegetable filling',
      price: 120,
    },
    {
      name: 'Non-Veg Spring Roll',
      description: 'Crispy rolls with meat filling',
      price: 150,
    },
    {
      name: 'Manchurian',
      description: 'Fried vegetable balls in tangy sauce',
      price: 130,
    },
    {
      name: 'Chilli Chicken',
      description: 'Crispy chicken in spicy sauce',
      price: 180,
    },
    {
      name: 'Veg Fried Rice',
      description: 'Rice stir-fried with mixed vegetables',
      price: 120,
    },
    {
      name: 'Schezwan Fried Rice',
      description: 'Rice stir-fried with spicy Schezwan sauce',
      price: 130,
    },
    {
      name: 'Chilli Garlic Fried Rice',
      description: 'Rice stir-fried with chilli and garlic',
      price: 130,
    },
    {
      name: 'Chicken Fried Rice',
      description: 'Rice stir-fried with chicken pieces',
      price: 150,
    },
    {
      name: 'Egg Fried Rice',
      description: 'Rice stir-fried with scrambled eggs',
      price: 130,
    },
    {
      name: 'Veg Noodles',
      description: 'Noodles stir-fried with mixed vegetables',
      price: 120,
    },
    {
      name: 'Schezwan Noodles',
      description: 'Noodles stir-fried with spicy Schezwan sauce',
      price: 130,
    },
    {
      name: 'Chilli Garlic Noodles',
      description: 'Noodles stir-fried with chilli and garlic',
      price: 130,
    },
    {
      name: 'Chicken Noodles',
      description: 'Noodles stir-fried with chicken pieces',
      price: 150,
    },
    {
      name: 'Egg Noodles',
      description: 'Noodles stir-fried with scrambled eggs',
      price: 130,
    },
  ],
  snacks: [
    {
      name: 'Fries',
      description: 'Classic crispy french fries',
      price: 100,
    },
    {
      name: 'Peri Peri Fries',
      description: 'Fries tossed in peri peri spice',
      price: 120,
    },
    {
      name: 'Chilli Cheese Toast',
      description: 'Toast topped with chilli and melted cheese',
      price: 90,
    },
    {
      name: 'Cheese Garlic Fries',
      description: 'Fries topped with cheese and garlic',
      price: 130,
    },
    {
      name: 'Veg Cheese Sandwich',
      description: 'Sandwich with mixed vegetables and cheese',
      price: 120,
    },
    {
      name: 'Mushroom Olive Sandwich',
      description: 'Sandwich with sautéed mushrooms and olives',
      price: 140,
    },
    {
      name: 'Chicken Sandwich',
      description: 'Sandwich with spiced chicken filling',
      price: 150,
    },
    {
      name: 'Chicken Frozen Items Sandwich',
      description: 'Sandwich with frozen chicken snacks',
      price: 160,
    },
    {
      name: 'Veg Wrap',
      description: 'Tortilla wrap with mixed vegetables',
      price: 130,
    },
    {
      name: 'Paneer Wrap',
      description: 'Tortilla wrap with spiced cottage cheese',
      price: 150,
    },
    {
      name: 'Chicken Wrap',
      description: 'Tortilla wrap with spiced chicken',
      price: 170,
    },
    {
      name: 'Veg Burger',
      description: 'Burger with vegetable patty',
      price: 120,
    },
    {
      name: 'Chicken Burger',
      description: 'Burger with chicken patty',
      price: 150,
    },
    {
      name: 'Paneer Burger',
      description: 'Burger with cottage cheese patty',
      price: 140,
    },
    {
      name: 'Garlic Bread',
      description: 'Bread topped with garlic butter',
      price: 100,
    },
    {
      name: 'Crispy Chicken',
      description: 'Crunchy fried chicken pieces',
      price: 180,
    },
    {
      name: 'Veg Kurkure Kabab',
      description: 'Vegetable patties coated with crushed Kurkure',
      price: 140,
    },
    {
      name: 'Cheese Balls',
      description: 'Deep-fried cheese-filled balls',
      price: 130,
    },
    {
      name: 'Paneer Fingers',
      description: 'Batter-fried cottage cheese strips',
      price: 150,
    },
    {
      name: 'Kurkure Mushroom',
      description: 'Mushrooms coated with crushed Kurkure',
      price: 150,
    },
    {
      name: 'Siddu',
      description: 'Traditional Himachali steamed bun with filling',
      price: 120,
    },
    {
      name: 'Pasta',
      description: 'Pasta in creamy sauce with vegetables',
      price: 150,
    },
    {
      name: 'Macroni',
      description: 'Macaroni in tomato sauce with vegetables',
      price: 140,
    },
    {
      name: 'Brushchetta/Toasties',
      description: 'Toasted bread with tomato, basil and olive oil',
      price: 120,
    },
  ],
  pizza: [
    {
      name: 'Veg Pizza',
      description: 'Pizza with assorted vegetables and cheese',
      price: 200,
    },
    {
      name: 'Non-Veg Pizza',
      description: 'Pizza with chicken and cheese',
      price: 250,
    },
  ],
  mainCourse: [
    {
      name: 'Plain Rice',
      description: 'Steamed white rice',
      price: 80,
    },
    {
      name: 'Plain Roti',
      description: 'Traditional Indian flatbread',
      price: 15,
    },
    {
      name: 'Butter Roti',
      description: 'Flatbread topped with butter',
      price: 20,
    },
    {
      name: 'Plain Parantha',
      description: 'Layered flatbread',
      price: 30,
    },
    {
      name: 'Kadhi',
      description: 'Yogurt-based curry with pakoras',
      price: 120,
    },
    {
      name: 'Dal Makhni',
      description: 'Black lentils cooked with butter and cream',
      price: 150,
    },
    {
      name: 'Dal Tadka',
      description: 'Yellow lentils tempered with spices',
      price: 130,
    },
    {
      name: 'Mushroom Masala',
      description: 'Mushrooms cooked in spicy gravy',
      price: 160,
    },
    {
      name: 'Shahi Paneer',
      description: 'Cottage cheese in rich creamy gravy',
      price: 170,
    },
    {
      name: 'Paneer Lababdar',
      description: 'Cottage cheese in tomato-based gravy',
      price: 170,
    },
    {
      name: 'Kadhai Paneer',
      description: 'Cottage cheese cooked with bell peppers',
      price: 170,
    },
    {
      name: 'Malai Kofta',
      description: 'Cottage cheese dumplings in creamy gravy',
      price: 180,
    },
    {
      name: 'Rajma Masala',
      description: 'Kidney beans curry',
      price: 140,
    },
    {
      name: 'Bhindi Masala',
      description: 'Okra cooked with spices',
      price: 140,
    },
    {
      name: 'Aloo Jeera',
      description: 'Potatoes tempered with cumin',
      price: 120,
    },
    {
      name: 'Paneer Bhurji',
      description: 'Scrambled cottage cheese with spices',
      price: 160,
    },
    {
      name: 'Kadhai Chicken',
      description: 'Chicken cooked with bell peppers',
      price: 200,
    },
    {
      name: 'Pahadi Chicken',
      description: 'Chicken in mountain-style spices',
      price: 210,
    },
    {
      name: 'Chicken Curry',
      description: 'Traditional chicken curry',
      price: 190,
    },
    {
      name: 'Egg Curry',
      description: 'Boiled eggs in spicy gravy',
      price: 150,
    },
    {
      name: 'Butter Chicken',
      description: 'Chicken in rich tomato and butter gravy',
      price: 220,
    },
  ],
  dessert: [
    {
      name: 'Shaahi Tukda',
      description: 'Fried bread soaked in sweetened milk',
      price: 100,
    },
    {
      name: 'Gulab Jamun',
      description: 'Deep-fried milk solids soaked in sugar syrup',
      price: 80,
    },
    {
      name: 'Suji Ka Halwa',
      description: 'Semolina pudding with nuts',
      price: 80,
    },
    {
      name: 'Kheer',
      description: 'Rice pudding with nuts and cardamom',
      price: 90,
    },
  ],
};
