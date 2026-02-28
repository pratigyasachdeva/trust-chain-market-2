import { Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore, type Order } from "@/lib/store";

const statusStyle: Record<string, string> = {
  in_escrow: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-success/10 text-success border-success/20",
};

const statusLabel: Record<string, string> = {
  in_escrow: "In Escrow",
  delivered: "Delivered",
  completed: "Completed",
};

const OrderCard = ({ order, roleLabel }: { order: Order; roleLabel: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className="glass rounded-xl p-4 flex items-center justify-between glass-hover cursor-pointer"
      onClick={() => navigate(`/escrow/${order.productId}`)}
    >
      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">{order.productTitle}</p>
          <span className="text-[10px] text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">
            {roleLabel}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{order.price} ALGO</span>
          <span className="font-mono">{order.txHash}</span>
          <span>{order.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle[order.status] || ""}`}>
          {statusLabel[order.status] || order.status}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

const MyOrders = () => {
  const { orders, role } = useStore();

  const ongoing = orders.filter((o) => o.status !== "completed");
  const completedPurchases = orders.filter((o) => o.status === "completed" && o.buyerWallet === "0xA7F3...92AC");
  const completedSales = orders.filter((o) => o.status === "completed" && o.sellerWallet !== "0xA7F3...92AC");

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-2xl font-display font-bold mb-8">
          My <span className="text-gradient">Orders</span>
        </h1>

        {orders.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet. Start trading on the marketplace.</p>
          </div>
        )}

        {ongoing.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Ongoing Transactions
            </h2>
            <div className="space-y-3">
              {ongoing.map((o) => (
                <OrderCard key={o.id} order={o} roleLabel={role === "buyer" ? "Buyer" : "Seller"} />
              ))}
            </div>
          </div>
        )}

        {completedPurchases.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Completed Purchases
            </h2>
            <div className="space-y-3">
              {completedPurchases.map((o) => (
                <OrderCard key={o.id} order={o} roleLabel="Buyer" />
              ))}
            </div>
          </div>
        )}

        {completedSales.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Completed Sales
            </h2>
            <div className="space-y-3">
              {completedSales.map((o) => (
                <OrderCard key={o.id} order={o} roleLabel="Seller" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
