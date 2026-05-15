import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { fadeIn } from "../../utils/motion";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thank you. I will get back to you as soon as possible!", {
            position: "top-right",
            style: { fontSize: "16px", fontWeight: "bold", marginTop: "100px" },
          });
          setForm(INITIAL_STATE);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          toast.error("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Header — outside any card ── */}
      <div style={{ marginBottom: "12px" }}>
        <Header useMotion={true} p={config.contact.p} h2={config.contact.h2} />
        <motion.p
          variants={fadeIn("", "", 0.15, 0.9)}
          className="text-secondary max-w-2xl text-[15px] leading-[26px]"
          style={{ marginTop: "6px" }}
        >
          {config.contact.content}
        </motion.p>
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
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {/* Name */}
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {config.contact.form.name.span}
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={config.contact.form.name.placeholder}
                className="bg-tertiary placeholder:text-secondary rounded-lg border border-white/5 px-4 py-3 text-sm font-medium text-white outline-none focus:border-[#00cea8]/40 focus:ring-1 focus:ring-[#00cea8]/30"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {config.contact.form.email.span}
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={config.contact.form.email.placeholder}
                className="bg-tertiary placeholder:text-secondary rounded-lg border border-white/5 px-4 py-3 text-sm font-medium text-white outline-none focus:border-[#00cea8]/40 focus:ring-1 focus:ring-[#00cea8]/30"
              />
            </label>

            {/* Message */}
            <label className="col-span-1 flex flex-col gap-2 sm:col-span-2">
              <span className="text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {config.contact.form.message.span}
              </span>
              <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder={config.contact.form.message.placeholder}
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

      <ToastContainer />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
