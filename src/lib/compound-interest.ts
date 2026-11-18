export type CompoundingFrequency = "monthly" | "quarterly" | "annually";

export type CompoundInterestInputs = {
  initialAmount: number;
  monthlyContribution: number;
  annualRate: number;
  frequency: CompoundingFrequency;
  years: number;
};

export type CompoundInterestYear = {
  year: number;
  contributions: number;
  interest: number;
  balance: number;
};

export type CompoundInterestResult = {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  contributionShare: number;
  interestShare: number;
  schedule: CompoundInterestYear[];
};

export type CompoundInterestErrors = Partial<
  Record<keyof CompoundInterestInputs, string>
>;

const PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

const MAX_YEARS = 100;

export function validateCompoundInterestInputs(
  inputs: CompoundInterestInputs,
): CompoundInterestErrors {
  const errors: CompoundInterestErrors = {};

  if (!Number.isFinite(inputs.initialAmount) || inputs.initialAmount < 0) {
    errors.initialAmount = "Enter a starting amount of $0 or more.";
  }

  if (
    !Number.isFinite(inputs.monthlyContribution) ||
    inputs.monthlyContribution < 0
  ) {
    errors.monthlyContribution = "Enter a monthly contribution of $0 or more.";
  }

  if (!Number.isFinite(inputs.annualRate) || inputs.annualRate < 0) {
    errors.annualRate = "Interest rate cannot be negative.";
  }

  if (!(inputs.frequency in PERIODS_PER_YEAR)) {
    errors.frequency = "Choose how often interest compounds.";
  }

  if (!Number.isFinite(inputs.years) || inputs.years <= 0) {
    errors.years = "Enter a time horizon greater than 0 years.";
  } else if (inputs.years > MAX_YEARS) {
    errors.years = `Enter a time horizon of ${MAX_YEARS} years or less.`;
  }

  return errors;
}

export function calculateCompoundInterest(
  inputs: CompoundInterestInputs,
): CompoundInterestResult {
  const periodsPerYear = PERIODS_PER_YEAR[inputs.frequency];
  const periodicRate = inputs.annualRate / 100 / periodsPerYear;

  // Convert the nominal rate (at the chosen compounding frequency) into an
  // equivalent monthly rate so we can model month-by-month contributions.
  const effectiveAnnualRate = (1 + periodicRate) ** periodsPerYear - 1;
  const monthlyRate = (1 + effectiveAnnualRate) ** (1 / 12) - 1;

  const months = Math.max(1, Math.round(inputs.years * 12));

  let balance = inputs.initialAmount;
  let totalContributions = inputs.initialAmount;
  const schedule: CompoundInterestYear[] = [];

  for (let month = 1; month <= months; month++) {
    balance = balance * (1 + monthlyRate) + inputs.monthlyContribution;
    totalContributions += inputs.monthlyContribution;

    if (month % 12 === 0 || month === months) {
      schedule.push({
        year: Math.ceil(month / 12),
        contributions: totalContributions,
        interest: balance - totalContributions,
        balance,
      });
    }
  }

  const futureValue = balance;
  const totalInterest = futureValue - totalContributions;

  return {
    futureValue,
    totalContributions,
    totalInterest,
    contributionShare: futureValue > 0 ? totalContributions / futureValue : 0,
    interestShare: futureValue > 0 ? totalInterest / futureValue : 0,
    schedule,
  };
}
