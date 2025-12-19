"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RefundForm from "../components/Payroll/RefundForm";

export default function NewRefundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/subsystems/payroll-tracking"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Payroll Tracking
                    </Link>
                    <h1 className="text-3xl font-bold">New Refund</h1>
                    <p className="text-slate-400 mt-2">
                        Request a refund for a claim or dispute.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <RefundForm />
                </div>
            </div>
        </div>
    );
}
