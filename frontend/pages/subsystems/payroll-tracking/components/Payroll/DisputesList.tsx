"use client";

import { DisputeResponse, updateDisputeStatus } from "@/lib/payrollTracking";
import { AlertCircle, Clock, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { useHRMode } from "@/lib/hooks/useHRMode";

interface DisputesListProps {
  disputes: DisputeResponse[];
  onUpdate?: () => void;
}

export default function DisputesList({ disputes, onUpdate }: DisputesListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { isHRManager } = useHRMode();

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this dispute?`)) return;

    try {
      setUpdatingId(id);
      await updateDisputeStatus(id, status);
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
        return "bg-green-900/30 text-green-400 border-green-700";
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-700";
      case "pending payroll manager approval":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700";
      case "under review":
      default:
        return "bg-blue-900/30 text-blue-400 border-blue-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending payroll manager approval":
        return <Clock className="w-4 h-4" />;
      case "under review":
      default:
        return <AlertCircle className="w-4 h-4" />;
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

  return (
    <div className="space-y-4">
      {disputes.map((dispute) => (
        <div
          key={dispute._id || dispute.disputeId}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold">{dispute.disputeId}</h3>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    dispute.status
                  )}`}
                >
                  {getStatusIcon(dispute.status)}
                  {dispute.status}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Payslip ID: {dispute.payslipId}
              </p>
            </div>
            <div className="text-right text-sm text-slate-400">
              <p>Created: {formatDate(dispute.createdAt)}</p>
              {dispute.updatedAt && dispute.updatedAt !== dispute.createdAt && (
                <p>Updated: {formatDate(dispute.updatedAt)}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-slate-300">{dispute.description}</p>
          </div>

          {dispute.resolutionComment && (
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded">
              <p className="text-sm font-medium text-blue-300 mb-1">
                Resolution Comment:
              </p>
              <p className="text-sm text-blue-200">{dispute.resolutionComment}</p>
            </div>
          )}

          {dispute.rejectionReason && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-700/50 rounded">
              <p className="text-sm font-medium text-red-300 mb-1">
                Rejection Reason:
              </p>
              <p className="text-sm text-red-200">{dispute.rejectionReason}</p>
            </div>
          )}

          {/* HR Manager Actions */}
          {isHRManager && (
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
              <span className="text-xs text-slate-500 self-center mr-auto">HR Manager Actions</span>

              <button
                onClick={() => handleStatusUpdate(dispute._id || dispute.disputeId, 'rejected')}
                disabled={updatingId === (dispute._id || dispute.disputeId) || dispute.status === 'rejected'}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ThumbsDown className="w-4 h-4" />
                Reject
              </button>

              <button
                onClick={() => handleStatusUpdate(dispute._id || dispute.disputeId, 'approved')}
                disabled={updatingId === (dispute._id || dispute.disputeId) || dispute.status === 'approved'}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-400 hover:bg-green-900/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ThumbsUp className="w-4 h-4" />
                Approve
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
