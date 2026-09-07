"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaxForm from "@/components/TaxForm";
import TaxSummaryCard from "@/components/TaxSummaryCard";
import TaxBreakdown from "@/components/TaxBreakdown";
import TaxBracketTable from "@/components/TaxBracketTable";
import { calculateTax, calculateExpense } from "@/lib/taxCalculator";

export default function TaxCalculatorPage() {
  // ค่าเริ่มต้น:
  // รายได้รวมต่อปี: 360,000 บาท (เช่น เงินเดือน 30,000 บ./เดือน เพื่อให้เห็นตัวอย่างการคำนวณทันที)
  // ค่าลดหย่อนส่วนตัว: 60,000 บาท (ตามโจทย์ระบุ ค่าเริ่มต้น 60,000 บาท แก้ไขได้)
  // ค่าลดหย่อนอื่น ๆ: 9,000 บาท (ไม่จำกัดเพดาน ใส่เท่าไหร่ก็ได้ หรือเว้นว่างได้)
  const [income, setIncome] = useState<number>(360000);
  const [personalDeduction, setPersonalDeduction] = useState<number>(60000);
  const [otherDeductions, setOtherDeductions] = useState<number>(9000);

  // คำนวณค่าใช้จ่ายอัตโนมัติ (50% สูงสุด 100,000 บาท)
  const calculatedExpense = useMemo(() => {
    return calculateExpense(income);
  }, [income]);

  // คำนวณภาษีแบบ Real-time ทันทีที่ State เปลี่ยน
  const taxResult = useMemo(() => {
    return calculateTax(income, personalDeduction, otherDeductions);
  }, [income, personalDeduction, otherDeductions]);

  // ฟังก์ชันรีเซ็ตค่า
  const handleReset = () => {
    setIncome(0);
    setPersonalDeduction(60000);
    setOtherDeductions(0);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors flex items-center gap-1 text-xs sm:text-sm text-slate-500 mb-2"
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
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              กลับหน้าหลัก
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                คำนวณภาษีเงินได้บุคคลธรรมดา
              </h1>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
                  title="พิมพ์ผลการคำนวณ"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="w-4 h-4 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                    />
                  </svg>
                  <span>พิมพ์ / บันทึก PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form & Summary Cards (2 Columns on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Left: Input Form (5 cols) */}
            <div className="lg:col-span-6 xl:col-span-5">
              <TaxForm
                income={income}
                personalDeduction={personalDeduction}
                otherDeductions={otherDeductions}
                calculatedExpense={calculatedExpense}
                setIncome={setIncome}
                setPersonalDeduction={setPersonalDeduction}
                setOtherDeductions={setOtherDeductions}
                onReset={handleReset}
              />
            </div>

            {/* Right: Output Results (7 cols) */}
            <div className="lg:col-span-6 xl:col-span-7">
              <TaxSummaryCard result={taxResult} />
            </div>
          </div>

          {/* Detailed Tax Breakdown Table */}
          <div className="mb-10">
            <TaxBreakdown
              bracketResults={taxResult.bracketBreakdown}
              netTaxableIncome={taxResult.netTaxableIncome}
            />
          </div>

          {/* Tax Bracket Reference Table with Highlight */}
          <div className="mb-10">
            <TaxBracketTable
              currentNetIncome={taxResult.netTaxableIncome}
              highlightCurrent={true}
            />
          </div>

          {/* Formula Reference Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              สูตรและหลักเกณฑ์การคำนวณ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  1. เงินได้สุทธิ
                </span>
                <p className="text-slate-600 font-mono text-xs">
                  เงินได้สุทธิ = รายได้รวม - ค่าใช้จ่าย - ค่าลดหย่อนทั้งหมด
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  2. ภาษีขั้นบันได
                </span>
                <p className="text-slate-600 font-mono text-xs">
                  ภาษี = เงินได้สุทธิในช่วงนั้น × อัตราภาษีของช่วงนั้น
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  3. เงินได้สุทธิหลังหักภาษี
                </span>
                <p className="text-slate-600 font-mono text-xs">
                  เงินได้สุทธิหลังหักภาษี = เงินได้สุทธิ - ภาษี
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
