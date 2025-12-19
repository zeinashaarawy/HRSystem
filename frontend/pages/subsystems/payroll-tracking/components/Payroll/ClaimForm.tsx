
"use client";

import { useState } from "react";
import { createClaim, CreateClaimData } from "@/lib/payrollTracking";

export default function ClaimForm() {
  const [claimId, setClaimId] = useState("");
  const [description, setDescription] = useState("");
  const [claimType, setClaimType] = useState("medical");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateClaimId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CLAIM - ${timestamp} -${random} `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const generatedClaimId = claimId || generateClaimId();

      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not authenticated");

      const claimData: CreateClaimData = {
        claimId: generatedClaimId,
        claimType,
        description,
        employeeId: userId,
        amount: parseFloat(amount),
      };

      await createClaim(claimData);

      setMessage("✅ Claim submitted successfully");
      setClaimId("");
      setDescription("");
      setAmount("");
      setClaimType("medical");
    } catch (err: any) {
      setMessage(`❌ ${err.message || "Error submitting claim"} `);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-300">
          Claim ID (Optional)
        </label>
        <input
          type="text"
          value={claimId}
          onChange={(e) => setClaimId(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Leave empty to auto-generate"
        />
        <p className="text-xs text-slate-400 mt-1">
          Leave empty to auto-generate a claim ID
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-300">
          Claim Type <span className="text-red-400">*</span>
        </label>
        <select
          value={claimType}
          onChange={(e) => setClaimType(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="medical">Medical</option>
          <option value="overtime">Overtime</option>
          <option value="travel">Travel</option>
          <option value="meal">Meal Allowance</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-300">
          Amount <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-300">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Explain your claim in detail..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
      >
        {loading ? "Submitting..." : "Submit Claim"}
      </button>

      {message && (
        <p
          className={`text - sm mt - 2 p - 3 rounded ${message.includes("✅")
              ? "bg-green-900/30 text-green-400 border border-green-700"
              : "bg-red-900/30 text-red-400 border border-red-700"
            } `}
        >
          {message}
        </p>
      )}
    </form>
  );
}