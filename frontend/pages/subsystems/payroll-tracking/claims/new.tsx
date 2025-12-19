"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ClaimForm from "../components/Payroll/ClaimForm";

export default function NewClaimPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href="/subsystems/payroll-tracking"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payroll Tracking
        </Link>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Claim</h2>
          <ClaimForm />
        </div>
      </div>
    </div>
  );
}
