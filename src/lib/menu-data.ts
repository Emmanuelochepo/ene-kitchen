export type DishCategory = "Rice & Grains" | "Soups & Swallow" | "Proteins & Grills" | "Sides" | "Vegan";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  category: DishCategory;
  image: string;
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
  { id: "jollof-rice-special", name: "Jollof Rice Special", description: "Smoky party-style jollof with grilled chicken and fried plantain.", price: 8500, priceFormatted: "₦8,500", category: "Rice & Grains", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80", badge: { label: "Popular", variant: "gold" } },
  { id: "ofada-rice", name: "Ofada Rice & Ayamase", description: "Local rice served with spicy green pepper sauce and assorted meat.", price: 9000, priceFormatted: "₦9,000", category: "Rice & Grains", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80", badge: { label: "Chef's Special", variant: "gold" } },
  { id: "fried-rice", name: "Native Fried Rice", description: "Fried rice loaded with liver, prawns, and mixed vegetables.", price: 8000, priceFormatted: "₦8,000", category: "Rice & Grains", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80" },
  { id: "pepper-soup", name: "Goat Meat Pepper Soup", description: "Goat meat simmered in a peppery, aromatic broth.", price: 6000, priceFormatted: "₦6,000", category: "Soups & Swallow", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80", badge: { label: "Hot", variant: "spice" } },
  { id: "egusi-soup", name: "Egusi Soup & Pounded Yam", description: "Ground melon seed soup with assorted meat and spinach.", price: 7500, priceFormatted: "₦7,500", category: "Soups & Swallow", image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?w=800&q=80" },
  { id: "afang-soup", name: "Afang Soup & Fufu", description: "Rich vegetable soup with waterleaf, stockfish, and periwinkle.", price: 8000, priceFormatted: "₦8,000", category: "Soups & Swallow", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80" },
  { id: "suya-platter", name: "Beef Suya Platter", description: "Charcoal-grilled beef skewers coated in spiced suya pepper.", price: 7000, priceFormatted: "₦7,000", category: "Proteins & Grills", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", badge: { label: "Hot", variant: "spice" } },
  { id: "grilled-chicken", name: "Whole Grilled Chicken", description: "Marinated and chargrilled, served with pepper sauce on the side.", price: 9500, priceFormatted: "₦9,500", category: "Proteins & Grills", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=800&q=80" },
  { id: "asun", name: "Asun (Spicy Goat Meat)", description: "Smoked and peppered goat meat, a small-chops favourite.", price: 6500, priceFormatted: "₦6,500", category: "Proteins & Grills", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", badge: { label: "Popular", variant: "gold" } },
  { id: "fried-plantain", name: "Fried Plantain (Dodo)", description: "Sweet ripe plantain, fried golden and lightly caramelized.", price: 2000, priceFormatted: "₦2,000", category: "Sides", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80" },
  { id: "moimoi", name: "Moi Moi", description: "Steamed bean pudding with egg, made the traditional way.", price: 2500, priceFormatted: "₦2,500", category: "Sides", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80" },
  { id: "efo-riro", name: "Vegetable Efo Riro", description: "Slow-cooked spinach stew with assorted vegetables and palm oil.", price: 7000, priceFormatted: "₦7,000", category: "Vegan", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", badge: { label: "Vegan", variant: "forest" } },
  { id: "vegan-jollof", name: "Vegan Jollof Rice", description: "Classic smoky jollof, prepared fully plant-based with vegetable stock.", price: 6500, priceFormatted: "₦6,500", category: "Vegan", image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?w=800&q=80", badge: { label: "Vegan", variant: "forest" } },
];
