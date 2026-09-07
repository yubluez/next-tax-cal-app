import Link from "next/link";

export default function Footer() {
  return (
    <div className="mb-4 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
      <p>
        © {new Date().getFullYear()} TaxCal TH (next-tax-cal-app). All rights
        reserved.
      </p>
    </div>
  );
}
