import axios from 'axios';
import type { ConfigStatus, PayrollConfigResourceSlug } from './resources';

const api = axios.create({
  baseURL: '/api/payroll-configuration',
  headers: {
    'Content-Type': 'application/json',
  },
});

export type PayrollConfigListParams = {
  status?: ConfigStatus;
};

export async function listConfigs(
  resource: PayrollConfigResourceSlug,
  params: PayrollConfigListParams = {},
) {
  const res = await api.get(`/${resource}`, { params });
  return res.data as any[];
}

export async function getConfig(resource: PayrollConfigResourceSlug, id: string) {
  const res = await api.get(`/${resource}/${id}`);
  return res.data as any;
}

export async function createConfig(
  resource: PayrollConfigResourceSlug,
  payload: Record<string, any>,
) {
  const res = await api.post(`/${resource}`, payload);
  return res.data as any;
}

export async function updateConfig(
  resource: PayrollConfigResourceSlug,
  id: string,
  payload: Record<string, any>,
) {
  const res = await api.patch(`/${resource}/${id}`, { payload });
  return res.data as any;
}

export async function deleteInsuranceBracket(id: string) {
  const res = await api.delete(`/insurance-brackets/${id}`);
  return res.data as any;
}

export async function approveInsuranceBracket(id: string, approverId: string) {
  const res = await api.patch(`/insurance-brackets/${id}/approve`, { approverId });
  return res.data as any;
}

export async function rejectInsuranceBracket(id: string, reviewerId: string) {
  const res = await api.patch(`/insurance-brackets/${id}/reject`, { reviewerId });
  return res.data as any;
}

export async function getActiveCompanyWideSettings() {
  const res = await api.get('/company-wide-settings/active');
  return res.data as any;
}
