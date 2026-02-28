import { Check, Lock, Truck, ThumbsUp, Unlock } from "lucide-react";
import type { EscrowState } from "@/lib/data";

const steps = [
  { key: "locked", label: "Funds Locked", icon: Lock },
  { key: "delivered", label: "Item Delivered", icon: Truck },
  { key: "confirmed", label: "Buyer Confirms", icon: ThumbsUp },
  { key: "released", label: "Funds Released", icon: Unlock },
] as const;

const stateIndex: Record<EscrowState, number> = {
  idle: -1,
  locked: 0,
  delivered: 1,
  confirmed: 2,
  released: 3,
};

const EscrowProgress = ({ state }: { state: EscrowState }) => {
  const activeIdx = stateIndex[state];

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, i) => {
        const done = i <= activeIdx;
        const current = i === activeIdx;
        const Icon = done ? Check : step.icon;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  done
                    ? "bg-primary/20 border-primary text-primary glow-primary"
                    : current
                    ? "border-primary/50 text-primary animate-pulse-glow"
                    : "border-border text-muted-foreground"
                } ${current ? "animate-lock-bounce" : ""}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`text-[10px] font-medium text-center leading-tight max-w-[70px] ${
                  done ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-18px] transition-colors duration-500 ${
                  i < activeIdx ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EscrowProgress;
