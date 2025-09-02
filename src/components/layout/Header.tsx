import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <SpeakerWaveIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                IG Reel Transcriber
              </h1>
              <p className="text-xs text-gray-500">
                Free Instagram Reel Transcription
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Free
              </span>
              <span className="text-sm text-gray-500">
                1/min • 10/hour
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};