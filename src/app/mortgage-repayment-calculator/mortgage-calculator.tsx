"use client";

import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
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
import {
  calculateMortgage,
  validateMortgageInputs,
  type AmortizationRow,
} from "@/lib/mortgage";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const termOptions = [
  { label: "10 years", value: "10" },
  { label: "15 years", value: "15" },
  { label: "20 years", value: "20" },
  { label: "25 years", value: "25" },
  { label: "30 years", value: "30" },
];

const VISIBLE_SCHEDULE_ROWS = 12;

function toNumber(value: string) {
  return value.trim() === "" ? Number.NaN : Number(value);
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [annualRate, setAnnualRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const inputs = useMemo(
    () => ({
      homePrice: toNumber(homePrice),
      downPayment: toNumber(downPayment),
      annualRate: toNumber(annualRate),
      termYears: toNumber(termYears),
    }),
    [homePrice, downPayment, annualRate, termYears],
  );

  const errors = useMemo(() => validateMortgageInputs(inputs), [inputs]);
  const isValid = Object.keys(errors).length === 0;
  const result = useMemo(
    () => (isValid ? calculateMortgage(inputs) : null),
    [inputs, isValid],
  );

  const rows: AmortizationRow[] = result
    ? showFullSchedule
      ? result.schedule
      : result.schedule.slice(0, VISIBLE_SCHEDULE_ROWS)
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your loan details</CardTitle>
            <CardDescription>
              Adjust the numbers and your estimate updates instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field data-invalid={Boolean(errors.homePrice)}>
                <FieldLabel htmlFor="home-price">Home price</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="home-price"
                    inputMode="decimal"
                    value={homePrice}
                    onChange={(event) => setHomePrice(event.target.value)}
                    aria-invalid={Boolean(errors.homePrice)}
                  />
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errors.homePrice ? (
                  <FieldError>{errors.homePrice}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={Boolean(errors.downPayment)}>
                <FieldLabel htmlFor="down-payment">Down payment</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="down-payment"
                    inputMode="decimal"
                    value={downPayment}
                    onChange={(event) => setDownPayment(event.target.value)}
                    aria-invalid={Boolean(errors.downPayment)}
                  />
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errors.downPayment ? (
                  <FieldError>{errors.downPayment}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={Boolean(errors.annualRate)}>
                <FieldLabel htmlFor="interest-rate">
                  Annual interest rate
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="interest-rate"
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

              <Field data-invalid={Boolean(errors.termYears)}>
                <FieldLabel htmlFor="loan-term">Loan term</FieldLabel>
                <Select
                  items={termOptions}
                  value={termYears}
                  onValueChange={(value) =>
                    setTermYears(typeof value === "string" ? value : "")
                  }
                >
                  <SelectTrigger
                    id="loan-term"
                    aria-invalid={Boolean(errors.termYears)}
                  >
                    <SelectValue placeholder="Select a term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {termOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.termYears ? (
                  <FieldError>{errors.termYears}</FieldError>
                ) : null}
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your estimate</CardTitle>
            <CardDescription>
              Monthly principal and interest for your new loan.
            </CardDescription>
          </CardHeader>
          <CardContent aria-live="polite">
            {result ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-sm font-medium">
                    Monthly payment
                  </p>
                  <p className="text-3xl font-bold tracking-tight tabular-nums">
                    {formatCurrency(result.monthlyPayment)}
                  </p>
                </div>

                <Separator />

                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground text-sm">
                      Loan amount
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {formatCurrency(result.principal)}
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
                      Total paid
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {formatCurrency(result.totalPaid)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-sm">Payments</dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {result.schedule.length}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Enter valid loan details to see your estimate.
              </p>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-xs">
              Estimate includes principal and interest only.
            </p>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Principal vs. interest</CardTitle>
          <CardDescription>
            Where your money goes over the life of the loan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">Principal</span>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPercent(result.principalShare)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm tabular-nums">
                  {formatCurrency(result.principal)}
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
              Enter valid loan details to see the breakdown.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amortization schedule</CardTitle>
          <CardDescription>
            A month-by-month look at how your balance is paid down.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Month</TableHead>
                  <TableHead className="text-right">Payment</TableHead>
                  <TableHead className="text-right">Principal</TableHead>
                  <TableHead className="text-right">Interest</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(row.payment)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(row.principal)}
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
                    <TableCell colSpan={5} className="text-center">
                      Showing the first {VISIBLE_SCHEDULE_ROWS} of{" "}
                      {result.schedule.length} payments
                    </TableCell>
                  </TableRow>
                </TableFooter>
              ) : null}
            </Table>
          ) : (
            <p className="text-muted-foreground text-sm">
              Enter valid loan details to see the schedule.
            </p>
          )}
        </CardContent>
        {result && result.schedule.length > VISIBLE_SCHEDULE_ROWS ? (
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setShowFullSchedule((current) => !current)}
            >
              {showFullSchedule ? "Show first 12 months" : "Show full schedule"}
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
}
