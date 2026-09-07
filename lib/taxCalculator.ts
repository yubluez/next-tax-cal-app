/**
 * Thai Personal Income Tax Calculator Logic
 * ภาษีเงินได้บุคคลธรรมดาแบบขั้นบันไดของประเทศไทย
 */

export interface TaxBracket {
  id: number;
  min: number;
  max: number | null; // null represents infinity
  rangeLabel: string;
  rate: number; // e.g. 0.05 for 5%
  rateLabel: string;
  maxTaxInBracket: number | null;
}

export interface BracketResult {
  bracket: TaxBracket;
  taxableAmountInBracket: number;
  taxInBracket: number;
  isReached: boolean;
  isCurrent: boolean;
}

export interface TaxCalculationResult {
  income: number;
  expense: number;
  personalDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netTaxableIncome: number;
  totalTax: number;
  netIncomeAfterTax: number;
  totalIncomeAfterTax: number;
  effectiveTaxRate: number;
  bracketBreakdown: BracketResult[];
  maxBracketRate: number;
}

export const TAX_BRACKETS: TaxBracket[] = [
  {
    id: 1,
    min: 0,
    max: 150000,
    rangeLabel: "0 - 150,000",
    rate: 0,
    rateLabel: "ยกเว้น (0%)",
    maxTaxInBracket: 0,
  },
  {
    id: 2,
    min: 150000,
    max: 300000,
    rangeLabel: "150,001 - 300,000",
    rate: 0.05,
    rateLabel: "5%",
    maxTaxInBracket: 7500, // (300,000 - 150,000) * 0.05
  },
  {
    id: 3,
    min: 300000,
    max: 500000,
    rangeLabel: "300,001 - 500,000",
    rate: 0.10,
    rateLabel: "10%",
    maxTaxInBracket: 20000, // (500,000 - 300,000) * 0.10
  },
  {
    id: 4,
    min: 500000,
    max: 750000,
    rangeLabel: "500,001 - 750,000",
    rate: 0.15,
    rateLabel: "15%",
    maxTaxInBracket: 37500, // (750,000 - 500,000) * 0.15
  },
  {
    id: 5,
    min: 750000,
    max: 1000000,
    rangeLabel: "750,001 - 1,000,000",
    rate: 0.20,
    rateLabel: "20%",
    maxTaxInBracket: 50000, // (1,000,000 - 750,000) * 0.20
  },
  {
    id: 6,
    min: 1000000,
    max: 2000000,
    rangeLabel: "1,000,001 - 2,000,000",
    rate: 0.25,
    rateLabel: "25%",
    maxTaxInBracket: 250000, // (2,000,000 - 1,000,000) * 0.25
  },
  {
    id: 7,
    min: 2000000,
    max: 5000000,
    rangeLabel: "2,000,001 - 5,000,000",
    rate: 0.30,
    rateLabel: "30%",
    maxTaxInBracket: 900000, // (5,000,000 - 2,000,000) * 0.30
  },
  {
    id: 8,
    min: 5000000,
    max: null,
    rangeLabel: "มากกว่า 5,000,000",
    rate: 0.35,
    rateLabel: "35%",
    maxTaxInBracket: null,
  },
];

/**
 * คำนวณค่าใช้จ่ายตามเงื่อนไข:
 * หัก 50% ของเงินได้ แต่ไม่เกิน 100,000 บาท (คำนวณให้อัตโนมัติ)
 */
export function calculateExpense(income: number): number {
  if (income <= 0) return 0;
  const fiftyPercent = income * 0.5;
  return Math.min(fiftyPercent, 100000);
}

/**
 * คำนวณภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได
 */
export function calculateTax(
  income: number,
  personalDeduction: number = 60000,
  otherDeductions: number = 0
): TaxCalculationResult {
  const safeIncome = Math.max(0, Number(income) || 0);
  const safePersonal = Math.max(0, Number(personalDeduction) || 0);
  const safeOther = Math.max(0, Number(otherDeductions) || 0);

  // 1. คำนวณค่าใช้จ่าย (หัก 50% ไม่เกิน 100,000 บาท)
  const expense = calculateExpense(safeIncome);

  // 2. ค่าลดหย่อนรวม
  const totalDeductions = safePersonal + safeOther;

  // 3. เงินได้สุทธิ = รายได้รวม - ค่าใช้จ่าย - ค่าลดหย่อนทั้งหมด
  const netTaxableIncome = Math.max(0, safeIncome - expense - totalDeductions);

  // 4. คำนวณภาษีแบบขั้นบันได
  let totalTax = 0;
  let maxBracketRate = 0;

  const bracketBreakdown: BracketResult[] = TAX_BRACKETS.map((bracket) => {
    let taxableAmountInBracket = 0;
    let taxInBracket = 0;
    let isReached = false;
    let isCurrent = false;

    if (netTaxableIncome > bracket.min) {
      isReached = true;
      maxBracketRate = bracket.rate;

      if (bracket.max !== null) {
        const bracketCapacity = bracket.max - bracket.min;
        taxableAmountInBracket = Math.min(
          Math.max(0, netTaxableIncome - bracket.min),
          bracketCapacity
        );
      } else {
        // ขั้นสุดท้ายเกิน 5,000,000
        taxableAmountInBracket = Math.max(0, netTaxableIncome - bracket.min);
      }

      taxInBracket = taxableAmountInBracket * bracket.rate;
      totalTax += taxInBracket;

      // ตรวจสอบว่าเงินได้สุทธิสิ้นสุดที่ขั้นนี้หรือไม่
      const isTopBracket =
        bracket.max === null ||
        (netTaxableIncome > bracket.min && netTaxableIncome <= bracket.max);
      if (isTopBracket) {
        isCurrent = true;
      }
    }

    return {
      bracket,
      taxableAmountInBracket,
      taxInBracket,
      isReached,
      isCurrent,
    };
  });

  // เงินได้สุทธิหลังหักภาษี = เงินได้สุทธิ - ภาษี (ตามสูตรในโจทย์)
  const netIncomeAfterTax = Math.max(0, netTaxableIncome - totalTax);

  // เงินได้รวมหลังหักภาษี = รายได้รวม - ภาษี
  const totalIncomeAfterTax = Math.max(0, safeIncome - totalTax);

  // อัตราภาษีที่แท้จริง (Effective Tax Rate)
  const effectiveTaxRate = safeIncome > 0 ? (totalTax / safeIncome) * 100 : 0;

  return {
    income: safeIncome,
    expense,
    personalDeduction: safePersonal,
    otherDeductions: safeOther,
    totalDeductions,
    netTaxableIncome,
    totalTax,
    netIncomeAfterTax,
    totalIncomeAfterTax,
    effectiveTaxRate,
    bracketBreakdown,
    maxBracketRate,
  };
}

/**
 * จัดรูปแบบตัวเลขเป็นสกุลเงินบาทพร้อม comma
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * จัดรูปแบบตัวเลขจำนวนเต็มพร้อม comma
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("th-TH").format(amount);
}
