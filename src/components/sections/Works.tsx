import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden
  >
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
    aria-hidden
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  image,
  sourceCodeLink,
  liveSiteLink,
  category,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="flex w-full sm:w-[360px]"
    >
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        glareColor="#aaa6c3"
        glareMaxOpacity={0.15}
        scale={1.02}
        transitionSpeed={1500}
        className="flex w-full"
      >
        <div className="green-pink-gradient shadow-card group/card relative flex w-full overflow-hidden rounded-[22px] p-[1.5px]">
          <div className="bg-tertiary relative flex w-full flex-col overflow-hidden rounded-[21px]">
            <div className="relative h-[230px] w-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/40 to-transparent opacity-90" />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(191,97,255,0.25) 0%, transparent 60%)",
                }}
              />

              {category && (
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                    {category}
                  </span>
                </div>
              )}

              <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 -translate-y-2">
                {liveSiteLink ? (
                  <button
                    type="button"
                    onClick={() => window.open(liveSiteLink, "_blank")}
                    aria-label={`Open ${name} live site`}
                    className="green-pink-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-lg shadow-black/40 transition-transform hover:scale-110"
                  >
                    <ExternalLinkIcon />
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => window.open(sourceCodeLink, "_blank")}
                  aria-label={`Open ${name} source code on GitHub`}
                  className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-lg shadow-black/40 transition-transform hover:scale-110"
                >
                  <GithubIcon />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] w-full">
                <div className="green-pink-gradient h-full w-full opacity-80" />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[22px] font-bold leading-tight text-white transition-colors duration-300 group-hover/card:text-[#00cea8]">
                {name}
              </h3>

              <p className="text-secondary mt-3 flex-1 text-[14px] leading-[22px]">
                {description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                <a
                  href={sourceCodeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group/cta inline-flex items-center gap-2 text-[13px] font-semibold text-white/80 transition-colors hover:text-white"
                >
                  <GithubIcon />
                  <span>Source</span>
                </a>

                {liveSiteLink ? (
                  <a
                    href={liveSiteLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group/cta inline-flex items-center gap-2 text-[13px] font-semibold"
                    style={{
                      background:
                        "linear-gradient(90deg, #00cea8 0%, #bf61ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <span>Visit site</span>
                    <ArrowRightIcon />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap items-stretch justify-center gap-8 lg:justify-start">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
