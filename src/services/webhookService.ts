import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { TranscriptionRequest, TranscriptionResponse } from '../types';

// Configuration
const config = {
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || '',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
};

// Create axios instance with default config
const apiClient = axios.create({
  timeout: config.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (development only)
if (import.meta.env.DEV) {
  apiClient.interceptors.request.use((config) => {
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    return config;
  });
}

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log('📥 API Response:', {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export class WebhookService {
  private static validateConfig(): void {
    if (!config.webhookUrl) {
      throw new Error('N8N webhook URL is not configured. Please set VITE_N8N_WEBHOOK_URL.');
    }
  }

  static async transcribeReel(request: TranscriptionRequest): Promise<TranscriptionResponse> {
    this.validateConfig();

    try {
      const response = await apiClient.post<TranscriptionResponse>(
        config.webhookUrl,
        {
          email: request.email,
          reelUrl: request.reelUrl,
          timestamp: request.timestamp,
        }
      );

      return response.data;
    } catch (error) {
      // Handle different error types
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again.');
        }

        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          const message = error.response.data?.message || 'Server error occurred';

          if (status === 429) {
            throw new Error('Rate limit exceeded. Please wait before trying again.');
          } else if (status >= 500) {
            throw new Error('Server is temporarily unavailable. Please try again later.');
          } else if (status === 400) {
            throw new Error(message || 'Invalid request. Please check your input.');
          } else {
            throw new Error(`Server error (${status}): ${message}`);
          }
        } else if (error.request) {
          // Network error
          throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
      }

      // Unknown error
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

  static async healthCheck(): Promise<boolean> {
    this.validateConfig();

    try {
      // Attempt a simple GET request to check if the webhook endpoint is reachable
      const healthUrl = new URL(config.webhookUrl);
      healthUrl.pathname = healthUrl.pathname.replace('/transcribe', '/health');
      
      await apiClient.get(healthUrl.toString(), { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}