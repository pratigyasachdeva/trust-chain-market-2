import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, Unlock, ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { products, type EscrowState } from "@/lib/data";
import { Button } from "@/components/ui/button";
import EscrowProgress from "@/components/EscrowProgress";
import {
  getEscrowState,
  setEscrowState,
  getRole,
  useStore,
  addOrder,
  updateOrderStatus,
  getOrders,
  incrementReputation,
  generateTxHash,
} from "@/lib/store";

const EscrowFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { role } = useStore();

  const [state, setState] = useState<EscrowState>(() => {
    return (id ? getEscrowState(id) : "idle") as EscrowState;
  });

  const [txHash] = useState(() => generateTxHash());
  const escrowWallet = "ESCROW_0x91AF...F92C";

  // Sync state from localStorage on mount
  useEffect(() => {
    if (id) {
      const saved = getEscrowState(id) as EscrowState;
      if (saved !== state) setState(saved);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const advanceTo = (nextState: EscrowState) => {
    setState(nextState);
    setEscrowState(product.id, nextState);

    if (nextState === "locked") {
      // Create order if not exists
      const orders = getOrders();
      const exists = orders.find((o) => o.productId === product.id);
      if (!exists) {
        addOrder({
          id: `order_${product.id}_${Date.now()}`,
          productId: product.id,
          productTitle: product.title,
          price: product.price,
          buyerWallet: "0xA7F3...92AC",
          sellerWallet: product.seller,
          sellerName: product.seller,
          status: "in_escrow",
          txHash,
          date: new Date().toLocaleDateString(),
        });
      }
    }

    if (nextState === "delivered") {
      const orders = getOrders();
      const order = orders.find((o) => o.productId === product.id);
      if (order) updateOrderStatus(order.id, "delivered");
    }

    if (nextState === "released") {
      const orders = getOrders();
      const order = orders.find((o) => o.productId === product.id);
      if (order) updateOrderStatus(order.id, "completed");
      incrementReputation();
    }
  };

  // Role-based button visibility
  const canLock = role === "buyer" && state === "idle";
  const canDeliver = role === "seller" && state === "locked";
  const canConfirm = role === "buyer" && state === "delivered";
  const canRelease = state === "confirmed"; // auto on confirm

  // Map to show correct button
  const getActionButton = () => {
    if (canLock) return { label: "Lock Funds in Escrow", onClick: () => advanceTo("locked"), icon: Lock };
    if (canDeliver) return { label: "Mark Item as Delivered", onClick: () => advanceTo("delivered"), icon: CheckCircle2 };
    if (canConfirm) return { label: "Confirm Delivery & Release Funds", onClick: () => { advanceTo("confirmed"); setTimeout(() => advanceTo("released"), 800); }, icon: Unlock };
    return null;
  };

  const actionBtn = getActionButton();

  // Status badge
  const getStatusBadge = () => {
    if (state === "idle") return null;
    if (state === "locked") return { text: "In Escrow", className: "bg-primary/10 text-primary border-primary/20" };
    if (state === "delivered") return { text: "Delivered", className: "bg-warning/10 text-warning border-warning/20" };
    if (state === "confirmed" || state === "released") return { text: "Completed", className: "bg-success/10 text-success border-success/20" };
    return null;
  };

  const badge = getStatusBadge();

  // Waiting messages for wrong role
  const getWaitingMessage = () => {
    if (state === "locked" && role === "buyer") return "Waiting for the seller to mark the item as delivered.";
    if (state === "delivered" && role === "seller") return "Waiting for the buyer to confirm delivery.";
    if (state === "idle" && role === "seller") return "Waiting for the buyer to lock funds in escrow.";
    return null;
  };

  const waitingMsg = getWaitingMessage();

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 gap-2 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-display font-bold">
            Escrow <span className="text-gradient">Transaction</span>
          </h1>
          {badge && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badge.className}`}>
              {badge.text}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          {product.title} — {product.price} ALGO
        </p>

        {/* Progress */}
        <div className="glass rounded-xl p-6 mb-8">
          <EscrowProgress state={state} />
        </div>

        {/* Status Card */}
        <div className={`glass rounded-xl p-6 space-y-4 ${state === "released" ? "glow-success" : "border-glow"}`}>
          {/* Wallets */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">You (Buyer)</span>
              <p className="font-mono text-foreground">0xA7F3...92AC</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Seller</span>
              <p className="font-mono text-foreground">{product.seller}</p>
            </div>
          </div>

          <div className="border-t border-border/50 pt-4">
            <span className="text-muted-foreground text-xs">Amount</span>
            <p className="text-xl font-bold text-gradient">{product.price} ALGO</p>
          </div>

          {/* Status messages */}
          {state === "idle" && (
            <p className="text-sm text-muted-foreground">
              Ready to initiate escrow. Funds will be locked until delivery is confirmed.
            </p>
          )}

          {state === "locked" && (
            <div className="space-y-2 animate-slide-up">
              <div className="flex items-center gap-2 text-primary">
                <Lock className="h-5 w-5" />
                <span className="font-semibold">Funds Locked in Escrow</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Escrow Wallet: {escrowWallet}
              </p>
              <p className="text-xs text-muted-foreground font-mono">TXN: {txHash}</p>
            </div>
          )}

          {state === "delivered" && (
            <div className="space-y-2 animate-slide-up">
              <div className="flex items-center gap-2 text-warning">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Item Marked as Delivered</span>
              </div>
            </div>
          )}

          {state === "released" && (
            <div className="space-y-3 animate-slide-up">
              <div className="flex items-center gap-2 text-success">
                <Unlock className="h-5 w-5" />
                <span className="font-semibold">Escrow Released — Funds Transferred</span>
              </div>
              <div className="glass rounded-lg p-3 space-y-1">
                <p className="text-xs text-muted-foreground">Transaction Hash</p>
                <p className="text-sm font-mono text-foreground">{txHash}</p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                View on Algorand Explorer
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* Waiting message */}
          {waitingMsg && (
            <p className="text-sm text-muted-foreground italic">{waitingMsg}</p>
          )}

          {/* Action button */}
          {actionBtn && (
            <Button
              size="lg"
              className="w-full gap-2 mt-4"
              onClick={actionBtn.onClick}
            >
              <actionBtn.icon className="h-4 w-4" />
              {actionBtn.label}
            </Button>
          )}

          {state === "released" && (
            <div className="flex gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/marketplace">Back to Marketplace</Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <Link to="/orders">View Orders</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscrowFlow;
