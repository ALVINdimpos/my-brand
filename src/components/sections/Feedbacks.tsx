import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { fadeIn } from "../../utils/motion";
import { testimonials } from "../../constants";
import { Header } from "../atoms/Header";
import { TTestimonial } from "../../types";
import { config } from "../../constants/config";

/** Acronym or first two initials for avatar fallback */
function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() ?? "?";
}

const STAR_COLORS = ["#ffe066", "#ffd633", "#ffcc29", "#ffc41f", "#f5af19"];

const StarsRow = () => (
  <div className="flex gap-1" aria-hidden>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={String(i)}
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={STAR_COLORS[i]}
      >
        <path d="M12 3.3l2.18 6.71h7.06l-5.72 4.15 2.18 6.71L12 16.71l-5.72 4.15 2.18-6.71L2.74 10h7.06L12 3.3z" />
      </svg>
    ))}
  </div>
);

const cardAccents = [
  { from: "#6b8f71", to: "#5a7560" },
  { from: "#c4a35a", to: "#a88642" },
  { from: "#b87d5c", to: "#9a6a4f" },
] as const;

const FeedbackCard: React.FC<{ index: number } & TTestimonial> = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => {
  const accent = cardAccents[index % cardAccents.length];
  const hasPhoto = typeof image === "string" && image.length > 0;
  const initials = initialsFromName(name);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.35, 0.75)}
      style={{ display: "flex", flex: 1 }}
    >
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareColor="#9a9488"
        glareMaxOpacity={0.12}
        scale={1.02}
        transitionSpeed={1500}
        style={{ display: "flex", width: "100%" }}
      >
        <div className="card-shell group/card relative flex w-full overflow-hidden">
          <figure className="relative flex w-full flex-col overflow-hidden p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover/card:opacity-45"
              style={{
                background: `radial-gradient(circle, ${accent.from} 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex items-start justify-between gap-4">
              <StarsRow />

              <div
                aria-hidden
                className="select-none font-serif text-[76px] font-black leading-none text-white/[0.06]"
                style={{ color: `${accent.from}22` }}
              >
                “
              </div>
            </div>

            <blockquote className="relative z-10 mt-2 flex-1">
              <p className="text-secondary text-[16px] font-light leading-[28px] tracking-wide">
                <span className="font-medium text-white/95">{testimonial}</span>
              </p>
            </blockquote>

            <div
              aria-hidden
              className="relative z-10 my-8 h-px w-full rounded-full opacity-40"
              style={{ background: accent.from }}
            />

            <figcaption className="relative z-10 flex items-center gap-4">
              {hasPhoto ? (
                <img
                  src={image}
                  alt={name}
                  className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover ring-2 ring-white/10"
                />
              ) : (
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-inner ring-2 ring-white/10"
                  style={{ background: accent.from }}
                  aria-hidden
                >
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <cite className="not-italic">
                  <p
                    className="truncate text-[17px] font-semibold tracking-tight"
                    style={{ color: accent.from }}
                  >
                    {name}
                  </p>
                </cite>
                <p className="text-secondary mt-1 truncate text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
                  {designation}
                  <span className="text-white/35"> · </span>
                  {company}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-16 sm:py-16">
      {/* Header — no background card */}
      <Header useMotion={true} {...config.sections.feedbacks} />
      <motion.p
        variants={fadeIn("", "", 0.15, 0.9)}
        className="text-secondary mt-4 max-w-2xl text-[15px] leading-[26px]"
      >
        Real words from collaborators and clients. Every partnership is built
        on clarity, consistency, and results.
      </motion.p>

      {/* Cards — stack on mobile, row on desktop */}
      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-stretch">
        {testimonials.map((t, index) => (
          <FeedbackCard key={t.name} index={index} {...t} />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
