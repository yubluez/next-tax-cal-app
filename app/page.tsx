import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import TaxTable from "@/components/TaxTable";
import TaxStatusBar from "@/components/TaxStatusBar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-blue-100/60 bg-gradient-to-b from-white via-blue-50/40 to-slate-50">
          {/* Subtle decorative circles */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute top-20 left-10 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
          </div>

          {/* <TaxStatusBar /> */}

          <div className="relative max-w-8xl px-60 p-20">
            <div className="text-left mx-auto">
              <span className="font-bold uppercase text-sm text-cyan-500 tracking-wider">
                Tax Calculator
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                คำนวณภาษีเงินได้บุคคลธรรมดา{" "}
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  แบบขั้นบันได
                </span>
              </h1>

              <p className="mt-6 max-w-5xl text-base sm:text-lg text-slate-600 leading-relaxed">
                เว็บแอปพลิเคชันคำนวณภาษีเงินได้บุคคลธรรมดาตามหลักเกณฑ์กรมสรรพากรแห่งประเทศไทย
                หักค่าใช้จ่าย 50% สูงสุด 100,000 บาทอัตโนมัติ
                คำนวณแบบเรียลไทม์ทันทีที่กรอกตัวเลข และคำนวณภาษีตามอัตราก้าวหน้า
                8 ขั้นบันได แสดงผลลัพธ์ชัดเจน
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-left gap-4">
                <Link
                  href="/taxcal"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all group"
                >
                  <span>เข้าสู่หน้าคำนวณภาษี</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
            <TaxTable />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
