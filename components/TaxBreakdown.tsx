import React from "react";
import { BracketResult, formatCurrency, formatNumber } from "@/lib/taxCalculator";

interface TaxBreakdownProps {
  bracketResults: BracketResult[];
  netTaxableIncome: number;
}

export default function TaxBreakdown({
  bracketResults,
  netTaxableIncome,
}: TaxBreakdownProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            แจกแจงการคำนวณภาษีตามแต่ละขั้นบันได (Tax Bracket Breakdown)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            แสดงจำนวนเงินได้สุทธิที่ตกอยู่ในแต่ละขั้นและภาษีที่ต้องชำระในแต่ละขั้น
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          รวมเงินได้สุทธิ {formatNumber(netTaxableIncome)} บาท
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-100/70 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4 sm:px-6">ขั้นที่</th>
              <th className="py-3 px-4 sm:px-6">ช่วงเงินได้สุทธิ (บาท)</th>
              <th className="py-3 px-4 sm:px-6 text-center">อัตราภาษี</th>
              <th className="py-3 px-4 sm:px-6 text-right">เงินได้ในขั้นนี้ (บาท)</th>
              <th className="py-3 px-4 sm:px-6 text-right">ภาษีที่คำนวณได้ (บาท)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bracketResults.map((item) => {
              const { bracket, taxableAmountInBracket, taxInBracket, isReached, isCurrent } = item;

              return (
                <tr
                  key={bracket.id}
                  className={`transition-colors ${
                    isCurrent
                      ? "bg-blue-50/80 font-medium"
                      : isReached
                      ? "bg-sky-50/30"
                      : "bg-white text-slate-400"
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        isCurrent
                          ? "bg-blue-600 text-white shadow-xs"
                          : isReached
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {bracket.id}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className={isReached ? "text-slate-800" : "text-slate-400"}>
                        {bracket.rangeLabel}
                      </span>
                      {isCurrent && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                          ขั้นสูงสุดของคุณ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        isReached
                          ? "bg-slate-200/80 text-slate-800"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {bracket.rateLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right font-mono">
                    <span className={taxableAmountInBracket > 0 ? "text-slate-900 font-semibold" : "text-slate-400"}>
                      {formatNumber(taxableAmountInBracket)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right font-mono">
                    <span
                      className={`font-semibold ${
                        taxInBracket > 0
                          ? "text-blue-700 text-base"
                          : "text-slate-400"
                      }`}
                    >
                      {formatCurrency(taxInBracket)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50/70 border-t-2 border-blue-200 font-bold text-slate-900">
              <td colSpan={3} className="py-4 px-4 sm:px-6 text-right font-bold text-slate-700">
                รวมภาษีที่ต้องชำระทั้งหมด:
              </td>
              <td className="py-4 px-4 sm:px-6 text-right font-mono text-slate-800">
                {formatNumber(netTaxableIncome)}
              </td>
              <td className="py-4 px-4 sm:px-6 text-right font-mono text-blue-800 text-lg sm:text-xl">
                ฿{" "}
                {formatCurrency(
                  bracketResults.reduce((acc, curr) => acc + curr.taxInBracket, 0)
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
