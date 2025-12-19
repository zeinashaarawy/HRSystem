import api from '@/api/axios';
import type { ConfigStatus, PayrollConfigResourceSlug } from './resources';

const BASE = '/payroll-configuration';

export type PayrollConfigListParams = {
  status?: ConfigStatus;
};

export async function listConfigs(
  resource: PayrollConfigResourceSlug,
  params: PayrollConfigListParams = {},
) {
  const res = await api.get(`${BASE}/${resource}`, { params });
  return res.data as any[];
}

export async function getConfig(resource: PayrollConfigResourceSlug, id: string) {
  const res = await api.get(`${BASE}/${resource}/${id}`);
  return res.data as any;
}

export async function createConfig(
  resource: PayrollConfigResourceSlug,
  payload: Record<string, any>,
) {
  const res = await api.post(`${BASE}/${resource}`, payload);
  return res.data as any;
}

export async function updateConfig(
  resource: PayrollConfigResourceSlug,
  id: string,
  payload: Record<string, any>,
) {
  const res = await api.patch(`${BASE}/${resource}/${id}`, { payload });
  return res.data as any;
}

export async function deleteInsuranceBracket(id: string) {
  const res = await api.delete(`${BASE}/insurance-brackets/${id}`);
  return res.data as any;
}

export async function approveInsuranceBracket(id: string, approverId: string) {
  const res = await api.patch(`${BASE}/insurance-brackets/${id}/approve`, { approverId });
  return res.data as any;
}

export async function rejectInsuranceBracket(id: string, reviewerId: string) {
  const res = await api.patch(`${BASE}/insurance-brackets/${id}/reject`, { reviewerId });
  return res.data as any;
}

export async function getActiveCompanyWideSettings() {
  const res = await api.get(`${BASE}/company-wide-settings/active`);
  return res.data as any;
}
