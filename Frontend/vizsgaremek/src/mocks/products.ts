export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 329990,
    description:
      "Apple iPhone 15 Pro with A17 Pro chip, titanium design, 48 MP main camera and Dynamic Island.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=iPhone+15+Pro",
    stock: 12,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 359990,
    description:
      "Samsung flagship with Snapdragon 8 Gen 3, built-in S Pen, 200 MP camera and 5000 mAh battery.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Galaxy+S24+Ultra",
    stock: 8,
  },
  {
    id: 3,
    name: "Google Pixel 8",
    price: 219990,
    description:
      "Google Pixel 8 powered by Tensor G3, with 7 years of OS updates and best-in-class AI features.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Pixel+8",
    stock: 20,
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: 189990,
    description:
      "OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad-tuned 50 MP triple camera, and 100W SUPERVOOC charging.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=OnePlus+12",
    stock: 15,
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    price: 299990,
    description:
      "Xiaomi 14 Ultra with Leica-certified quad camera, 1-inch main sensor, Snapdragon 8 Gen 3, and 90W wireless charging.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Xiaomi+14+Ultra",
    stock: 10,
  },
  {
    id: 6,
    name: "Sony Xperia 1 VI",
    price: 279990,
    description:
      "Sony Xperia 1 VI with 4K OLED display, pro-grade camera with optical zoom, and studio-quality audio.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Xperia+1+VI",
    stock: 6,
  },
  {
    id: 7,
    name: "Motorola Edge 50 Pro",
    price: 149990,
    description:
      "Motorola Edge 50 Pro with 6.7-inch pOLED display, 125W TurboPower charging, and IP68 water resistance.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Edge+50+Pro",
    stock: 18,
  },
  {
    id: 8,
    name: "Nothing Phone (2a)",
    price: 109990,
    description:
      "Nothing Phone (2a) with unique Glyph Interface, Dimensity 7200 Pro, and clean Nothing OS experience.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Nothing+Phone+2a",
    stock: 25,
  },
  {
    id: 9,
    name: "ASUS ROG Phone 8",
    price: 319990,
    description:
      "ASUS ROG Phone 8 gaming flagship with Snapdragon 8 Gen 3, 165Hz AMOLED display, and 6000 mAh battery.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=ROG+Phone+8",
    stock: 9,
  },
  {
    id: 10,
    name: "Oppo Find X7 Pro",
    price: 269990,
    description:
      "Oppo Find X7 Pro with Hasselblad quad camera, Snapdragon 8 Gen 3, and 100W SuperVOOC fast charging.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Find+X7+Pro",
    stock: 11,
  },
  {
    id: 11,
    name: "Realme GT 6",
    price: 129990,
    description:
      "Realme GT 6 with Snapdragon 8s Gen 3, 120W SUPERVOOC charging, and 6.78-inch 120Hz AMOLED display.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Realme+GT+6",
    stock: 30,
  },
  {
    id: 12,
    name: "Vivo X100 Pro",
    price: 249990,
    description:
      "Vivo X100 Pro with ZEISS-certified 50 MP periscope telephoto, Dimensity 9300, and 100W FlashCharge.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Vivo+X100+Pro",
    stock: 14,
  },
  {
    id: 13,
    name: "Honor Magic 6 Pro",
    price: 229990,
    description:
      "Honor Magic 6 Pro with eye-tracking tech, Snapdragon 8 Gen 3, and a 180 MP telephoto periscope camera.",
    category: "phones",
    imageUrl: "https://placehold.co/400x400?text=Magic+6+Pro",
    stock: 7,
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}
