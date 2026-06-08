import React from "react";

type BrandTextProps = {
  text: string;
  size?: "nav" | "hero" | "footer";
  className?: string;
};

const sizeClasses = {
  nav: "text-[17px] tracking-[0.14em]",
  hero: "text-[40px] xs:text-[50px] sm:text-[64px] lg:text-[84px] leading-[1.05] tracking-tight",
  footer: "text-xl tracking-tight",
} as const;

/** Splits the last word for an editorial accent — used for brand + personal names */
function splitDisplayName(text: string) {
  const parts = text.trim().split(/\s+/);
  if (parts.length < 2) {
    return { lead: text, accent: "" };
  }

  return {
    lead: parts.slice(0, -1).join(" "),
    accent: parts[parts.length - 1] ?? "",
  };
}

export const BrandText: React.FC<BrandTextProps> = ({
  text,
  size = "nav",
  className = "",
}) => {
  const { lead, accent } = splitDisplayName(text);
  const isNav = size === "nav";
  const displayAccent =
    isNav && accent
      ? accent.charAt(0) + accent.slice(1).toLowerCase()
      : accent;

  if (!accent) {
    return (
      <span className={`font-display font-semibold text-accent ${sizeClasses[size]} ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span
      className={`font-display inline-flex flex-wrap items-baseline gap-x-2 font-semibold ${sizeClasses[size]} ${className}`}
    >
      <span className={isNav ? "uppercase text-white" : "text-white"}>{lead}</span>
      <span className="font-display italic text-accent normal-case tracking-normal">
        {displayAccent}
      </span>
    </span>
  );
};
