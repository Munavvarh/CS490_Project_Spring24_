import { useState, useEffect } from 'react';
import { useMutation, gql } from '@redwoodjs/web';
import { useLocation } from '@redwoodjs/router';
import { Link, routes } from '@redwoodjs/router';
import MainLayout from 'src/layouts/MainLayout/MainLayout';

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
  const [sourceLang, setSourceLang] = useState('');
  const [targetLang, setTargetLang] = useState('');

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
    const translatedCode = inputCode; // Placeholder for actual translation logic
    setOutputCode(translatedCode);

    try {
      await createTranslationHistory({
        variables: {
          input: {
            userId: 1, // Replace with logic to retrieve the current user's ID
            originalCode: inputCode,
            translatedCode,
            originalLanguage: sourceLang,
            translationLanguage: targetLang,
            status: 'COMPLETED',
          },
        },
      });
      alert('Translation saved successfully!');
    } catch (error) {
      console.error('Error saving translation:', error);
      alert('Failed to save translation.');
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
          <input
            id="sourceLang"
            type="text"
            placeholder="Language of your code"
            className="form-input input-half-width mt-1 rounded-md border-2 border-black p-2 shadow-md"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="targetLang" className="code-extra-label">
            Translation Language:
          </label>
          <input
            id="targetLang"
            type="text"
            placeholder="Translation Language"
            className="form-input input-half-width mt-1 rounded-md border-2 border-black p-2 shadow-md"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          />
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
