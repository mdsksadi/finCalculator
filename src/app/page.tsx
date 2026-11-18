import Link from "next/link";
import {
  ArrowRight,
  Check,
  House,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const calculators = [
  {
    eyebrow: "Plan your home",
    title: "Mortgage Repayment Calculator",
    description:
      "See exactly what your dream home will cost each month before you commit. Adjust the numbers and understand where every dollar goes.",
    icon: House,
    href: "/mortgage-repayment-calculator",
    features: [
      "Estimate your monthly repayment",
      "Experiment with interest rates and loan terms",
      "Break down principal vs. total interest",
      "Preview your amortization schedule",
    ],
  },
  {
    eyebrow: "Grow your wealth",
    title: "Compound Interest Calculator",
    description:
      "Watch your money work for you. Discover how time, regular contributions, and a little compounding can add up to something big.",
    icon: TrendingUp,
    href: "/compound-interest-calculator",
    features: [
      "Project how your savings grow over time",
      "See the power of compounding visually",
      "Model contributions and expected returns",
      "Compare different time horizons side by side",
    ],
  },
];

const reasons = [
  {
    icon: Target,
    title: "Accurate by design",
    body: "Sound formulas and clear assumptions give you numbers you can trust.",
  },
  {
    icon: Zap,
    title: "Fast & effortless",
    body: "Enter a few details and get meaningful results in an instant.",
  },
  {
    icon: Sparkles,
    title: "Easy to understand",
    body: "Plain language and helpful breakdowns — no finance degree required.",
  },
  {
    icon: ShieldCheck,
    title: "Free & private",
    body: "No account, no hidden fees, and your numbers stay on your device.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter your numbers",
    body: "Tell us a few details about your loan, savings, or goals.",
  },
  {
    number: "02",
    title: "Get instant results",
    body: "See a clear breakdown update as you adjust the inputs.",
  },
  {
    number: "03",
    title: "Plan with confidence",
    body: "Use the insights to make a decision that fits your life.",
  },
];

export default function Home() {
  return (
    <div
      id="top"
      className="flex min-h-screen flex-1 flex-col bg-background font-sans text-foreground"
    >
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
            <Badge variant="secondary" className="rounded-full">
              Two free financial calculators
            </Badge>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Make confident money decisions with{" "}
              <span className="text-primary">crystal-clear numbers</span>.
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8">
              FinCalc turns complicated financial math into answers you can act
              on. Understand your mortgage and grow your savings with simple,
              powerful tools — no spreadsheets, no sign-ups, no guesswork.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#calculators"
                className={buttonVariants({
                  size: "lg",
                  className: "w-full rounded-full sm:w-auto",
                })}
              >
                Explore the calculators
                <ArrowRight data-icon="inline-end" />
              </a>
              <a
                href="#how"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full rounded-full sm:w-auto",
                })}
              >
                See how it works
              </a>
            </div>

            <div className="mx-auto mt-16 max-w-2xl">
              <Separator />
              <dl className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-3">
                <div>
                  <dt className="text-sm font-semibold">100% free</dt>
                  <dd className="text-muted-foreground mt-1 text-sm">
                    Every tool, no strings attached.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">No sign-up</dt>
                  <dd className="text-muted-foreground mt-1 text-sm">
                    Jump straight to the numbers.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">Instant results</dt>
                  <dd className="text-muted-foreground mt-1 text-sm">
                    Answers the moment you need them.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="calculators" className="scroll-mt-16 bg-muted/30 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary">The toolkit</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Two calculators. One clearer picture of your money.
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-8">
                Each tool is built to take the guesswork out of a big financial
                decision — with focused features and results that make sense.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {calculators.map((calculator) => {
                const Icon = calculator.icon;

                return (
                  <Link
                    key={calculator.title}
                    href={calculator.href}
                    className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Card className="h-full transition-all group-hover:ring-2 group-hover:ring-foreground/20">
                      <CardHeader>
                        <span className="bg-muted text-foreground flex size-14 items-center justify-center rounded-2xl ring-1 ring-foreground/10">
                          <Icon />
                        </span>
                        <p className="text-primary mt-4 text-xs font-semibold tracking-widest uppercase">
                          {calculator.eyebrow}
                        </p>
                        <CardTitle>{calculator.title}</CardTitle>
                        <CardDescription>
                          {calculator.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="flex flex-col gap-3">
                          {calculator.features.map((feature) => (
                            <li key={feature} className="flex gap-3 text-sm">
                              <Check className="text-primary mt-0.5 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <span
                          className={buttonVariants({
                            variant: "outline",
                            className: "rounded-full",
                          })}
                        >
                          Launch calculator
                          <ArrowRight data-icon="inline-end" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why" className="scroll-mt-16 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary">Why FinCalc</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Financial clarity, without the complexity
              </h2>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <div key={reason.title}>
                    <span className="bg-muted text-foreground flex size-12 items-center justify-center rounded-xl">
                      <Icon />
                    </span>
                    <h3 className="mt-5 font-semibold">{reason.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {reason.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-16 bg-muted/30 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary">How it works</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From question to answer in three steps
              </h2>
            </div>

            <div className="relative mt-14 grid gap-10 md:grid-cols-3">
              <Separator className="absolute top-5 hidden md:block" />
              {steps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <span className="bg-primary text-primary-foreground ring-background relative mx-auto flex size-10 items-center justify-center rounded-full text-sm font-bold ring-8">
                    {step.number}
                  </span>
                  <h3 className="mt-6 font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-sm leading-6">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="bg-primary text-primary-foreground relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-16 text-center shadow-lg sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ready to make your money make sense?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl">
              Start with the mortgage or compound interest calculator and see
              what&apos;s possible — in just a few clicks.
            </p>
            <a
              href="#calculators"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-8 rounded-full",
              })}
            >
              Browse the calculators
              <ArrowRight data-icon="inline-end" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
