export type MortgageInputs = {
  homePrice: number;
  downPayment: number;
  annualRate: number;
  termYears: number;
};

export type AmortizationRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type MortgageResult = {
  principal: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  principalShare: number;
  interestShare: number;
  schedule: AmortizationRow[];
};

export type MortgageErrors = Partial<Record<keyof MortgageInputs, string>>;

export function validateMortgageInputs(inputs: MortgageInputs): MortgageErrors {
  const errors: MortgageErrors = {};

  if (!Number.isFinite(inputs.homePrice) || inputs.homePrice <= 0) {
    errors.homePrice = "Enter a home price greater than $0.";
  }

  if (!Number.isFinite(inputs.downPayment) || inputs.downPayment < 0) {
    errors.downPayment = "Enter a down payment of $0 or more.";
  } else if (inputs.homePrice > 0 && inputs.downPayment >= inputs.homePrice) {
    errors.downPayment = "Down payment must be less than the home price.";
  }

  if (!Number.isFinite(inputs.annualRate) || inputs.annualRate < 0) {
    errors.annualRate = "Interest rate cannot be negative.";
  }

  if (!Number.isFinite(inputs.termYears) || inputs.termYears <= 0) {
    errors.termYears = "Enter a loan term greater than 0 years.";
  }

  return errors;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const principal = inputs.homePrice - inputs.downPayment;
  const monthlyRate = inputs.annualRate / 100 / 12;
  const payments = Math.round(inputs.termYears * 12);

  const monthlyPayment =
    monthlyRate === 0
      ? principal / payments
      : (principal * monthlyRate * (1 + monthlyRate) ** payments) /
        ((1 + monthlyRate) ** payments - 1);

  let balance = principal;
  let totalInterest = 0;
  const schedule: AmortizationRow[] = [];

  for (let month = 1; month <= payments; month++) {
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;
    let payment = monthlyPayment;

    if (month === payments) {
      principalPaid = balance;
      payment = principalPaid + interest;
    }

    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;

    schedule.push({
      month,
      payment,
      principal: principalPaid,
      interest,
      balance,
    });
  }

  const totalPaid = principal + totalInterest;

  return {
    principal,
    monthlyPayment,
    totalInterest,
    totalPaid,
    principalShare: totalPaid > 0 ? principal / totalPaid : 0,
    interestShare: totalPaid > 0 ? totalInterest / totalPaid : 0,
    schedule,
  };
}
