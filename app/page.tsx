import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import TaxBracketTable from "@/components/TaxBracketTable";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-blue-100/60 bg-gradient-to-b from-white via-blue-50/40 to-slate-50">
          {/* Subtle decorative circles */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute top-20 left-10 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                คำนวณภาษีเงินได้บุคคลธรรมดา{" "}
                <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                  แบบขั้นบันได
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
                เว็บแอปพลิเคชันคำนวณภาษีเงินได้บุคคลธรรมดาตามหลักเกณฑ์กรมสรรพากรแห่งประเทศไทย
                หักค่าใช้จ่าย 50% สูงสุด 100,000 บาทอัตโนมัติ
                คำนวณแบบเรียลไทม์ทันทีที่กรอกตัวเลข และคำนวณภาษีตามอัตราก้าวหน้า
                8 ขั้นบันได แสดงผลลัพธ์ชัดเจน
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/taxcal"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all group"
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

                <a
                  href="#tax-brackets"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base border border-slate-200 transition-all shadow-xs"
                >
                  ดูตารางอัตราภาษี 8 ขั้น
                </a>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-blue-700 font-mono">
                  150,000 ฿
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  เงินได้สุทธิแรก ยกเว้นภาษี (0%)
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-blue-700 font-mono">
                  50%
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  หักค่าใช้จ่ายอัตโนมัติ (ไม่เกิน 1 แสน)
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-blue-100 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-blue-700 font-mono">
                  60,000 ฿
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  ค่าลดหย่อนส่วนตัว (แก้ไขได้)
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-sky-100 shadow-xs text-center">
                <div className="text-xl sm:text-2xl font-black text-sky-700 font-mono">
                  เรียลไทม์
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  คำนวณอัตโนมัติ ไม่ต้องกดปุ่ม
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Step Guide Section */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepGuide />
        </section>

        {/* Tax Brackets Table Section */}
        <section
          id="tax-brackets"
          className="py-16 bg-gradient-to-b from-slate-50 to-blue-50/40 border-y border-slate-200/80 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
                เกณฑ์คำนวณภาษี
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                อัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                เงินได้สุทธิจะถูกนำมาคำนวณภาษีเป็นช่วงตามอัตราก้าวหน้า
              </p>
            </div>

            <TaxBracketTable highlightCurrent={false} />
          </div>
        </section>

        {/* Deduction Highlights Section */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/60">
              สิทธิประโยชน์ภาษี
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">
              ค่าลดหย่อนภาษีที่พบบ่อย
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              สามารถนำค่าลดหย่อนเหล่านี้ไปกรอกในช่อง &ldquo;ค่าลดหย่อนอื่น
              ๆ&rdquo; ในหน้าคำนวณได้ตามจริงโดยไม่จำกัดเพดาน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                ประกันสังคม (Social Security)
              </h3>
              <p className="text-sm text-slate-600">
                ลดหย่อนได้ตามที่จ่ายจริง สูงสุดไม่เกิน 9,000 บาทต่อปี
                (สำหรับผู้ประกันตนมาตรา 33)
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                ประกันชีวิต & ประกันสุขภาพ
              </h3>
              <p className="text-sm text-slate-600">
                เบี้ยประกันชีวิตทั่วไปและประกันสุขภาพ
                รวมกันช่วยลดหย่อนภาษีได้ตามสิทธิประโยชน์
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                กองทุนรวมเพื่อการออม (SSF/RMF/ThaiESG)
              </h3>
              <p className="text-sm text-slate-600">
                ช่วยสร้างวินัยการออมระยะยาว
                พร้อมรับสิทธิประโยชน์ลดหย่อนภาษีตามสัดส่วนของเงินได้
              </p>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-8 sm:p-12 text-center shadow-xl shadow-blue-900/15">
            <h2 className="text-2xl sm:text-3xl font-black">
              พร้อมที่จะตรวจสอบภาษีของคุณแล้วหรือยัง?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sky-100 max-w-xl mx-auto">
              เพียงกรอกรายได้และค่าลดหย่อน
              ระบบจะแสดงผลยอดภาษีที่ต้องชำระและเงินได้สุทธิหลังหักภาษีแบบเรียลไทม์ทันที
            </p>
            <div className="mt-8">
              <Link
                href="/taxcal"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-800 font-bold text-base hover:bg-sky-50 hover:shadow-lg transition-all"
              >
                <span>เริ่มคำนวณภาษีเลย</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
