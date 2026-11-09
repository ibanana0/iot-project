import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#08090D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Smart Bin Robot — Line Follower & Waste Monitor",
  description: "Dashboard pemantauan robot tempat sampah pintar dan line follower berbasis ESP32",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-[#08090D] text-[#FAFAFA] min-h-[100dvh] flex flex-col items-center justify-start antialiased selection:bg-[#38BDF8]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
