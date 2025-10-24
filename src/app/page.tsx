"use client";
import Link from "next/link";
import {motion} from "framer-motion";
import { FaFlipboard } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950 font-sans transition-colors duration-300">
      <motion.main initial={{opacity:0}} animate={{opacity:1}} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }} className="flex flex-col items-center justify-center p-10 text-center rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-700/50 max-w-xl w-full">
        <h1 className="text-5xl flex flex-row items-center gap-3 font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          <FaFlipboard/> InfraBoard
        </h1>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }} className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">
          A modern task management app built with Next.js and TypeScript — fast, responsive, and easy to use. <br /> (in process of development)
        </motion.p>

        <div className="mt-10 flex space-x-4">
<Link
  href="/boards"
  className="relative inline-block rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700 px-7 py-3 text-white font-semibold tracking-wide shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300
             before:absolute before:inset-0 before:rounded-xl before:bg-white before:opacity-0 before:transition-opacity hover:before:opacity-10"
>
  See Boards
</Link>

          <Link
            href={'/about'}
            className="rounded-xl cursor-pointer border border-zinc-300 dark:border-zinc-700 px-6 py-3 font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </motion.main>
    </div>
  );
}
