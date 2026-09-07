export default function StepGuide() {
  const steps = [
    {
      number: "01",
      title: "รวมเงินได้ทั้งปี (Total Income)",
      description:
        "รวบรวมรายได้ทั้งหมดที่ได้รับตลอดทั้งปีภาษี เช่น เงินเดือน โบนัส ค่าจ้าง หรือรายได้อื่น ๆ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6H2.25m0 0v10.5m0-10.5h.75A.75.75 0 0 1 3.75 6.75v.75m0 0v6.75m0 0a.75.75 0 0 1-.75.75H2.25m1.5 0h16.5m0 0a.75.75 0 0 0 .75-.75v-.75m0 0V7.5a.75.75 0 0 0-.75-.75h-.75m.75 0V6a.75.75 0 0 0-.75-.75H20.25M19.5 4.5H3.75"
          />
        </svg>
      ),
      highlight: "รายได้รวมต่อปี",
    },
    {
      number: "02",
      title: "หักค่าใช้จ่าย & ค่าลดหย่อน",
      description:
        "หักค่าใช้จ่าย 50% ของเงินได้ (สูงสุดไม่เกิน 100,000 บาท อัตโนมัติ) รวมกับค่าลดหย่อนส่วนตัว 60,000 บาท และค่าลดหย่อนอื่น ๆ ไม่จำกัดเพดาน",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="w-6 h-6 text-sky-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 14.25l6-6m4.5-3.75H4.5A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5h15A2.25 2.25 0 0 0 21.75 17.25V6.75A2.25 2.25 0 0 0 19.5 4.5ZM7.5 9.75h.008v.008H7.5V9.75Zm9 4.5h.008v.008H16.5v-.008Z"
          />
        </svg>
      ),
      highlight: "เงินได้สุทธิ = รายได้ - ค่าใช้จ่าย - ลดหย่อน",
    },
    {
      number: "03",
      title: "คิดภาษีแบบขั้นบันได (0% - 35%)",
      description:
        "นำเงินได้สุทธิมาคำนวณภาษีตามอัตราภาษีเงินได้บุคคลธรรมดา 8 ขั้น โดยเงินได้สุทธิ 0-150,000 บาทแรกได้รับการยกเว้นภาษี",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="w-6 h-6 text-blue-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ),
      highlight: "คำนวณภาษีสะสมทีละขั้น",
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
          วิธีการทำงาน
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">
          3 ขั้นตอนคำนวณภาษีเงินได้บุคคลธรรมดา
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          เข้าใจโครงสร้างภาษีได้ง่าย ๆ ตามสูตรการคำนวณของกรมสรรพากร
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-blue-700 bg-blue-50/50 -mx-6 -mb-6 px-6 py-3 rounded-b-2xl">
              {step.highlight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
