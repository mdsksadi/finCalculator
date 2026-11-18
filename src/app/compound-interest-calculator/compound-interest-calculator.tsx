"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  calculateCompoundInterest,
  validateCompoundInterestInputs,
  type CompoundingFrequency,
} from "@/lib/compound-interest";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const frequencyOptions: { label: string; value: CompoundingFrequency }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annually", value: "annually" },
];

const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "var(--muted-foreground)",
  },
  interest: {
    label: "Interest",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const VISIBLE_SCHEDULE_ROWS = 10;

function toNumber(value: string) {
  return value.trim() === "" ? Number.NaN : Number(value);
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(value);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function frequencyLabel(frequency: CompoundingFrequency) {
  return (
    frequencyOptions.find((option) => option.value === frequency)?.label ??
    "Monthly"
  );
}

export function CompoundInterestCalculator() {
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [annualRate, setAnnualRate] = useState("7");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("monthly");
  const [years, setYears] = useState("10");
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const inputs = useMemo(
    () => ({
      initialAmount: toNumber(initialAmount),
      monthlyContribution: toNumber(monthlyContribution),
      annualRate: toNumber(annualRate),
      frequency,
      years: toNumber(years),
    }),
    [initialAmount, monthlyContribution, annualRate, frequency, years],
  );

  const errors = useMemo(
    () => validateCompoundInterestInputs(inputs),
    [inputs],
  );
  const isValid = Object.keys(errors).length === 0;
  const result = useMemo(
    () => (isValid ? calculateCompoundInterest(inputs) : null),
    [inputs, isValid],
  );

  const rows = result
    ? showFullSchedule
      ? result.schedule
      : result.schedule.slice(0, VISIBLE_SCHEDULE_ROWS)
    : [];

  const chartData = result
    ? result.schedule.map((entry) => ({
        year: entry.year,
        contributions: entry.contributions,
        interest: entry.interest,
      }))
    : [];

  return (
    <Tabs defaultValue="calculator" className="gap-6">
      <TabsList>
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="breakdown">Year-by-year breakdown</TabsTrigger>
        <TabsTrigger value="graph">Graph</TabsTrigger>
      </TabsList>

      <TabsContent value="calculator" className="flex flex-col gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your investment details</CardTitle>
              <CardDescription>
                Adjust the numbers and your projection updates instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field data-invalid={Boolean(errors.initialAmount)}>
                  <FieldLabel htmlFor="initial-amount">
                    Starting amount
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="initial-amount"
                      inputMode="decimal"
                      value={initialAmount}
                      onChange={(event) => setInitialAmount(event.target.value)}
                      aria-invalid={Boolean(errors.initialAmount)}
                    />
                    <InputGroupAddon>
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.initialAmount ? (
                    <FieldError>{errors.initialAmount}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={Boolean(errors.monthlyContribution)}>
                  <FieldLabel htmlFor="monthly-contribution">
                    Monthly contribution
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="monthly-contribution"
                      inputMode="decimal"
                      value={monthlyContribution}
                      onChange={(event) =>
                        setMonthlyContribution(event.target.value)
                      }
                      aria-invalid={Boolean(errors.monthlyContribution)}
                    />
                    <InputGroupAddon>
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.monthlyContribution ? (
                    <FieldError>{errors.monthlyContribution}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={Boolean(errors.annualRate)}>
                  <FieldLabel htmlFor="annual-rate">
                    Annual interest rate
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="annual-rate"
                      inputMode="decimal"
                      value={annualRate}
                      onChange={(event) => setAnnualRate(event.target.value)}
                      aria-invalid={Boolean(errors.annualRate)}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.annualRate ? (
                    <FieldError>{errors.annualRate}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={Boolean(errors.frequency)}>
                  <FieldLabel htmlFor="compounding-frequency">
                    Compounding frequency
                  </FieldLabel>
                  <Select
                    items={frequencyOptions}
                    value={frequency}
                    onValueChange={(value) =>
                      setFrequency(
                        typeof value === "string"
                          ? (value as CompoundingFrequency)
                          : "monthly",
                      )
                    }
                  >
                    <SelectTrigger
                      id="compounding-frequency"
                      aria-invalid={Boolean(errors.frequency)}
                    >
                      <SelectValue placeholder="Select a frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {frequencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.frequency ? (
                    <FieldError>{errors.frequency}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={Boolean(errors.years)}>
                  <FieldLabel htmlFor="time-horizon">Time horizon</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-horizon"
                      inputMode="decimal"
                      value={years}
                      onChange={(event) => setYears(event.target.value)}
                      aria-invalid={Boolean(errors.years)}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>years</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.years ? (
                    <FieldError>{errors.years}</FieldError>
                  ) : null}
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your projection</CardTitle>
              <CardDescription>
                What your investment could be worth at the end of the term.
              </CardDescription>
            </CardHeader>
            <CardContent aria-live="polite">
              {result ? (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-sm font-medium">
                      Future value
                    </p>
                    <p className="text-3xl font-bold tracking-tight tabular-nums">
                      {formatCurrency(result.futureValue)}
                    </p>
                  </div>

                  <Separator />

                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Total contributions
                      </dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatCurrency(result.totalContributions)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Total interest
                      </dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatCurrency(result.totalInterest)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Monthly contribution
                      </dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatCurrency(inputs.monthlyContribution)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Compounding
                      </dt>
                      <dd className="mt-1 font-semibold">
                        {frequencyLabel(frequency)}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Enter valid details to see your projection.
                </p>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-xs">
                Projection assumes contributions are made at the end of each
                month.
              </p>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contributions vs. interest</CardTitle>
            <CardDescription>
              How much of your balance comes from money you put in versus
              growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">Contributions</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatPercent(result.contributionShare)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm tabular-nums">
                    {formatCurrency(result.totalContributions)}
                  </p>
                  <Separator />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">Interest</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatPercent(result.interestShare)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm tabular-nums">
                    {formatCurrency(result.totalInterest)}
                  </p>
                  <Separator />
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Enter valid details to see the breakdown.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="breakdown">
        <Card>
          <CardHeader>
            <CardTitle>Year-by-year breakdown</CardTitle>
            <CardDescription>
              A closer look at how your balance grows each year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Year</TableHead>
                    <TableHead className="text-right">Contributions</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(row.contributions)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(row.interest)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {!showFullSchedule &&
                result.schedule.length > VISIBLE_SCHEDULE_ROWS ? (
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Showing the first {VISIBLE_SCHEDULE_ROWS} of{" "}
                        {result.schedule.length} years
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                ) : null}
              </Table>
            ) : (
              <p className="text-muted-foreground text-sm">
                Enter valid details to see the breakdown.
              </p>
            )}
          </CardContent>
          {result && result.schedule.length > VISIBLE_SCHEDULE_ROWS ? (
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setShowFullSchedule((current) => !current)}
              >
                {showFullSchedule
                  ? `Show first ${VISIBLE_SCHEDULE_ROWS} years`
                  : "Show full breakdown"}
              </Button>
            </CardFooter>
          ) : null}
        </Card>
      </TabsContent>

      <TabsContent value="graph">
        <Card>
          <CardHeader>
            <CardTitle>Growth over time</CardTitle>
            <CardDescription>
              Watch compounding build your balance year after year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <ChartContainer
                config={chartConfig}
                className="min-h-[320px] w-full"
              >
                <AreaChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `Year ${value}`}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={64}
                    tickFormatter={(value) => formatCompactCurrency(value)}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => `Year ${value}`}
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    dataKey="contributions"
                    stackId="growth"
                    type="monotone"
                    fill="var(--color-contributions)"
                    stroke="var(--color-contributions)"
                    fillOpacity={0.5}
                  />
                  <Area
                    dataKey="interest"
                    stackId="growth"
                    type="monotone"
                    fill="var(--color-interest)"
                    stroke="var(--color-interest)"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <p className="text-muted-foreground text-sm">
                Enter valid details to see the chart.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
