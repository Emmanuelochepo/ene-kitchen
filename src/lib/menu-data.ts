export type DishCategory = "Rice & Grains" | "Soups & Swallow" | "Proteins & Grills" | "Sides" | "Vegan";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: DishCategory;
  badge?: { label: string; variant?: "spice" | "gold" | "forest" };
}

export const DISH_CATEGORIES: DishCategory[] = [
  "Rice & Grains",
  "Soups & Swallow",
  "Proteins & Grills",
  "Sides",
  "Vegan",
];

export const DISHES: Dish[] = [
  {
    id: "jollof-rice-special",
    name: "Jollof Rice Special",
    description: "Smoky party-style jollof with grilled chicken and fried plantain.",
    price: "₦8,500",
    category: "Rice & Grains",
    badge: { label: "Popular", variant: "gold" },
  },
  {
    id: "ofada-rice",
    name: "Ofada Rice & Ayamase",
    description: "Local rice served with spicy green pepper sauce and assorted meat.",
    price: "₦9,000",
    category: "Rice & Grains",
    badge: { label: "Chef's Special", variant: "gold" },
  },
  {
    id: "fried-rice",
    name: "Native Fried Rice",
    description: "Fried rice loaded with liver, prawns, and mixed vegetables.",
    price: "₦8,000",
    category: "Rice & Grains",
  },
  {
    id: "pepper-soup",
    name: "Goat Meat Pepper Soup",
    description: "Goat meat simmered in a peppery, aromatic broth.",
    price: "₦6,000",
    category: "Soups & Swallow",
    badge: { label: "Hot", variant: "spice" },
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup & Pounded Yam",
    description: "Ground melon seed soup with assorted meat and spinach.",
    price: "₦7,500",
    category: "Soups & Swallow",
  },
  {
    id: "afang-soup",
    name: "Afang Soup & Fufu",
    description: "Rich vegetable soup with waterleaf, stockfish, and periwinkle.",
    price: "₦8,000",
    category: "Soups & Swallow",
  },
  {
    id: "suya-platter",
    name: "Beef Suya Platter",
    description: "Charcoal-grilled beef skewers coated in spiced suya pepper.",
    price: "₦7,000",
    category: "Proteins & Grills",
    badge: { label: "Hot", variant: "spice" },
  },
  {
    id: "grilled-chicken",
    name: "Whole Grilled Chicken",
    description: "Marinated and chargrilled, served with pepper sauce on the side.",
    price: "₦9,500",
    category: "Proteins & Grills",
  },
  {
    id: "asun",
    name: "Asun (Spicy Goat Meat)",
    description: "Smoked and peppered goat meat, a small-chops favorite.",
    price: "₦6,500",
    category: "Proteins & Grills",
    badge: { label: "Popular", variant: "gold" },
  },
  {
    id: "fried-plantain",
    name: "Fried Plantain (Dodo)",
    description: "Sweet ripe plantain, fried golden and lightly caramelized.",
    price: "₦2,000",
    category: "Sides",
  },
  {
    id: "moimoi",
    name: "Moi Moi",
    description: "Steamed bean pudding with egg, made the traditional way.",
    price: "₦2,500",
    category: "Sides",
  },
  {
    id: "efo-riro",
    name: "Vegetable Efo Riro",
    description: "Slow-cooked spinach stew with assorted vegetables and palm oil.",
    price: "₦7,000",
    category: "Vegan",
    badge: { label: "Vegan", variant: "forest" },
  },
  {
    id: "vegan-jollof",
    name: "Vegan Jollof Rice",
    description: "Classic smoky jollof, prepared fully plant-based with vegetable stock.",
    price: "₦6,500",
    category: "Vegan",
    badge: { label: "Vegan", variant: "forest" },
  },
];
