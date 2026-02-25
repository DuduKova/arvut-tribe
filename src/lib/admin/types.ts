export const SUBMISSION_TYPES = ["healer", "patient"] as const;
export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

export const SUBMISSION_STATUSES = ["pending", "approved", "rejected"] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export interface AdminSubmissionListItem {
  id: string;
  submissionType: SubmissionType;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  status: SubmissionStatus;
  notes: string | null;
}

export interface AdminSubmissionDetail extends AdminSubmissionListItem {
  formData: Record<string, unknown> | null;
}

export interface UpdateSubmissionPayload {
  status?: SubmissionStatus;
  notes?: string | null;
}

export interface AdminSubmissionListResponse {
  data: AdminSubmissionListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface AdminSubmissionDetailResponse {
  data: AdminSubmissionDetail;
}
