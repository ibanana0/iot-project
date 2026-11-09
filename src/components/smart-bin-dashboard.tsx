"use client";

import React, { useState, useEffect, useRef } from "react";
import NumberFlow from "@number-flow/react";
import { Switch } from "@base-ui/react/switch";
import {
  TrashCanIcon,
  CheckCircleIcon,
  ThermometerIcon,
  DropletIcon,
  ShieldCheckIcon,
  OpenLidIcon,
  ReturnHomeIcon,
  RouteTrackIcon,
  ConsoleTerminalIcon,
  TelegramPlaneIcon,
  ChevronRightIcon,
} from "./icons";
import {
  wasteStatusVariants,
  thermalStatusVariants,
  mqttBadgeVariants,
  operatorButtonVariants,
} from "@/lib/variants";

interface LogEntry {
  id: string;
  time: string;
  message: string;
  color: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: "init-1", time: "15:37:42", message: "Lid servo idle, chamber tertutup rapat", color: "text-[#FAFAFA]" },
  { id: "init-2", time: "15:35:10", message: "Line follower: Jalur A deteksi normal", color: "text-[#D4D4D8]" },
  { id: "init-3", time: "15:32:00", message: "Sensor sampah terbaca: Tidak Penuh", color: "text-[#30D158]" },
  { id: "init-4", time: "15:28:15", message: "Suhu chamber terverifikasi stabil (28°C)", color: "text-[#D4D4D8]" },
  { id: "init-5", time: "15:24:02", message: "ESP32 terhubung ke Telegram Bot & MQTT", color: "text-[#38BDF8]" },
];

/**
 * Returns the actual visible height of the browser viewport.
 * window.visualViewport.height accounts for the URL bar, keyboard,
 * and bottom nav bar on mobile — unlike 100svh/dvh/vh which don't.
 */
function useVisualViewportHeight(): number {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      setHeight(window.visualViewport?.height ?? window.innerHeight);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return height;
}

export function SmartBinDashboard() {
  const viewportHeight = useVisualViewportHeight();

  const [temperature, setTemperature] = useState<number>(28);
  const [humidity, setHumidity] = useState<number>(64);
  const [isTrashFull, setIsTrashFull] = useState<boolean>(false);
  const [isLidOpen, setIsLidOpen] = useState<boolean>(false);
  const [isLineFollowerOn, setIsLineFollowerOn] = useState<boolean>(true);
  const [isReturningHome, setIsReturningHome] = useState<boolean>(false);
  const [mqttStatus] = useState<"connected" | "connecting" | "offline">("connected");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, color: string) => {
    const now = new Date();
    const timeStr = [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
      String(now.getSeconds()).padStart(2, "0"),
    ].join(":");
    setLogs((prev) => [
      { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, time: timeStr, message, color },
      ...prev.slice(0, 29),
    ]);
  };

  useEffect(() => {
    logContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [logs]);

  const handleToggleLid = () => {
    const next = !isLidOpen;
    setIsLidOpen(next);
    addLog(next ? "Lid servo aktif: Tutup sampah terbuka" : "Lid servo idle: Tutup sampah ditutup rapat",
      next ? "text-[#38BDF8]" : "text-[#FAFAFA]");
  };

  const handleReturnHome = () => {
    if (isReturningHome) return;
    setIsReturningHome(true);
    addLog("Navigasi: Memulai manuver kembali ke Docking", "text-[#30D158]");
    setTimeout(() => {
      setIsReturningHome(false);
      addLog("Navigasi: Berhasil merapat di Docking Base", "text-[#FAFAFA]");
    }, 2500);
  };

  const handleLineFollowerChange = (checked: boolean) => {
    setIsLineFollowerOn(checked);
    addLog(checked ? "Line follower: Sensor IR 5-ch lintasan aktif" : "Line follower: Navigasi otomatis dinonaktifkan",
      checked ? "text-[#38BDF8]" : "text-[#F59E0B]");
  };

  const handleToggleTrashFull = () => {
    const next = !isTrashFull;
    setIsTrashFull(next);
    addLog(next ? "ALERT: Sensor batas membaca wadah PENUH!" : "Sensor sampah terbaca: Tidak Penuh (Kosong)",
      next ? "text-[#EF4444]" : "text-[#30D158]");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTemperature((t) => {
        const next = Math.round((t + (Math.random() - 0.5) * 0.4) * 10) / 10;
        return next >= 26 && next <= 31 ? next : t;
      });
      setHumidity((h) => {
        const next = h + Math.round((Math.random() - 0.5) * 1.5);
        return next >= 60 && next <= 70 ? next : h;
      });
    }, 14000);
    return () => clearInterval(timer);
  }, []);

  // Show nothing until viewport height is known (avoids flash of wrong layout)
  if (viewportHeight === 0) return null;

  return (
    <main
      className="relative w-full max-w-[430px] bg-[#08090D] text-[#FAFAFA] flex flex-col overflow-hidden select-none sm:rounded-[36px] sm:border sm:border-[#1F2332] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
      style={{
        // visualViewport.height = exact visible area after URL bar, nav bar, keyboard
        height: viewportHeight,
        boxSizing: "border-box",
        paddingTop: "max(10px, env(safe-area-inset-top))",
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex-1 min-h-0 flex flex-col px-[22px] pb-1 pt-0.5 gap-[8px] overflow-hidden">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <section className="flex items-start justify-between shrink-0">
          <div>
            <h1 className="text-[20px] font-semibold text-[#FAFAFA] tracking-[-0.4px] leading-tight">
              Smart Bin Robot
            </h1>
            <p className="text-[11px] text-[#A1A1AA] leading-tight">
              Line Follower &amp; Waste Monitor
            </p>
            <div className="flex items-center gap-1 text-[9.5px] text-[#71717A] mt-0.5 truncate">
              <span>ESP32-WROOM-32</span>
              <span>•</span>
              <span>RSSI: -48 dBm</span>
              <span>•</span>
              <span>12ms</span>
            </div>
          </div>
          <div className={mqttBadgeVariants({ status: mqttStatus })}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30D158]" />
            </span>
            <span>MQTT</span>
          </div>
        </section>

        {/* ── STATUS WADAH SAMPAH ────────────────────────────── */}
        <section
          onClick={handleToggleTrashFull}
          className="relative w-full bg-[#12141D] border border-[#1F2332] rounded-[16px] px-3 py-2.5 flex items-center justify-between cursor-pointer transition-all duration-150 active:scale-[0.985] shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-[11px] bg-[#151D2A] shrink-0">
              <TrashCanIcon size={17} className="text-[#38BDF8]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#A1A1AA]">Status Wadah Sampah</span>
              <span className={wasteStatusVariants({ status: isTrashFull ? "full" : "not_full" })}>
                {isTrashFull ? "Penuh" : "Tidak Penuh"}
              </span>
              <span className="text-[10px] text-[#71717A] leading-tight">
                {isTrashFull ? "Sensor batas: Maksimum • Perlu dikosongkan" : "Sensor batas: Kosong • Siap menampung"}
              </span>
            </div>
          </div>
          <CheckCircleIcon size={20} className={isTrashFull ? "text-[#EF4444] rotate-45 transition-transform shrink-0" : "text-[#30D158] transition-transform shrink-0"} />
        </section>

        {/* ── SENSOR LINGKUNGAN ──────────────────────────────── */}
        <section className="grid grid-cols-2 gap-[10px] shrink-0">
          <div className="bg-[#12141D] border border-[#1F2332] rounded-[16px] p-2.5 flex flex-col justify-between" style={{ height: 80 }}>
            <div className="flex items-center gap-1.5">
              <ThermometerIcon size={13} className="text-[#38BDF8]" />
              <span className="text-[11px] text-[#A1A1AA]">Suhu</span>
            </div>
            <div className="flex items-baseline text-[24px] font-semibold text-[#FAFAFA] tracking-tight leading-none">
              <NumberFlow value={temperature} format={{ maximumFractionDigits: 1 }} className="font-semibold" />
              <span className="text-[17px] font-medium text-[#FAFAFA]/80 ml-0.5">°C</span>
            </div>
            <span className="text-[9.5px] text-[#71717A] leading-tight">Thermal Chamber • Normal</span>
          </div>

          <div className="bg-[#12141D] border border-[#1F2332] rounded-[16px] p-2.5 flex flex-col justify-between" style={{ height: 80 }}>
            <div className="flex items-center gap-1.5">
              <DropletIcon size={13} className="text-[#38BDF8]" />
              <span className="text-[11px] text-[#A1A1AA]">Kelembapan</span>
            </div>
            <div className="flex items-baseline text-[24px] font-semibold text-[#FAFAFA] tracking-tight leading-none">
              <NumberFlow value={humidity} format={{ maximumFractionDigits: 0 }} className="font-semibold" />
              <span className="text-[17px] font-medium text-[#FAFAFA]/80 ml-0.5">%</span>
            </div>
            <span className="text-[9.5px] text-[#71717A] leading-tight">Internal Sensor • Optimal</span>
          </div>
        </section>

        {/* ── INDIKATOR THERMAL ──────────────────────────────── */}
        <section className="w-full bg-[#12141D] border border-[#1F2332] rounded-[16px] px-3 flex items-center justify-between shrink-0" style={{ height: 36 }}>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon size={14} className="text-[#30D158]" />
            <span className="text-[11px] text-[#F4F4F5]">Indikator Thermal</span>
          </div>
          <span className={thermalStatusVariants({ status: temperature > 35 ? "critical" : temperature > 30 ? "warning" : "safe" })}>
            {temperature > 35 ? "Kritis (> 35°C)" : temperature > 30 ? "Waspada (> 30°C)" : "Aman (≤ 30°C)"}
          </span>
        </section>

        {/* ── OPERATOR BUTTONS ───────────────────────────────── */}
        <section className="grid grid-cols-2 gap-[10px] shrink-0">
          <button type="button" onClick={handleToggleLid} className={operatorButtonVariants({ intent: "open_lid" })}>
            <OpenLidIcon size={15} className={isLidOpen ? "text-[#60A5FA]" : "text-[#38BDF8]"} />
            <span className="text-[13px] tracking-tight">{isLidOpen ? "Close Lid" : "Open Lid"}</span>
          </button>
          <button type="button" onClick={handleReturnHome} disabled={isReturningHome} className={operatorButtonVariants({ intent: "return_home" })}>
            <ReturnHomeIcon size={15} className={isReturningHome ? "text-[#4ADE80] animate-pulse" : "text-[#30D158]"} />
            <span className="text-[13px] tracking-tight">{isReturningHome ? "Homing..." : "Return To Home"}</span>
          </button>
        </section>

        {/* ── LINE FOLLOWER MODE ─────────────────────────────── */}
        <section className="w-full bg-[#12141D] border border-[#1F2332] rounded-[16px] px-3 flex items-center justify-between shrink-0" style={{ height: 48 }}>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-[9px] bg-[#151D2A] shrink-0">
              <RouteTrackIcon size={15} className="text-[#38BDF8]" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#FAFAFA] leading-tight">Line Follower Mode</p>
              <p className="text-[9.5px] text-[#A1A1AA] leading-tight">Sensor IR 5-ch • Lintasan Aktif</p>
            </div>
          </div>
          <Switch.Root
            checked={isLineFollowerOn}
            onCheckedChange={handleLineFollowerChange}
            className="relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 data-checked:bg-[#30D158] bg-[#27272A] p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#30D158]/50"
          >
            <Switch.Thumb className="pointer-events-none inline-block h-[22px] w-[22px] rounded-full bg-white shadow-md transition-transform duration-200 data-checked:translate-x-[20px] translate-x-0" />
          </Switch.Root>
        </section>

        {/* ── DEVICE ACTIVITY LOGS ───────────────────────────── */}
        {/* flex-1 + min-h-0: takes ALL remaining space between line follower and telegram */}
        <section className="w-full flex-1 min-h-0 bg-[#0F1118] border border-[#1F2332] rounded-[16px] p-2.5 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#1C1F2B] shrink-0">
            <div className="flex items-center gap-1.5">
              <ConsoleTerminalIcon size={13} className="text-[#A1A1AA]" />
              <span className="text-[11px] font-medium text-[#FAFAFA]">Device Activity Logs</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#131C17] border border-[#1A3824] text-[9px] text-[#30D158] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
              <span>MQTT Live</span>
            </div>
          </div>
          <div
            ref={logContainerRef}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain terminal-scroll font-mono-code"
            style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <div className="flex flex-col gap-2 text-[9.5px] leading-snug">
              {logs.map((log) => (
                <div key={log.id} className="flex items-baseline gap-1.5">
                  <span className="text-[#71717A] tabular-nums shrink-0">{log.time}</span>
                  <span className="text-[#71717A] shrink-0">—</span>
                  <span className={`break-words ${log.color}`}>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GRUP NOTIFIKASI TELEGRAM ───────────────────────── */}
        {/* shrink-0: pinned — ALWAYS fully visible, never clipped */}
        <section
          onClick={() => addLog("Telegram alert: Uji coba trigger notifikasi bot", "text-[#2AABEE]")}
          className="w-full bg-[#0E1624] border border-[#1A2C46] rounded-[16px] px-3 flex items-center justify-between cursor-pointer transition-all duration-150 active:scale-[0.985] group shrink-0"
          style={{ height: 54 }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#182C48] shrink-0">
              <TelegramPlaneIcon size={15} className="text-[#2AABEE] -translate-x-0.5 translate-y-0.5" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#FAFAFA] leading-tight">Grup Notifikasi Telegram</p>
              <p className="text-[9.5px] text-[#8EA6C4] leading-tight mt-0.5">Terima alert instan saat tempat sampah penuh</p>
            </div>
          </div>
          <ChevronRightIcon size={12} className="text-[#2AABEE] transition-transform group-hover:translate-x-0.5 shrink-0" />
        </section>

      </div>
    </main>
  );
}
