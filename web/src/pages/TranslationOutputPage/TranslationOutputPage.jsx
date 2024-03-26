import { useState, useEffect } from 'react';
import { useLocation } from '@redwoodjs/router';
import { Link, routes } from '@redwoodjs/router';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import { useMutation, gql } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import UserFeedbackForm from 'src/components/UserFeedbackForm/';
import { Toaster } from '@redwoodjs/web/toast';

import sanitizeHtml from 'sanitize-html'; // HTML sanitization library
import detectLang from 'lang-detector'; // Importing lang-detector


// Enhanced Sanitization Options
const sanitizationOptions = {
  allowedTags: [], // Disallow all HTML tags to keep only text
  allowedAttributes: {}, // No attributes allowed
  disallowedTagsMode: 'discard',
  textFilter: (text) => {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); // Basic HTML entity encoding
  },
  preserveLineBreaks: true, // Preserve line breaks to maintain code formatting
};

export const sanitizeInput = (inputCode) => {
  // Apply the textFilter directly as your sanitization step
  return sanitizationOptions.textFilter(inputCode);
};

// CREATE_TRANSLATION_HISTORY_MUTATION 
// Slide 2: Basic GPT-3 API Connection Setup
// GQL Mutation for creating translation history, illustrating initial setup for database interaction.
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
  // State hooks represent UI components for user interaction, reflecting Slide 1's emphasis on frontend preparation.
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('java'); // Keep synchronized with your default or dynamic values
  const [targetLang, setTargetLang] = useState('python'); // Keep synchronized with your default or dynamic values
  const [showFeedback, setShowFeedback] = useState(false);
  const [translationId, setTranslationId] = useState(null);

  useEffect(() => {
    // Slide 1: Implement Code Translation API Integration
    // Parsing URL parameters for code input demonstrates frontend-to-backend API integration preparation.
    const queryParams = new URLSearchParams(location.search);
    const originalCode = queryParams.get('originalCode');
    if (originalCode) {
      setInputCode(decodeURIComponent(originalCode));
    }
  }, [location]);

  useEffect(() => {
    if (inputCode) {
      // Using lang-detector for language detection
      const detectedLanguage = detectLang(inputCode);
      if (detectedLanguage !== 'Unknown') {
        setSourceLang(detectedLanguage.toLowerCase()); // Adjust as necessary for your application's state logic
      }
    }
  }, [inputCode]);


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

    // Slide 1 & Slide 2: Addressing user authentication and input validation align with API usage prerequisites.

    if (sourceLang.toLowerCase() === targetLang.toLowerCase()) {
      alert("Source and target languages can't be the same. Please select a different target language.");
      return;
    }

    // Sanitize the input code
    const sanitizedCode = sanitizeHtml(inputCode, sanitizationOptions);

    // Transform the code if necessary
    // This is a placeholder. Replace this with your actual transformation logic.
    const transformedCode = sanitizedCode; // e.g., yourTransformationFunction(sanitizedCode);

    //error checking 
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
          inputCode: transformedCode,
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();
      // Slide 3: Advanced GPT-3 API Integration and Error Handling
      // This section is the core of API interaction, showcasing detailed request construction and response handling
      if (!data.success) {
        // Comprehensive error handling from Slide 3, informing users of various potential API response issues.
        let errorMessage = 'An error occurred. Please try again.';
        if (response.status === 429) {
          errorMessage = 'Please wait a moment and try again later.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Please check your input and try again.';
        } else if (response.status === 503) {
          errorMessage = 'Service temporarily unavailable. Please try again later.';
        }
        alert(errorMessage);
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
              <option value="java">java</option>
              <option value="python">python</option>
              <option value="javascript">javascript</option>
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
              <option value="java">java</option>
              <option value="python">python</option>
              <option value="javascript">javascript</option>
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

