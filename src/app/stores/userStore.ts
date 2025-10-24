import { create } from "zustand";

interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  telegram: string;
}

interface User {
  name: string;
  title: string;
  company: string;
  location: string;
  description: string;
  avatar: string;
  social: SocialLinks;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
  updateUser: (partial: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: "Michał Kowalski",
    title: "Full-stack Developer",
    company: "RandomCompany Inc.",
    location: "Wrocław, Poland",
    description:
      "Currently focusing on web application development, performance optimization, and user-friendly design. Loves tackling challenging projects and learning new technologies.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    social: {
      email: "example@email.com",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      telegram: "https://t.me/",
    },
  },
  setUser: (user) => set({ user }),
  updateUser: (partial) => set((state) => ({ user: { ...state.user, ...partial } })),
}));
