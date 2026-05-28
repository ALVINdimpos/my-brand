import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/250785767647",
    accent: "linear-gradient(90deg, #25d366 0%, #00cea8 100%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.52 3.48A11.83 11.83 0 0012.08 0C5.56 0 .23 5.33.23 11.85c0 2.09.55 4.13 1.59 5.92L0 24l6.41-1.68a11.82 11.82 0 005.67 1.45h.01c6.52 0 11.85-5.33 11.85-11.85 0-3.17-1.23-6.15-3.42-8.44zM12.09 21.7h-.01a9.8 9.8 0 01-5-1.37l-.36-.22-3.8 1 1.01-3.7-.24-.38a9.78 9.78 0 01-1.5-5.17c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.11 1.02 6.96 2.88a9.79 9.79 0 012.88 6.97c0 5.43-4.42 9.84-9.85 9.84zm5.4-7.37c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.69.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.66-.95-2.27-.25-.59-.5-.5-.69-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.89 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.29.5 1.73.64.73.23 1.39.2 1.91.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/ALVINdimpos",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fistonalvin/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alvin_coder",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/AlvinCoder",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    if (isSent) setIsSent(false);
    if (submitError) setSubmitError("");
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    try {
      if (
        !emailjsConfig.serviceId ||
        !emailjsConfig.templateId ||
        !emailjsConfig.publicKey
      ) {
        throw new Error("EmailJS is not configured");
      }

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          to_name: config.html.fullName,
          to_email: config.html.email,
          message: form.message,
          reply_to: form.email,
        },
        emailjsConfig.publicKey
      );

      setForm(INITIAL_STATE);
      formRef.current?.reset();
      setIsSent(true);
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Header — outside any card ── */}
      <div style={{ marginBottom: "12px" }}>
        <Header useMotion={true} p={config.contact.p} h2={config.contact.h2} />
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="text-secondary max-w-2xl text-[15px] leading-[26px]"
          style={{ marginTop: "6px" }}
        >
          {config.contact.content}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
          className="mt-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/45">
            Reach me directly
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            {socials.map((social) => {
              const isWhatsapp = social.label === "WhatsApp";

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                    isWhatsapp
                      ? "border-transparent text-white shadow-lg shadow-black/20"
                      : "border-white/10 bg-white/[0.03] text-white/75 hover:border-[#bf61ff]/30 hover:bg-white/[0.06] hover:text-white"
                  }`}
                  style={
                    isWhatsapp
                      ? {
                          background: social.accent,
                        }
                      : undefined
                  }
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                  <span>{social.label}</span>
                  {isWhatsapp ? (
                    <span className="text-white/85">+250 785 767 647</span>
                  ) : null}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Form card + Earth in the same row ── */}
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center">

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black-100 rounded-2xl p-8 xl:w-[44%] xl:shrink-0"
        >
          {isSent ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-start gap-3 rounded-xl border border-[#00cea8]/30 bg-[#00cea8]/10 px-4 py-3"
              role="status"
              aria-live="polite"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00cea8] text-xs font-bold text-black">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Message sent successfully!</p>
                <p className="mt-1 text-sm text-white/70">
                  Thank you for reaching out. I&apos;ve received your message and will get back to you as soon as possible.
                </p>
              </div>
            </motion.div>
          ) : null}

          {submitError ? (
            <div
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3"
              role="alert"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-black">
                !
              </span>
              <p className="text-sm text-white/90">{submitError}</p>
            </div>
          ) : null}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {/* Name */}
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {config.contact.form.name.span}
                <span className="ml-1 text-[#00cea8]">*</span>
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={config.contact.form.name.placeholder}
                required
                className="bg-tertiary placeholder:text-secondary rounded-lg border border-white/5 px-4 py-3 text-sm font-medium text-white outline-none focus:border-[#00cea8]/40 focus:ring-1 focus:ring-[#00cea8]/30"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {config.contact.form.email.span}
                <span className="ml-1 text-[#00cea8]">*</span>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={config.contact.form.email.placeholder}
                required
                className="bg-tertiary placeholder:text-secondary rounded-lg border border-white/5 px-4 py-3 text-sm font-medium text-white outline-none focus:border-[#00cea8]/40 focus:ring-1 focus:ring-[#00cea8]/30"
              />
            </label>

            {/* Message */}
            <label className="col-span-1 flex flex-col gap-2 sm:col-span-2">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {config.contact.form.message.span}
                <span className="ml-1 text-[#00cea8]">*</span>
              </span>
              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder={config.contact.form.message.placeholder}
                required
                className="bg-tertiary placeholder:text-secondary resize-none rounded-lg border border-white/5 px-4 py-3 text-sm font-medium text-white outline-none focus:border-[#00cea8]/40 focus:ring-1 focus:ring-[#00cea8]/30"
              />
            </label>

            {/* Submit */}
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-md shadow-black/40 outline-none transition hover:brightness-110"
                style={{ background: "linear-gradient(90deg, #804dee 0%, #bf61ff 100%)" }}
              >
                {loading ? "Sending…" : "Send message →"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Earth — no background, big */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="h-[480px] md:h-[600px] xl:h-[650px] xl:flex-1"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
