import { useNavigate } from "react-router-dom";
import { Star, Lock } from "lucide-react";
import { Product, getSellerBadge } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { getRole, useStore } from "@/lib/store";

const ProductCard = ({ product }: { product: Product }) => {
  const badge = getSellerBadge(product.sellerTrades);
  const navigate = useNavigate();
  const { role } = useStore();

  return (
    <div className="group glass rounded-xl overflow-hidden glass-hover">
      <div
        className="aspect-[4/3] bg-secondary/50 relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-3">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-gradient mt-1">{product.price} ALGO</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{product.seller}</span>
          <span
            className={`text-[10px] font-medium flex items-center gap-1 ${
              badge.color === "success"
                ? "text-success"
                : badge.color === "warning"
                ? "text-warning"
                : "text-muted-foreground"
            }`}
          >
            <Star className="h-3 w-3" />
            {badge.label}
          </span>
        </div>
        {role === "buyer" && (
          <Button
            size="sm"
            className="w-full gap-2"
            onClick={() => navigate(`/escrow/${product.id}`)}
          >
            <Lock className="h-3.5 w-3.5" />
            Start Escrow
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
