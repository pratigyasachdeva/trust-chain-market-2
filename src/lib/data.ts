export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  sellerTrades: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Data Structures Textbook",
    description: "Comprehensive guide to data structures and algorithms. Covers arrays, linked lists, trees, graphs, and sorting algorithms. Lightly used, no highlights or markings.",
    price: 3,
    seller: "Alice_0xAF31",
    sellerTrades: 14,
    category: "Books",
    image: "/images/textbook.jpg",
  },
  {
    id: "2",
    title: "Scientific Calculator",
    description: "TI-84 Plus graphing calculator. Perfect for calculus, statistics, and engineering courses. Battery included, screen in excellent condition.",
    price: 4.5,
    seller: "Bob_0x3C91",
    sellerTrades: 8,
    category: "Calculators",
    image: "/images/calculator.jpg",
  },
  {
    id: "3",
    title: "Sony WH-1000XM4 Headphones",
    description: "Noise-cancelling headphones. Great for studying in noisy environments. Minor cosmetic wear, audio quality is perfect.",
    price: 2,
    seller: "Charlie_0xF2D1",
    sellerTrades: 3,
    category: "Electronics",
    image: "/images/headphones.jpg",
  },
  {
    id: "4",
    title: "Mini Refrigerator",
    description: "Compact dorm-size refrigerator. 1.7 cubic feet capacity. Ideal for keeping drinks and snacks cold. Energy efficient and quiet operation.",
    price: 15,
    seller: "Diana_0x91AF",
    sellerTrades: 22,
    category: "Hostel Essentials",
    image: "/images/fridge.jpg",
  },
  {
    id: "5",
    title: "Organic Chemistry Notes",
    description: "Complete handwritten notes covering organic chemistry I and II. Includes reaction mechanisms, practice problems, and exam prep summaries.",
    price: 1.5,
    seller: "Eve_0xBC42",
    sellerTrades: 6,
    category: "Books",
    image: "/images/notes.jpg",
  },
  {
    id: "6",
    title: "LED Desk Lamp with USB",
    description: "LED desk lamp with adjustable brightness and built-in USB charging port. Touch controls, flexible gooseneck design. Perfect for late-night study sessions.",
    price: 5,
    seller: "Frank_0x7E23",
    sellerTrades: 11,
    category: "Hostel Essentials",
    image: "/images/desklamp.jpg",
  },
];

export type EscrowState = "idle" | "locked" | "delivered" | "confirmed" | "released";

export function getSellerBadge(trades: number): { label: string; color: "success" | "warning" | "muted" } {
  if (trades >= 15) return { label: "Elite Campus Trader", color: "success" };
  if (trades >= 5) return { label: "Trusted Seller", color: "warning" };
  return { label: "New Seller", color: "muted" };
}

export const profileData = {
  walletAddress: "0xA7F3...92AC",
  campusVerified: true,
  completedTransactions: 14,
  transactions: [
    { item: "Data Structures Textbook", status: "Completed" as const, txHash: "ALGO_TXN_0x8F4A2C91" },
    { item: "Lab Coat (Medium)", status: "Completed" as const, txHash: "ALGO_TXN_0x3B7E1F02" },
    { item: "USB-C Hub", status: "Completed" as const, txHash: "ALGO_TXN_0xC92D4A18" },
    { item: "Physics Practical Manual", status: "Completed" as const, txHash: "ALGO_TXN_0x6F1A3E7B" },
  ],
};
