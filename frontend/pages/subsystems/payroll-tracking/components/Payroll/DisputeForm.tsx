"use client";

import { useState } from "react";
import { createDispute, CreateDisputeData } from "@/lib/payrollTracking";

export default function DisputeForm() {
    const [disputeId, setDisputeId] = useState("");
    const [description, setDescription] = useState("");
    const [payslipId, setPayslipId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const generateDisputeId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `DISPUTE-${timestamp}-${random}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User not authenticated");

            const generatedDisputeId = disputeId || generateDisputeId();

            const disputeData: CreateDisputeData = {
                disputeId: generatedDisputeId,
                description,
                payslipId,
                employeeId: userId,
            };

            await createDispute(disputeData);

            // Success - reset form
            setMessage("✅ Dispute submitted successfully");
            setDisputeId("");
            setDescription("");
            setPayslipId("");
        } catch (err: any) {
            setMessage(`❌ ${err.message || "Error submitting dispute"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Dispute ID */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Dispute ID (Optional)
                </label>
                <input
                    type="text"
                    value={disputeId}
                    onChange={(e) => setDisputeId(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Leave empty to auto-generate"
                />
                <p className="text-xs text-slate-400 mt-1">
                    Leave empty to auto-generate a dispute ID
                </p>
            </div>

            {/* Payslip ID */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Payslip ID <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={payslipId}
                    onChange={(e) => setPayslipId(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter the ID of the related payslip"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Reason for Dispute <span className="text-red-400">*</span>
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Explain why you are disputing this payroll..."
                    required
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
                {loading ? "Submitting..." : "Submit Dispute"}
            </button>

            {/* Message */}
            {message && (
                <p
                    className={`text-sm mt-2 p-3 rounded ${message.includes("✅")
                        ? "bg-green-900/30 text-green-400 border border-green-700"
                        : "bg-red-900/30 text-red-400 border border-red-700"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
}
