"use client";

import { useState } from "react";
import { createRefund, CreateRefundData } from "@/lib/payrollTracking";

export default function RefundForm() {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [claimId, setClaimId] = useState("");
    const [disputeId, setDisputeId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User not authenticated");

            const refundData: CreateRefundData = {
                employeeId: userId,
                refundDetails: {
                    description,
                    amount: parseFloat(amount),
                },
                // Only include if not empty
                ...(claimId ? { claimId } : {}),
                ...(disputeId ? { disputeId } : {}),
            };

            await createRefund(refundData);

            // Success - reset form
            setMessage("✅ Refund request submitted successfully");
            setDescription("");
            setAmount("");
            setClaimId("");
            setDisputeId("");
        } catch (err: any) {
            setMessage(`❌ ${err.message || "Error submitting refund request"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Related Claim ID (Optional) */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Related Claim ID (Optional)
                </label>
                <input
                    type="text"
                    value={claimId}
                    onChange={(e) => setClaimId(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. CLAIM-123..."
                />
            </div>

            {/* Related Dispute ID (Optional) */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Related Dispute ID (Optional)
                </label>
                <input
                    type="text"
                    value={disputeId}
                    onChange={(e) => setDisputeId(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. DISPUTE-456..."
                />
            </div>

            {/* Amount */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Refund Amount <span className="text-red-400">*</span>
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    Reason for Refund <span className="text-red-400">*</span>
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Explain why a refund is required..."
                    required
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
                {loading ? "Submitting..." : "Submit Refund Request"}
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
