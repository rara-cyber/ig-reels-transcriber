export interface TranscriptionRequest {
  email: string;
  reelUrl: string;
  timestamp: string;
}

export interface TranscriptionResponse {
  success: boolean;
  message: string;
  transcriptionId?: string;
  rateLimitInfo: RateLimitInfo;
}

export interface RateLimitInfo {
  remaining: number;
  resetTime: string;
  isBlocked: boolean;
}

export interface RateLimitState {
  lastRequest: number | null;
  requestCount: number;
  hourlyReset: number;
  canMakeRequest: () => boolean;
  updateLimits: (response: RateLimitInfo) => void;
  getRemainingTime: () => number;
}

export interface AppConfig {
  webhookUrl: string;
  apiTimeout: number;
  storageKey: string;
}

export interface FormData {
  email: string;
  reelUrl: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface RequestStatus {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string;
}