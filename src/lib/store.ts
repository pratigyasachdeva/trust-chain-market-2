import { useEffect, useState, useCallback } from "react";

// Types
export type Role = "buyer" | "seller";

export type OrderStatus = "in_escrow" | "delivered" | "completed";

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  price: number;
  buyerWallet: string;
  sellerWallet: string;
  sellerName: string;
  status: OrderStatus;
  txHash: string;
  date: string;
}

// Keys
const ROLE_KEY = "trustchain_role";
const ORDERS_KEY = "trustchain_orders";
const ESCROW_KEY = "trustchain_escrow_";
const REPUTATION_KEY = "trustchain_reputation";

// Role
export function getRole(): Role {
  return (localStorage.getItem(ROLE_KEY) as Role) || "buyer";
}

export function setRole(role: Role) {
  localStorage.setItem(ROLE_KEY, role);
  window.dispatchEvent(new Event("trustchain_update"));
}

// Orders
export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event("trustchain_update"));
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event("trustchain_update"));
  }
}

// Escrow state per product
export function getEscrowState(productId: string): string {
  return localStorage.getItem(ESCROW_KEY + productId) || "idle";
}

export function setEscrowState(productId: string, state: string) {
  localStorage.setItem(ESCROW_KEY + productId, state);
  window.dispatchEvent(new Event("trustchain_update"));
}

// Reputation (extra completed count beyond initial data)
export function getExtraReputation(): number {
  return parseInt(localStorage.getItem(REPUTATION_KEY) || "0", 10);
}

export function incrementReputation() {
  const current = getExtraReputation();
  localStorage.setItem(REPUTATION_KEY, String(current + 1));
  window.dispatchEvent(new Event("trustchain_update"));
}

// Hook to reactively listen for store updates
export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("trustchain_update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("trustchain_update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    role: getRole(),
    orders: getOrders(),
    extraReputation: getExtraReputation(),
  };
}

// Generate a fake tx hash
export function generateTxHash(): string {
  const chars = "0123456789ABCDEF";
  let hash = "ALGO_TXN_0x";
  for (let i = 0; i < 8; i++) hash += chars[Math.floor(Math.random() * 16)];
  return hash;
}
