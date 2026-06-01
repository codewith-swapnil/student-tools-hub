/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, ArrowLeft, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ToolData } from "@/lib/tools-data";
import { AdPlaceholder } from "@/components/ad-placeholder";

interface ToolClientWrapperProps {
  children: React.ReactNode;
  tool: ToolData;
}

export default function ToolClientWrapper({ children, tool }: ToolClientWrapperProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toastMsg, setToastMsg] = useState("");

  // Theme support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("student_tools_theme");
      if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setTheme("dark");
      }

      // Hook share messages specifically
      const handleCustomShare = (e: Event) => {
        const customEv = e as CustomEvent;
        if (customEv.detail) {
          setToastMsg(customEv.detail);
          setTimeout(() => setToastMsg(""), 3000);
        }
      };
      window.addEventListener("share_result_copied", handleCustomShare);
      return () => window.removeEventListener("share_result_copied", handleCustomShare);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("student_tools_theme", next);
  };

  return (
    <div className={theme === "dark" ? "dark bg-slate-950 text-slate-100 min-h-screen" : "bg-slate-50 text-slate-900 min-h-screen transition-colors duration-200"}>
      
      {/* Dynamic Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white mr-1.5 bg-slate-100/70 hover:bg-slate-200/50 dark:bg-slate-900 dark:hover:bg-slate-850 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Tools
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                S
              </span>
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white hidden sm:inline">
                Student Tools<span className="text-indigo-600 font-semibold"> Hub</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        {children}
      </main>

      {/* Footer Banner Slot Ad Placed */}
      <section className="max-w-7xl mx-auto px-4 py-4 text-center mt-6">
        <AdPlaceholder type="footer" />
      </section>

      {/* Modern footer details */}
      <footer className="border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-white">
              Student Tools<span className="text-indigo-600 font-semibold"> Hub</span>
            </span>
            <p className="text-xxs text-slate-400 uppercase mt-1">
              © {new Date().getFullYear()} Student Tools Hub. Accurate mathematical converters matching Indian boards.
            </p>
          </div>
          <div className="flex gap-4 text-xxs font-extrabold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-indigo-500">All Tools</Link>
            <span className="cursor-pointer hover:text-indigo-500">Privacy Policy</span>
            <span className="cursor-pointer hover:text-indigo-500">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Soundless Toast notifications from wrappers */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-55 px-4 py-3 bg-slate-900 dark:bg-slate-850 border border-slate-700/60 text-white rounded-xl shadow-xl flex items-center gap-2 max-w-sm"
          >
            <Info className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
            <div className="text-xxs font-extrabold uppercase truncate pr-1">
              Copied Share Link!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
