"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaEllipsisH } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaFlipboard } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";


const columnColors = {
  green: "bg-green-400",
  orange: "bg-orange-400",
  blue: "bg-blue-400",
};

const backgrounds = {
  green: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
};

interface Task {
  id: number;
  title: string;
  expiryDate: string;
}

interface Column {
  id: number;
  name: string;
  color: string;
  tasks: Task[];
}

interface Board {
  id: number;
  name: string;
  createdAt: string;
  background: string;
  description: string;
  columns: Column[];
}

const sampleBoard: Board = {
  id: 1,
  name: "My first board",
  createdAt: "2025-10-24 10:32",
  background: backgrounds.green,
  description: "This is a sample board description.",
  columns: [
    {
      id: 1,
      name: "To Do",
      color: columnColors.blue,
      tasks: [
        { id: 1, title: "Write documentation", expiryDate: "2025-10-28" },
        { id: 2, title: "Fix navbar alignment", expiryDate: "2025-10-26" },
      ],
    },
    {
      id: 2,
      name: "In Progress",
      color: columnColors.orange,
      tasks: [
        { id: 3, title: "Integrate payment API", expiryDate: "2025-10-27" },
        { id: 4, title: "Create landing page", expiryDate: "2025-10-29" },
      ],
    },
    {
      id: 3,
      name: "Done",
      color: columnColors.green,
      tasks: [{ id: 5, title: "Setup project repo", expiryDate: "2025-10-23" }],
    },
  ],
};

export default function BoardPage() {
  const params = useParams();
  const id = params.id;

  const [board, setBoard] = useState(sampleBoard);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; taskId: number } | null>(null);

  // Закрытие контекстного меню при клике вне или Esc
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setContextMenu(null); };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const addTask = (colId: number) => {
    const title = prompt("Task title:");
    if (!title) return;

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === colId
          ? { ...col, tasks: [...col.tasks, { id: Date.now(), title, expiryDate: new Date().toISOString().slice(0, 10) }] }
          : col
      ),
    }));
  };

  const handleContextMenu = (e: React.MouseEvent, taskId: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, taskId });
  };

  const deleteTask = () => {
    if (!contextMenu) return;
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== contextMenu.taskId),
      })),
    }));
    setContextMenu(null);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-8 ${board.background} font-sans`}>
      {/* Заголовок и дата */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-2 mb-8 mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row gap-3 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 
                     bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-zinc-200/30 dark:border-zinc-700/50"
        >
          <FaFlipboard /> {board.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-row gap-2 items-center text-sm sm:text-base text-white dark:text-white 
                     bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-lg px-4 py-2 shadow-inner border border-zinc-200/20 dark:border-zinc-700/30"
        >
          <CiCalendarDate className="text-2xl" /> Created at: {board.createdAt}
        </motion.p>
      </div>

      {/* Колонки */}
      <div className="flex gap-6 w-full overflow-x-auto py-2">
        {board.columns.map((col) => (
          <div key={col.id} className={`min-w-[250px] h-full flex-shrink-0 rounded-xl p-4 ${col.color} shadow-md`}>
            <h2 className="font-semibold text-lg mb-4 flex flex-row justify-between items-start">{col.name} <FaEllipsisH /></h2> 
            <div className="flex flex-col gap-3">
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  onContextMenu={(e) => handleContextMenu(e, task.id)}
                  className="p-3 rounded-lg bg-white/80 dark:bg-zinc-800 shadow cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Due: {task.expiryDate}</p>
                  </div>
                  <BsThreeDotsVertical />
                </div>
              ))}
              <button
                className="flex cursor-pointer items-center gap-2 mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                onClick={() => addTask(col.id)}
              >
                <FaPlus /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Контекстное меню */}
      {contextMenu && (
        <div
          className="fixed bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg p-2 z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
            onClick={deleteTask}
          >
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
}
