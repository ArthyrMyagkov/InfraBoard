"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaEnvelope, FaGithub, FaLinkedin, FaTelegramPlane, FaCheck } from "react-icons/fa";
import { useUserStore } from "../stores/userStore";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const [editing, setEditing] = useState(false);

  const handleChange = (
    field: keyof typeof user,
    value: string,
    subField: keyof typeof user.social | null = null
  ) => {
    if (subField) {
      updateUser({ social: { ...user.social, [subField]: value } });
    } else {
      updateUser({ [field]: value });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950 font-sans transition-colors duration-300 p-6">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col md:flex-row items-center md:items-start gap-8 p-10 text-center md:text-left rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/30 dark:border-zinc-700/50 max-w-4xl w-full"
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-shrink-0 relative w-40 h-40 md:w-48 md:h-48"
        >
          {editing ? (
            <input
              type="text"
              value={user.avatar}
              onChange={(e) => handleChange("avatar", e.target.value)}
              className="rounded-full shadow-xl object-cover w-full h-full text-center"
            />
          ) : (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="rounded-full shadow-xl object-cover w-full h-full"
            />
          )}
        </motion.div>

        <div className="flex flex-col justify-center gap-4 w-full">

          <div className="flex flex-row justify-center md:justify-between items-center gap-4">
            {editing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 w-full"
              />
            ) : (
              <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">{user.name}</h1>
            )}
            <button onClick={() => setEditing(!editing)}>
              {editing ? (
                <FaCheck className="text-green-600 cursor-pointer text-3xl hover:opacity-80" />
              ) : (
                <FaEdit className="text-indigo-600 dark:text-indigo-400 cursor-pointer text-3xl hover:opacity-80" />
              )}
            </button>
          </div>

          {editing ? (
            <>
              <input
                type="text"
                value={user.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="text-zinc-700 dark:text-zinc-400 w-full"
              />
              <input
                type="text"
                value={user.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="text-zinc-700 dark:text-zinc-400 w-full"
              />
              <input
                type="text"
                value={user.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="text-zinc-600 dark:text-zinc-500 text-sm w-full"
              />
              <textarea
                value={user.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="mt-2 text-zinc-700 dark:text-zinc-400 w-full rounded-lg p-2 border border-zinc-300 dark:border-zinc-700"
              />
              {/* Social links */}
              {Object.keys(user.social).map((key) => (
                <input
                  key={key}
                  type="text"
                  value={user.social[key as keyof typeof user.social]}
                  onChange={(e) => handleChange("social", e.target.value, key as keyof typeof user.social)}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="mt-2 text-zinc-600 dark:text-zinc-400 w-full rounded-lg p-2 border border-zinc-300 dark:border-zinc-700"
                />
              ))}
            </>
          ) : (
            <>
              <p className="text-zinc-700 dark:text-zinc-400">{user.title} | {user.company}</p>
              <p className="text-zinc-600 dark:text-zinc-500 text-sm">Location: {user.location}</p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-400">{user.description}</p>
            </>
          )}

          <div className="flex gap-6 mt-4 text-2xl text-zinc-600 dark:text-zinc-400">
            <a href={`mailto:${user.social.email}`}><FaEnvelope /></a>
            <a href={user.social.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href={user.social.telegram} target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
