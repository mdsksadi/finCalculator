import type { ReactNode } from "react";

/* ---------------------------------- Icons --------------------------------- */

function LogoMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-sm">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-white"
        aria-hidden="true"
      >
        <path
          d="M4 17.5 9 12l3.5 3.5L20 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 7H20v4.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21v-7h6v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendingIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m7 14 4-4 3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7h4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="m5 10.5 3.2 3.2L15 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 12 1.8 1.8L15 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------- Calculator card ------------------------- */

const tones = {
  indigo: {
    icon: "bg-indigo-50 text-indigo-600 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-400/20",
    accent: "text-indigo-600 dark:text-indigo-400",
    check: "text-indigo-500 dark:text-indigo-400",
    bar: "bg-linear-to-r from-indigo-500 to-violet-500",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
    accent: "text-emerald-600 dark:text-emerald-400",
    check: "text-emerald-500 dark:text-emerald-400",
    bar: "bg-linear-to-r from-emerald-500 to-teal-500",
  },
} as const;

type Tone = keyof typeof tones;

function CalculatorCard({
  icon,
  tone,
  eyebrow,
  title,
  description,
  features,
}: {
  icon: ReactNode;
  tone: Tone;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
}) {
  const t = tones[tone];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
      <div className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} aria-hidden="true" />

      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${t.icon}`}
        >
          {icon}
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500 dark:bg-white/10 dark:text-zinc-400">
          Coming soon
        </span>
      </div>

      <p className={`mt-6 text-xs font-semibold tracking-widest uppercase ${t.accent}`}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
        {description}
      </p>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 shrink-0 ${t.check}`}>
              <CheckIcon />
            </span>
            <span className="text-zinc-700 dark:text-zinc-200">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6">
        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-400 dark:border-white/10 dark:text-zinc-500"
        >
          Launch calculator
          <ArrowRight />
        </button>
      </div>
    </article>
  );
}

/* ---------------------------------- Page ---------------------------------- */

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-white font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="FinCalc home">
            <LogoMark />
            <span className="text-lg font-bold tracking-tight">
              Fin<span className="text-indigo-600 dark:text-indigo-400">Calc</span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:flex"
            aria-label="Main navigation"
          >
            <a className="transition hover:text-zinc-950 dark:hover:text-white" href="#calculators">
              Calculators
            </a>
            <a className="transition hover:text-zinc-950 dark:hover:text-white" href="#why">
              Why FinCalc
            </a>
            <a className="transition hover:text-zinc-950 dark:hover:text-white" href="#how">
              How it works
            </a>
          </nav>

          <a
            href="#calculators"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-indigo-400"
          >
            Get started
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 -top-40 flex justify-center"
            aria-hidden="true"
          >
            <div className="h-96 w-[42rem] rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-600/10" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
              Two free financial calculators
            </span>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Make confident money decisions with{" "}
              <span className="bg-linear-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                crystal-clear numbers
              </span>
              .
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              FinCalc turns complicated financial math into answers you can act
              on. Understand your mortgage and grow your savings with simple,
              powerful tools — no spreadsheets, no sign-ups, no guesswork.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#calculators"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 sm:w-auto"
              >
                Explore the calculators
                <ArrowRight />
              </a>
              <a
                href="#how"
                className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5 sm:w-auto"
              >
                See how it works
              </a>
            </div>

            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-zinc-200 pt-10 dark:border-white/10 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold">100% free</dt>
                <dd className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Every tool, no strings attached.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold">No sign-up</dt>
                <dd className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Jump straight to the numbers.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold">Instant results</dt>
                <dd className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Answers the moment you need them.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Calculators / features */}
        <section
          id="calculators"
          className="scroll-mt-16 border-t border-zinc-200 bg-zinc-50 py-24 dark:border-white/10 dark:bg-white/[0.02]"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                The toolkit
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Two calculators. One clearer picture of your money.
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                Each tool is built to take the guesswork out of a big financial
                decision — with focused features and results that make sense.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <CalculatorCard
                icon={<HomeIcon />}
                tone="indigo"
                eyebrow="Plan your home"
                title="Mortgage Repayment Calculator"
                description="See exactly what your dream home will cost each month before you commit. Adjust the numbers and understand where every dollar goes."
                features={[
                  "Estimate your monthly repayment",
                  "Experiment with interest rates and loan terms",
                  "Break down principal vs. total interest",
                  "Preview your amortization schedule",
                ]}
              />
              <CalculatorCard
                icon={<TrendingIcon />}
                tone="emerald"
                eyebrow="Grow your wealth"
                title="Compound Interest Calculator"
                description="Watch your money work for you. Discover how time, regular contributions, and a little compounding can add up to something big."
                features={[
                  "Project how your savings grow over time",
                  "See the power of compounding visually",
                  "Model contributions and expected returns",
                  "Compare different time horizons side by side",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Why FinCalc */}
        <section id="why" className="scroll-mt-16 py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                Why FinCalc
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Financial clarity, without the complexity
              </h2>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <TargetIcon />,
                  title: "Accurate by design",
                  body: "Sound formulas and clear assumptions give you numbers you can trust.",
                },
                {
                  icon: <BoltIcon />,
                  title: "Fast & effortless",
                  body: "Enter a few details and get meaningful results in an instant.",
                },
                {
                  icon: <SparkleIcon />,
                  title: "Easy to understand",
                  body: "Plain language and helpful breakdowns — no finance degree required.",
                },
                {
                  icon: <ShieldIcon />,
                  title: "Free & private",
                  body: "No account, no hidden fees, and your numbers stay on your device.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how"
          className="scroll-mt-16 border-t border-zinc-200 bg-zinc-50 py-24 dark:border-white/10 dark:bg-white/[0.02]"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From question to answer in three steps
              </h2>
            </div>

            <div className="relative mt-14 grid gap-10 md:grid-cols-3">
              <div
                className="absolute top-5 right-0 left-0 hidden h-px bg-zinc-200 dark:bg-white/10 md:block"
                aria-hidden="true"
              />
              {[
                {
                  step: "01",
                  title: "Enter your numbers",
                  body: "Tell us a few details about your loan, savings, or goals.",
                },
                {
                  step: "02",
                  title: "Get instant results",
                  body: "See a clear breakdown update as you adjust the inputs.",
                },
                {
                  step: "03",
                  title: "Plan with confidence",
                  body: "Use the insights to make a decision that fits your life.",
                },
              ].map((item) => (
                <div key={item.step} className="relative text-center">
                  <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white ring-8 ring-zinc-50 dark:ring-zinc-950">
                    {item.step}
                  </span>
                  <h3 className="mt-6 font-semibold">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="px-6 py-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-violet-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Ready to make your money make sense?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-indigo-100">
                Start with the mortgage or compound interest calculator and see
                what&apos;s possible — in just a few clicks.
              </p>
              <a
                href="#calculators"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
              >
                Browse the calculators
                <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              Fin<span className="text-indigo-600 dark:text-indigo-400">Calc</span>
            </span>
          </div>
          <p>Simple tools for smarter financial decisions.</p>
          <p>© 2026 FinCalc. Calculators coming soon.</p>
        </div>
      </footer>
    </div>
  );
}
