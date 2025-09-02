
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} IG Reel Transcriber. Free Instagram Reel transcription service.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="text-center">
              <p className="text-xs text-gray-500">Powered by</p>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span>n8n</span>
                <span>•</span>
                <span>Baserow</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">Free Tier</p>
              <p className="text-xs text-gray-600">1 req/min • 10 req/hour</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              This service transcribes Instagram Reels for free. Your email is only used to send you the transcription results. 
              We don't store or share your personal information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};