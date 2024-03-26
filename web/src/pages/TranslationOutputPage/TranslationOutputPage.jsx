import { useState, useEffect } from 'react';
import { useLocation } from '@redwoodjs/router';
import { Link, routes } from '@redwoodjs/router';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import { useMutation, gql } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import UserFeedbackForm from 'src/components/UserFeedbackForm/';
import { Toaster } from '@redwoodjs/web/toast';

// CREATE_TRANSLATION_HISTORY_MUTATION remains unchanged.
const CREATE_TRANSLATION_HISTORY_MUTATION = gql`
  mutation CreateTranslationHistoryMutation($input: CreateTranslationHistoryInput!) {
    createTranslationHistory(input: $input) {
      id
    }
  }
`;

const TranslationOutputPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('java'); // Keep synchronized with your default or dynamic values
  const [targetLang, setTargetLang] = useState('python'); // Keep synchronized with your default or dynamic values
  const [showFeedback, setShowFeedback] = useState(false);
  const [translationId, setTranslationId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const originalCode = queryParams.get('originalCode');
    if (originalCode) {
      setInputCode(decodeURIComponent(originalCode));
    }
  }, [location]);

  const [createTranslationHistory] = useMutation(CREATE_TRANSLATION_HISTORY_MUTATION);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    alert('Copied to clipboard!');
  };

  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([outputCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'TranslatedCode.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleTranslateClick = async () => {
    if (!currentUser) {
      alert('Please log in to translate and save your code.');
      return;
    }

    if (!inputCode.trim()) {
      alert('Please enter the code to translate.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/translate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputCode,
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert('An error occurred during translation. Please try again.');
      } else {
        setOutputCode(data.translatedCode);

        const { data: translationData } = await createTranslationHistory({
          variables: {
            input: {
              userId: currentUser.id,
              originalCode: inputCode,
              translatedCode: data.translatedCode,
              originalLanguage: sourceLang,
              translationLanguage: targetLang,
              status: 'COMPLETED',
            },
          },
        });
        alert('Translation saved successfully!');
        setTranslationId(translationData.createTranslationHistory.id);
        setShowFeedback(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending translation request.');
    }
  };

  return (
    <>
      <Toaster />
      <MainLayout>
        <div className="min-h-screen p-10">
          <div className="mb-4">
            <label htmlFor="inputCode" className="block text-sm font-medium text-gray-700">
              Enter your code:
            </label>
            <textarea
              id="inputCode"
              rows="15"
              cols="30"
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Enter your code..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            ></textarea>
          </div>

          {/* Additional form fields and UI components as needed */}

          <div className="mb-4">
            <label htmlFor="sourceLang" className="block text-sm font-medium text-gray-700">
              Language of your code:
            </label>
            <select
              id="sourceLang"
              className="mt-1 block w-full py-2 px-3 border border-gray
              300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="targetLang" className="block text-sm font-medium text-gray-700">
              Translation Language:
            </label>
            <select
              id="targetLang"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleTranslateClick}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Translate
            </button>
          </div>

          <div className="mt-4">
            <label htmlFor="outputCode" className="block text-sm font-medium text-gray-700">
              Translated Code:
            </label>
            <textarea
              id="outputCode"
              rows="15"
              cols="30"
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Translated code will appear here..."
              value={outputCode}
              disabled
            ></textarea>
            <div className="flex mt-4">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
              >
                Copy
              </button>
              <button
                onClick={downloadFile}
                className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download
              </button>
              <Link to={routes.translationHistory()}>
                <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-2">
                  Translation History
                </button>
              </Link>
            </div>
          </div>
          {showFeedback && (
            <UserFeedbackForm
              translationId={translationId}
              onFeedbackSubmit={() => setShowFeedback(false)}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default TranslationOutputPage;
