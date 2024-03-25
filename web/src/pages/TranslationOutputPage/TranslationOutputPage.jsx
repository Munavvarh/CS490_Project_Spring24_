import { useState, useEffect } from 'react';
import { useLocation } from '@redwoodjs/router';
import { Link, routes } from '@redwoodjs/router';
import MainLayout from 'src/layouts/MainLayout/MainLayout';
import { useMutation, gql } from '@redwoodjs/web';

const CREATE_TRANSLATION_HISTORY_MUTATION = gql`
  mutation CreateTranslationHistoryMutation($input: CreateTranslationHistoryInput!) {
    createTranslationHistory(input: $input) {
      id
    }
  }
`;

const TranslationOutputPage = () => {
  const location = useLocation();
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('java'); // Default language set to Java
  const [targetLang, setTargetLang] = useState('python'); // Default language set to Python

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
    document.body.removeChild(element); // Clean up
  };
  const handleTranslateClick = async () => {
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
        setOutputCode(data.translatedCode);

        // Assuming user ID retrieval logic is implemented elsewhere
        const userId = 13; // Placeholder: replace with actual logic to retrieve the current user's ID

        // Create translation history record linked to the user
        await createTranslationHistory({
          variables: {
            input: {
              userId, // Using the retrieved or placeholder user ID
              originalCode: inputCode,
              translatedCode: data.translatedCode,
              originalLanguage: sourceLang,
              translationLanguage: targetLang,
              status: 'COMPLETED',
            },
          },
        });
        alert('Translation saved successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending translation request. Please check your network connection and try again. Check if you are logged in');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen p-10">
        <div className="mb-4">
          <label htmlFor="inputCode" className="code-main-label">
            Enter your code:
          </label>
          <textarea
            id="inputCode"
            rows="15"
            cols="30"
            className="form-textarea mt-1 rounded-md border-2 border-black p-2 shadow-md"
            placeholder="Enter your code..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          ></textarea>
        </div>

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
      </div>
    </MainLayout>
  )
}

export default TranslationOutputPage
