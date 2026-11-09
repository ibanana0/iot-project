import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function TrashCanIcon({ size = 18, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M0 3.75L18 3.75M3.857 3.75L3.857 1.25C3.857 0.56 4.433 0 5.143 0L12.857 0C13.567 0 14.143 0.56 14.143 1.25L14.143 3.75M16.714 3.75L16.714 17.5C16.714 18.881 15.563 20 14.143 20L3.857 20C2.437 20 1.286 18.881 1.286 17.5L1.286 3.75M6.429 8.75L6.429 16.25M11.571 8.75L11.571 16.25" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM8.333 14.444L3.889 10L5.444 8.444L8.333 11.333L15 4.667L16.556 6.222L8.333 14.444Z" />
    </svg>
  );
}

export function ThermometerIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11.2 10.462L11.2 1.846C11.2 0.827 9.319 0 7 0C4.681 0 2.8 0.827 2.8 1.846L2.8 10.462C0.39 11.256 -0.593 12.64 0.36 13.896C1.312 15.153 3.987 16 7 16C10.013 16 12.688 15.153 13.64 13.896C14.593 12.64 13.61 11.256 11.2 10.462Z" />
    </svg>
  );
}

export function DropletIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M7 0L11.9 5.508C13.931 7.249 14.555 9.891 13.48 12.193C12.405 14.495 9.844 16 7 16C4.156 16 1.595 14.495 0.52 12.193C-0.555 9.891 0.069 7.249 2.1 5.508L7 0Z" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 8.438L6.667 10.688L12 6.188M8 0L16 2.813L16 8.438C16 13.5 11.333 16.875 8 18C4.667 16.875 0 13.5 0 8.438L0 2.813L8 0Z" />
    </svg>
  );
}

export function OpenLidIcon({ size = 18, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M0 6L9 0L18 6M2.571 12L15.429 12L15.429 18L2.571 18L2.571 12Z" />
    </svg>
  );
}

export function ReturnHomeIcon({ size = 18, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5.143 18L5.143 10.8L10.286 10.8L10.286 18M0 6.6L9 0L18 6.6L18 16.2C18 17.194 17.137 18 16.071 18L1.929 18C0.863 18 0 17.194 0 16.2L0 6.6Z" />
    </svg>
  );
}

export function RouteTrackIcon({ size = 18, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M2.25 11.455L2.25 9.818C2.25 6.203 4.265 3.273 6.75 3.273L11.25 3.273M11.25 3.273L15.75 3.273M2.25 18C3.493 18 4.5 16.535 4.5 14.727C4.5 12.92 3.493 11.455 2.25 11.455C1.007 11.455 0 12.92 0 14.727C0 16.535 1.007 18 2.25 18ZM15.75 6.545C16.993 6.545 18 5.08 18 3.273C18 1.465 16.993 0 15.75 0C14.507 0 13.5 1.465 13.5 3.273C13.5 5.08 14.507 6.545 15.75 6.545Z" />
    </svg>
  );
}

export function ConsoleTerminalIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3.429 4.8L6.857 8L3.429 11.2M9.143 11.2L12.571 11.2M1.143 0L14.857 0C15.488 0 16 0.716 16 1.6L16 14.4C16 15.284 15.488 16 14.857 16L1.143 16C0.512 16 0 15.284 0 14.4L0 1.6C0 0.716 0.512 0 1.143 0Z" />
    </svg>
  );
}

export function TelegramPlaneIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M20 0L0 8.889L7.778 12.222L10 20L13.889 15.556L20 20L20 0Z" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 14, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M0 0L14 8L0 16" />
    </svg>
  );
}

export function WifiIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 13"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="M0 2.169C4.95 -0.723 11.05 -0.723 16 2.169M2.857 5.639C6.092 3.989 9.908 3.989 13.143 5.639M5.714 9.109C7.172 8.465 8.828 8.465 10.286 9.109M8 12L8.011 12" />
    </svg>
  );
}

export function BatteryIcon({ size = 25, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size * (12 / 25)}
      viewBox="0 0 25 12"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M24 3.75L24 8.25M2.087 0L20.87 0C22.022 0 22.957 1.343 22.957 3L22.957 9C22.957 10.657 22.022 12 20.87 12L2.087 12C0.934 12 0 10.657 0 9L0 3C0 1.343 0.934 0 2.087 0Z"
        stroke="#F4F4F5"
        strokeWidth={1.2}
      />
      <rect x="2.5" y="2" width="13.5" height="8" rx="1.5" fill="#30D158" />
    </svg>
  );
}
