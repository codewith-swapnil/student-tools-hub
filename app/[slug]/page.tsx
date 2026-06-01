import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { TOOLS_LIST, ToolData } from "@/lib/tools-data";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { 
  PercentageToCGPA, CGPAToPercentage, GPAToCGPA, SGPAToCGPA, 
  Percentage, MarksPercentage, Attendance, RequiredMarks, Grade, 
  AgeCalculatorForExams, ScientificCalculator, UnitConverter, 
  BMICalculator, StudyTimer, SemesterCGPA, PercentageIncreaseDecrease, 
  ExamCountdownTimer 
} from "@/components/calculators";
import ToolClientWrapper from "@/components/tool-client-wrapper";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS_LIST.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_LIST.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Student Tools Hub",
      description: "The requested calculator could not be located.",
    };
  }

  return {
    title: `${tool.metaTitle} | Student Tools Hub`,
    description: tool.metaDesc,
    alternates: {
      canonical: `https://studenttools.hub/${tool.slug}`,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDesc,
      url: `https://studenttools.hub/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDesc,
    }
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS_LIST.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-2" />
        <h1 className="text-xl font-bold">Tool Not Found</h1>
        <p className="text-sm text-slate-500 mt-1 mb-4">We {"couldn't"} find the calculator you are looking for.</p>
        <Link href="/" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Choose the visual calculator panel
  const renderCalculator = () => {
    switch (tool.slug) {
      case "percentage-to-cgpa":
        return <PercentageToCGPA />;
      case "cgpa-to-percentage":
        return <CGPAToPercentage />;
      case "gpa-to-cgpa":
        return <GPAToCGPA />;
      case "sgpa-to-cgpa":
        return <SGPAToCGPA />;
      case "percentage":
        return <Percentage />;
      case "marks-percentage":
        return <MarksPercentage />;
      case "attendance":
        return <Attendance />;
      case "required-marks":
        return <RequiredMarks />;
      case "grade":
        return <Grade />;
      case "age-calculator-for-exams":
        return <AgeCalculatorForExams />;
      case "scientific-calculator":
        return <ScientificCalculator />;
      case "unit-converter":
        return <UnitConverter />;
      case "bmi-calculator":
        return <BMICalculator />;
      case "study-timer":
        return <StudyTimer />;
      case "semester-cgpa":
        return <SemesterCGPA />;
      case "percentage-increase-decrease":
        return <PercentageIncreaseDecrease />;
      case "exam-countdown-timer":
        return <ExamCountdownTimer />;
      default:
        return <div className="text-slate-500 p-4">Interactive module loading...</div>;
    }
  };

  // Build JSON-LD structured schema faq markup dynamically
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      }
    }))
  };

  return (
    <ToolClientWrapper tool={tool}>
      {/* Dynamic JSON-LD Injecting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumbs Line Navigation */}
      <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-500 font-extrabold">{tool.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-400">{tool.name}</span>
      </div>

      {/* Main Grid: Split Calculator View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Dynamic render form module */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-[2rem] p-6 md:p-8 relative">
            <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-150/20 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase rounded-lg">
                {tool.category}
              </span>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-extrabold tracking-widest">
                Real-Time Solver
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {tool.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
              {tool.shortDesc}
            </p>

            <div className="relative">
              {renderCalculator()}
            </div>
          </div>

          {/* In-content responsive ad slot */}
          <AdPlaceholder type="in-content" className="max-w-xl" />

          {/* Detailed usage text guidelines (Step-by-step guide) */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-[2rem] p-6 md:p-8 space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">
              📌 Step-by-Step Calculator Guide
            </h2>
            <ol className="space-y-3.5">
              {tool.steps.map((st, i) => (
                <li key={i} className="flex gap-4 items-start text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                  <span className="w-5 h-5 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold shrink-0 text-xxs font-mono">
                    0{i+1}
                  </span>
                  <p className="mt-0.5">{st}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* High-quality Indian customized SEO Frequently Asked Questions (FAQs) */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-[2rem] p-6 md:p-8 space-y-5">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">
              💬 Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4 pt-1 divide-y divide-slate-100 dark:divide-slate-850">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className={`${idx > 0 ? "pt-4" : ""} space-y-1.5`}>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase leading-normal">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Side: Formula block and sticky Ads column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Formula Board Panel */}
          <div className="p-6 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 border border-indigo-100/40 dark:border-indigo-900/10 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2.5 rounded bg-indigo-600 text-[9px] font-black uppercase text-white shadow font-mono">
                Formula
              </span>
              <h3 className="text-xs font-bold text-indigo-950 dark:text-indigo-250">
                Equation Formula
              </h3>
            </div>
            
            <div className="p-3 bg-white dark:bg-slate-950/80 border border-indigo-100/30 dark:border-slate-850 rounded-2xl font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 text-center shadow-inner overflow-x-auto whitespace-normal break-words max-w-full">
              {tool.formula}
            </div>

            <p className="text-[11px] font-semibold text-slate-550 dark:text-slate-350 leading-relaxed">
              {tool.formulaDesc}
            </p>
          </div>

          {/* Sticky vertical banner slot */}
          <div className="sticky top-20">
            <AdPlaceholder type="sidebar" />
          </div>

        </div>

      </div>
    </ToolClientWrapper>
  );
}
