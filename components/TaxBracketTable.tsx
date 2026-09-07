import { TAX_BRACKETS, formatNumber } from "@/lib/taxCalculator";

interface TaxBracketTableProps {
  currentNetIncome?: number;
  highlightCurrent?: boolean;
}

export default function TaxBracketTable({
  currentNetIncome = 0,
  highlightCurrent = false,
}: TaxBracketTableProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-sky-50 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            ตารางอัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได (ปีภาษีปัจจุบัน)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            ตามประมวลรัษฎากร กรมสรรพากรแห่งประเทศไทย
          </p>
        </div>
        {highlightCurrent && currentNetIncome > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            เงินได้สุทธิของคุณ: {formatNumber(currentNetIncome)} บาท
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">ขั้นที่</th>
              <th className="py-3.5 px-4 sm:px-6">ช่วงเงินได้สุทธิ (บาท)</th>
              <th className="py-3.5 px-4 sm:px-6 text-center">อัตราภาษี</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">ภาษีสูงสุดแต่ละขั้น (บาท)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TAX_BRACKETS.map((bracket, index) => {
              const isUserInBracket =
                highlightCurrent &&
                currentNetIncome > bracket.min &&
                (bracket.max === null || currentNetIncome <= bracket.max);

              return (
                <tr
                  key={bracket.id}
                  className={`transition-colors ${
                    isUserInBracket
                      ? "bg-blue-50/90 font-medium ring-2 ring-blue-500 ring-inset"
                      : index % 2 === 0
                      ? "bg-white hover:bg-slate-50/60"
                      : "bg-slate-50/30 hover:bg-slate-50/60"
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-6 text-slate-500">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                      {bracket.id}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-800 font-medium">
                        {bracket.rangeLabel}
                      </span>
                      {isUserInBracket && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                          ขั้นของคุณ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                        bracket.rate === 0
                          ? "bg-blue-100 text-blue-800"
                          : bracket.rate <= 0.1
                          ? "bg-sky-100 text-sky-800"
                          : bracket.rate <= 0.2
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {bracket.rateLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right text-slate-700 font-mono">
                    {bracket.maxTaxInBracket !== null
                      ? formatNumber(bracket.maxTaxInBracket)
                      : "ตามยอดจริง"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>* เงินได้สุทธิช่วง 0 - 150,000 บาทแรก ได้รับการยกเว้นภาษี (0%)</span>
        <span className="text-blue-700 font-medium">ภาษี = เงินได้สุทธิในขั้นนั้น × อัตราภาษีของช่วงนั้น</span>
      </div>
    </div>
  );
}
