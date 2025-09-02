import { useEffect, useState } from 'react';
import { useTranscription } from '../../hooks/useTranscription';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { StatusMessage } from '../ui/StatusMessage';
import { RateLimitDisplay } from '../ui/RateLimitDisplay';

export const TranscriptionForm: React.FC = () => {
  const { form, status, submitTranscription, resetStatus, canMakeRequest, getRemainingTime } = useTranscription();
  const [remainingTime, setRemainingTime] = useState(0);

  // Update remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime]);

  const { register, handleSubmit, formState: { errors } } = form;
  const canSubmit = canMakeRequest() && !status.isLoading;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Instagram Reel Transcription
        </h2>
        <p className="text-gray-600 text-sm">
          Get your Instagram Reels transcribed for free
        </p>
      </div>

      <form onSubmit={handleSubmit(submitTranscription)} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className={`form-input ${
              errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Instagram Reel URL Input */}
        <div>
          <label htmlFor="reelUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Instagram Reel URL
          </label>
          <input
            id="reelUrl"
            type="url"
            placeholder="https://instagram.com/reel/ABC123/"
            className={`form-input ${
              errors.reelUrl ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
            {...register('reelUrl')}
          />
          {errors.reelUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.reelUrl.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Example: https://instagram.com/reel/ABC123/ or https://instagram.com/p/ABC123/
          </p>
        </div>

        {/* Rate Limit Display */}
        <RateLimitDisplay remainingTime={remainingTime} canMakeRequest={canSubmit} />

        {/* Status Messages */}
        {status.isError && (
          <StatusMessage
            type="error"
            message={status.error || 'An error occurred'}
            onDismiss={resetStatus}
          />
        )}

        {status.isSuccess && (
          <StatusMessage
            type="success"
            message="Transcription request submitted successfully! You'll receive the transcription via email shortly."
            onDismiss={resetStatus}
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
            canSubmit
              ? 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {status.isLoading ? (
            <>
              <LoadingSpinner className="mr-2" />
              Processing...
            </>
          ) : (
            'Transcribe Reel'
          )}
        </button>

        {/* Rate Limiting Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Free Tier Limits:</strong> 1 request per minute, 10 requests per hour
          </p>
        </div>
      </form>
    </div>
  );
};