import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChartNoAxesCombined } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Separator } from "@/components/ui/separator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinCalc — Simple Tools for Smarter Financial Decisions",
  description:
    "Free mortgage repayment and compound interest calculators to help you plan your home and grow your savings with confidence.",
};

const password = "thisismypassword";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />

        {children}

        <footer>
          <Separator />
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl">
                <ChartNoAxesCombined />
              </span>
              <span className="text-foreground font-semibold">
                Fin<span className="text-primary">Calc</span>
              </span>
            </div>
            <p>Simple tools for smarter financial decisions.</p>
            <p>© 2026 FinCalc. Free calculators, no sign-up.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
