import React from "react";

export interface TaxStatusBarProps {
  /**
   * รหัสเวอร์ชันหรือสถานะ Terminal
   * @default "TH_REVENUE_CODE_2026"
   */
  terminalStatus?: string;
  /**
   * ค่าลดหย่อนส่วนตัวพื้นฐาน
   * @default "60,000 THB"
   */
  baseAllowanceText?: string;
  /**
   * ค่าใช้จ่ายที่หักได้สูงสุด
   * @default "100,000 THB (50%)"
   */
  maxExpenseDeductText?: string;
  /**
   * จำนวนและช่วงขั้นบันไดภาษี
   * @default "8 ขั้น (0-35%)"
   */
  bracketsText?: string;

  // Class เสริมสำหรับ Container ภายนอก
  className?: string;
}

export const TaxStatusBar: React.FC<TaxStatusBarProps> = ({
  terminalStatus = "TH_REVENUE_CODE_2026",
  baseAllowanceText = "60,000 THB",
  maxExpenseDeductText = "100,000 THB (50%)",
  bracketsText = "8_TIERS (0-35%)",
  className = "",
}) => {
  return (
    <div
      className={`max-w-[1600px] mx-auto rounded-xl border border-cyan-300 bg-white px-4 py-3 sm:px-6 sm:py-3.5 text-xs tracking-wider ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Item 1: Active Terminal Status */}
        <div className="flex items-center gap-2 font-bold text-cyan-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="tracking-wide font-bold">
            TAX CALCULATOR
          </span>
        </div>

        {/* Item 2: Base Allowance */}
        <div className="text-slate-400 font-medium">
          <span className="text-slate-500 mr-1.5">ค่าลดหย่อยส่วนตัว:</span>
          <span className="text-slate-400">{baseAllowanceText}</span>
        </div>

        {/* Item 3: Max Expense Deduction */}
        <div className="text-slate-400 font-medium">
          <span className="text-slate-500 mr-1.5">หักค่าใช้จ่าย:</span>
          <span className="text-slate-400">{maxExpenseDeductText}</span>
        </div>

        {/* Item 4: Brackets Specification */}
        <div className="font-bold text-emerald-400 tracking-wide">
          <span className="text-emerald-500/80 mr-1.5">อัตราภาษี:</span>
          <span>8 ขั้น (0-35%)</span>
        </div>
      </div>
    </div>
  );
};

export default TaxStatusBar;
