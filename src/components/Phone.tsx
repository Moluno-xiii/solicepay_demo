import type { ReactNode } from "react";
import { PiBatteryFullFill, PiCellSignalHighFill, PiWifiHighFill } from "react-icons/pi";

type PhoneProps = {
  children: ReactNode;
  time?: string;
  /** label that appears as a small annotation tag below the phone */
  caption?: string;
  /** decorative number e.g. "01" rendered as a serif glyph next to the phone */
  step?: string;
  className?: string;
};

/**
 * A phone frame. Renders an iPhone-style device with a notch and status bar,
 * suitable for showcasing screens in a marketing layout.
 */
export function Phone({ children, time = "9:41", caption, step, className }: PhoneProps) {
  return (
    <div className={`relative inline-flex flex-col items-center ${className ?? ""}`}>
      {step && (
        <div
          className="font-display-soft pointer-events-none absolute -top-6 -left-12 text-[140px] leading-none hidden sm:block lg:text-[180px]"
          style={{
            color: "var(--color-paper-3)",
            fontVariationSettings: '"opsz" 144, "SOFT" 100, "wght" 400',
            mixBlendMode: "multiply",
          }}
        >
          {step}
        </div>
      )}
      <div className="device w-full max-w-[320px]">
        <div className="device-screen no-scrollbar">
          <div className="status-bar">
            <span>{time}</span>
            <div className="flex items-center gap-1">
              <PiCellSignalHighFill size={13} />
              <PiWifiHighFill size={13} />
              <PiBatteryFullFill size={16} />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
      {caption && (
        <div className="tiny-caps mt-5 max-w-[280px] text-center" style={{ color: "var(--color-ink-3)" }}>
          {caption}
        </div>
      )}
    </div>
  );
}
