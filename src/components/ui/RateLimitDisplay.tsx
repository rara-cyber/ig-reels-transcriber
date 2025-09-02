import { ClockIcon } from '@heroicons/react/24/outline';

interface RateLimitDisplayProps {
  remainingTime: number;
  canMakeRequest: boolean;
}

export const RateLimitDisplay: React.FC<RateLimitDisplayProps> = ({
  remainingTime,
  canMakeRequest,
}) => {
  if (canMakeRequest) {
    return (
      <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
        <ClockIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Ready to submit</span>
      </div>
    );
  }

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  return (
    <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 p-3 rounded-md">
      <ClockIcon className="h-5 w-5" />
      <div className="text-sm">
        <div className="font-medium">Rate limit active</div>
        <div>
          Please wait {minutes > 0 && `${minutes}m `}{seconds}s before submitting again
        </div>
      </div>
    </div>
  );
};