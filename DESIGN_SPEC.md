# Smart Bin Robot — Design Specification

Dokumen ini adalah spesifikasi desain yang di-generate dari **FigCraft** dengan standar **Apple Design**, **Mobile Native**, dan **Impeccable / Taste Skill v2.5** (Mode: Operate).

Berkas aset terkait di direktori ini:
- `figcraft-design.png` — Render visual pixel-perfect tampilan antarmuka (iPhone 16 / 15 Pro resolution).
- `smart-bin-robot.svg` — Berkas vektor SVG lengkap dengan koordinat dan path.
- `smart-bin-robot.figcraft` — Berkas native FigCraft.

---

## 1. Design Tokens

### Color Palette (Apple Pro Dark)
```css
:root {
  /* Surfaces */
  --bg-canvas: #08090D;       /* Obsidian deep background */
  --bg-card: #12141D;         /* Structural surface 1 */
  --bg-card-subtle: #0F1118;  /* Terminal & log container */
  --border-card: #1F2332;     /* Subtle hairline 1px border */
  --border-subtle: #1C1F2B;   /* Divider & container borders */

  /* Typography */
  --text-primary: #FAFAFA;    /* 84% ink - high contrast headings & values */
  --text-secondary: #D4D4D8;  /* Body text & message logs */
  --text-muted: #A1A1AA;      /* Card labels & secondary copy */
  --text-tertiary: #71717A;   /* Timestamps, footnotes & captions */

  /* Functional Accents */
  --color-success: #30D158;   /* Apple System Mint / Safe & Ready */
  --color-accent: #38BDF8;    /* Precision Blue / Sensors & Lid */
  --color-telegram: #2AABEE;  /* Telegram Brand Blue */

  /* Interactive Buttons */
  --btn-open-bg: #151926;
  --btn-open-border: #2563EB;
  --btn-home-bg: #131C17;
  --btn-home-border: #16A34A;
}
```

### Radius & Spacing Hierarchy
- **Outer Shell / Phone Bezel**: `48px` (`corner-smoothing: 0.6` squircle)
- **Primary Cards**: `18px`
- **Buttons & Switches**: `14px`
- **Badges / Small Pills**: `10px`
- **Content Padding**: Horizontal margin tetap `24px` di sisi kiri dan kanan (Lebar konten: `345px`).

---

## 2. Layout Sections

1. **Header**:
   - Title: `Smart Bin Robot` (23px, SemiBold, `-0.4px` tracking, `#FAFAFA`).
   - Subtitle: `Line Follower & Waste Monitor` (12px, `#A1A1AA`).
   - Header Right: Live indicator card `● MQTT` (11px SemiBold, `#30D158`).
   - Subline: `Node: ESP32-WROOM-32 • WiFi RSSI: -48 dBm • 12ms` (11px, `#71717A`).

2. **Status Wadah Sampah (Binary State)**:
   - Icon: Trash can vector (`#38BDF8`).
   - Title: `Status Wadah Sampah` (12px, `#A1A1AA`).
   - Value: `Tidak Penuh` (20px SemiBold, `#30D158`).
   - Subtext: `Sensor batas: Kosong • Siap menampung` (11px, `#71717A`).
   - Indicator: Checkmark circle outline vector (`#30D158`).

3. **Sensor Lingkungan (Dual Columns)**:
   - **Suhu**: `28°C` (26px SemiBold), Footnote: `Thermal Chamber • Normal` (11px).
   - **Kelembapan**: `64%` (26px SemiBold), Footnote: `Internal Sensor • Optimal` (11px).

4. **Indikator Thermal**:
   - Minimalist strip dengan Shield icon (`#30D158`).
   - Label: `Indikator Thermal` (`#F4F4F5`).
   - Value: `Aman (≤ 30°C)` (12px SemiBold, `#30D158`).

5. **Tombol Kontrol Operator**:
   - `Open Lid`: Icon lid open, `#FAFAFA` text, border `#2563EB`.
   - `Return To Home`: Icon home dock, `#FAFAFA` text, border `#16A34A`.
   - Ukuran: Minimum touch target `50px`.

6. **Line Follower Mode**:
   - Icon circuit track (`#38BDF8`).
   - Label: `Line Follower Mode`, Subtext: `Sensor IR 5-ch • Lintasan Aktif`.
   - Control: iOS-style toggle switch (`#30D158` on state).

7. **Device Activity Logs (MQTT Terminal)**:
   - Header: Console icon `>_`, Title: `Device Activity Logs`, Status: `MQTT Live`.
   - Log rows dengan tabular timestamp monospace (`Menlo`, 10px `#71717A`):
     - `15:37:42` — `Lid servo idle, chamber tertutup rapat` (`#FAFAFA`)
     - `15:35:10` — `Line follower: Jalur A deteksi normal` (`#D4D4D8`)
     - `15:32:00` — `Sensor sampah terbaca: Tidak Penuh` (`#30D158`)
     - `15:28:15` — `Suhu chamber terverifikasi stabil (28°C)` (`#D4D4D8`)
     - `15:24:02` — `ESP32 terhubung ke Telegram Bot & MQTT` (`#38BDF8`)

8. **Grup Notifikasi Telegram**:
   - Card dengan background `#0E1624` dan border `#1A2C46`.
   - Icon paper plane Telegram (`#2AABEE`).
   - Title: `Grup Notifikasi Telegram`, Subtitle: `Terima alert instan saat tempat sampah penuh`.
   - Right arrow chevron (`#2AABEE`).

---

## 3. SVG Path Icons Reference

Gunakan path ini langsung pada komponen React/Next.js (stroke 1.4-1.5, fill: none, strokeLinecap: round, strokeLinejoin: round):

- **Trash Can**: `M2 5h14 M5 5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M15 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5 M7 9v6 M11 9v6`
- **Thermometer**: `M8 9V2a1.5 1.5 0 0 0-3 0v7a2.5 2.5 0 1 0 3 0z`
- **Droplet**: `M7 2l3.5 4.5a5 5 0 1 1-7 0L7 2z`
- **Shield Check**: `M8 1l6 2.5v5c0 4.5-3.5 7.5-6 8.5-2.5-1-6-4-6-8.5v-5L8 1z M5 8.5l2 2 4-4`
- **Open Lid**: `M2 9l7-4 7 4 M4 13h10v4H4z`
- **Return Home**: `M2 7.5l7-5.5 7 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 2 15.5v-8z M6 17v-6h4v6`
- **Route Track**: `M3 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M15 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M3 10v-1a4 4 0 0 1 4-4h4 M11 5h4`
- **Telegram Plane**: `M19 1L1 9l7 3 2 7 3.5-4 5.5 4L19 1z`
- **Ready Checkmark**: `M10 1a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm-1.5 13l-4-4 1.4-1.4 2.6 2.6 6-6 1.4 1.4z`
- **Console Terminal**: `M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 3l3 2-3 2 M9 10h3`
