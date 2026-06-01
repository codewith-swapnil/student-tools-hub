import React from "react";

interface AdPlaceholderProps {
  type: "header" | "sidebar" | "in-content" | "footer";
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, className = "" }) => {
  const getStyles = () => {
    switch (type) {
      case "header":
        return {
          dimension: "w-full min-h-[90px] max-w-[728px]",
          label: "Header Leaderboard Ad Slot (728x90)",
        };
      case "sidebar":
        return {
          dimension: "w-full min-h-[300px] lg:min-h-[600px] max-w-[300px]",
          label: "Sidebar Ad Slot (300x600)",
        };
      case "in-content":
        return {
          dimension: "w-full min-h-[250px] max-w-[336px]",
          label: "In-Content Responsive Ad Slot",
        };
      case "footer":
        return {
          dimension: "w-full min-h-[90px] max-w-[970px]",
          label: "Footer Mega-Banner Ad Slot (970x90)",
        };
    }
  };

  const info = getStyles();

  return (
    <div 
      className={`relative mx-auto flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/60 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 p-4 text-center select-none ${info.dimension} ${className}`}
      style={{ contentVisibility: "auto" }}
    >
      <span className="absolute top-2 right-3 text-[9px] font-extrabold uppercase tracking-widest text-indigo-400">
        AD BANNER SLOT
      </span>
      <div className="flex flex-col items-center gap-1.5 opacity-65">
        <div className="w-5 h-5 flex items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 font-black text-[10px] border border-indigo-100/30">
          $
        </div>
        <p className="text-[10px] font-bold text-slate-500 font-mono">
          {info.label}
        </p>
        <p className="text-[9px] text-slate-400 leading-normal max-w-[200px]">
          Optimized placement for Google AdSense monetization.
        </p>
      </div>
    </div>
  );
};
