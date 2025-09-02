import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RateLimitState, RateLimitInfo } from '../types';

interface RateLimitStore extends RateLimitState {
  minuteRequests: number[];
  hourlyRequests: number[];
  reset: () => void;
}

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

export const useRateLimitStore = create<RateLimitStore>()(
  persist(
    (set, get) => ({
      lastRequest: null,
      requestCount: 0,
      hourlyReset: Date.now() + HOUR_MS,
      minuteRequests: [],
      hourlyRequests: [],

      canMakeRequest: () => {
        const now = Date.now();
        const state = get();

        // Clean up old requests
        const recentMinuteRequests = state.minuteRequests.filter(
          timestamp => now - timestamp < MINUTE_MS
        );
        const recentHourlyRequests = state.hourlyRequests.filter(
          timestamp => now - timestamp < HOUR_MS
        );

        // Update store with cleaned data
        set({
          minuteRequests: recentMinuteRequests,
          hourlyRequests: recentHourlyRequests,
        });

        // Check rate limits: 1 per minute, 10 per hour
        return recentMinuteRequests.length < 1 && recentHourlyRequests.length < 10;
      },

      updateLimits: (response: RateLimitInfo) => {
        const now = Date.now();
        const state = get();

        // Add current request to both arrays
        const newMinuteRequests = [...state.minuteRequests, now];
        const newHourlyRequests = [...state.hourlyRequests, now];

        set({
          lastRequest: now,
          requestCount: state.requestCount + 1,
          minuteRequests: newMinuteRequests,
          hourlyRequests: newHourlyRequests,
        });
        
        // Use response for future enhancements
        console.log('Rate limit updated:', response);
      },

      getRemainingTime: () => {
        const now = Date.now();
        const state = get();

        if (!state.lastRequest) return 0;

        // Clean up old requests
        const recentMinuteRequests = state.minuteRequests.filter(
          timestamp => now - timestamp < MINUTE_MS
        );
        const recentHourlyRequests = state.hourlyRequests.filter(
          timestamp => now - timestamp < HOUR_MS
        );

        // If we've hit minute limit, return time until minute resets
        if (recentMinuteRequests.length >= 1) {
          const oldestMinuteRequest = Math.min(...recentMinuteRequests);
          return Math.max(0, MINUTE_MS - (now - oldestMinuteRequest));
        }

        // If we've hit hourly limit, return time until oldest request expires
        if (recentHourlyRequests.length >= 10) {
          const oldestHourlyRequest = Math.min(...recentHourlyRequests);
          return Math.max(0, HOUR_MS - (now - oldestHourlyRequest));
        }

        return 0;
      },

      reset: () => {
        set({
          lastRequest: null,
          requestCount: 0,
          hourlyReset: Date.now() + HOUR_MS,
          minuteRequests: [],
          hourlyRequests: [],
        });
      },
    }),
    {
      name: import.meta.env.VITE_RATE_LIMIT_STORAGE_KEY || 'ig-transcriber-rate-limits',
    }
  )
);