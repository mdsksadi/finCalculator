"use client";

import Link from "next/link";
import { ChartNoAxesCombined } from "lucide-react";
import { usePathname } from "next/navigation";

import { GetStartedButton } from "@/components/get-started-button";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {isHome ? (
          <>
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

            <GetStartedButton />
          </>
        ) : (
          <Link
            href="/"
            className="mx-auto flex items-center gap-2.5"
            aria-label="FinCalc home"
          >
            <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl">
              <ChartNoAxesCombined />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Fin<span className="text-primary">Calc</span>
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
