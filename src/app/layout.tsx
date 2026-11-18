import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ChartNoAxesCombined } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="FinCalc home"
            >
              <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl">
                <ChartNoAxesCombined />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Fin<span className="text-primary">Calc</span>
              </span>
            </Link>

            <nav
              className="text-muted-foreground hidden items-center gap-8 text-sm font-medium md:flex"
              aria-label="Main navigation"
            >
              <Link
                className="transition-colors hover:text-foreground"
                href="/#calculators"
              >
                Calculators
              </Link>
              <Link
                className="transition-colors hover:text-foreground"
                href="/#why"
              >
                Why FinCalc
              </Link>
              <Link
                className="transition-colors hover:text-foreground"
                href="/#how"
              >
                How it works
              </Link>
            </nav>

            <Link
              href="/#calculators"
              className={buttonVariants({
                size: "sm",
                className: "rounded-full",
              })}
            >
              Get started
            </Link>
          </div>
        </header>

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
