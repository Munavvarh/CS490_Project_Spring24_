import { useState, useEffect } from 'react'

import detectLang from 'lang-detector' // Importing lang-detector
import sanitizeHtml from 'sanitize-html' // HTML sanitization library

import { useLocation } from '@redwoodjs/router'
import { Link, routes } from '@redwoodjs/router'
import { useMutation, gql } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import UserFeedbackForm from 'src/components/UserFeedbackForm/'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

// Enhanced Sanitization Options
const sanitizationOptions = {
  allowedTags: [], // Disallow all HTML tags to keep only text
  allowedAttributes: {}, // No attributes allowed
  disallowedTagsMode: 'discard',
  textFilter: (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') // Basic HTML entity encoding
  },
  preserveLineBreaks: true, // Preserve line breaks to maintain code formatting
}

export const sanitizeInput = (inputCode) => {
  // Apply the textFilter directly as your sanitization step
  return sanitizationOptions.textFilter(inputCode)
}

// CREATE_TRANSLATION_HISTORY_MUTATION
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

const CREATE_ERROR_MUTATION = gql`
  mutation CreateErrorMutation($input: CreateErrorInput!) {
    createError(input: $input) {
      id
    }
  }
`

const TranslationOutputPage = () => {
  const { currentUser } = useAuth()
  const location = useLocation()
  // State hooks represent UI components for user interaction, reflecting Slide 1's emphasis on frontend preparation.
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [sourceLang, setSourceLang] = useState('java') // Keep synchronized with your default or dynamic values
  const [targetLang, setTargetLang] = useState('python') // Keep synchronized with your default or dynamic values
  const [showFeedback, setShowFeedback] = useState(false)
  const [translationId, setTranslationId] = useState(null)
  const [sendingTranslation, setSendingTranslation] = useState(false)

  useEffect(() => {
    // Slide 1: Implement Code Translation API Integration
    // Parsing URL parameters for code input demonstrates frontend-to-backend API integration preparation.
    const queryParams = new URLSearchParams(location.search)
    const originalCode = queryParams.get('originalCode')
    if (originalCode) {
      setInputCode(decodeURIComponent(originalCode))
    }
  }, [location])

  useEffect(() => {
    if (inputCode) {
      // Using lang-detector for language detection
      const detectedLanguage = detectLang(inputCode).toLowerCase()
      if (['python', 'java', 'javascript'].includes(detectedLanguage)) {
        setSourceLang(detectedLanguage) // Set to detected language if it's supported
      } else {
        setSourceLang('unknown') // Set to 'unknown' for unsupported languages
      }
    }
  }, [inputCode])

  const [createTranslationHistory] = useMutation(
    CREATE_TRANSLATION_HISTORY_MUTATION
  )

  const [createError] = useMutation(CREATE_ERROR_MUTATION)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode)
    alert('Copied to clipboard!')
    // toast('Copied to clipboard!', {
    //   icon: '📋',
    // })
  }

  const downloadFile = () => {
    const element = document.createElement('a')
    const file = new Blob([outputCode], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'TranslatedCode.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleTranslateClick = async () => {
    setSendingTranslation(true)
    // Slide 1 & Slide 2: Addressing user authentication and input validation align with API usage prerequisites.

    if (sourceLang.toLowerCase() === targetLang.toLowerCase()) {
      // toast.error(
      //   "Source and target languages can't be the same. Please select a different target language."
      // )
      alert(
        "Source and target languages can't be the same. Please select a different target language."
      )
      setSendingTranslation(false)

      return
    }

    // Sanitize the input code
    const sanitizedCode = sanitizeHtml(inputCode, sanitizationOptions)

    // Transform the code if necessary
    // This is a placeholder. Replace this with your actual transformation logic.
    const transformedCode = sanitizedCode // e.g., yourTransformationFunction(sanitizedCode);

    //error checking
    // if (!currentUser) {
    //   // toast.error('Please log in to translate and save your code.')
    //   alert('Please log in to translate and save your code.')
    //   setSendingTranslation(false)
    //   return
    // }

    if (!inputCode.trim()) {
      // toast.error('Please enter the code to translate.')
      alert('Please enter the code to translate.')
      setSendingTranslation(false)
      return
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
      })

      const data = await response.json()

      if (!response.ok) {
        // Directly display the backend-provided error message if the response is not OK
        console.error('Backend error:', data.error)
        // toast.error(data.error || 'An error occurred. Please try again.')
        alert(data.error || 'An error occurred. Please try again.')
        setShowFeedback(false)
        const { data: translationData } = await createTranslationHistory({
          variables: {
            input: {
              userId: currentUser.id,
              originalCode: inputCode,
              translatedCode: '',
              originalLanguage: sourceLang,
              translationLanguage: targetLang,
              status: 'BACKEND ERROR',
            },
          },
        })
        const { data: errorData } = await createError({
          variables: {
            input: {
              translationId: translationData.createTranslationHistory.id,
              title: 'BACKEND ERROR',
              description: data.error,
              status: 'LOGGED',
            },
          },
        })
      } else {
        if (data.success) {
          setOutputCode(data.translatedCode)
          // Proceed with creating translation history and other success logic...
          const { data: translationData } = await createTranslationHistory({
            variables: {
              input: {
                userId: currentUser.id, // Make sure currentUser and other state variables are correctly set up
                originalCode: inputCode,
                translatedCode: data.translatedCode,
                originalLanguage: sourceLang,
                translationLanguage: targetLang,
                status: 'COMPLETED',
              },
            },
          })
          // toast.success('Translation saved successfully!')
          alert('Translation saved successfully!')
          setTranslationId(translationData.createTranslationHistory.id) // Update translation ID state
          setShowFeedback(true) // Show feedback form or confirmation
        } else {
          // Handle cases where the backend indicates failure through the 'success' flag
          // toast.error(data.error || 'Translation failed. Please try again.')
          alert(data.error || 'Translation failed. Please try again.')
          setShowFeedback(false)
          const { data: translationData } = await createTranslationHistory({
            variables: {
              input: {
                userId: currentUser.id,
                originalCode: inputCode,
                translatedCode: '',
                originalLanguage: sourceLang,
                translationLanguage: targetLang,
                status: 'TRANSLATION FAILURE',
              },
            },
          })
          const { data: errorData } = await createError({
            variables: {
              input: {
                translationId: translationData.createTranslationHistory.id,
                title: 'TRANSLATION FAILURE',
                description: data.error,
                status: 'LOGGED',
              },
            },
          })
        }
      }
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Error sending translation request.') // This message shows for fetch errors, not backend logic errors
      // toast.error('Error sending translation request.') // This message shows for fetch errors, not backend logic errors
      setShowFeedback(false)
      const { data: translationData } = await createTranslationHistory({
        variables: {
          input: {
            userId: currentUser.id,
            originalCode: inputCode,
            translatedCode: '',
            originalLanguage: sourceLang,
            translationLanguage: targetLang,
            status: 'FETCH ERROR',
          },
        },
      })
      const { data: errorData } = await createError({
        variables: {
          input: {
            translationId: translationData.createTranslationHistory.id,
            title: error.name,
            description: error.message,
            status: 'LOGGED',
          },
        },
      })
    }
    setSendingTranslation(false)
  }

  return (
    <>
      <Toaster />
      <MainLayout>
        <div className="min-h-screen p-10">
          <div className="mb-4">
            <label
              htmlFor="inputCode"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="sourceLang"
              className="block text-sm font-medium text-gray-700"
            >
              Language of your code:
            </label>
            <select
              id="sourceLang"
              className="border border-gray 300 focus:outline-none focus:ring-indigo-500 mt-1 block
              w-full rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
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
            <label
              htmlFor="targetLang"
              className="block text-sm font-medium text-gray-700"
            >
              Translation Language:
            </label>
            <select
              id="targetLang"
              className="border focus:outline-none focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 sm:text-sm"
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
              disabled={sendingTranslation}
              onClick={handleTranslateClick}
              className="border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex justify-center rounded-md border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-900 disabled:bg-indigo-900"
            >
              Translate
            </button>
          </div>

          <div className="mt-4">
            <label
              htmlFor="outputCode"
              className="block text-sm font-medium text-gray-700"
            >
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
            <div className="mt-4 flex">
              <button
                onClick={copyToClipboard}
                className="border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2 inline-flex items-center justify-center rounded-md border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              >
                Copy
              </button>
              <button
                onClick={downloadFile}
                className="border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center justify-center rounded-md border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Download
              </button>
              <Link to={routes.translationHistory()}>
                <button className="border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-2 inline-flex items-center justify-center rounded-md border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700">
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
  )
}

export default TranslationOutputPage
