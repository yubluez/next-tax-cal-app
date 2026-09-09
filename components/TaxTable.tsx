import React from "react";

export interface TaxTier {
  id: number;
  label: string;
  rangeDescription: string;
  rate: string;
  rateValue: number;
  minIncome: number;
  maxIncome: number;
  colorClass: string;
  isExempt?: boolean;
}

export interface TaxTableProps {
// (Optional) เงินได้สุทธิที่นำมาคำนวณ เพื่อให้ตารางทำ Highlight ขั้นที่ผู้ใช้อยู่ในปัจจุบัน

  taxableIncome?: number;

// (Optional) Class เพิ่มเติมสำหรับครอบ Container ภายนอก

  className?: string;
}

export const TAX_TIERS: TaxTier[] = [
  {
    id: 1,
    label: "TIER 1",
    rangeDescription: "0 - 150K",
    rate: "0% (EXEMPT)",
    rateValue: 0,
    minIncome: 0,
    maxIncome: 150000,
    colorClass: "text-emerald-500 font-bold",
    isExempt: true,
  },
  {
    id: 2,
    label: "TIER 2",
    rangeDescription: "150K - 300K",
    rate: "5%",
    rateValue: 0.05,
    minIncome: 150000,
    maxIncome: 300000,
    colorClass: "text-cyan-500 font-bold",
  },
  {
    id: 3,
    label: "TIER 3",
    rangeDescription: "300K - 500K",
    rate: "10%",
    rateValue: 0.1,
    minIncome: 300000,
    maxIncome: 500000,
    colorClass: "text-cyan-500 font-bold",
  },
  {
    id: 4,
    label: "TIER 4",
    rangeDescription: "500K - 750K",
    rate: "15%",
    rateValue: 0.15,
    minIncome: 500000,
    maxIncome: 750000,
    colorClass: "text-amber-500 font-bold",
  },
  {
    id: 5,
    label: "TIER 5",
    rangeDescription: "750K - 1M",
    rate: "20%",
    rateValue: 0.2,
    minIncome: 750000,
    maxIncome: 1000000,
    colorClass: "text-amber-500 font-bold",
  },
  {
    id: 6,
    label: "TIER 6",
    rangeDescription: "1M - 2M",
    rate: "25%",
    rateValue: 0.25,
    minIncome: 1000000,
    maxIncome: 2000000,
    colorClass: "text-rose-500 font-bold",
  },
  {
    id: 7,
    label: "TIER 7",
    rangeDescription: "2M - 5M",
    rate: "30%",
    rateValue: 0.3,
    minIncome: 2000000,
    maxIncome: 5000000,
    colorClass: "text-rose-500 font-bold",
  },
  {
    id: 8,
    label: "TIER 8",
    rangeDescription: "> 5M",
    rate: "35%",
    rateValue: 0.35,
    minIncome: 5000000,
    maxIncome: Infinity,
    colorClass: "text-rose-600 font-bold",
  },
];

export const TaxTable: React.FC<TaxTableProps> = ({
  taxableIncome,
  className = "",
}) => {
  return (
    <div
      className={`max-w-[1450px] mx-auto rounded-md border border-slate-200 bg-slate-50 shadow-sm overflow-hidden ${className}`}
    >
      {/* Table Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-slate-50 border-b border-slate-400  tracking-wider">
        <span className="font-bold text-black uppercase">
          ตารางอัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได <span className="text-cyan-600 tracking-wider">(ปีภาษีปัจจุบัน)</span>
        </span>
        <span className="font-semibold text-sm text-cyan-500 tracking-wider">
          THAI REVENUE DEPT COMPLIANT
        </span>
      </div>

      {/* Grid: 2 columns on mobile, 4 columns on desktop with 1px border lines */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-400">
        {TAX_TIERS.map((tier) => {
          // ตรวจสอบว่าเงินได้ของผู้ใช้อยู่ในขั้นนี้หรือไม่ (ถ้ามีการส่ง prop เข้ามา)
          const isActive =
            taxableIncome !== undefined &&
            taxableIncome > tier.minIncome &&
            (tier.maxIncome === Infinity || taxableIncome <= tier.maxIncome);

          return (
            <div
              key={tier.id}
              className={`relative p-4 sm:p-5 flex flex-col justify-center transition-colors duration-200 ${
                isActive
                  ? "bg-slate-50 ring-1 ring-inset ring-cyan-400/50"
                  : "bg-white hover:bg-slate-100"
              }`}
            >
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute top-3 right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              )}

              {/* Tier Label and Range */}
              <div className="text-[10px] sm:text-xs font-semibold text-slate-400/90 tracking-wide uppercase">
                {tier.label} ({tier.rangeDescription})
              </div>

              {/* Tax Rate Value */}
              <div
                className={`mt-1.5 text-base sm:text-lg font-black tracking-tight ${tier.colorClass}`}
              >
                {tier.rate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaxTable;
