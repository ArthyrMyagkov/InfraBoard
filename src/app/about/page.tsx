"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFlipboard } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";



export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950 font-sans transition-colors duration-300 p-6">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col md:flex-row items-center justify-center gap-10 p-10 text-center md:text-left rounded-2xl shadow-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-700/50 max-w-5xl w-full"
      >
        {/* Photo */}
{/* Photo */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="flex-shrink-0 relative h-[520px] w-[340px]"
>
  <Image
    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
    alt="InfraBoard concept image"
    fill
    className="rounded-2xl shadow-xl object-cover"
  />
</motion.div>

        {/* Text */}
        <div>
          <h1 className="text-5xl flex flex-row gap-4 font-extrabold text-zinc-900 dark:text-zinc-100 mb-5">
            <FaFlipboard/> About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">InfraBoard</span>
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-400 leading-relaxed">
            <strong>InfraBoard</strong> is a modern and intuitive task management
            platform built with <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>Zustand</strong> and
            <strong> PostgreSQL (coming soon)</strong>. It’s designed to make your workflow
            smarter — combining speed, clarity, and flexibility in one place.
          </p>

          <p className="mt-4 text-zinc-700 dark:text-zinc-400 leading-relaxed">
            With its clean UI, fluid animations, and real-time capabilities, InfraBoard
            gives teams and individuals the tools they need to plan, organize, and execute
            their work seamlessly. The architecture is focused on <em>performance</em>,
            <em> scalability</em>, and <em>simplicity</em>, ensuring the app grows with your
            projects — not against them.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
              My Vision
            </h2>
            <p className="text-zinc-700 dark:text-zinc-400 leading-relaxed mb-6">
              I believe productivity tools should empower people, not overwhelm them.
              InfraBoard is built around that idea — a minimalist yet powerful solution
              that keeps teams aligned, focused, and inspired. The goal is to remove the
              noise, so you can focus on what really matters: <strong>creating results</strong>.
            </p>
            <motion.blockquote
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.9, duration: 0.6, ease: "easeInOut" }}
  className="mt-8 border-l-4 border-indigo-500 pl-4 italic text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed"
>
  “Nothing more, nothing less — just right.”
  <footer className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
    — <span className="font-semibold">Artur Miahkyi</span>
  </footer>
</motion.blockquote>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-4 w-full justify-center md:justify-start">
            <a
              href="/boards"
              className="inline-block rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-3 text-white font-semibold tracking-wide shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Boards
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border gap-2 flex flex-row items-center justify-center border-zinc-300 dark:border-zinc-700 px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
            >
              <FaGithub className="text-xl" /> View Source
            </a>
                        <a
              href="/contact"
              
              rel="noopener noreferrer"
              className="rounded-xl border gap-2 flex flex-row items-center justify-center border-zinc-300 dark:border-zinc-700 px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
            >
              <IoIosMail className="text-xl" /> Contact me
            </a>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
