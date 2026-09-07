"use client";

import React from "react";
import { formatNumber } from "@/lib/taxCalculator";

interface TaxFormProps {
  income: number;
  personalDeduction: number;
  otherDeductions: number;
  calculatedExpense: number;
  setIncome: (val: number) => void;
  setPersonalDeduction: (val: number) => void;
  setOtherDeductions: (val: number) => void;
  onReset: () => void;
}

export default function TaxForm({
  income,
  personalDeduction,
  otherDeductions,
  calculatedExpense,
  setIncome,
  setPersonalDeduction,
  setOtherDeductions,
  onReset,
}: TaxFormProps) {
  // Quick income presets for easy testing
  const presets = [
    { label: "300,000 บ./ปี (2.5 หมื่น/ด.)", value: 300000 },
    { label: "600,000 บ./ปี (5 หมื่น/ด.)", value: 600000 },
    { label: "1,200,000 บ./ปี (1 แสน/ด.)", value: 1200000 },
    { label: "2,500,000 บ./ปี", value: 2500000 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            กรอกข้อมูลเพื่อคำนวณภาษี
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ระบุรายได้ทั้งปีและค่าลดหย่อนต่าง ๆ ตามจริง
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="ล้างข้อมูลทั้งหมดเป็นค่าเริ่มต้น"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          รีเซ็ตค่า
        </button>
      </div>

      <div className="space-y-6">
        {/* 1. รายได้รวมต่อปี */}
        <div>
          <label
            htmlFor="income-input"
            className="block text-sm font-bold text-slate-700 mb-1.5"
          >
            รายได้รวมต่อปี (บาท) <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-medium">
              ฿
            </div>
            <input
              id="income-input"
              type="number"
              min="0"
              step="1000"
              value={income === 0 ? "" : income}
              onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
              placeholder="เช่น 600000"
              className="w-full pl-8 pr-16 py-3 bg-slate-50/50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-500 font-medium">
              บาท/ปี
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1.5">
            <span>เงินได้จากเงินเดือน โบนัส ค่าจ้าง หรือรายได้ทั้งปี</span>
            {income > 0 && (
              <span className="font-semibold text-blue-700">
                ≈{" "}
                {(income / 12).toLocaleString("th-TH", {
                  maximumFractionDigits: 0,
                })}{" "}
                บาท/เดือน
              </span>
            )}
          </div>
        </div>

        {/* 2. ค่าใช้จ่าย (คำนวณให้อัตโนมัติ: หัก 50% ไม่เกิน 100,000 บาท) */}
        <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <span>ค่าใช้จ่ายที่หักได้</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
                คำนวณให้อัตโนมัติ
              </span>
            </label>
            <span className="text-sm font-mono font-bold text-blue-800">
              - {formatNumber(calculatedExpense)} บาท
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            หัก 50% ของเงินได้ แต่ไม่เกิน 100,000 บาท <br />
            {income > 0 && income * 0.5 > 100000 && (
              <span className="text-blue-700 font-medium ml-1">
                (50% เท่ากับ {formatNumber(income * 0.5)} บาท
                แต่ใช้สิทธิ์ได้สูงสุด 100,000 บาท)
              </span>
            )}
          </p>
        </div>

        {/* 3. ค่าลดหย่อนส่วนตัว (เริ่มต้น 60,000 บาท - แก้ไขได้) */}
        <div>
          <label
            htmlFor="personal-deduction"
            className="text-sm font-bold text-slate-700"
          >
            ค่าลดหย่อนส่วนตัว (บาท)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-medium">
              ฿
            </div>
            <input
              id="personal-deduction"
              type="number"
              min="0"
              step="1000"
              value={personalDeduction === 0 ? "" : personalDeduction}
              onChange={(e) =>
                setPersonalDeduction(Math.max(0, Number(e.target.value)))
              }
              placeholder="60000"
              className="w-full pl-8 pr-16 py-3 bg-slate-50/50 border border-slate-300 rounded-xl text-slate-900 font-medium text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-500 font-medium">
              บาท
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            ได้รับสิทธิลดหย่อนเริ่มต้นคนละ 60,000 บาท (สามารถแก้ไขได้)
          </p>
        </div>

        {/* 4. ค่าลดหย่อนอื่น ๆ (ไม่จำกัดเพดานสูงสุด / ใส่เท่าไหร่ก็ได้ หรือเว้นว่างได้) */}
        <div>
          <label
            htmlFor="other-deductions"
            className="block text-sm font-bold text-slate-700"
          >
            ค่าลดหย่อนอื่น ๆ 
            <span className="text-xs text-slate-500 ml-2 font-medium">(ไม่บังคับ)</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-medium">
              ฿
            </div>
            <input
              id="other-deductions"
              type="number"
              min="0"
              step="1000"
              value={otherDeductions === 0 ? "" : otherDeductions}
              onChange={(e) => {
                const val = e.target.value;
                setOtherDeductions(val === "" ? 0 : Math.max(0, Number(val)));
              }}
              placeholder="0 (หรือเว้นว่างไว้หากไม่มี)"
              className="w-full pl-8 pr-16 py-3 bg-slate-50/50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-slate-500 font-medium">
              บาท
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            เช่น ประกันสังคม,
            ประกันชีวิต, กองทุนต่าง ๆ ฯลฯ
          </p>
        </div>
      </div>
    </div>
  );
}
