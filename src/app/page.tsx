import { SmartBinDashboard } from "@/components/smart-bin-dashboard";

export default function HomePage() {
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-[#050608] sm:p-4 overflow-hidden">
      <SmartBinDashboard />
    </div>
  );
}
