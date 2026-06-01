/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Sun, Moon, GraduationCap, Calculator, Calendar, 
  Activity, Clock, ArrowRightLeft, BookOpen, Percent, 
  CheckSquare, Award, AlertCircle, Share2, Compass, CheckCircle2,
  Sparkles, Zap, Shield, TrendingUp, Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TOOLS_LIST, CATEGORIES, ToolData } from "@/lib/tools-data";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [shareToast, setShareToast] = useState("");

  // Soundless toast alert for copy functions
  const triggerToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => setShareToast(""), 3000);
  };

  // Safe client theme initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("student_tools_theme");
      if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setTheme("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("student_tools_theme", next);
  };

  // Multi-filtering logic
  const filteredTools = TOOLS_LIST.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                          tool.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingTools = TOOLS_LIST.filter(t => t.trending);
  const popularTools = TOOLS_LIST.filter(t => t.popular);

  const getToolIcon = (slug: string) => {
    switch (slug) {
      case "percentage-to-cgpa":
      case "cgpa-to-percentage":
      case "gpa-to-cgpa":
        return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case "sgpa-to-cgpa":
      case "semester-cgpa":
        return <BookOpen className="w-5 h-5 text-sky-500" />;
      case "percentage":
      case "marks-percentage":
      case "percentage-increase-decrease":
        return <Percent className="w-5 h-5 text-emerald-500" />;
      case "attendance":
        return <Compass className="w-5 h-5 text-violet-500" />;
      case "required-marks":
        return <CheckSquare className="w-5 h-5 text-amber-500" />;
      case "grade":
        return <Award className="w-5 h-5 text-purple-500" />;
      case "age-calculator-for-exams":
        return <Calendar className="w-5 h-5 text-pink-500" />;
      case "scientific-calculator":
        return <Calculator className="w-5 h-5 text-blue-500" />;
      case "unit-converter":
        return <ArrowRightLeft className="w-5 h-5 text-teal-500" />;
      case "bmi-calculator":
        return <Activity className="w-5 h-5 text-rose-500" />;
      case "study-timer":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "exam-countdown-timer":
        return <Clock className="w-5 h-5 text-red-500" />;
      default:
        return <Calculator className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getBentoCardClasses = (t: ToolData) => {
    let classes = "group relative border shadow-sm transition-all duration-300 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden ";
    
    // Varying layout spans for a real asymmetric Bento Grid look
    if (t.slug === "percentage-to-cgpa" || t.slug === "attendance" || t.slug === "exam-countdown-timer") {
      classes += "sm:col-span-2 ";
    } else {
      classes += "col-span-1 ";
    }

    // High contrast light/dark bento colorings according to Bento Grid Theme spec
    if (t.category === "Health Tools") {
      classes += "bg-teal-50/50 border-teal-150/60 dark:bg-teal-950/15 dark:border-teal-900/40 text-slate-800 dark:text-teal-100 hover:bg-teal-100/40 dark:hover:bg-teal-950/25 hover:border-teal-300/40";
    } else if (t.category === "Exam Tools") {
      classes += "bg-rose-50/50 border-rose-150/60 dark:bg-rose-950/15 dark:border-rose-900/40 text-slate-800 dark:text-rose-100 hover:bg-rose-100/40 dark:hover:bg-rose-950/25 hover:border-rose-300/40";
    } else if (t.slug === "study-timer") {
      classes += "bg-amber-50/50 border-amber-150/60 dark:bg-amber-950/15 dark:border-amber-900/40 text-slate-800 dark:text-amber-100 hover:bg-amber-100/40 dark:hover:bg-amber-950/25 hover:border-amber-300/40";
    } else if (t.trending || t.popular) {
      classes += "bg-indigo-50/30 border-indigo-100/50 dark:bg-indigo-950/10 dark:border-indigo-900/30 text-slate-800 dark:text-indigo-100 hover:bg-indigo-100/20 dark:hover:bg-indigo-950/20 hover:border-indigo-300/40";
    } else {
      classes += "bg-white dark:bg-slate-900 border-slate-200/55 dark:border-slate-850 hover:border-indigo-400/40 dark:hover:border-indigo-900/40 hover:shadow-md hover:bg-slate-50/20 dark:hover:bg-slate-900/70 text-slate-800 dark:text-slate-105";
    }
    
    return classes;
  };

  const getIconContainerStyles = (t: ToolData) => {
    if (t.category === "Health Tools") {
      return "p-2.5 bg-white dark:bg-slate-950 text-teal-650 dark:text-teal-400 rounded-xl shadow-xs border border-teal-100 dark:border-teal-900/30";
    } else if (t.category === "Exam Tools") {
      return "p-2.5 bg-white dark:bg-slate-950 text-rose-650 dark:text-rose-400 rounded-xl shadow-xs border border-rose-100 dark:border-rose-900/30";
    } else if (t.slug === "study-timer") {
      return "p-2.5 bg-white dark:bg-slate-950 text-amber-650 dark:text-amber-450 rounded-xl shadow-xs border border-amber-100 dark:border-amber-900/30";
    } else {
      return "p-2.5 bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 rounded-xl shadow-xs border border-slate-150/40 dark:border-slate-800";
    }
  };

  const getCardBadge = (t: ToolData) => {
    if (t.slug === "percentage-to-cgpa") {
      return (
        <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-100/80 dark:text-indigo-300 dark:bg-indigo-950 px-2.5 py-1 rounded-lg">
          Most Popular
        </span>
      );
    } else if (t.slug === "attendance") {
      return (
        <span className="text-[9px] font-black uppercase text-violet-700 bg-violet-105/80 dark:text-violet-300 dark:bg-violet-950 px-2.5 py-1 rounded-lg">
          75% Target
        </span>
      );
    } else if (t.slug === "exam-countdown-timer") {
      return (
        <span className="text-[9px] font-black uppercase text-rose-700 bg-rose-105/80 dark:text-rose-300 dark:bg-rose-950 px-2.5 py-1 rounded-lg">
          Exams Live
        </span>
      );
    } else if (t.trending) {
      return (
        <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-100/80 dark:text-emerald-300 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
          Trending
        </span>
      );
    }
    return null;
  };

  return (
    <div className={theme === "dark" ? "dark bg-slate-950 text-slate-100 min-h-screen" : "bg-slate-50 text-slate-900 min-h-screen transition-colors duration-200"}>
      
      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md">
              S
            </span>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Student Tools<span className="text-indigo-600 font-semibold"> Hub</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Quick Dark Mode Toggle */}
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

      {/* Header Anchor Ad Placement */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <AdPlaceholder type="header" />
      </section>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          {/* Subtle Accent Badging */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/30 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Free Indian Student Utilities & Translators
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-4">
            Dynamic Mathematical Calculators for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 dark:from-indigo-450 dark:via-sky-400 dark:to-emerald-400">Indian Classrooms</span>
          </h1>

          <p className="text-sm md:text-md text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8 font-medium">
            Formulated based on CBSE, ICSE, and major state university guidelines. Check GPA equivalents, track attendance limits, calculate age criteria, and access helpful converters instantly.
          </p>

          {/* Elastic Search Tool Bar */}
          <div className="relative max-w-lg mx-auto mb-6">
            <span className="absolute left-4 top-3.5 text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search e.g. Attendance, CGPA, Pomodoro, Scientific..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-150 focus:border-indigo-500 dark:focus:ring-indigo-950 text-sm font-semibold text-slate-850 dark:text-white"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-3.5 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Core Body (Grid, Filters, Sidebar Ads) */}
      <main className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Category Navigator and Tools List */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Categories Pill Boxes */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === "All"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none"
                  : "bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              }`}
            >
              All Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none"
                    : "bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bento Grid Tool Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  key={tool.slug}
                  className={getBentoCardClasses(tool)}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className={getIconContainerStyles(tool)}>
                        {getToolIcon(tool.slug)}
                      </div>
                      {getCardBadge(tool)}
                    </div>

                    <h3 className="text-base font-bold text-slate-800 dark:text-white mt-5 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {tool.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {tool.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-slate-800/50 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {tool.category}
                    </span>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 flex items-center gap-1 bg-white/70 hover:bg-slate-50 border border-slate-200/50 dark:bg-slate-950 dark:border-slate-800 px-3.5 py-1.5 rounded-full transition-all"
                    >
                      Calculate Now →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredTools.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400 font-extrabold uppercase tracking-wider bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-850 rounded-[2rem] shadow-xs">
                No tools found matching your descriptors. Try searching another term!
              </div>
            )}
          </div>

          {/* In-content responsive ad placeholder */}
          <div className="py-2">
            <AdPlaceholder type="in-content" className="max-w-xl" />
          </div>

          {/* General Editorial SEO Section */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg md:text-xl font-extrabold leading-tight tracking-tight text-slate-850 dark:text-white flex items-center gap-1.5 col-span-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-500 font-extrabold text-xs">
                ?
              </span>
              Why Students Trust Student Tools Hub
            </h2>

            <p className="text-xs md:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
              Academic calculations in secondary, high-school, and Indian engineering colleges (like VTU, KTU, Mumbai University, AKTU, SPPU, etc.) rely on diverse grading guidelines. Standard global calculators overlook local requirements such as the <strong>CBSE 9.5 multiplier rule</strong> for CGPA or the highly specific <strong>75% Class Attendance shortages</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-white">CBSE Conforming</span>
                  <p className="text-xxs text-slate-450 mt-1 uppercase">CGPA and percentage mappings strictly reflect CBSE circular guidelines.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-white">Bunk Smart Advice</span>
                  <p className="text-xxs text-slate-450 mt-1 uppercase">Determine exact counts to safely skip lectures while maintaining 75% target thresholds.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-white">100% Offline-Safe</span>
                  <p className="text-xxs text-slate-450 mt-1 uppercase">All mathematical parsers execute locally within your device browser. Your academic data is never shared.</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Side: Sidebar Ad and Trending panel */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* High-traffic popular side tools */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              ⚡ Popular Tools
            </h3>
            <div className="space-y-3">
              {popularTools.slice(0, 5).map((t) => (
                <Link 
                  key={t.slug} 
                  href={`/${t.slug}`}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-950 border border-transparent hover:border-slate-100/40 transition-all text-left"
                >
                  <div className="p-2 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500 rounded-lg">
                    {getToolIcon(t.slug)}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-350">{t.name}</span>
                    <span className="text-[10px] text-slate-450 mt-0.5 font-bold uppercase">{t.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Sidebar Ad banner */}
          <div className="sticky top-20">
            <AdPlaceholder type="sidebar" />
          </div>

        </aside>

      </main>

      {/* Global general FAQ Section */}
      <section className="bg-slate-100 dark:bg-slate-905 border-t border-slate-250/20 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center mb-8 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/45 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase mb-2">How do I calculate my overall grade point average (CGPA)?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Essentially, your university SGPA is multiply mapped against registered credit hours per term, yielding overall aggregated indices. Use our dedicated <strong>SGPA to CGPA Calculator</strong> for direct weighted results!
              </p>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/45 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase mb-2">Are calculations compliant with State Boards?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Yes, our system scales accurately align with CBSE Secondary Grade conversions, state examination count schedules, WHO BMI calculations, and metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner Placement */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <AdPlaceholder type="footer" />
      </section>

      {/* Modern footer details */}
      <footer className="border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-white">
              Student Tools<span className="text-indigo-600"> Hub</span>
            </span>
            <p className="text-xxs text-slate-400 uppercase mt-1">
              © {new Date().getFullYear()} Student Tools Hub. Crafted for accuracy and lightning speed.
            </p>
          </div>
          <div className="flex gap-4 text-xxs font-extrabold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-indigo-500">All Tools</Link>
            <span className="cursor-pointer hover:text-indigo-500">Privacy Policy</span>
            <span className="cursor-pointer hover:text-indigo-500">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Dynamic Soundless Copy/Share Alerts (Toasts) */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 max-w-sm"
          >
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xxs font-bold uppercase truncate pr-2">
              Result Copied!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
