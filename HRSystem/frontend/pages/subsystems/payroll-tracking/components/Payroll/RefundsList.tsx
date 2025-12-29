"use client";

import { RefundResponse, updateRefundStatus } from "@/lib/payrollTracking";
import { RefreshCw, Clock, CheckCircle, DollarSign, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { useHRMode } from "@/lib/hooks/useHRMode";

interface RefundsListProps {
  refunds: RefundResponse[];
  onUpdate?: () => void;
}

export default function RefundsList({ refunds, onUpdate }: RefundsListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { isHRManager } = useHRMode();

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this refund?`)) return;

    try {
      setUpdatingId(id);
      await updateRefundStatus(id, status);
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Failed to update status');
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "paid":
        return "bg-green-900/30 text-green-400 border-green-700";
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-700";
      case "pending":
      default:
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending":
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {refunds.map((refund) => (
        <div
          key={refund._id}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h3 className="text-xl font-semibold">
                    Refund #{refund._id?.slice(-6) || "N/A"}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    refund.status
                  )}`}
                >
                  {getStatusIcon(refund.status)}
                  {refund.status.toUpperCase()}
                </span>
              </div>

              {/* Related IDs */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-2">
                {refund.claimId && (
                  <span>Claim ID: {refund.claimId}</span>
                )}
                {refund.disputeId && (
                  <span>Dispute ID: {refund.disputeId}</span>
                )}
                {refund.paidInPayrollRunId && (
                  <span className="text-green-400">
                    Paid in Run: {refund.paidInPayrollRunId}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {formatCurrency(refund.refundDetails.amount)}
              </div>
              <div className="text-sm text-slate-400">
                <p>Created: {formatDate(refund.createdAt)}</p>
                {refund.updatedAt && refund.updatedAt !== refund.createdAt && (
                  <p>Updated: {formatDate(refund.updatedAt)}</p>
                )}
              </div>
            </div>
          </div>

          {/* Refund Details */}
          <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <p className="text-sm font-medium text-slate-300 mb-1">
              Description:
            </p>
            <p className="text-slate-200">{refund.refundDetails.description}</p>
          </div>

          {/* HR Manager Actions */}
          {isHRManager && (
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50 mt-4">
              <span className="text-xs text-slate-500 self-center mr-auto">HR Manager Actions</span>

              <button
                onClick={() => handleStatusUpdate(refund._id!, 'rejected')}
                disabled={updatingId === refund._id || refund.status === 'rejected'}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ThumbsDown className="w-4 h-4" />
                Reject
              </button>

              <button
                onClick={() => handleStatusUpdate(refund._id!, 'paid')}
                disabled={updatingId === refund._id || refund.status === 'approved' || refund.status === 'paid'}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-400 hover:bg-green-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ThumbsUp className="w-4 h-4" />
                Approve (Pay)
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
