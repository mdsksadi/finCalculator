import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { CompoundInterestCalculator } from "./compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — FinCalc",
  description:
    "See how your savings grow over time. Project your future value, track contributions and interest, and watch compounding at work with FinCalc's free compound interest calculator.",
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
              Grow your wealth
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Compound Interest Calculator
            </h1>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              Watch your money work for you. Discover how time, regular
              contributions, and a little compounding can add up to something
              big.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <CompoundInterestCalculator />
        </div>
      </section>
    </main>
  );
}
