import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tax Calculator",
  description: "เว็บแอปพลิเคชันคำนวณภาษีเงินได้บุคคลธรรมดาแบบขั้นบันไดของประเทศไทย คำนวณรวดเร็ว แม่นยำ และเข้าใจง่าย",
  keywords: ["คำนวณภาษี", "ภาษีเงินได้บุคคลธรรมดา", "ประเทศไทย", "ขั้นบันได", "เว็บแอปพลิเคชัน", "คำนวณภาษีออนไลน์"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${prompt.className}`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}
