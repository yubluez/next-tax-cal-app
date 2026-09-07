"use client";

import React from "react";
import { TaxCalculationResult, formatCurrency, formatNumber } from "@/lib/taxCalculator";

interface TaxSummaryCardProps {
  result: TaxCalculationResult;
}

export default function TaxSummaryCard({ result }: TaxSummaryCardProps) {
  const isZeroTax = result.totalTax === 0;

  return (
    <div className="space-y-6">
      {/* การ์ดไฮไลต์ยอดภาษีที่ต้องชำระทั้งหมด (แสดงเด่นชัดตามโจทย์) ในโทนน้ำเงินฟ้า */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/10 border border-blue-600/30">
        {/* Decorative background glow */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-sky-400/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-blue-400/15 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-200 text-xs font-semibold backdrop-blur-xs border border-sky-400/30">
              <span className="w-2 h-2 rounded-full bg-sky-300 animate-ping" />
              สรุปยอดภาษีประจำปี
            </span>
            <span className="text-xs text-sky-200/80">
              อัตราภาษีเฉลี่ยแท้จริง: {result.effectiveTaxRate.toFixed(2)}%
            </span>
          </div>

          <h3 className="text-sm font-medium text-sky-100/90 mb-1">
            ยอดภาษีที่ต้องชำระทั้งหมด
          </h3>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              ฿ {formatCurrency(result.totalTax)}
            </span>
            <span className="text-sm sm:text-base font-semibold text-sky-200">
              บาท
            </span>
          </div>

          {isZeroTax ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-100 text-xs font-medium border border-sky-400/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-sky-300"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                  clipRule="evenodd"
                />
              </svg>
              ยินดีด้วย! เงินได้สุทธิของคุณไม่ถึงเกณฑ์ที่ต้องเสียภาษี (0 บาท)
            </div>
          ) : (
            <p className="text-xs text-sky-100/80">
              คำนวณตามอัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได อัตราสูงสุดในขั้นที่ตกอยู่:{" "}
              <span className="font-bold text-white underline">
                {(result.maxBracketRate * 100).toFixed(0)}%
              </span>
            </p>
          )}

          {/* ไฮไลต์: เงินได้สุทธิหลังหักภาษี (ตามสูตรในโจทย์) */}
          <div className="mt-6 pt-5 border-t border-blue-600/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-950/50 backdrop-blur-xs p-4 rounded-xl border border-blue-500/30">
              <span className="text-xs text-sky-200 block mb-1">
                เงินได้สุทธิหลังหักภาษี (เงินได้สุทธิ - ภาษี)
              </span>
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                ฿ {formatCurrency(result.netIncomeAfterTax)}
              </span>
              <span className="text-xs text-sky-300/80 block mt-1">
                จากเงินได้สุทธิ {formatNumber(result.netTaxableIncome)} บาท
              </span>
            </div>

            <div className="bg-blue-950/50 backdrop-blur-xs p-4 rounded-xl border border-blue-500/30">
              <span className="text-xs text-sky-200 block mb-1">
                รายได้รวมหลังหักภาษี (รายได้รวม - ภาษี)
              </span>
              <span className="text-xl sm:text-2xl font-bold text-sky-300 font-mono">
                ฿ {formatCurrency(result.totalIncomeAfterTax)}
              </span>
              <span className="text-xs text-sky-200/70 block mt-1">
                ≈ {formatCurrency(result.totalIncomeAfterTax / 12)} บาท/เดือน
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* การ์ดสรุปแจกแจงที่มาของตัวเลข (Calculation Summary) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="w-4 h-4 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5"
            />
          </svg>
          สรุปขั้นตอนคำนวณเงินได้สุทธิ
        </h4>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <span className="text-slate-600">รายได้รวมต่อปี</span>
            <span className="font-semibold text-slate-900 font-mono">
              + {formatNumber(result.income)} บาท
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <span className="text-slate-600">
              หัก ค่าใช้จ่าย (50% สูงสุด 100,000 บ.)
            </span>
            <span className="font-semibold text-rose-600 font-mono">
              - {formatNumber(result.expense)} บาท
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
            <span className="text-slate-600">หัก ค่าลดหย่อนส่วนตัว</span>
            <span className="font-semibold text-rose-600 font-mono">
              - {formatNumber(result.personalDeduction)} บาท
            </span>
          </div>

          {result.otherDeductions > 0 && (
            <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-600">หัก ค่าลดหย่อนอื่น ๆ (ไม่จำกัดเพดาน)</span>
              <span className="font-semibold text-rose-600 font-mono">
                - {formatNumber(result.otherDeductions)} บาท
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 bg-blue-50/70 px-3 rounded-lg border border-blue-100">
            <span className="font-bold text-blue-950">
              เงินได้สุทธิเพื่อนำไปคิดภาษี
            </span>
            <span className="font-bold text-blue-800 font-mono text-base">
              = {formatNumber(result.netTaxableIncome)} บาท
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
