import { useState } from 'react'

import MainLayout from 'src/layouts/MainLayout/MainLayout'

const TranslationOutputPage = () => {
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [sourceLang, setSourceLang] = useState('')
  const [targetLang, setTargetLang] = useState('')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode)
    alert('Copied to clipboard!')
  }

  // Function to download the output code as a file
  const downloadFile = () => {
    const element = document.createElement('a')
    const file = new Blob([outputCode], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'TranslatedCode.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element) // Clean up
  }

  const handleTranslateClick = () => {
    // Dummy translation for example purposes
    setOutputCode(`${inputCode}`)
  }

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
          <label htmlFor="sourceLang" className="code-extra-label ">
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
        </div>
      </div>
    </MainLayout>
  )
}

export default TranslationOutputPage
