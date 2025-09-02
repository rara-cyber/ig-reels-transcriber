import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TranscriptionForm } from './components/forms/TranscriptionForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Transcribe Instagram Reels
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Get accurate transcriptions of your Instagram Reels delivered to your email
            </p>
          </div>
          
          <TranscriptionForm />
          
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">How it works</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Enter your email address</li>
              <li>Paste the Instagram Reel URL</li>
              <li>Click "Transcribe Reel"</li>
              <li>Receive the transcription via email</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> This service is free with rate limits to ensure fair usage. 
                For higher volumes, premium plans will be available soon.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;