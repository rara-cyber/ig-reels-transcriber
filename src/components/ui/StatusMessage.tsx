import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface StatusMessageProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onDismiss?: () => void;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ type, message, onDismiss }) => {
  const styles = {
    success: {
      container: 'bg-green-50 border border-green-200',
      icon: 'text-green-400',
      text: 'text-green-800',
      IconComponent: CheckCircleIcon,
    },
    error: {
      container: 'bg-red-50 border border-red-200',
      icon: 'text-red-400',
      text: 'text-red-800',
      IconComponent: ExclamationTriangleIcon,
    },
    warning: {
      container: 'bg-yellow-50 border border-yellow-200',
      icon: 'text-yellow-400',
      text: 'text-yellow-800',
      IconComponent: ExclamationTriangleIcon,
    },
  };

  const style = styles[type];
  const { IconComponent } = style;

  return (
    <div className={`p-4 rounded-md ${style.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={`h-5 w-5 ${style.icon}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${style.text}`}>
            {message}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${style.text} hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};