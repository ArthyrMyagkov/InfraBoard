"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEllipsisH } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaFlipboard } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";


const columnColors = {
  green: "bg-green-400",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  orange: "bg-orange-400",
  teal: "bg-teal-400",
  gray: "bg-gray-400",
};

const backgrounds = {
  green: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  pink: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  purple: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  yellow: "bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400",
  standart: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
};

interface Task {
  id: number;
  title: string;
  description?: string;
  expiryDate: Date | string;
  comments?: string[];
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
  createdAt: Date | string;
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
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskExpiry, setNewTaskExpiry] = useState("");
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState("");


  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") {setContextMenu(null)}; };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const addTask = () => {
    if (!selectedColumnId || !newTaskTitle.trim()) return;

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === selectedColumnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: Date.now(),
                  title: newTaskTitle,
                  description: newTaskDescription,
                  expiryDate: newTaskExpiry || new Date().toISOString().slice(0, 10),
                },
              ],
            }
          : col
      ),
    }));

    setNewTaskModalOpen(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskExpiry("");
    setSelectedColumnId(null);
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

    const handleOpenTask = (task: Task) => setSelectedTask(task);
  const handleCloseTask = () => setSelectedTask(null);

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTask) return;
    const updatedTask = {
      ...selectedTask,
      comments: [...(selectedTask.comments || []), newComment],
    };
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      })),
    }));
    setSelectedTask(updatedTask);
    setNewComment("");
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-8 ${board.background} font-sans`}>

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

      <div className="flex gap-6 w-full overflow-x-auto py-2 flex-row items-start">
        {board.columns.map((col) => (
          <div key={col.id} className={`min-w-[250px] h-full flex-shrink-0 rounded-xl p-4 ${col.color} shadow-md`}>
            <h2 className="font-semibold text-lg mb-4 flex flex-row justify-between items-start">{col.name} <FaEllipsisH className="cursor-pointer hover:opacity-80" /></h2> 
            <div className="flex flex-col gap-3">
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  onContextMenu={(e) => handleContextMenu(e, task.id)}
                  onClick={() => handleOpenTask(task)}
                  className="p-3 rounded-lg bg-white/80 dark:bg-zinc-800 shadow cursor-pointer flex justify-between items-center hover:opacity-95 transition-opacity"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Due: {task.expiryDate}</p>
                  </div>
                  <BsThreeDotsVertical className="cursor-pointer hover:opacity-80" />
                </div>
              ))}
              <button
                className="flex cursor-pointer items-center gap-2 mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                onClick={() => {
                  setSelectedColumnId(col.id);
                  setNewTaskModalOpen(true);
                }}
              >
                <FaPlus /> Add Task
              </button>
            </div>
          </div>
        ))}
        <button className="text-xl bg-black/70 px-4 py-2 rounded-xl cursor-pointer hover:opacity-80 flex flex-row justify-center items-center gap-2 font-semibold">+ Add column</button>
      </div>

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

            <AnimatePresence>
        {newTaskModalOpen && (
          <>
            {/* Тень за модалкой */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Модалка */}
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-bold mb-4 text-black">Create New Task</h3>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Task title"
                  className="border border-zinc-300 rounded-lg text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  className="border border-zinc-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <input
                  type="date"
                  className="border border-zinc-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newTaskExpiry}
                  onChange={(e) => setNewTaskExpiry(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setNewTaskModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 rounded-lg cursor-pointer bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  onClick={addTask}
                >
                  Add Task
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

            <AnimatePresence>
        {selectedTask && (
          <>
            {/* фон */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseTask}
            />
            {/* окно */}
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex justify-between items-start text-black">
                <h3 className="text-xl font-bold">{selectedTask.title}</h3>
                <button
                  onClick={handleCloseTask}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Due: {selectedTask.expiryDate}
              </p>

              {selectedTask.description && (
                <p className="mt-4 text-gray-800">
                  {selectedTask.description}
                </p>
              )}

              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-black">Comments</h4>
                <div className="max-h-40 overflow-y-auto space-y-2 mb-3">
                  {selectedTask.comments && selectedTask.comments.length > 0 ? (
                    selectedTask.comments.map((c, i) => (
                      <div
                        key={i}
                        className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700"
                      >
                        {c}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add comment..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
