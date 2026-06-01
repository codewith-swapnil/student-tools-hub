export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolData {
  slug: string;
  name: string;
  category: "Education Tools" | "Calculator Tools" | "Exam Tools" | "Health Tools" | "Utility Tools";
  shortDesc: string;
  metaTitle: string;
  metaDesc: string;
  formula: string;
  formulaDesc: string;
  steps: string[];
  faqs: FAQItem[];
  trending?: boolean;
  popular?: boolean;
}

export const CATEGORIES = [
  "Education Tools",
  "Calculator Tools",
  "Exam Tools",
  "Health Tools",
  "Utility Tools"
] as const;

export const TOOLS_LIST: ToolData[] = [
  {
    slug: "percentage-to-cgpa",
    name: "Percentage to CGPA Calculator",
    category: "Education Tools",
    shortDesc: "Convert your Board or University percentage percentage to accurate 10-point scale CGPA.",
    metaTitle: "Percentage to CGPA Calculator - CBSE & University Converter",
    metaDesc: "Convert marks percentage to CGPA online easily. Accurate calculator based on CBSE formula (Percentage / 9.5) and major Indian university credit standards.",
    formula: "CGPA = Percentage (%) / 9.5",
    formulaDesc: "The CBSE official method to convert percentage to CGPA is dividing the aggregate percentage by 9.5. For instance, if your percentage is 85.5%, your CGPA would be 85.5 / 9.5 = 9.0.",
    steps: [
      "Enter your aggregate percentage in the input field.",
      "The CGPA will automatically recalculate in real-time.",
      "Check the calculated CGPA along with equivalent division class (First Class, Second Class, Distinct).",
      "Use 'Copy Result' to save it to your clipboard or 'Share Result' with classmates."
    ],
    trending: true,
    popular: true,
    faqs: [
      {
        question: "How do I convert CBSE percentage to CGPA?",
        answer: "Simply divide your percentage by 9.5. For example, if you scored 76%, your CGPA is 76 / 9.5 = 8.0."
      },
      {
        question: "Is this CGPA conversion accepted for master's applications abroad?",
        answer: "Yes, standard conversion keys are accepted by WES and major foreign universities, though some universities may require a course-by-course evaluation."
      },
      {
        question: "Why does the CBSE use 9.5 as a multiplier?",
        answer: "The multiplier 9.5 is derived from the statistical correlation of previous years' board results, aligning the average marks with standard grading system distributions."
      }
    ]
  },
  {
    slug: "cgpa-to-percentage",
    name: "CGPA to Percentage Calculator",
    category: "Education Tools",
    shortDesc: "Convert your cumulative grade point average (CGPA) into a standard aggregate percentage.",
    metaTitle: "CGPA to Percentage Calculator | CBSE Indian Board Converter",
    metaDesc: "Convert CGPA to percentage using the official CBSE formula. Learn how to convert 10-point university CGPA to marks percentage instantly with step-by-step guidance.",
    formula: "Percentage (%) = CGPA * 9.5",
    formulaDesc: "To convert CGPA to an equivalent percentage of marks, multiply your CGPA by 9.5. For example, a CGPA of 9.2 equates to 9.2 * 9.5 = 87.4%.",
    steps: [
      "Type in your cumulative grade point average (CGPA) out of 10.",
      "Instantly view the equivalent percentage of marks.",
      "Review the calculation breakdown in the formula section.",
      "Copy or share your results with a single click."
    ],
    trending: true,
    popular: true,
    faqs: [
      {
        question: "What is the formula to convert CGPA to percentage?",
        answer: "The formula is: Percentage (%) = CGPA * 9.5. This is standard under CBSE, Mumbai University, Visvesvaraya Technological University (VTU) and many other boards."
      },
      {
        question: "What is 7.5 CGPA to percentage?",
        answer: "Using the formula: 7.5 * 9.5 = 71.25% marks."
      },
      {
        question: "Is CGPA to percentage multiplier always 9.5?",
        answer: "For CBSE and several Indian universities, it is 9.5. However, some universities like SPPU (Pune University) or VTU may use other coefficients like 10 or complex grading tables."
      }
    ]
  },
  {
    slug: "gpa-to-cgpa",
    name: "GPA to CGPA Calculator",
    category: "Education Tools",
    shortDesc: "Convert your 4.0 scale GPA to 10-point scale CGPA accurately for Indian Universities.",
    metaTitle: "GPA to CGPA Calculator | 4.0 to 10 Point Scale Converter",
    metaDesc: "Convert 4.0 scale GPA (US style) to 10.0 scale CGPA (Indian style) using standardized formulas. Perfect for students filing foreign university transcripts.",
    formula: "CGPA = (GPA / 4.0) * 10",
    formulaDesc: "The linear conversion takes your GPA out of 4.0, divides it by 4.0, and multiplies it by 10. For instance, a 3.6 GPA equates to (3.6 / 4) * 10 = 9.0 CGPA.",
    steps: [
      "Select your GPA scale (default is 4.0 UI, but supports customized systems).",
      "Input your GPA value.",
      "The equivalent 10.0 scale cumulative grade (CGPA) will be evaluated immediately.",
      "Copy the converted grade for academic CVs or admissions forms."
    ],
    faqs: [
      {
        question: "Does a 4.0 GPA equal a 10.0 CGPA?",
        answer: "Mathematically yes under linear scaling, though in practice foreign transcript evaluators like WES use distinct grade-by-grade distributions rather than simple linear multiplication."
      },
      {
        question: "How do I convert a 3.5 GPA to CGPA?",
        answer: "Under standard linear conversion: (3.5 / 4.0) * 10 = 8.75 CGPA."
      }
    ]
  },
  {
    slug: "sgpa-to-cgpa",
    name: "SGPA to CGPA Calculator",
    category: "Education Tools",
    shortDesc: "Calculate Cumulative GPA (CGPA) from your individual Semester SGPAs.",
    metaTitle: "SGPA to CGPA Calculator - Semester Grade Point Converter",
    metaDesc: "Convert SGPA to CGPA instantly. Enter up to 8 semesters' SGPAs with optional credit hours to calculate cumulative grade point averages officially.",
    formula: "CGPA = Sum of (SGPA * Sem Credits) / Sum of Sem Credits",
    formulaDesc: "If all semesters have the same number of credits, CGPA is simply the average of SGPAs. Otherwise, it is the credit-weighted average.",
    steps: [
      "Add the SGPAs of all completed semesters in the fields provided.",
      "Optional: Enter credit weights for each semester for a precise weighted CGPA.",
      "The aggregate cumulative CGPA updates dynamically as you fill out each semester.",
      "Copy or export your overall university marks estimate."
    ],
    trending: true,
    faqs: [
      {
        question: "What is SGPA?",
        answer: "SGPA stands for Semester Grade Point Average. It measures your academic performance in a single semester."
      },
      {
        question: "What is the difference between SGPA and CGPA?",
        answer: "SGPA evaluates a single semester, while CGPA (Cumulative Grade Point Average) is the progressive cumulative average of all semesters combined."
      }
    ]
  },
  {
    slug: "percentage",
    name: "Percentage Calculator",
    category: "Calculator Tools",
    shortDesc: "Execute basic, advanced, and reverse percentage calculations in seconds.",
    metaTitle: "Percentage Calculator - Universal Quick Math Tool",
    metaDesc: "Calculate percentages easily: percentage of a value, what percentage one number is of another, or percentage values. Ideal for math homework and retail checks.",
    formula: "Y = (X / 100) * Total",
    formulaDesc: "Standard percentage calculations evaluate fractions of 100 which are multiplied against the target total. Fully configurable for reverse and marginal queries.",
    steps: [
      "Select the percentage computation pattern that matches your query.",
      "Input your base variables into the respective responsive fields.",
      "View calculated percentages, fractions, and visual pie progress chart representation.",
      "Reset or copy values as required."
    ],
    faqs: [
      {
        question: "How do I calculate what percentage 45 is of 150?",
        answer: "Formula: (45 / 150) * 100 = 30%. You can calculate this in the second tab of our tool."
      }
    ]
  },
  {
    slug: "marks-percentage",
    name: "Marks Percentage Calculator",
    category: "Education Tools",
    shortDesc: "Determine your academic exam percentage from marks obtained and total paper marks.",
    metaTitle: "Marks Percentage Calculator - Quick Board & College Grades",
    metaDesc: "Calculate school or college board exam percentage. Perfect for CBSE, ICSE, SSC, HSC, MU and VTU marks tabulation.",
    formula: "Percentage (%) = (Marks Obtained / Total Marks) * 100",
    formulaDesc: "Standard division of your accumulated marks by maximum total marks, then scaled by 100.",
    steps: [
      "Enter total marks obtained across all papers.",
      "Enter maximum possible aggregate marks.",
      "The tool calculates the precise percentage and grade division.",
      "Add multiple subjects separately if you'd like to aggregate them automatically!"
    ],
    popular: true,
    faqs: [
      {
        question: "How is percentage calculated if we have practicals?",
        answer: "Add the theory marks and practical marks together both for obtained marks and maximum marks, then calculate overall percentage with our marks compiler."
      }
    ]
  },
  {
    slug: "attendance",
    name: "Attendance Calculator",
    category: "Exam Tools",
    shortDesc: "Find out if you can bunk classes or how many more classes you need to attend for a target %.",
    metaTitle: "Attendance Calculator | Should I Bunk Class? Tool",
    metaDesc: "Calculate how many classes you must attend to cross target percentage (e.g. 75% or 85%) or see how many classes you can safety bunk/miss without falling short.",
    formula: "Target met if Attend / Conducted >= Target %",
    formulaDesc: "If current attendance is below target, we calculate 'x' more consecutive attended classes required. If above, we find 'y' classes you can miss while staying above.",
    steps: [
      "Enter your current attended classes and total classes conducted.",
      "Set your desired attendance percentage (usually 75% or 80% for Indian colleges).",
      "Read the precise text stating exactly how many consecutive classes you must attend, or how many classes you are safe to skip.",
      "Stay safe from attendance shortages!"
    ],
    trending: true,
    popular: true,
    faqs: [
      {
        question: "Why do engineering colleges require 75% attendance?",
        answer: "Most Indian regulatory boards like AICTE and UGC mandate a minimum of 75% attendance to qualify for semester end university examinations."
      },
      {
        question: "Can I use this for university labs?",
        answer: "Yes, it works identically for lecture series, lab schedules, or tutorial classes."
      }
    ]
  },
  {
    slug: "required-marks",
    name: "Required Marks Calculator",
    category: "Exam Tools",
    shortDesc: "Calculate what marks you need in the final exam to achieve your target overall course goal.",
    metaTitle: "Required Marks Calculator | Final Grade Exam Target",
    metaDesc: "Find out exactly what score you need on your final exam to pass or secure an A/B/C grade. Input current assignments weight and scores to estimate target grades.",
    formula: "Needed Final Score = (Target - (Current Score * (1 - Final Weight))) / Final Weight",
    formulaDesc: "Estimates weight distributions of class materials against final exam multipliers to yield exact terminal benchmarks.",
    steps: [
      "Input your current grade average in percent.",
      "Enter the percentage weight scale of your upcoming final exam.",
      "Set your targeted final course grade.",
      "Read out the minimum exam score required on the paper."
    ],
    faqs: [
      {
        question: "What if the required marks are above 100%?",
        answer: "This means it is mathematically impossible to reach your target grade with your current scores, even with a perfect final exam. You may have to adjust your goal."
      }
    ]
  },
  {
    slug: "grade",
    name: "Grade Calculator",
    category: "Exam Tools",
    shortDesc: "Look up your equivalent letter grade (A+, B, C, etc.) based on standard Indian systems.",
    metaTitle: "Grade Calculator - Class Test & Semester Grading Scale",
    metaDesc: "Convert marks or percentages into standard letter grades instantly. Customizable for CBSE, university scales, and global letter ratings.",
    formula: "Grade = LookupTable(Marks %)",
    formulaDesc: "Standard grade bounds categorise student scores (e.g., 90-100% = O or A+, 80-89% = A, etc.) to normalize academic reporting standards.",
    steps: [
      "Select your academic board (CBSE, VTU, Mumbai University, or Custom GPA).",
      "Enter your exam score or percentage.",
      "View equivalent grade performance descriptors and GPA values immediately."
    ],
    faqs: [
      {
        question: "What is an O grade in Indian universities?",
        answer: "An 'O' Grade generally represents 'Outstanding' performance, usually allotted for scores above 90% or 10-point SGPA equivalents."
      }
    ]
  },
  {
    slug: "age-calculator-for-exams",
    name: "Age Calculator for Exams",
    category: "Exam Tools",
    shortDesc: "Check your precise eligibility age down to years, months, and days on relevant exam cutoff dates.",
    metaTitle: "Age Calculator for UPSC, SSC, Bank Exams - Indian Exams",
    metaDesc: "Verify your exact age on government recruitment final cutoff dates. Perfect for UPSC Civil Services, SSC CGL, IBPS, and Defence eligibility checks.",
    formula: "Age = Cutoff Date - Date of Birth",
    formulaDesc: "This utility calculates exact differences between dates, accounting for leap years and months to conform with state registration rules.",
    steps: [
      "Enter your Date of Birth.",
      "Set the official Exam Target Date of Cutoff eligibility specified in the state notification.",
      "Check your precise age displayed in Years, Months, and Days.",
      "Instantly know if you comply with minimum or maximum age limits."
    ],
    trending: true,
    faqs: [
      {
        question: "Why is an exam age calculator different?",
        answer: "Government notification rules state that eligibility is calculated on a fixed date (such as 1st August of the exam year) rather than the application filing date."
      }
    ]
  },
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "Utility Tools",
    shortDesc: "A robust scientific keyboard utility for advanced mathematics, algebraic formulas, and trigonometry.",
    metaTitle: "Scientific Calculator Online | Fast & Mobile-Friendly Math",
    metaDesc: "Free online scientific calculator with key trigonometric, logarithmic, square root, power, and algebraic functions. Fast, fully accessible, and mobile optimized.",
    formula: "Expression Parsing Engine",
    formulaDesc: "Interprets operations (e.g. sin, cos, tan, log, square root, exponentiation) sequentially while preserving standard PEMDAS/BODMAS mathematical ordering.",
    steps: [
      "Click buttons or use your keyboard keys to enter algebraic numbers and operators.",
      "Tap advanced functional buttons like 'sin', 'cos', 'ln', or 'π' to insert complex terms.",
      "Press '=' or Enter to parse the string result under strict floating point rules."
    ],
    popular: true,
    faqs: [
      {
        question: "Does this handle degree or radian mode?",
        answer: "Yes, you can toggle between DEG (degrees) and RAD (radians) modes for trigonometric calculations."
      }
    ]
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "Utility Tools",
    shortDesc: "Convert standard metric, imperial, and popular regional Indian land and gold weight units.",
    metaTitle: "Unit Converter Online | Land, Weight & Temperature Converter",
    metaDesc: "Convert between units of length, weight, area, and temperature. Includes traditional Indian units like Bigha, Guntha, Gaj, Tola, and Ratti.",
    formula: "Converted Value = Base Value * Scaling Factor",
    formulaDesc: "Employs high-precision multipliers to swap metric standards (e.g. millimeters, centimeters, meters, kilometers) to imperial and traditional vernacular systems.",
    steps: [
      "Choose the target dimension type (Length, Weight, Area, Temp).",
      "Select your source input unit and desired target output unit.",
      "Input the value and watch the output value render dynamically.",
      "Swap units instantly using the 'Swap' button."
    ],
    trending: true,
    faqs: [
      {
        question: "What is a Guntha in Indian area measurements?",
        answer: "A Guntha is a popular land measurement unit in Western and Southern India, equal to 121 square yards or 1,089 square feet."
      },
      {
        question: "How many grams are in 1 Tola?",
        answer: "In traditional Indian gold metrication, 1 Tola corresponds to approximately 11.66 grams."
      }
    ]
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "Health Tools",
    shortDesc: "Estimate your Body Mass Index (BMI) and health status dynamically.",
    metaTitle: "BMI Calculator Online | Normal & Ideal Weight Guide",
    metaDesc: "Calculate Body Mass Index (BMI) instantly. Input height in cm or feet/inches and weight in kg to analyze health categorizations under WHO benchmarks.",
    formula: "BMI = Weight (kg) / [Height (m)]^2",
    formulaDesc: "Determines proportion of weight in kilograms against the squared height in meters to establish a relative metabolic weight distribution category.",
    steps: [
      "Input your raw body weight in standard units (kg or lbs).",
      "Type or select your height using metric (cm) or imperial (feet/inches).",
      "The tool renders your precise BMI number alongside World Health Organization (WHO) color ranges."
    ],
    faqs: [
      {
        question: "What is a healthy BMI range?",
        answer: "A healthy BMI according to WHO standards lies between 18.5 and 24.9. Lower values denote underweight, whereas higher bands indicate overweight or obesity."
      }
    ]
  },
  {
    slug: "study-timer",
    name: "Study Timer (Pomodoro)",
    category: "Utility Tools",
    shortDesc: "Track your study sessions and stay highly focused with intervals based on the Pomodoro technique.",
    metaTitle: "Study Timer Online - Pomodoro Break Counter",
    metaDesc: "Boost your study focus using our modular Pomodoro Study Timer. Configurable session rounds, automated alarm sounds, and simple start/pause UI controls.",
    formula: "Interval Timer Loop",
    formulaDesc: "Sequentially counts down standard focus phases (25 mins) followed by short breaks (5 mins) or long breaks (15 mins) to optimize neuro-ergonomic mental pacing.",
    steps: [
      "Choose your preferred timer mode: Pomodoro, Short Break, or Long Break.",
      "Click 'Start' to initiate the high-precision countdown.",
      "Toggle local sound alerts to announce intervals when the clock reaches zero."
    ],
    trending: true,
    faqs: [
      {
        question: "What is the Pomodoro technique?",
        answer: "Developed by Francesco Cirillo, it involves working for 25 minutes without distraction, followed by a 5-minute restorative mental break."
      }
    ]
  },
  {
    slug: "semester-cgpa",
    name: "Semester CGPA Calculator",
    category: "Education Tools",
    shortDesc: "Compile your credit-weighted Semester Grade Point Average into a grand cumulative CGPA.",
    metaTitle: "Semester CGPA Calculator - Weighted Multi-Sem Compiler",
    metaDesc: "Combine up to 8 semesters of results. Add credit weights and SGPA per semester to formulate an accurate and official university transcript estimate.",
    formula: "CGPA = Sum (SGPA_i * Credit_i) / Total Credits",
    formulaDesc: "Academic transcripts calculate CGPA as the credit-weighted mean of all semesters, where performance in higher-credit terms has higher weighting.",
    steps: [
      "Define how many semesters you want to calculate (up to 8 semesters).",
      "Fill out the estimated SGPA and registered Credit Hours for each corresponding semester line.",
      "The dynamic engine displays the running aggregate total credits and weighted cumulative CGPA."
    ],
    faqs: [
      {
        question: "What should I do if my university doesn't use semester credits?",
        answer: "If credits are equal across terms, assign a weight of '1' or leave the credit inputs equal, which will produce a standard average of all semesters."
      }
    ]
  },
  {
    slug: "percentage-increase-decrease",
    name: "Percentage Increase/Decrease Calculator",
    category: "Calculator Tools",
    shortDesc: "Find the percentage shift between two scalar prices or numeric values.",
    metaTitle: "Percentage Increase/Decrease Calculator - Value Change Metric",
    metaDesc: "Quickly evaluate the markup percentage or discount rate between original and secondary numeric values with complete mathematical progression.",
    formula: "Change (%) = [(New Value - Original Value) / Original Value] * 100",
    formulaDesc: "Checks the standard difference between the absolute secondary value and primary input, scales it dynamically by the reference index, and translates to standard percentages.",
    steps: [
      "Input your base original value indicator.",
      "Enter the secondary new transformed value.",
      "Read out the exact percentage change, indicating if it's an increase or decrease."
    ],
    faqs: [
      {
        question: "How do I calculate percent change between 120 and 150?",
        answer: "Formula: [(150 - 120) / 120] * 100 = (30 / 120) * 100 = 25% increase."
      }
    ]
  },
  {
    slug: "exam-countdown-timer",
    name: "Exam Countdown Timer",
    category: "Exam Tools",
    shortDesc: "Add your semester, board, or recruitment exams to stay motivated with real-time countdown clocks.",
    metaTitle: "Exam Countdown Timer | UPSC, Board, JEE & NEET Clock",
    metaDesc: "Free customized exam countdown countdown clocks. Setup important dates like JEE, boards, SSC, or internal exams to track remaining days, hours, and minutes.",
    formula: "Time Left = Target Date - Current Reference Timestamp",
    formulaDesc: "Dynamic client-side ticker that breaks down remaining duration milliseconds into days, hours, minutes, and seconds dynamically.",
    steps: [
      "Input your target exam name and description.",
      "Select the scheduled local target examination date and time.",
      "Watch the high-precision ticker animate live. Add up to 4 custom exam trackers easily."
    ],
    popular: true,
    faqs: [
      {
        question: "Can I save custom count-down logs?",
        answer: "Yes, counts are saved automatically inside your local browser session storage so they persist when you refresh the screen."
      }
    ]
  }
];
