import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transcriptionFormSchema } from '../utils/validation';
import { WebhookService } from '../services/webhookService';
import { useRateLimitStore } from '../stores/rateLimitStore';
import type { TranscriptionFormData } from '../utils/validation';
import type { TranscriptionRequest, RequestStatus } from '../types';

export const useTranscription = () => {
  const [status, setStatus] = useState<RequestStatus>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const { canMakeRequest, updateLimits, getRemainingTime } = useRateLimitStore();

  const form = useForm<TranscriptionFormData>({
    resolver: zodResolver(transcriptionFormSchema),
    defaultValues: {
      email: '',
      reelUrl: '',
    },
  });

  const submitTranscription = async (data: TranscriptionFormData) => {
    // Check rate limits before proceeding
    if (!canMakeRequest()) {
      const remainingTime = getRemainingTime();
      const minutes = Math.ceil(remainingTime / 60000);
      const seconds = Math.ceil((remainingTime % 60000) / 1000);
      
      let message = 'Rate limit exceeded. ';
      if (remainingTime > 60000) {
        message += `Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before trying again.`;
      } else {
        message += `Please wait ${seconds} second${seconds > 1 ? 's' : ''} before trying again.`;
      }

      setStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: message,
      });
      return;
    }

    setStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const request: TranscriptionRequest = {
        email: data.email.trim().toLowerCase(),
        reelUrl: data.reelUrl.trim(),
        timestamp: new Date().toISOString(),
      };

      const response = await WebhookService.transcribeReel(request);

      if (response.success) {
        // Update rate limits based on response
        updateLimits(response.rateLimitInfo);

        setStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
        });

        // Reset form on success
        form.reset();
      } else {
        setStatus({
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: response.message || 'Transcription request failed',
        });
      }
    } catch (error) {
      setStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  const resetStatus = () => {
    setStatus({
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  };

  return {
    form,
    status,
    submitTranscription,
    resetStatus,
    canMakeRequest,
    getRemainingTime,
  };
};