"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiGrid, FiInfo, FiMail } from "react-icons/fi";
import { FaFlipboard } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import DefaultImage from '../../../public/images/default.jpg';
import Logo from '../../../public/images/logo.png';
import Image from "next/image";
import { useUserStore } from "../stores/userStore";

export default function Header() {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: `John has joined to board "Project Alpha"`, avatar: DefaultImage, time: "2m ago" },
    { id: 2, text: "Your board 'Project Alpha' was updated.", avatar: Logo, time: "10m ago" },
    { id: 4, text: "Server maintenance scheduled for tomorrow at 2 AM.", avatar: Logo, time: "3h ago" },
    { id: 5, text: "Your subscription will expire in 3 days.", avatar: Logo, time: "1d ago" },
    { id: 6, text: "New user 'Michael' joined your team.", avatar: DefaultImage, time: "2d ago" },
  ]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-row items-center justify-between px-4 py-1.5 gap-3 relative">
        <Link href="/" className="flex items-center space-x-2">
          <FaFlipboard className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-blue-600">InfraBoard</h1>
        </Link>

        <nav className="flex items-center space-x-5">
          <Link href="/boards" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors space-x-1">
            <FiGrid className="w-5 h-5" />
          </Link>

          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!isNotificationsOpen)}
              className="flex items-center text-gray-700 cursor-pointer hover:text-blue-600 font-medium transition-colors space-x-1"
            >
              <IoIosNotificationsOutline className="w-5 h-5" />
            </button>

{isNotificationsOpen && (
  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg p-4 z-50 animate-fade-in">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Notifications</h2>


      {notifications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No notifications</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
{notifications.map((item) => (
  <li
    key={item.id}
    className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <Image
        src={item.avatar}
        alt="Avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-gray-700 text-sm dark:text-gray-200">{item.text}</span>
    </div>

    <div className="flex flex-col items-end text-right text-[11px] text-gray-400 dark:text-gray-500 min-w-[60px]">
      <span>{item.time}</span>
      <span className="text-gray-300 dark:text-gray-600">{item.date}</span>
    </div>
  </li>
))}
        </ul>
      )}
  </div>
)}
          </div>

          <Link href="/about" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors space-x-1">
            <FiInfo className="w-5 h-5" />
          </Link>
          <Link href="/contact" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors space-x-1">
            <FiMail className="w-5 h-5" />
          </Link>

          <Link href="/profile">
            <Image
              src={user.avatar || DefaultImage}
              alt="Login Icon"
              width={26}
              height={26}
              className="rounded-full hover:border-2 hover:border-blue-600"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
