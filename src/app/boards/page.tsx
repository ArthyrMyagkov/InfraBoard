"use client";
import { CiCirclePlus } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiTrash } from "react-icons/fi";
import {motion} from "framer-motion";
import Select from "react-select";
import { FaFlipboard } from "react-icons/fa";
import { PiColumnsPlusRightLight } from "react-icons/pi";
import { CiViewColumn } from "react-icons/ci";
import Image from "next/image";



export default function Board() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [myTeam, setMyTeam] = useState([
    { id: 1, name: "Alice Johnson", role: "Project Manager", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Bob Smith", role: "Developer", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
    { id: 3, name: "Catherine Lee", role: "Designer", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 4, name: "David Brown", role: "QA Engineer", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    ])
  
  
const [newColumns, setNewColumns] = useState([
  { name: "To Do", color: "blue" },
  { name: "In Progress", color: "yellow" },
  { name: "Done", color: "green" },
]);
const [backgrounds, setBackgrounds] = useState({
  green: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  pink: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  purple: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
  yellow: "bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400",
  standart: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
});
const [newBoardBackground, setNewBoardBackground] = useState("purple");

const [columnColors, setColumnColors] = useState({
  green: "bg-green-400",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  orange: "bg-orange-400",
  teal: "bg-teal-400",
  gray: "bg-gray-400",
});


const [boards, setBoards] = useState([
  {
    id: 1,
    name: "My first board",
    createdAt: "2025-10-24 10:32",
    background: backgrounds.green,
    team: [1],
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
        tasks: [
          { id: 5, title: "Setup project repo", expiryDate: "2025-10-23" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Project Alpha",
    createdAt: "2025-10-23 18:45",
    background: backgrounds.purple,
    team: [1, 2],
    columns: [
      {
        id: 1,
        name: "Backlog",
        color: columnColors.purple,
        tasks: [
          { id: 1, title: "User auth planning", expiryDate: "2025-10-30" },
        ],
      },
      {
        id: 2,
        name: "Development",
        color: columnColors.yellow,
        tasks: [
          { id: 2, title: "API endpoints", expiryDate: "2025-10-28" },
          { id: 3, title: "Database schema", expiryDate: "2025-10-25" },
        ],
      },
      {
        id: 3,
        name: "Testing",
        color: columnColors.blue,
        tasks: [
          { id: 4, title: "Unit tests for auth", expiryDate: "2025-10-29" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Dashboard",
    createdAt: "2025-10-22 14:10",
    background: backgrounds.pink,
    team: [3, 4],
    columns: [
      {
        id: 1,
        name: "Ideas",
        color: columnColors.pink,
        tasks: [
          { id: 1, title: "SEO content strategy", expiryDate: "2025-11-01" },
          { id: 2, title: "Ad campaign setup", expiryDate: "2025-10-31" },
        ],
      },
      {
        id: 2,
        name: "In Progress",
        color: columnColors.teal,
        tasks: [
          { id: 3, title: "Landing page analytics", expiryDate: "2025-10-29" },
        ],
      },
      {
        id: 3,
        name: "Completed",
        color: columnColors.green,
        tasks: [
          { id: 4, title: "Design mockups", expiryDate: "2025-10-20" },
        ],
      },
    ],
  },
]);

const [newBoardName, setNewBoardName] = useState(`My new board ${boards.length + 1}`);
const [selectedMembers, setSelectedMembers] = useState<any[]>([]);

  const handleDelete = (id: number) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
  };

  const handleCreateBoard = () => {
  if (!newBoardName.trim()) return;

const now = new Date();
const formattedDateTime = now.toLocaleString('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const board = {
  id: boards.length + 1,
  name: newBoardName,
  background: backgrounds[newBoardBackground] || backgrounds.standart,
  createdAt: formattedDateTime,
  team: selectedMembers.map((m) => m.value),
  columns: newColumns.map((col, idx) => ({
    id: idx + 1,
    name: col.name || `Column ${idx + 1}`,
    color: columnColors[col.color] || columnColors.blue,
    tasks: [],
  })),
};

  console.log("New board created:", board);

  setBoards((prev) => [...prev, board]);

    setNewBoardName(``);
    setNewColumns([
  { name: "To Do", color: "blue" },
  { name: "In Progress", color: "yellow" },
  { name: "Done", color: "green" },
]);
setSelectedMembers([]);
    setModalOpen(false);
    
  };

  
  const handleColumnChange = (index: number, field: "name" | "color", value: string) => {
    const updated = [...newColumns];
    updated[index][field] = value;
    setNewColumns(updated);
  };

    const handleBoardColorChange = (value: string) => {

    setNewBoardBackground(value);
  };

  const addColumn = () => setNewColumns([...newColumns, { name: "", color: "blue" }]);
  const removeColumn = (index: number) => setNewColumns(newColumns.filter((_, i) => i !== index));

  
const colorOptions = Object.entries(columnColors).map(([key, bgClass]) => ({
  value: key,
  label: key,
  color: bgClass,
}));

  const userOptions = myTeam.map(member => ({
    value: member.id,
    label: member.name,
    avatar: member.avatar,
    role: member.role,
  }));

const backgroundColorOptions = Object.entries(backgrounds).map(([key, bgClass]) => ({
  value: key,
  label: key,
  color: bgClass,
}));



  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950 font-sans transition-colors duration-300 px-4">
      <motion.h1
            initial={{ opacity: 0, y: 20, scale: 1.1 }}
    animate={{ opacity: 1, y: 0 , scale: 1}}
    transition={{
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOut",
    }}
      
      className="font-extrabold flex flex-row items-center justify-center gap-3 text-5xl text-gray-800 dark:text-gray-100 text-center">
        <FaFlipboard/> Your InfraBoards
      </motion.h1>
<div className="flex flex-row items-start justify-start gap-4 p-5 overflow-x-scroll w-full overflow-y-hidden">
      <div
        className="group shrink-0 w-80 h-40 rounded-3xl border-2 border-slate-300 dark:border-zinc-700 flex items-center justify-center shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer bg-white dark:bg-zinc-900"
        title="Create new board"
        onClick={() => setModalOpen(true)}
      >
        <CiCirclePlus className="h-16 w-16 text-gray-400 dark:text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
      </div>

            {/* Модальное окно */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-96 shadow-lg max-h-[90vh] overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex flex-row items-center gap-2">
              <FaFlipboard/> Create New Board
            </h2>

            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board name"
              className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded mb-4 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
            />

            <Select
  value={backgroundColorOptions.find(o => o.value === newBoardBackground)}
  onChange={(selected) => handleBoardColorChange(selected?.value || newBoardBackground)}
  options={backgroundColorOptions}
  className="cursor-pointer w-40"
  formatOptionLabel={(option) => (
    <div className="flex items-center gap-2 cursor-pointer text-black">
      <span className={`w-4 h-4 rounded-full ${option.color}`}></span>
      {option.label}
    </div>
  )}
/>
<h3 className="font-semibold text-gray-700 dark:text-gray-200 mt-2">Team members</h3>
    <div className="w-80 mt-2">
<Select
  isMulti
  value={selectedMembers}
  onChange={(selected) => setSelectedMembers(selected || [])}
  options={userOptions}
  className="cursor-pointer"
  formatOptionLabel={(option) => (
    <div className="flex items-center gap-2 cursor-pointer text-black">

      <img
        src={option.avatar}
        alt={option.label}
        width={34}
        height={34}
        className="rounded-full"
      />
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-500">{option.role}</div>
      </div>
    </div>
  )}
/>
    </div>

            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mt-2 mb-2">Columns</h3>
            {newColumns.map((col, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={col.name}
                  onChange={(e) => handleColumnChange(idx, "name", e.target.value)}
                  placeholder={`Column ${idx + 1} name`}
                  className="w-40 p-2  border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
                />
<Select
  value={colorOptions.find(o => o.value === col.color)}
  onChange={(selected) => handleColumnChange(idx, "color", selected?.value || "blue")}
  options={colorOptions}
  className="cursor-pointer w-40"
  formatOptionLabel={(option) => (
    <div className="flex items-center gap-2 cursor-pointer text-black">
      <span className={`w-4 h-4 rounded-full ${option.color}`}></span>
      {option.label}
    </div>
  )}
/>
                {newColumns.length > 1 && (
                  <button
                    onClick={() => removeColumn(idx)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    <FiTrash className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addColumn}
              className="mb-4 cursor-pointer flex flex-row items-center justify-center gap-2 text-blue-500 hover:text-blue-700 font-semibold"
            >
              +  Add column <CiViewColumn  className="w-5 h-5" />
            </button>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
{[...boards].reverse().map((board, index) => (
  <motion.div
      initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1, 
      ease: "easeInOut",
    }}
    key={board.id}
    className="relative group shrink-0 w-80 h-40 rounded-3xl border-2 border-slate-300 dark:border-zinc-700 flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md overflow-hidden p-4"
    title={`Open board: ${board.name} \nTeam members: ${board.team.length}`}
  >

    <div className={`absolute inset-0 flex gap-2 justify-center items-center opacity-40 blur-md pointer-events-none ${board.background}`}>
      {board.columns?.map((col) => (
        <div
          key={col.id}
          style={{ backgroundColor: col.color }}
          className={`w-8 h-24 rounded-xl ${col.color}`}
        ></div>
      ))}
    </div>


    <Link
      href={`/board/${board.id}`}
      className="relative flex flex-col items-center justify-center h-full w-full z-10"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 transition-colors text-center">
        {board.name}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Created at: {board.createdAt}
      </p>
    </Link>

    {/* Кнопка удаления */}
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDelete(board.id);
      }}
      className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-20"
      title="Delete board"
    >
      <FiTrash className="w-5 h-5" />
    </button>
  </motion.div>
))}
</div>
    </div>
  );
}
