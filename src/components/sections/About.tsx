import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import type { TService, TServiceIcon } from "../../types";

const ServiceIcon: React.FC<{
  type: TServiceIcon;
  color: string;
}> = ({ type, color }) => {
  const stroke = color;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke={stroke}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14"
      aria-hidden
    >

      {type === "code" && (
        <>
          <rect x="6" y="10" width="52" height="40" rx="6" />
          <path d="M6 20 H58" />
          <circle cx="12" cy="15" r="1.2" fill={stroke} stroke="none" />
          <circle cx="16" cy="15" r="1.2" fill={stroke} stroke="none" />
          <circle cx="20" cy="15" r="1.2" fill={stroke} stroke="none" />
          <path d="M22 30 L16 36 L22 42" />
          <path d="M42 30 L48 36 L42 42" />
          <path d="M36 28 L28 44" />
        </>
      )}

      {type === "mentor" && (
        <>
          <path d="M4 24 L32 12 L60 24 L32 36 Z" />
          <path d="M14 28 V42 C14 42 22 48 32 48 C42 48 50 42 50 42 V28" />
          <path d="M60 24 V40" />
          <circle cx="60" cy="44" r="2.4" fill={stroke} stroke="none" />
        </>
      )}

      {type === "bot" && (
        <>
          <path d="M32 6 V12" />
          <circle cx="32" cy="6" r="1.6" fill={stroke} stroke="none" />
          <rect x="10" y="14" width="44" height="32" rx="8" />
          <circle cx="22" cy="28" r="3.2" />
          <circle cx="42" cy="28" r="3.2" />
          <path d="M24 38 H40" />
          <path d="M16 50 V56" />
          <path d="M48 50 V56" />
          <path d="M2 26 V36" />
          <path d="M62 26 V36" />
        </>
      )}
    </svg>
  );
};

const ServiceCard: React.FC<{ index: number; service: TService }> = ({
  index,
  service,
}) => {
  return (
    <Tilt
      glareEnable
      tiltEnable
      tiltMaxAngleX={18}
      tiltMaxAngleY={18}
      glareColor="#9a9488"
      glareMaxOpacity={0.15}
      scale={1.02}
      transitionSpeed={1500}
      className="xs:w-[320px] flex w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.35, 0.75)}
        className="card-shell group relative flex w-full overflow-hidden"
      >
        <div className="relative flex min-h-[440px] w-full flex-col overflow-hidden p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 blur-3xl transition-all duration-500 group-hover:opacity-30"
            style={{
              background: `radial-gradient(circle, ${service.accentFrom} 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 flex items-start justify-between">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
              style={{
                boxShadow: `0 0 30px -8px ${service.accentFrom}55`,
              }}
            >
              <ServiceIcon type={service.iconType} color={service.accentFrom} />
            </div>

            <span
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm"
              style={{
                color: service.accentFrom,
                borderColor: `${service.accentFrom}40`,
              }}
            >
              {service.tag}
            </span>
          </div>

          <div className="relative z-10 mt-8">
            <h3
              className="text-[26px] font-bold leading-tight"
              style={{ color: service.accentFrom }}
            >
              {service.title}
            </h3>
            <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.18em] text-white/50">
              {service.subtitle}
            </p>
          </div>

          <p className="text-secondary relative z-10 mt-5 text-[14px] leading-[24px]">
            {service.description}
          </p>

          <ul className="relative z-10 mt-6 space-y-2.5">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[13px] leading-[20px] text-white/85"
              >
                <span
                  aria-hidden
                  className="mt-[6px] inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  style={{
                    background: service.accentFrom,
                  }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className="relative z-10 mt-auto pt-6"
          >
            <div
              className="h-px w-full rounded-full opacity-40"
              style={{ background: service.accentFrom }}
            />
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
      >
        {config.sections.about.content}
      </motion.p>

      <div className="mt-20 flex flex-wrap items-stretch justify-center gap-8 lg:justify-start">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} service={service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
