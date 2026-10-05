import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    price: 24.99,
    weight: "340g",
    roast: "Light",
    description: "A vibrant and complex coffee from the birthplace of coffee. Grown at elevations above 1,900 meters in the Yirgacheffe region, this lot features meticulous washing and sun-drying processes that yield an extraordinarily clean cup with remarkable clarity.",
    notes: ["Jasmine", "Bergamot", "Stone Fruit", "Honey"],
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
    rating: 4.9
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    price: 21.99,
    weight: "340g",
    roast: "Medium",
    description: "Sourced from small farms in the Huila region, this Supremo grade coffee delivers a perfectly balanced cup. The high-altitude growing conditions and careful processing create a coffee that's both rich and refined.",
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"],
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&h=600&fit=crop",
    rating: 4.7
  },
  {
    id: 3,
    name: "Midnight Velvet Blend",
    origin: "Brazil & Guatemala",
    category: "Blend",
    price: 19.99,
    weight: "340g",
    roast: "Dark",
    description: "Our signature dark roast blend combines the chocolatey depth of Brazilian Santos with the smoky complexity of Guatemalan Antigua. Slow-roasted to develop rich, bold flavors while maintaining a smooth, velvety finish.",
    notes: ["Dark Chocolate", "Smoky", "Brown Sugar", "Toasted Almond"],
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&h=600&fit=crop",
    rating: 4.8
  },
  {
    id: 4,
    name: "Kenyan AA Peaberry",
    origin: "Kenya",
    category: "Single Origin",
    price: 28.99,
    weight: "250g",
    roast: "Medium-Light",
    description: "An exceptional peaberry selection from Kenya's central highlands. Peaberries — single round beans found in only 5% of coffee cherries — concentrate flavor into each bean, producing an intensely bright and juicy cup.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Raw Honey"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=600&fit=crop",
    rating: 4.6
  },
  {
    id: 5,
    name: "Morning Ritual Blend",
    origin: "Multi-Origin",
    category: "Blend",
    price: 17.99,
    weight: "340g",
    roast: "Medium",
    description: "Crafted for your daily ritual, this approachable blend combines beans from three continents. It's smooth, balanced, and endlessly drinkable — the perfect companion for quiet mornings and productive afternoons.",
    notes: ["Hazelnut", "Vanilla", "Toffee", "Citrus Zest"],
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=600&fit=crop",
    rating: 4.5
  },
  {
    id: 6,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    price: 23.99,
    weight: "340g",
    roast: "Dark",
    description: "From the volcanic soils of northern Sumatra, this wet-hulled coffee delivers the full-bodied, earthy character that defines Indonesian coffees. Low acidity and heavy body make it ideal for espresso or French press.",
    notes: ["Cedar", "Dark Cocoa", "Earthy", "Tobacco"],
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=600&h=600&fit=crop",
    rating: 4.7
  }
];

export const categories = ["All", "Single Origin", "Blend"];

export const roastLevels = ["All", "Light", "Medium-Light", "Medium", "Dark"];
