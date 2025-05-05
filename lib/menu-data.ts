export interface MenuItem {
  name: string
  description: string
  price: number
}

export interface MenuData {
  drinks: MenuItem[]
  breakfast: MenuItem[]
  munchies: MenuItem[]
  snacks: MenuItem[]
  chinese: MenuItem[]
  mainCourse: MenuItem[]
  dessert: MenuItem[]
  pizza: MenuItem[]
}

export const menuData: MenuData = {
  drinks: [
    {
      name: "Mountain Mist Tea",
      description: "Locally sourced Himalayan tea with hints of jasmine and mint",
      price: 120,
    },
    {
      name: "Himalayan Coffee",
      description: "Rich, aromatic coffee brewed with beans from local estates",
      price: 150,
    },
    {
      name: "Fresh Fruit Smoothie",
      description: "Seasonal mountain fruits blended with yogurt and honey",
      price: 180,
    },
    {
      name: "Valley Sunrise",
      description: "Fresh orange, carrot, and ginger juice with a hint of turmeric",
      price: 160,
    },
    {
      name: "Cedar Spiced Chai",
      description: "Traditional masala chai with cardamom, cinnamon, and cloves",
      price: 130,
    },
    {
      name: "Alpine Hot Chocolate",
      description: "Rich hot chocolate topped with whipped cream and cinnamon",
      price: 170,
    },
  ],
  breakfast: [
    {
      name: "Mountain Sunrise Platter",
      description: "Farm fresh eggs, toast, grilled tomatoes, mushrooms, and local herbs",
      price: 280,
    },
    {
      name: "Himalayan Oatmeal Bowl",
      description: "Creamy oatmeal with apple, cinnamon, walnuts, and local honey",
      price: 220,
    },
    {
      name: "Aloo Paratha",
      description: "Traditional stuffed potato flatbread served with yogurt and pickle",
      price: 180,
    },
    {
      name: "Avocado Toast",
      description: "Multigrain toast topped with avocado, cherry tomatoes, and microgreens",
      price: 250,
    },
    {
      name: "Fruit & Yogurt Parfait",
      description: "Layers of Greek yogurt, granola, and seasonal mountain berries",
      price: 200,
    },
    {
      name: "Masala Omelette",
      description: "Fluffy omelette with onions, tomatoes, green chilies, and coriander",
      price: 190,
    },
  ],
  munchies: [
    {
      name: "Himalayan Hummus Platter",
      description: "Creamy hummus with warm pita bread, olives, and vegetable sticks",
      price: 250,
    },
    {
      name: "Spiced Nuts",
      description: "Assorted nuts roasted with Himalayan herbs and spices",
      price: 180,
    },
    {
      name: "Masala Papad",
      description: "Crispy lentil wafers topped with diced tomatoes, onions, and spices",
      price: 120,
    },
    {
      name: "Cheese Platter",
      description: "Selection of local and imported cheeses with crackers and fruit",
      price: 350,
    },
    {
      name: "Chilli Cheese Toast",
      description: "Grilled bread topped with spicy cheese mix and herbs",
      price: 190,
    },
    {
      name: "Truffle Fries",
      description: "Crispy potato fries tossed in truffle oil and parmesan",
      price: 220,
    },
  ],
  snacks: [
    {
      name: "Vegetable Pakoras",
      description: "Assorted vegetables dipped in spiced chickpea batter and fried",
      price: 180,
    },
    {
      name: "Paneer Tikka",
      description: "Marinated cottage cheese cubes grilled in a tandoor",
      price: 250,
    },
    {
      name: "Chilli Chicken",
      description: "Crispy chicken tossed with bell peppers in a spicy sauce",
      price: 280,
    },
    {
      name: "Mushroom Garlic Toast",
      description: "Grilled bread topped with sautéed garlic mushrooms",
      price: 210,
    },
    {
      name: "Samosa Chaat",
      description: "Crushed samosas topped with yogurt, chutneys, and spices",
      price: 190,
    },
    {
      name: "Honey Chilli Potatoes",
      description: "Crispy potato fingers tossed in a sweet and spicy sauce",
      price: 200,
    },
  ],
  chinese: [
    {
      name: "Vegetable Hakka Noodles",
      description: "Stir-fried noodles with mixed vegetables and soy sauce",
      price: 220,
    },
    {
      name: "Chilli Garlic Fried Rice",
      description: "Aromatic rice stir-fried with garlic, chilies, and vegetables",
      price: 240,
    },
    {
      name: "Kung Pao Tofu",
      description: "Tofu and vegetables in a spicy Sichuan sauce with peanuts",
      price: 260,
    },
    {
      name: "Manchurian",
      description: "Vegetable or chicken dumplings in a tangy, spicy sauce",
      price: 270,
    },
    {
      name: "Sweet and Sour Vegetables",
      description: "Crispy vegetables tossed in a sweet and tangy sauce",
      price: 250,
    },
    {
      name: "Schezwan Chicken",
      description: "Spicy chicken stir-fry with Schezwan peppers and vegetables",
      price: 290,
    },
  ],
  mainCourse: [
    {
      name: "Pahadi Chicken Curry",
      description: "Traditional mountain-style chicken curry with local spices",
      price: 320,
    },
    {
      name: "Dal Makhani",
      description: "Slow-cooked black lentils with butter and cream",
      price: 250,
    },
    {
      name: "Paneer Butter Masala",
      description: "Cottage cheese cubes in a rich tomato and butter gravy",
      price: 280,
    },
    {
      name: "Vegetable Biryani",
      description: "Fragrant rice cooked with mixed vegetables and aromatic spices",
      price: 270,
    },
    {
      name: "Rogan Josh",
      description: "Aromatic lamb curry cooked with Kashmiri spices",
      price: 350,
    },
    {
      name: "Palak Paneer",
      description: "Cottage cheese cubes in a creamy spinach gravy",
      price: 270,
    },
  ],
  dessert: [
    {
      name: "Apple Cinnamon Crumble",
      description: "Warm local apple crumble served with vanilla ice cream",
      price: 220,
    },
    {
      name: "Gulab Jamun",
      description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
      price: 180,
    },
    {
      name: "Chocolate Walnut Brownie",
      description: "Rich chocolate brownie with walnuts, served warm with ice cream",
      price: 240,
    },
    {
      name: "Kheer",
      description: "Traditional rice pudding flavored with cardamom and saffron",
      price: 190,
    },
    {
      name: "Fresh Fruit Platter",
      description: "Selection of seasonal mountain fruits",
      price: 210,
    },
    {
      name: "Honey Ginger Cheesecake",
      description: "Creamy cheesecake with local honey and a hint of ginger",
      price: 250,
    },
  ],
  pizza: [
    {
      name: "Margherita",
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
      price: 280,
    },
    {
      name: "Vegetable Supreme",
      description: "Loaded with bell peppers, onions, mushrooms, olives, and corn",
      price: 320,
    },
    {
      name: "Paneer Tikka",
      description: "Tandoori spiced cottage cheese with onions and bell peppers",
      price: 340,
    },
    {
      name: "Chicken Tikka",
      description: "Tandoori chicken with onions on a spiced tomato base",
      price: 360,
    },
    {
      name: "Mountain Special",
      description: "Our signature pizza with local herbs, mushrooms, and cheese",
      price: 380,
    },
    {
      name: "Pesto Garden",
      description: "Basil pesto base with zucchini, cherry tomatoes, and feta cheese",
      price: 350,
    },
  ],
}
