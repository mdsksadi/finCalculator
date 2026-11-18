import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { MortgageCalculator } from "./mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator — FinCalc",
  description:
    "Estimate your monthly mortgage repayment, see total interest, and preview your amortization schedule with FinCalc's free mortgage calculator.",
};

export default function Page() {
  return (
    <main id="top" className="flex-1">
      <section className="border-b bg-muted/30 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Link
            href="/#calculators"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "-ml-3 rounded-full",
            })}
          >
            <ArrowLeft data-icon="inline-start" />
            All calculators
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-primary text-xs font-semibold tracking-widest uppercase">
              Plan your home
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Mortgage Repayment Calculator
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              See exactly what your dream home will cost each month before you
              commit. Adjust the numbers and understand where every dollar goes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <MortgageCalculator />
        </div>
      </section>
    </main>
  );
}
