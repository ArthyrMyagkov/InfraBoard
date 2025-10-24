"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegramPlane, FaGlobe } from "react-icons/fa"

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950 font-sans transition-colors duration-300 p-6">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center p-10 text-center rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-700/50 max-w-2xl w-full"
      >
        {/* Name & Role */}
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">
          Artur Miahkyi
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
          FullStack Web Developer
        </p>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4 max-w-md">
          Have a question, suggestion, or collaboration idea? I’d love to hear from you.
          Drop me a message anytime!
        </p>

        <p className="text-md text-zinc-700 dark:text-zinc-300 italic mb-2">
          I’m also <strong>open to job opportunities</strong> — especially in web
          development, frontend, or full-stack roles. Let’s work together!
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            🚀 Always learning, building, and improving — let’s create something amazing.
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            ✨ Open to ideas, collaborations, and new projects.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            📍 Based in Wrocław, Poland
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-6 mt-6 text-3xl text-zinc-600 dark:text-zinc-400"
        >
          <a
            href="mailto:artur.global.biz@gmail.com"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/ArthyrMyagkov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/artur-miahkyi-3a8805134"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://t.me/axios_http"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FaTelegramPlane />
          </a>
            <a
    href="https://arthyrmyagkov.github.io/MyCV"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
  ><FaGlobe /></a>
        </motion.div>
      </motion.main>
    </div>
  );
}
