/* eslint-disable react-hooks/set-state-in-effect, react-hooks/immutability, react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Copy, Share2, RotateCcw, AlertCircle, Plus, Trash2, 
  ArrowRightLeft, Volume2, VolumeX, Timer, Play, Pause, Square
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
interface CalculatorProps {
  onShare?: (msg: string) => void;
}

// --- Common UI Helper Components ---
const ActionButtons: React.FC<{
  onReset: () => void;
  onCopy: () => void;
  onShare: () => void;
  copyFeedback: boolean;
}> = ({ onReset, onCopy, onShare, copyFeedback }) => (
  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 justify-end">
    <button
      onClick={onReset}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
      title="Reset Input Fields"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Reset
    </button>
    <button
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40 dark:text-indigo-400 rounded-lg transition-colors cursor-pointer"
      title="Copy Calculated Result"
    >
      <Copy className="w-3.5 h-3.5" />
      {copyFeedback ? "Copied!" : "Copy Result"}
    </button>
    <button
      onClick={onShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 dark:text-emerald-400 rounded-lg transition-colors cursor-pointer"
      title="Share Your Score"
    >
      <Share2 className="w-3.5 h-3.5" />
      Share
    </button>
  </div>
);

// Helper to copy text & display share toast
const useCopyHelper = (textToCopy: string, shareMessage: string, onShare?: (msg: string) => void) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(shareMessage);
    onShare?.(shareMessage);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("share_result_copied", { detail: shareMessage }));
    }
  };

  return { copyFeedback, handleCopy, handleShare };
};

// ==========================================
// 1. PERCENTAGE TO CGPA CALCULATOR
// ==========================================
export const PercentageToCGPA: React.FC<CalculatorProps> = ({ onShare }) => {
  const [percentage, setPercentage] = useState<string>("85.5");
  const numVal = parseFloat(percentage) || 0;
  
  const cgpa = numVal > 0 && numVal <= 100 ? (numVal / 9.5).toFixed(2) : "0.00";
  const normalizedPercentage = Math.min(100, Math.max(0, numVal));

  const getDivision = (g: number) => {
    if (g >= 9.0) return { label: "First Class with Distinction (Outstanding)", color: "text-emerald-600 dark:text-emerald-400" };
    if (g >= 7.5) return { label: "First Class with Distinction", color: "text-blue-600 dark:text-blue-400" };
    if (g >= 6.5) return { label: "First Class", color: "text-indigo-600 dark:text-indigo-400" };
    if (g >= 5.0) return { label: "Second Class", color: "text-amber-600 dark:text-amber-400" };
    if (g >= 4.0) return { label: "Pass Class", color: "text-slate-500" };
    return { label: "Needs Improvement", color: "text-rose-500" };
  };
  const division = getDivision(parseFloat(cgpa));

  const shareText = `I converted my Percentage to CGPA! Result: ${percentage}% = ${cgpa} CGPA (CBSE scaling). Calculate yours here: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(cgpa, shareText, onShare);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Enter Percentage %</label>
        <div className="relative">
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            placeholder="e.g. 85.5"
          />
          <span className="absolute right-3 top-2.5 text-slate-400 font-medium">%</span>
        </div>
        <input 
          type="range"
          min="0"
          max="100"
          value={normalizedPercentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="w-full mt-3 accent-indigo-600"
        />
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
        <span className="block text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">Equivalent CGPA Scale</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-100">{cgpa}</span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/ 10.0</span>
        </div>
        {numVal > 0 && numVal <= 100 && (
          <p className="text-xs font-semibold mt-2">
            Classification Class: <span className={division.color}>{division.label}</span>
          </p>
        )}
      </div>

      <ActionButtons 
        onReset={() => setPercentage("")} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 2. CGPA TO PERCENTAGE CALCULATOR
// ==========================================
export const CGPAToPercentage: React.FC<CalculatorProps> = ({ onShare }) => {
  const [cgpa, setCgpa] = useState<string>("8.5");
  const numVal = parseFloat(cgpa) || 0;

  const percentage = numVal > 0 && numVal <= 10 ? (numVal * 9.5).toFixed(2) : "0.00";
  const normalizedCgpa = Math.min(10, Math.max(0, numVal));

  const shareText = `Converted my CGPA of ${cgpa} to standard Board marks Percentage! Result: ${percentage}%. Calculate yours at: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(`${percentage}%`, shareText, onShare);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Enter CGPA (Scale 0-10)</label>
        <div className="relative">
          <input
            type="number"
            min="0"
            max="10"
            step="0.01"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            placeholder="e.g. 8.5"
          />
          <span className="absolute right-3 top-2.5 text-slate-400 font-medium">/ 10</span>
        </div>
        <input 
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={normalizedCgpa}
          onChange={(e) => setCgpa(e.target.value)}
          className="w-full mt-3 accent-indigo-600"
        />
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
        <span className="block text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">Percentage of Marks</span>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-100">{percentage}</span>
          <span className="text-lg font-bold text-indigo-500">%</span>
        </div>
        <p className="text-xs text-slate-500 mt-1.5">Formula: {cgpa || "0"} × 9.5 = {percentage}%</p>
      </div>

      <ActionButtons 
        onReset={() => setCgpa("")} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 3. GPA TO CGPA CALCULATOR
// ==========================================
export const GPAToCGPA: React.FC<CalculatorProps> = ({ onShare }) => {
  const [gpa, setGpa] = useState<string>("3.6");
  const [maxGpa, setMaxGpa] = useState<string>("4.0");

  const valGpa = parseFloat(gpa) || 0;
  const valMax = parseFloat(maxGpa) || 4.0;

  const cgpa = valMax > 0 && valGpa <= valMax ? ((valGpa / valMax) * 10).toFixed(2) : "0.00";

  const shareText = `Converted US GPA of ${gpa}/${maxGpa} to Indian university CGPA equivalent: ${cgpa}/10. Try it: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(cgpa, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your GPA</label>
          <input
            type="number"
            step="0.01"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-center"
            placeholder="e.g. 3.6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Out of (Max)</label>
          <select
            value={maxGpa}
            onChange={(e) => setMaxGpa(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-center"
          >
            <option value="4.0">4.0 (US Scale)</option>
            <option value="5.0">5.0 Scale</option>
            <option value="7.0">7.0 Scale</option>
            <option value="10.0">10.0 Scale</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
        <span className="block text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">Converted Cumulative CGPA</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-100">{cgpa}</span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/ 10.0</span>
        </div>
      </div>

      <ActionButtons 
        onReset={() => { setGpa(""); setMaxGpa("4.0"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 4. SGPA TO CGPA CALCULATOR
// ==========================================
export const SGPAToCGPA: React.FC<CalculatorProps> = ({ onShare }) => {
  const [sems, setSems] = useState<{ id: number; sgpa: string; credits: string }[]>([
    { id: 1, sgpa: "8.2", credits: "20" },
    { id: 2, sgpa: "8.5", credits: "22" },
  ]);

  const addSem = () => {
    if (sems.length >= 8) return;
    setSems([...sems, { id: sems.length + 1, sgpa: "", credits: "20" }]);
  };

  const removeSem = (id: number) => {
    if (sems.length <= 1) return;
    setSems(sems.filter(s => s.id !== id).map((s, idx) => ({ ...s, id: idx + 1 })));
  };

  const updateSem = (id: number, key: "sgpa" | "credits", val: string) => {
    setSems(sems.map(s => s.id === id ? { ...s, [key]: val } : s));
  };

  let totalCredits = 0;
  let weightedPoints = 0;
  let simpleSum = 0;
  let validCount = 0;

  sems.forEach(s => {
    const sVal = parseFloat(s.sgpa);
    const cVal = parseFloat(s.credits) || 1;
    if (!isNaN(sVal) && sVal >= 0 && sVal <= 10) {
      weightedPoints += sVal * cVal;
      totalCredits += cVal;
      simpleSum += sVal;
      validCount++;
    }
  });

  const cgpaSimple = validCount > 0 ? (simpleSum / validCount).toFixed(2) : "0.00";
  const cgpaWeighted = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : "0.00";

  const shareText = `My calculated university Cumulative CGPA across Semesters is ${cgpaWeighted}. Compute yours: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(cgpaWeighted, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {sems.map((sem) => (
          <div key={sem.id} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="w-14 text-xs font-semibold text-slate-500">Sem {sem.id}</span>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="SGPA (0-10)"
              value={sem.sgpa}
              onChange={(e) => updateSem(sem.id, "sgpa", e.target.value)}
              className="flex-1 min-w-0 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium text-center"
            />
            <input
              type="number"
              placeholder="Credits"
              value={sem.credits}
              onChange={(e) => updateSem(sem.id, "credits", e.target.value)}
              className="w-16 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none text-center"
            />
            <button
              onClick={() => removeSem(sem.id)}
              disabled={sems.length <= 1}
              className="text-slate-400 hover:text-rose-500 disabled:opacity-35 cursor-pointer p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSem}
        disabled={sems.length >= 8}
        className="w-full flex items-center justify-center gap-1.5 py-2 border-2 border-dashed border-indigo-100 hover:border-indigo-400 dark:border-slate-800 dark:hover:border-slate-600 rounded-xl text-xs font-semibold text-indigo-500 dark:text-indigo-400 transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Next Semester
      </button>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Simple Average</span>
          <span className="text-xl font-bold text-slate-700 dark:text-slate-200">{cgpaSimple}</span>
        </div>
        <div className="p-3 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
          <span className="block text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase">Weighted CGPA</span>
          <span className="text-xl font-bold text-indigo-800 dark:text-indigo-100">{cgpaWeighted}</span>
        </div>
      </div>

      <ActionButtons 
        onReset={() => setSems([{ id: 1, sgpa: "", credits: "20" }, { id: 2, sgpa: "", credits: "22" }])} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 5. PERCENTAGE CALCULATOR
// ==========================================
export const Percentage: React.FC<CalculatorProps> = ({ onShare }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  // Tab 0: What is X% of Y?
  const [x1, setX1] = useState<string>("15");
  const [y1, setY1] = useState<string>("200");
  const res1 = ((parseFloat(x1) || 0) / 100) * (parseFloat(y1) || 0);

  // Tab 1: X is what % of Y?
  const [x2, setX2] = useState<string>("30");
  const [y2, setY2] = useState<string>("150");
  const res2 = (parseFloat(y2) || 0) !== 0 ? (((parseFloat(x2) || 0) / (parseFloat(y2) || 1)) * 100) : 0;

  // Render & Logic
  const getResultString = () => {
    if (activeTab === 0) return `${x1}% of ${y1} is ${res1.toFixed(2)}`;
    return `${x2} is ${res2.toFixed(2)}% of ${y2}`;
  };

  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(
    getResultString(), 
    `Calculated with Percentage Calculator: ${getResultString()}. Run rapid maths here: `, 
    onShare
  );

  return (
    <div className="space-y-4">
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 0 
              ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          What is X% of Y?
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            activeTab === 1 
              ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          X is what % of Y?
        </button>
      </div>

      {activeTab === 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">X value (%)</label>
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                placeholder="15"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Y value (Total)</label>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                placeholder="200"
              />
            </div>
          </div>
          <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30 rounded-xl text-center">
            <span className="block text-xxs font-bold text-slate-400 uppercase mb-0.5 font-mono">Result</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{res1.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">X value (Part)</label>
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Y value (Whole)</label>
              <input
                type="number"
                value={y2}
                onChange={(e) => setY2(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                placeholder="150"
              />
            </div>
          </div>
          <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30 rounded-xl text-center">
            <span className="block text-xxs font-bold text-slate-400 uppercase mb-0.5 font-mono">Result</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{res2.toFixed(2)}%</span>
          </div>
        </div>
      )}

      <ActionButtons 
        onReset={() => { setX1("15"); setY1("200"); setX2("30"); setY2("150"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 6. MARKS PERCENTAGE CALCULATOR
// ==========================================
export const MarksPercentage: React.FC<CalculatorProps> = ({ onShare }) => {
  const [tab, setTab] = useState<number>(0);
  
  // Simple Mode
  const [score, setScore] = useState<string>("485");
  const [total, setTotal] = useState<string>("600");
  
  // Subject mode
  const [subjects, setSubjects] = useState<{ id: number; name: string; marks: string; maxMarks: string }[]>([
    { id: 1, name: "English", marks: "82", maxMarks: "100" },
    { id: 2, name: "Mathematics", marks: "95", maxMarks: "100" },
    { id: 3, name: "Physics", marks: "88", maxMarks: "100" },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: "", marks: "", maxMarks: "100" }]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: number, key: "name" | "marks" | "maxMarks", val: string) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [key]: val } : s));
  };

  const calcSimple = () => {
    const sVal = parseFloat(score) || 0;
    const tVal = parseFloat(total) || 1;
    return (sVal / tVal) * 100;
  };

  const getSubjectResults = () => {
    let obtained = 0;
    let totalMax = 0;
    subjects.forEach(s => {
      obtained += parseFloat(s.marks) || 0;
      totalMax += parseFloat(s.maxMarks) || 0;
    });
    const percentage = totalMax > 0 ? (obtained / totalMax) * 100 : 0;
    return { obtained, totalMax, percentage };
  };

  const activeRes = tab === 0 ? calcSimple() : getSubjectResults().percentage;

  const shareText = `Calculated my Overall Board Marks Exam Percentage: ${activeRes.toFixed(2)}%. Compiles easily at: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(`${activeRes.toFixed(2)}%`, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
        <button
          onClick={() => setTab(0)}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            tab === 0 
              ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Quick Score
        </button>
        <button
          onClick={() => setTab(1)}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            tab === 1 
              ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Subject-wise Marksheet
        </button>
      </div>

      {tab === 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Marks Obtained</label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                placeholder="485"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Maximum Marks</label>
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                placeholder="600"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {subjects.map((sub, idx) => (
              <div key={sub.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Subject ${idx+1}`}
                  value={sub.name}
                  onChange={(e) => updateSubject(sub.id, "name", e.target.value)}
                  className="flex-1 min-w-0 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium"
                />
                <input
                  type="number"
                  placeholder="Obtained"
                  value={sub.marks}
                  onChange={(e) => updateSubject(sub.id, "marks", e.target.value)}
                  className="w-16 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-center font-medium"
                />
                <span className="text-slate-450 text-xs">/</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={sub.maxMarks}
                  onChange={(e) => updateSubject(sub.id, "maxMarks", e.target.value)}
                  className="w-16 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-center font-medium"
                />
                <button
                  onClick={() => removeSubject(sub.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                  disabled={subjects.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addSubject}
            className="w-full flex items-center justify-center gap-1 py-1.5 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xxs font-bold text-slate-500 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Subject
          </button>
        </div>
      )}

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
        <span className="block text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">AGGREGATE SCORE</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-indigo-950 dark:text-indigo-100">{activeRes.toFixed(2)}%</span>
        </div>
        {tab === 1 && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Total Aggregate: {getSubjectResults().obtained} out of {getSubjectResults().totalMax} marks.
          </p>
        )}
      </div>

      <ActionButtons 
        onReset={() => {
          setScore("485"); setTotal("600");
          setSubjects([
            { id: 1, name: "English", marks: "", maxMarks: "100" },
            { id: 2, name: "Mathematics", marks: "", maxMarks: "100" },
            { id: 3, name: "Science", marks: "", maxMarks: "100" },
          ]);
        }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 7. ATTENDANCE CALCULATOR
// ==========================================
export const Attendance: React.FC<CalculatorProps> = ({ onShare }) => {
  const [present, setPresent] = useState<string>("38");
  const [total, setTotal] = useState<string>("50");
  const [target, setTarget] = useState<string>("75");

  const valPres = parseInt(present) || 0;
  const valTot = parseInt(total) || 0;
  const valTarget = parseInt(target) || 75;

  const currentPercent = valTot > 0 ? (valPres / valTot) * 100 : 0;

  // Calculators:
  let statusText = "";
  let successCondition = true;

  if (valTot <= 0) {
    statusText = "Enter class parameters to estimate attendance.";
  } else if (valPres > valTot) {
    statusText = "Attended classes cannot exceed total classes conducted.";
    successCondition = false;
  } else if (currentPercent < valTarget) {
    // Need more classes
    // (Present + x) / (Total + x) >= Target / 100
    // => x = ceil( (Target*Total - 100*Present) / (100 - Target) )
    const required = Math.ceil((valTarget * valTot - 100 * valPres) / (100 - valTarget));
    statusText = `You need to attend ${required} consecutive classes to cross ${valTarget}% attendance. DO NOT BUNK!`;
    successCondition = false;
  } else {
    // Can miss classes
    // Present / (Total + y) >= Target / 100
    // => y = floor( (100*Present - Target*Total) / Target )
    const canBunk = Math.floor((100 * valPres - valTarget * valTot) / valTarget);
    statusText = canBunk > 0 
      ? `You can safely bunk up to ${canBunk} classes consecutively. Keep an eye, but enjoy!` 
      : `You're exactly on the borderline. Do not bunk any classes!`;
    successCondition = true;
  }

  const shareText = `Computed my attendance using Attendance Bunk Calculator! Current: ${currentPercent.toFixed(1)}%. Recommendation: ${statusText}. Try here: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(
    `Current: ${currentPercent.toFixed(1)}% | ${statusText}`, 
    shareText, 
    onShare
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-350 mb-1">Attended Classes</label>
          <input
            type="number"
            value={present}
            onChange={(e) => setPresent(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-center"
            placeholder="e.g. 38"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-350 mb-1">Total Conducted</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-center"
            placeholder="e.g. 50"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-semibold mb-1 text-slate-500">
          <span>Desired Attendance Target</span>
          <span>{valTarget}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="95"
          step="5"
          value={valTarget}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>

      <div className={`p-4 rounded-xl border ${
        valPres > valTot 
          ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200/50" 
          : successCondition 
            ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100/50" 
            : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-100/50"
      }`}>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Current Attendance</span>
          <span className={`text-2xl font-black ${successCondition ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
            {currentPercent.toFixed(1)}%
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-250 leading-relaxed">
          {statusText}
        </p>
      </div>

      <ActionButtons 
        onReset={() => { setPresent("38"); setTotal("50"); setTarget("75"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 8. REQUIRED MARKS CALCULATOR
// ==========================================
export const RequiredMarks: React.FC<CalculatorProps> = ({ onShare }) => {
  const [current, setCurrent] = useState<string>("72");
  const [weight, setWeight] = useState<string>("40");
  const [target, setTarget] = useState<string>("80");

  const curVal = parseFloat(current) || 0;
  const wVal = parseFloat(weight) || 40;
  const tVal = parseFloat(target) || 80;

  // Final score needed
  // Target = Current * (1 - Weight) + Finals * Weight
  // => Finals = (Target - Current * (1 - Weight)) / Weight
  const decimalWeight = wVal / 100;
  const reqScore = decimalWeight > 0 ? (tVal - curVal * (1 - decimalWeight)) / decimalWeight : 0;

  const valid = reqScore <= 100 && reqScore >= 0;

  let advice = "";
  if (reqScore > 100) {
    advice = "⚠️ High Aim: This is mathematically impossible unless extra credit is awarded.";
  } else if (reqScore < 0) {
    advice = "🎉 Secure Pass: You are already guaranteed to beat this benchmark! Feel free to relax.";
  } else {
    advice = `You need to score at least ${reqScore.toFixed(1)}% on your upcoming exam to secure an overall grade of ${target}%.`;
  }

  const shareText = `Determined my needed final exam benchmarks! Needed: ${reqScore.toFixed(1)}% for goal ${target}%. Details: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(`${reqScore.toFixed(1)}%`, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Current %</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-center"
            placeholder="72"
          />
        </div>
        <div>
          <label className="block text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Final Exam Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-center"
            placeholder="40"
          />
        </div>
        <div>
          <label className="block text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Target %</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-center"
            placeholder="80"
          />
        </div>
      </div>

      <div className={`p-4 rounded-xl border ${valid ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100/50" : "bg-rose-50 dark:bg-rose-950/20 border-rose-200/30"}`}>
        <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1.5">Required Final Exam Score</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {reqScore > 100 ? "N/A" : reqScore < 0 ? "0%" : `${reqScore.toFixed(1)}%`}
          </span>
        </div>
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          {advice}
        </p>
      </div>

      <ActionButtons 
        onReset={() => { setCurrent("72"); setWeight("40"); setTarget("80"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 9. GRADE CALCULATOR
// ==========================================
export const Grade: React.FC<CalculatorProps> = ({ onShare }) => {
  const [score, setScore] = useState<string>("82");
  const [scale, setScale] = useState<string>("CBSE");

  const val = parseFloat(score) || 0;

  const getCBSEGrade = (s: number) => {
    if (s >= 91) return { grade: "A1", point: "10", desc: "Top 1/8th of passed candidates" };
    if (s >= 81) return { grade: "A2", point: "9", desc: "Next 1/8th of passed candidates" };
    if (s >= 71) return { grade: "B1", point: "8", desc: "Next 1/8th of passed" };
    if (s >= 61) return { grade: "B2", point: "7", desc: "Standard Commendable Grade" };
    if (s >= 51) return { grade: "C1", point: "6", desc: "Average Good" };
    if (s >= 41) return { grade: "C2", point: "5", desc: "Passing average grade" };
    if (s >= 33) return { grade: "D", point: "4", desc: "Marginal pass" };
    return { grade: "E / F", point: "0", desc: "Essential Repeat / Backlog" };
  };

  const getUnivGrade = (s: number) => {
    if (s >= 90) return { grade: "O", point: "10", desc: "Outstanding" };
    if (s >= 80) return { grade: "A+", point: "9", desc: "Excellent" };
    if (s >= 70) return { grade: "A", point: "8", desc: "Very Good" };
    if (s >= 60) return { grade: "B+", point: "7", desc: "Good" };
    if (s >= 50) return { grade: "B", point: "6", desc: "Above Average" };
    if (s >= 40) return { grade: "C", point: "5", desc: "Pass" };
    return { grade: "F", point: "0", desc: "Fail" };
  };

  const activeGrade = scale === "CBSE" ? getCBSEGrade(val) : getUnivGrade(val);

  const shareText = `Figured out my academic grades under ${scale} standards! My grade is: ${activeGrade.grade} (${activeGrade.desc}). Check yours: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(activeGrade.grade, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Score (%)</label>
          <input
            type="number"
            value={score}
            max="100"
            onChange={(e) => setScore(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
            placeholder="82"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Grading standard</label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
          >
            <option value="CBSE">CBSE Board Scale</option>
            <option value="UNIVERSITY">University (10-Point Scale)</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl grid grid-cols-2 gap-4">
        <div>
          <span className="block text-[10px] font-bold text-indigo-500 uppercase">Letter Grade</span>
          <span className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-100">{activeGrade.grade}</span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-indigo-500 uppercase">Grade Points</span>
          <span className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-100">{activeGrade.point}</span>
        </div>
        <div className="col-span-2 pt-1 border-t border-indigo-100/30">
          <span className="block text-xxs font-bold text-slate-400 uppercase">Performance note</span>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">{activeGrade.desc}</p>
        </div>
      </div>

      <ActionButtons 
        onReset={() => { setScore("82"); setScale("CBSE"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 10. AGE CALCULATOR FOR EXAMS
// ==========================================
export const AgeCalculatorForExams: React.FC<CalculatorProps> = ({ onShare }) => {
  const [dob, setDob] = useState<string>("2002-08-15");
  const [cutoff, setCutoff] = useState<string>("2026-08-01"); // default standard UPSC cutoff month/day

  const calculateAge = () => {
    if (!dob || !cutoff) return { y: 0, m: 0, d: 0, str: "Select dates to compute." };
    const birth = new Date(dob);
    const target = new Date(cutoff);
    if (birth > target) return { y: 0, m: 0, d: 0, str: "Birth date cannot exceed cutoff date!" };

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { 
      y: years, 
      m: months, 
      d: days, 
      str: `${years} Years, ${months} Months, ${days} Days` 
    };
  };

  const age = calculateAge();
  const upscEligible = age.y >= 21 && age.y <= 32;

  const shareText = `Verified my exam cutoff age: My age on ${cutoff} is ${age.y} Years, ${age.m} Months, ${age.d} Days. Check your eligibility: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(age.str, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Your Date of Birth (DoB)</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Cutoff Eligibility Date</label>
          <input
            type="date"
            value={cutoff}
            onChange={(e) => setCutoff(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
          />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl">
        <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1.5">AGE ON TARGET DATE</span>
        <div className="flex flex-wrap gap-3 items-baseline mb-2">
          <div>
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{age.y}</span>
            <span className="text-xs font-medium text-slate-400 ml-0.5">Yrs</span>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{age.m}</span>
            <span className="text-xs font-medium text-slate-400 ml-0.5">Mths</span>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{age.d}</span>
            <span className="text-xs font-medium text-slate-400 ml-0.5">Days</span>
          </div>
        </div>
        {dob && cutoff && (
          <p className="text-xs font-semibold mt-3 p-2 bg-white/70 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-850 rounded-lg">
            UPSC Eligibility Standard (Gen: 21-32):{" "}
            <span className={upscEligible ? "text-emerald-500" : "text-rose-500"}>
              {upscEligible ? "✅ ELIGIBLE" : "❌ INELIGIBLE"}
            </span>
          </p>
        )}
      </div>

      <ActionButtons 
        onReset={() => { setDob("2002-08-15"); setCutoff("2026-08-01"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 11. SCIENTIFIC CALCULATOR
// ==========================================
export const ScientificCalculator: React.FC<CalculatorProps> = ({ onShare }) => {
  const [expr, setExpr] = useState<string>("");
  const [degMode, setDegMode] = useState<boolean>(true);

  const calculateExpr = () => {
    try {
      if (!expr) return "";
      // Strip anything other than digits, mathematical operators, brackets, functions
      let sanitized = expr
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sin\(/g, degMode ? "Math.sin((Math.PI/180)*" : "Math.sin(")
        .replace(/cos\(/g, degMode ? "Math.cos((Math.PI/180)*" : "Math.cos(")
        .replace(/tan\(/g, degMode ? "Math.tan((Math.PI/180)*" : "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/\^/g, "**");

      // Simple mathematical safety evaluation (avoid global unsafe execution problems if possible)
      // Check syntax using native Function
      const evaluator = new Function(`return ${sanitized};`);
      const val = evaluator();
      if (typeof val === "number" && !isNaN(val)) {
        return Number.isInteger(val) ? val.toString() : val.toFixed(6).replace(/\.?0+$/, "");
      }
      return "Error";
    } catch {
      return "Error";
    }
  };

  const handleKey = (key: string) => {
    if (key === "C") setExpr("");
    else if (key === "Back") setExpr(expr.slice(0, -1));
    else if (key === "=") {
      const res = calculateExpr();
      if (res) setExpr(res);
    } else {
      setExpr(expr + key);
    }
  };

  const shareText = `Completed calculations on dynamic Scientific Utility Calculator! Run equations online: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(expr, shareText, onShare);

  const buttons = [
    ["deg", "rad", "Back", "C"],
    ["sin(", "cos(", "tan(", "^"],
    ["log(", "ln(", "sqrt(", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["e", "0", ".", "="],
    ["(", ")", "π"]
  ];

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 text-emerald-400 p-3 rounded-2xl border-4 border-slate-850 shadow-inner font-mono text-right relative overflow-hidden">
        <span className="absolute left-2.5 top-1.5 text-xxs font-extrabold text-emerald-600 tracking-widest uppercase">
          {degMode ? "DEG_MODE" : "RAD_MODE"}
        </span>
        <div className="text-xxs text-emerald-700 min-h-4 pr-1 mt-1 truncate">{expr || "0"}</div>
        <div className="text-2xl font-bold tracking-tight select-all truncate pr-1">
          {calculateExpr() || "0"}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-100 dark:bg-slate-950/65 rounded-2xl">
        {buttons.flat().map((btn) => {
          let colorClass = "bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 hover:bg-slate-200 hover:scale-[0.98]";
          if (["+", "-", "*", "/", "^", "="].includes(btn)) {
            colorClass = "bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-[0.98] font-bold";
          } else if (["C", "Back", "deg", "rad"].includes(btn)) {
            colorClass = "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 font-semibold text-xs";
          } else if (isNaN(parseInt(btn)) && btn !== "." && btn !== "(" && btn !== ")") {
            colorClass = "bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 hover:bg-sky-100 font-medium text-xs";
          }

          if (btn === "deg" && degMode) colorClass = "bg-emerald-500 text-white font-extrabold shadow";
          if (btn === "rad" && !degMode) colorClass = "bg-emerald-500 text-white font-extrabold shadow";

          return (
            <button
              key={btn}
              onClick={() => {
                if (btn === "deg") setDegMode(true);
                else if (btn === "rad") setDegMode(false);
                else handleKey(btn);
              }}
              className={`py-2 text-center rounded-xl cursor-pointer select-none transition-all outline-none font-semibold ${colorClass}`}
            >
              {btn}
            </button>
          );
        })}
      </div>

      <ActionButtons 
        onReset={() => setExpr("")} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 12. UNIT CONVERTER
// ==========================================
export const UnitConverter: React.FC<CalculatorProps> = ({ onShare }) => {
  const [mode, setMode] = useState<"Length" | "Weight" | "Area">("Length");
  const [val, setVal] = useState<string>("100");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("cm");

  const lengthUnits: Record<string, number> = {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    inch: 0.0254,
    feet: 0.3048,
    yard: 0.9144,
    guz: 0.9144 // Traditional North Indian Guz is identical to 1 Yard (3 feet)
  };

  const weightUnits: Record<string, number> = {
    kg: 1,
    g: 0.001,
    lbs: 0.45359237,
    tola: 0.01166, // 11.66 grams
    ratti: 0.0001215 // 121.5 mg
  };

  const areaUnits: Record<string, number> = {
    sqft: 1,
    sqm: 10.76391,
    acre: 43560,
    hectare: 107639.1,
    bigha: 27000, // Standard Northern Bigha is approx 27,000 sq ft
    guntha: 1089 // Standard Western Guntha is 1,089 sq ft (33ft x 33ft)
  };

  const convert = () => {
    const num = parseFloat(val) || 0;
    if (mode === "Length") {
      const fromF = lengthUnits[fromUnit] || 1;
      const toF = lengthUnits[toUnit] || 1;
      return (num * fromF) / toF;
    } else if (mode === "Weight") {
      const fromF = weightUnits[fromUnit] || 1;
      const toF = weightUnits[toUnit] || 1;
      return (num * fromF) / toF;
    } else {
      const fromF = areaUnits[fromUnit] || 1;
      const toF = areaUnits[toUnit] || 1;
      return (num * fromF) / toF;
    }
  };

  const result = convert();

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  useEffect(() => {
    if (mode === "Length") {
      setFromUnit("m");
      setToUnit("cm");
    } else if (mode === "Weight") {
      setFromUnit("kg");
      setToUnit("tola");
    } else {
      setFromUnit("guntha");
      setToUnit("sqft");
    }
  }, [mode]);

  const shareText = `Converted units using regional Indian Unit Converter! Result: ${val} ${fromUnit} = ${result.toFixed(3)} ${toUnit}. Convert metrics online: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(`${result.toFixed(4)}`, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
        {["Length", "Weight", "Area"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as any)}
            className={`flex-1 text-center py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === m 
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <div>
          <label className="block text-xxs font-bold text-slate-500 mb-1">Quantity</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
            placeholder="100"
          />
        </div>
        <div className="grid grid-cols-2 gap-1 md:col-span-2">
          <div>
            <label className="block text-xxs font-bold text-slate-500 mb-1">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-xs font-semibold"
            >
              {mode === "Length" && Object.keys(lengthUnits).map(u => <option key={u} value={u}>{u.toUpperCase()} {u === "guz" && "(Gaj)"}</option>)}
              {mode === "Weight" && Object.keys(weightUnits).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
              {mode === "Area" && Object.keys(areaUnits).map(u => <option key={u} value={u}>{u.toUpperCase()} {u === "guntha" && "(Maharashtra/West)"} {u === "bigha" && "(North India)"}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xxs font-bold text-slate-500 mb-1">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-xs font-semibold"
            >
              {mode === "Length" && Object.keys(lengthUnits).map(u => <option key={u} value={u}>{u.toUpperCase()} {u === "guz" && "(Gaj)"}</option>)}
              {mode === "Weight" && Object.keys(weightUnits).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
              {mode === "Area" && Object.keys(areaUnits).map(u => <option key={u} value={u}>{u.toUpperCase()} {u === "guntha" && "(Maharashtra/West)"} {u === "bigha" && "(North India)"}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-0.5">
        <button
          onClick={handleSwap}
          className="p-1 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-500 rounded-xl flex items-center gap-1 text-[10px] font-bold cursor-pointer"
        >
          <ArrowRightLeft className="w-3 h-3" /> Swap Units
        </button>
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100/50 rounded-xl text-center">
        <span className="block text-xxs font-bold text-slate-400 uppercase tracking-widest mb-1">CONVERTED MEASUREMENT</span>
        <div className="text-2xl font-black text-indigo-800 dark:text-indigo-200 tracking-tight">
          {result % 1 === 0 ? result : result.toFixed(4).replace(/\.?0+$/, "")} <span className="text-sm font-bold text-slate-400">{toUnit.toUpperCase()}</span>
        </div>
      </div>

      <ActionButtons 
        onReset={() => setVal("100")} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 13. BMI CALCULATOR
// ==========================================
export const BMICalculator: React.FC<CalculatorProps> = ({ onShare }) => {
  const [weight, setWeight] = useState<string>("65");
  const [height, setHeight] = useState<string>("172");

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;

  const bmiValue = w > 0 && h > 0 ? w / ((h / 100) * (h / 100)) : 0;

  const getBmiCategory = (v: number) => {
    if (v < 18.5) return { label: "Underweight", color: "text-blue-500", barBg: "bg-blue-500" };
    if (v < 25) return { label: "Normal (Healthy)", color: "text-emerald-500", barBg: "bg-emerald-500" };
    if (v < 30) return { label: "Overweight", color: "text-amber-500", barBg: "bg-amber-500" };
    return { label: "Obese", color: "text-rose-500", barBg: "bg-rose-500" };
  };

  const category = getBmiCategory(bmiValue);

  const shareText = `Computed my Body Mass Index (BMI)! My score is ${bmiValue.toFixed(1)} (${category.label}). Check your health profile: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(bmiValue.toFixed(1), shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weight (in kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
            placeholder="e.g. 65"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Height (in cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
            placeholder="e.g. 172"
          />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 rounded-xl">
        <span className="block text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1.5">BODY MASS INDEX VALUE</span>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {bmiValue > 0 ? bmiValue.toFixed(1) : "0.0"}
          </span>
          {bmiValue > 0 && (
            <span className={`text-sm font-bold ${category.color}`}>
              {category.label}
            </span>
          )}
        </div>
        {bmiValue > 0 && (
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
            <div 
              className={`h-full ${category.barBg} transition-all duration-500`}
              style={{ width: `${Math.min(100, (bmiValue / 40) * 100)}%` }}
            />
          </div>
        )}
      </div>

      <ActionButtons 
        onReset={() => { setWeight("65"); setHeight("172"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 14. STUDY TIMER (POMODORO)
// ==========================================
export const StudyTimer: React.FC<CalculatorProps> = ({ onShare }) => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<"Work" | "Break">("Work");
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  function handleTimerComplete() {
    setIsRunning(false);
    playSynthBeep();
    if (mode === "Work") {
      setSessionCount(prev => prev + 1);
      setMode("Break");
      setTimeLeft(5 * 60); // 5 mins break
    } else {
      setMode("Work");
      setTimeLeft(25 * 60); // 25 mins work
    }
  }

  // Sound generator (browser native Web Audio synthesized beep)
  const playSynthBeep = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // Crisp high tone
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // AudioContext blocks sometimes on un-interacted screens, ignore
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const shareText = `Improving my productivity with the Pomodoro Study Clock! Current Phase: ${mode}. Completed: ${sessionCount} rounds. Study with me: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(timeString, shareText, onShare);

  return (
    <div className="space-y-4 text-center">
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl justify-center max-w-xs mx-auto">
        <button
          onClick={() => {
            setIsRunning(false);
            setMode("Work");
            setTimeLeft(25 * 60);
          }}
          className={`flex-1 text-center py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
            mode === "Work" 
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Study (25 Min)
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setMode("Break");
            setTimeLeft(5 * 60);
          }}
          className={`flex-1 text-center py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
            mode === "Break" 
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Break (5 Min)
        </button>
      </div>

      <div className="py-6 flex flex-col items-center">
        <div className="w-48 h-48 rounded-full border-8 border-indigo-100 dark:border-slate-800 flex flex-col justify-center items-center relative shadow-inner bg-slate-50/50 dark:bg-slate-950/20">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{mode}</span>
          <span className="text-4xl font-black text-slate-800 dark:text-indigo-150 font-mono tracking-tighter my-1">
            {timeString}
          </span>
          <span className="text-xxs font-bold text-slate-400">Completed: {sessionCount}</span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all ${
            isRunning 
              ? "bg-amber-500 text-white hover:bg-amber-600" 
              : "bg-indigo-600 text-white hover:bg-indigo-750"
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? "Pause" : "Start Study"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(mode === "Work" ? 25 * 60 : 5 * 60);
          }}
          className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <Square className="w-3.5 h-3.5" /> Stop / Reset
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-xl border ${soundEnabled ? 'border-emerald-100 text-emerald-500 dark:border-emerald-950/20' : 'border-slate-200 text-slate-400'} cursor-pointer`}
          title={soundEnabled ? "Mute alarm beep" : "Unmute alarm beep"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      <ActionButtons 
        onReset={() => {
          setIsRunning(false);
          setMode("Work");
          setTimeLeft(25 * 60);
          setSessionCount(0);
        }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 15. SEMESTER CGPA CALCULATOR
// ==========================================
export const SemesterCGPA: React.FC<CalculatorProps> = ({ onShare }) => {
  const [sems, setSems] = useState<{ id: number; gpa: string; credits: string }[]>([
    { id: 1, gpa: "8.5", credits: "22" },
    { id: 2, gpa: "8.8", credits: "22" },
    { id: 3, gpa: "9.0", credits: "24" },
  ]);

  const addSem = () => {
    if (sems.length >= 8) return;
    setSems([...sems, { id: sems.length + 1, gpa: "", credits: "20" }]);
  };

  const removeSem = (id: number) => {
    if (sems.length <= 1) return;
    setSems(sems.filter(s => s.id !== id).map((s, idx) => ({ ...s, id: idx + 1 })));
  };

  const updateField = (id: number, key: "gpa" | "credits", val: string) => {
    setSems(sems.map(s => s.id === id ? { ...s, [key]: val } : s));
  };

  let totalCredits = 0;
  let totalPoints = 0;

  sems.forEach((s) => {
    const g = parseFloat(s.gpa) || 0;
    const c = parseFloat(s.credits) || 0;
    totalPoints += g * c;
    totalCredits += c;
  });

  const cumulativeCGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  const percentage = (parseFloat(cumulativeCGPA) * 9.5).toFixed(1);

  const shareText = `Evaluated my college Semester accumulative CGPA! Score: ${cumulativeCGPA} (${percentage}%). Compile yours: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(cumulativeCGPA, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {sems.map((sem) => (
          <div key={sem.id} className="flex gap-2 items-center">
            <span className="text-xs font-bold text-slate-400 w-12">Sem {sem.id}</span>
            <input
              type="number"
              step="0.01"
              max="10"
              placeholder="Semester SGPA"
              value={sem.gpa}
              onChange={(e) => updateField(sem.id, "gpa", e.target.value)}
              className="flex-1 min-w-0 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-center font-medium"
            />
            <input
              type="number"
              placeholder="Credits"
              value={sem.credits}
              onChange={(e) => updateField(sem.id, "credits", e.target.value)}
              className="w-16 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-center font-medium"
            />
            <button
              onClick={() => removeSem(sem.id)}
              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
              disabled={sems.length <= 1}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSem}
        className="w-full flex items-center justify-center gap-1 py-1.5 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xxs font-bold text-slate-500 cursor-pointer"
      >
        <Plus className="w-3 h-3" /> Add Next Semester
      </button>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 rounded-xl grid grid-cols-2 gap-4">
        <div>
          <span className="block text-[10px] font-bold text-indigo-500 uppercase">Cumulative CGPA</span>
          <span className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-100">{cumulativeCGPA}</span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-indigo-500 uppercase">Est. Percentage</span>
          <span className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-100">{percentage}%</span>
        </div>
      </div>

      <ActionButtons 
        onReset={() => setSems([{ id: 1, gpa: "", credits: "22" }, { id: 2, gpa: "", credits: "22" }])} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 16. PERCENTAGE INCREASE/DECREASE
// ==========================================
export const PercentageIncreaseDecrease: React.FC<CalculatorProps> = ({ onShare }) => {
  const [original, setOriginal] = useState<string>("120");
  const [newVal, setNewVal] = useState<string>("150");

  const origNum = parseFloat(original) || 0;
  const newNum = parseFloat(newVal) || 0;

  let percentChange = 0;
  let status = "No change";

  if (origNum !== 0) {
    percentChange = ((newNum - origNum) / origNum) * 100;
    if (percentChange > 0) status = "Increase";
    else if (percentChange < 0) status = "Decrease";
  }

  const resultStr = origNum === 0 
    ? "Original value cannot be zero." 
    : `${Math.abs(percentChange).toFixed(2)}% ${status}`;

  const shareText = `Calculated Percentage change: From ${original} to ${newVal} corresponds to a ${resultStr}! Check your percentages: `;
  const { copyFeedback, handleCopy, handleShare } = useCopyHelper(resultStr, shareText, onShare);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Original Value</label>
          <input
            type="number"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
            placeholder="120"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Value</label>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
            placeholder="150"
          />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100/50 rounded-xl text-center">
        <span className="block text-xxs font-bold text-slate-400 uppercase tracking-widest mb-1">PERCENTAGE CHANGE OUTPUT</span>
        {origNum === 0 ? (
          <span className="text-xl font-bold text-rose-500">Original value cannot be zero.</span>
        ) : (
          <div className="flex flex-col items-center">
            <span className={`text-3xl font-black ${percentChange > 0 ? "text-emerald-500" : percentChange < 0 ? "text-rose-500" : "text-slate-500"}`}>
              {percentChange > 0 ? "+" : ""}{percentChange.toFixed(2)}%
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 uppercase">
              {status}
            </span>
          </div>
        )}
      </div>

      <ActionButtons 
        onReset={() => { setOriginal("120"); setNewVal("150"); }} 
        onCopy={handleCopy} 
        onShare={handleShare} 
        copyFeedback={copyFeedback} 
      />
    </div>
  );
};

// ==========================================
// 17. EXAM COUNTDOWN TIMER
// ==========================================
export const ExamCountdownTimer: React.FC<CalculatorProps> = ({ onShare }) => {
  const defaultExams = [
    { id: "upsc", name: "UPSC Civil Services Prelims", date: "2026-06-07T09:30:00" },
    { id: "jee", name: "JEE Advanced Main Examination", date: "2026-05-24T09:00:00" },
    { id: "neet", name: "NEET UG Entrance Test", date: "2026-05-03T14:00:00" },
  ];

  const [exams, setExams] = useState<{ id: string; name: string; date: string }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("custom_exams");
      return saved ? JSON.parse(saved) : defaultExams;
    }
    return defaultExams;
  });

  const [customName, setCustomName] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addCustomExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customDate) return;
    const newList = [...exams, { id: Date.now().toString(), name: customName, date: customDate + "T09:00:00" }];
    setExams(newList);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("custom_exams", JSON.stringify(newList));
    }
    setCustomName("");
    setCustomDate("");
  };

  const removeExam = (id: string) => {
    const newList = exams.filter(ex => ex.id !== id);
    setExams(newList);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("custom_exams", JSON.stringify(newList));
    }
  };

  const getCountdown = (targetStr: string) => {
    const target = new Date(targetStr);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      complete: false
    };
  };

  const shareText = `Keeping track of critical Board & recruitment exam countclocks! Stay motivated and study: `;
  
  // Custom action overrides copy as it copies the main UPSC target
  const handleCopyUPSC = () => {
    const cd = getCountdown("2026-06-07T09:30:00");
    const label = `UPSC Civil Services Count: ${cd.days} Days, ${cd.hours} Hours left.`;
    navigator.clipboard.writeText(label);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addCustomExam} className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
        <span className="block text-xxs font-extrabold text-slate-400 uppercase">Create Custom Countdown</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            required
            placeholder="e.g. CBSE Boards, College Finals"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold"
          />
          <input
            type="date"
            required
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-650 text-white text-xxs font-extrabold py-2 rounded-lg cursor-pointer transition-colors"
        >
          Add Tracker Clock
        </button>
      </form>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {exams.map((ex) => {
          const cd = getCountdown(ex.date);
          return (
            <div key={ex.id} className="p-3 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-800/20 border border-slate-200/50 dark:border-slate-800 rounded-xl relative group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="block text-xs font-bold text-slate-750 dark:text-slate-300">{ex.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Exam Date: {new Date(ex.date).toLocaleDateString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeExam(ex.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 rounded-md opacity-70 hover:opacity-100 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {cd.complete ? (
                <div className="text-xs font-bold text-indigo-500 mt-2">🎉 Examination Commenced! Good luck.</div>
              ) : (
                <div className="grid grid-cols-4 gap-1 mt-2.5 text-center">
                  <div className="bg-white dark:bg-slate-900/50 p-1.5 rounded-lg border border-slate-100/30">
                    <span className="block text-base font-black text-slate-850 dark:text-indigo-200 tracking-tight">{cd.days}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">Days</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-1.5 rounded-lg border border-slate-100/30">
                    <span className="block text-base font-black text-slate-850 dark:text-indigo-200 tracking-tight">{cd.hours}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">Hrs</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-1.5 rounded-lg border border-slate-100/30">
                    <span className="block text-base font-black text-slate-850 dark:text-indigo-200 tracking-tight">{cd.minutes}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">Min</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-1.5 rounded-lg border border-slate-100/30 animate-pulse">
                    <span className="block text-base font-black text-indigo-600 dark:text-indigo-450 tracking-tight">{cd.seconds}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono font-bold">Sec</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pr-1">
        <button
          type="button"
          onClick={handleCopyUPSC}
          className="text-xxs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 py-1 px-2.5 rounded-lg border border-transparent cursor-pointer"
        >
          Copy UPSC Clock Left
        </button>
        <button
          type="button"
          onClick={() => {
            setExams(defaultExams);
            if (typeof window !== "undefined") sessionStorage.removeItem("custom_exams");
          }}
          className="text-xxs font-semibold text-rose-500 py-1 px-2 cursor-pointer"
        >
          Restore Defaults
        </button>
      </div>
    </div>
  );
};
