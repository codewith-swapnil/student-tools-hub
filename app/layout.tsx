import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Student Tools Hub - Academic Calculators & Converters for Indian Students',
  description: 'Free, professional mathematical calculators & converters for Indian schools & universities. Convert percentage to CGPA, calculate exam age eligibility, and check class attendance thresholds instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
