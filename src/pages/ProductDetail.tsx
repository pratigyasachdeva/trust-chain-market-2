import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Lock } from "lucide-react";
import { products, getSellerBadge } from "@/lib/data";
import { Button } from "@/components/ui/button";
import EscrowProgress from "@/components/EscrowProgress";
import { useStore } from "@/lib/store";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { role } = useStore();

  if (!product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const badge = getSellerBadge(product.sellerTrades);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 gap-2 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="glass rounded-xl aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-gradient mt-2">
                {product.price} ALGO
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Seller</span>
                <span className="text-sm font-medium text-foreground">{product.seller}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Trust Level</span>
                <span
                  className={`text-sm font-medium flex items-center gap-1 ${
                    badge.color === "success"
                      ? "text-success"
                      : badge.color === "warning"
                      ? "text-warning"
                      : "text-muted-foreground"
                  }`}
                >
                  <Star className="h-3.5 w-3.5" />
                  {badge.label} ({product.sellerTrades} trades)
                </span>
              </div>
            </div>

            <div className="glass rounded-lg p-4 text-sm text-muted-foreground border-glow">
              <Lock className="h-4 w-4 text-primary inline mr-1.5 -mt-0.5" />
              Payment will be securely locked in escrow until delivery confirmation.
            </div>

            {role === "buyer" && (
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => navigate(`/escrow/${product.id}`)}
              >
                <Lock className="h-4 w-4" />
                Start Escrow Payment
              </Button>
            )}

            {/* Visual escrow explanation */}
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-4 text-center">
                Transaction Flow
              </p>
              <EscrowProgress state="idle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
