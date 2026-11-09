import { cva } from "class-variance-authority";

export const wasteStatusVariants = cva(
  "text-[20px] font-semibold transition-colors duration-200",
  {
    variants: {
      status: {
        not_full: "text-[#30D158]",
        warning: "text-[#F59E0B]",
        full: "text-[#EF4444]",
      },
    },
    defaultVariants: {
      status: "not_full",
    },
  }
);

export const thermalStatusVariants = cva(
  "text-[12px] font-semibold transition-colors duration-200",
  {
    variants: {
      status: {
        safe: "text-[#30D158]",
        warning: "text-[#F59E0B]",
        critical: "text-[#EF4444]",
      },
    },
    defaultVariants: {
      status: "safe",
    },
  }
);

export const mqttBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[11px] font-semibold border transition-all duration-150",
  {
    variants: {
      status: {
        connected: "bg-[#12141D] border-[#1E2230] text-[#30D158]",
        connecting: "bg-[#12141D] border-[#3B2D14] text-[#F59E0B]",
        offline: "bg-[#12141D] border-[#331A1D] text-[#EF4444]",
      },
    },
    defaultVariants: {
      status: "connected",
    },
  }
);

export const operatorButtonVariants = cva(
  "group relative flex items-center justify-center gap-2 rounded-[14px] text-[14px] font-medium transition-all duration-150 select-none cursor-pointer border active:scale-[0.97]",
  {
    variants: {
      intent: {
        open_lid:
          "bg-[#151926] border-[#2563EB] text-[#FAFAFA] hover:bg-[#1a2033] hover:border-[#3b82f6] shadow-[0_0_12px_rgba(37,99,235,0.12)] active:shadow-none",
        return_home:
          "bg-[#131C17] border-[#16A34A] text-[#FAFAFA] hover:bg-[#17251e] hover:border-[#22c55e] shadow-[0_0_12px_rgba(22,163,74,0.12)] active:shadow-none",
      },
      size: {
        default: "h-[50px] px-4 min-h-[48px]", // Meets Apple touch target requirement >= 48px
      },
    },
    defaultVariants: {
      intent: "open_lid",
      size: "default",
    },
  }
);
