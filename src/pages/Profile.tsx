import { Wallet, ShieldCheck, Star, Hash, Clock } from "lucide-react";
import { profileData, getSellerBadge } from "@/lib/data";
import { useStore } from "@/lib/store";

const Profile = () => {
  const { orders, extraReputation } = useStore();
  const totalCompleted = profileData.completedTransactions + extraReputation;
  const badge = getSellerBadge(totalCompleted);

  // Recent activity: last 3 orders or fallback to static data
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-2xl font-display font-bold mb-8">
          Your <span className="text-gradient">Profile</span>
        </h1>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="glass rounded-xl p-5 space-y-1 border-glow">
            <Wallet className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-sm text-foreground">{profileData.walletAddress}</p>
          </div>
          <div className="glass rounded-xl p-5 space-y-1 border-glow">
            <ShieldCheck className="h-5 w-5 text-success mb-2" />
            <p className="text-xs text-muted-foreground">Campus Verified</p>
            <p className="text-sm font-medium text-success">Verified Student</p>
          </div>
          <div className="glass rounded-xl p-5 space-y-1 border-glow">
            <Hash className="h-5 w-5 text-accent mb-2" />
            <p className="text-xs text-muted-foreground">Completed Transactions</p>
            <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
          </div>
          <div className="glass rounded-xl p-5 space-y-1 border-glow">
            <Star className="h-5 w-5 text-warning mb-2" />
            <p className="text-xs text-muted-foreground">Reputation Level</p>
            <p className={`text-sm font-semibold ${
              badge.color === "success" ? "text-success" : badge.color === "warning" ? "text-warning" : "text-muted-foreground"
            }`}>
              {badge.label}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <h2 className="text-lg font-display font-semibold mb-4 text-foreground">Recent Activity</h2>
        <div className="space-y-3">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <div key={order.id} className="glass rounded-lg p-4 flex items-center justify-between glass-hover">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.productTitle}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{order.txHash}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    order.status === "completed"
                      ? "bg-success/10 text-success border-success/20"
                      : order.status === "delivered"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-primary/10 text-primary border-primary/20"
                  }`}
                >
                  {order.status === "completed" ? "Completed" : order.status === "delivered" ? "Delivered" : "In Escrow"}
                </span>
              </div>
            ))
          ) : (
            // Fallback to static data
            profileData.transactions.slice(0, 3).map((tx, i) => (
              <div key={i} className="glass rounded-lg p-4 flex items-center justify-between glass-hover">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.item}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{tx.txHash}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
                  {tx.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
