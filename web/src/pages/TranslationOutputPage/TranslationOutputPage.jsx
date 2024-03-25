
import { Toaster } from '@redwoodjs/web/toast'
import UserFeedbackForm from 'src/components/UserFeedbackForm/'
import { useState, useEffect } from 'react';
import { useLocation } from '@redwoodjs/router';
import { Link, routes } from '@redwoodjs/router';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import { useMutation, gql } from '@redwoodjs/web';
import { useAuth } from 'src/auth';


// Slide 2: Basic GPT-3 API Connection Setup
// GQL Mutation for creating translation history, illustrating initial setup for database interaction.
const CREATE_TRANSLATION_HISTORY_MUTATION = gql`
  mutation CreateTranslationHistoryMutation(
    $input: CreateTranslationHistoryInput!
  ) {
    createTranslationHistory(input: $input) {
      id
    }
  }
`

const TranslationOutputPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  // State hooks represent UI components for user interaction, reflecting Slide 1's emphasis on frontend preparation.
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('java');
  const [targetLang, setTargetLang] = useState('python');
  const [showFeedback, setShowFeedback] = useState(false)
  const [translationId, setTranslationId] = useState(null) // State to store translation ID

  useEffect(() => {
    // Slide 1: Implement Code Translation API Integration
    // Parsing URL parameters for code input demonstrates frontend-to-backend API integration preparation.
    const queryParams = new URLSearchParams(location.search);
    const originalCode = queryParams.get('originalCode');
    if (originalCode) {
      setInputCode(decodeURIComponent(originalCode))
    }
  }, [location])

  const [createTranslationHistory] = useMutation(
    CREATE_TRANSLATION_HISTORY_MUTATION
  )

  // Utility functions represent enhancements for user experience, indirectly related to API integration.
  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode)
    alert('Copied to clipboard!')
  }

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
    if (!currentUser) {
      alert('Please log in to translate and save your code.');
      return;
    }

    if (!inputCode.trim()) {
      alert('Please enter the code in the input box before translating.');
      return;
    }


    // Slide 3: Advanced GPT-3 API Integration and Error Handling
    // This section is the core of API interaction, showcasing detailed request construction and response handling.
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
        // Comprehensive error handling from Slide 3, informing users of various potential API response issues.
        let errorMessage = 'An error occurred. Please try again.';
        if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again later.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Please check your input and try again.';
        } else if (response.status === 503) {
          errorMessage = 'Service temporarily unavailable. Please try again later.';
        }
        alert(errorMessage);
      } else {
        // Successful API interaction leads to UI updates and database storage, reflecting full integration.
        setOutputCode(data.translatedCode);
        await createTranslationHistory({
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
        const newTranslationId = data.createTranslationHistory.id
         setTranslationId(newTranslationId)
         setShowFeedback(true)
      }
    } catch (error) {
      // Network error handling, emphasizing robustness in application's connectivity with the API.
      console.error('Error:', error);
      alert('Error sending translation request. Please check your network connection and try again.');
    }
  }

  return (
    <>
      <Toaster />
        <div className="mb-4">
          <label htmlFor="sourceLang" className="code-extra-label">
            Language of your code:
          </label>
          <select
            id="sourceLang"
            className="form-select mt-1 rounded-md border-2 border-black p-2 shadow-md"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="targetLang" className="code-extra-label">
            Translation Language:
          </label>
          <select
            id="targetLang"
            className="form-select mt-1 rounded-md border-2 border-black p-2 shadow-md"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>


        <div className="mb-4 flex justify-between">
          <button onClick={handleTranslateClick} className="btn-translate">
            Translate
          </button>
        </div>

          <div className="mb-4 flex justify-between">
            <button onClick={handleTranslateClick} className="btn-translate">
              Translate
            </button>
          </div>

          <div>
            <label htmlFor="outputCode" className="code-main-label">
              Translated Code:
            </label>
            <textarea
              id="outputCode"
              rows="15"
              cols="30"
              className="form-textarea mt-1 rounded-md border-2 border-black p-2 shadow-lg"
              placeholder="Translated code will appear here..."
              value={outputCode}
              disabled
            ></textarea>
            <button onClick={copyToClipboard} className="btn-copy mr-2">
              Copy
            </button>
            <button onClick={downloadFile} className="btn-download">
              Download
            </button>
            <Link to={routes.translationHistory()}>
              <button className="btn-history btn-history-bold">
                TRANSLATION HISTORY
              </button>
            </Link>
          </div>
          <div>
            <UserFeedbackForm
              translationId={translationId}
              showFeedback={!showFeedback}
              onFeedbackSubmit={() => setShowFeedback(false)}
            />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default TranslationOutputPage
