import { useState } from 'react'

import Collapsible from 'react-collapsible'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi' // Make sure to install react-icons if it's not already

import { Metadata } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

import MainLayout from 'src/layouts/MainLayout/MainLayout'
import '../../index.css' // Assuming you have a CSS file for additional styles

// Full list of FAQs with categories
// ... (keep your FAQs array as it is)

const faqs = [
  {
    category: 'General',
    question: 'How do I start translating code?',
    answer:
      "Access the Translator Tool via the navigation bar, select your source and target languages, paste your code, and click 'Submit'.",
  },
  {
    category: 'Languages',
    question: 'What languages does SyntaxSwitch support?',
    answer:
      "SyntaxSwitch supports a wide range of programming languages, including Python, Java, JavaScript. For a full list, access the tool's language selection dropdown.",
  },
  {
    category: 'API',
    question: 'Can I check the API status?',
    answer:
      "Yes, the current status of the GPT-3 API can be checked directly from our 'API Status' button to ensure the translation service is online.",
  },
  {
    category: 'Limitations',
    question: 'Is there a limit to how much code I can translate at once?',
    answer:
      'There might be limitations based on the current API usage and server capacity. You will get an alert if applicable. Please refer to the API Status page for more information.',
  },
  {
    category: 'Accuracy',
    question: 'How accurate is the code translation?',
    answer:
      'The accuracy depends on the complexity of the code and the languages involved. SyntaxSwitch aims to provide highly accurate translations, but we recommend reviewing the translated code before use.',
  },
  {
    category: 'Contribution',
    question: 'Can I contribute to improving SyntaxSwitch?',
    answer:
      'Absolutely! Feedback and contributions are welcome. You can use the Feedback link to share your thoughts or visit our GitHub repository.',
  },
  {
    category: 'Account',
    question: 'Do I need an account to use SyntaxSwitch?',
    answer:
      'Yes, functionality is not available without an account. Signing up enables access to advanced features and personalization options.',
  },
  {
    category: 'Support',
    question: 'How do I report a bug or request a new feature?',
    answer:
      'Use the Feedback link on our navigation bar to report bugs or suggest new features. Your input is invaluable in helping us improve SyntaxSwitch.',
  },
]

const DocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredFaqs = faqs.filter(
    (faq) =>
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter === 'All' || faq.category === filter)
  )

  return (
    <>
      <Metadata title="Documentation" description="Documentation Page" />

      <MainLayout>
        <>
          <MetaTags
            title="Documentation"
            description="Documentation page for SyntaxSwitch"
          />
          <div className="mx-auto mt-10 max-w-full rounded-lg p-6 shadow-lg">
            <header className="mb-12 text-center">
              <h1 className="mb-6 text-5xl font-bold">
                Documentation and Help Section
              </h1>
              <p className="mb-4 text-lg">
                Welcome to the SyntaxSwitch Documentation! Here, you can find
                answers to frequently asked questions, user guides, and other
                helpful resources to enhance your experience with our code
                translation tool.
              </p>
            </header>
            <hr className="border-2 border-black" />
            <br />

            {/* Searchable FAQs Section */}
            <section className="mb-12">
              <h2 className="mb-6 text-4xl font-semibold">
                Frequently Asked Questions (FAQs)
              </h2>
              <div>
                <input
                  type="text"
                  placeholder="Search FAQs"
                  className="form-input mb-2"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  className="form-select mb-4"
                >
                  <option value="All">All Categories</option>
                  <option value="General">General</option>
                  <option value="Languages">Languages</option>
                  <option value="API">API</option>
                  <option value="Limitations">Limitations</option>
                  <option value="Accuracy">Accuracy</option>
                  <option value="Contribution">Contribution</option>
                  <option value="Account">Account</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <Collapsible
                      key={index}
                      trigger={
                        <div className="faq-question">
                          <span>{faq.question}</span>
                          <FiPlusCircle className="faq-icon" />
                        </div>
                      }
                      triggerWhenOpen={
                        <div className="faq-question">
                          <span>{faq.question}</span>
                          <FiMinusCircle className="faq-icon" />
                        </div>
                      }
                      transitionTime={200}
                      triggerClassName="faq-trigger"
                      triggerOpenedClassName="faq-trigger-opened"
                      contentInnerClassName="faq-answer"
                    >
                      {faq.answer}
                    </Collapsible>
                  ))}
                </div>
              ) : (
                <p>No FAQs found matching your search criteria.</p>
              )}
            </section>

            {/* User Guides Section */}
            <section className="mb-12">
              <hr className="border-2 border-black" />
              <br></br>
              <h2 className="mb-6 text-4xl font-semibold ">User Guides</h2>
              <hr className="border-2 border-black" />
              <br></br>
              <p className="mb-4 text-lg">
                Explore detailed guides on making the most out of SyntaxSwitch.
                For comprehensive guides, please:
              </p>
              <ul className="list-disc space-y-2 pl-8 text-lg">
                <li>
                  {' '}
                  For how to utilize SyntaxSwitch website visit the quickstart
                  section on{' '}
                  <a
                    href="/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {' '}
                    - HomePage
                  </a>
                </li>
                <li>
                  {' '}
                  Contact us for personalized assistance.
                  <a
                    href="/contact-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {' '}
                    - Feedback
                  </a>
                </li>
                <li>
                  Visit our gitHub repository for more technical details and
                  examples.{' '}
                  <a
                    href="https://github.com/Munavvarh/CS490_Project_Spring24_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    - Github
                  </a>
                </li>
                <li>
                  Learn about our GPT API rate limits and error handling on the{' '}
                  <a
                    href="https://platform.openai.com/docs/guides/rate-limits/error-mitigation?context=tier-free"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    API Usage & Errors
                  </a>{' '}
                  page for detailed guidance and best practices.
                </li>
              </ul>
            </section>

            {/* Other Resources Section */}
            <section className="mb-12">
              <hr className="border-2 border-black" />
              <br></br>
              <h2 className="mb-6 text-4xl font-semibold">Other Resources</h2>
              <hr className="border-2 border-black" />
              <br></br>
              <ul className="list-disc space-y-2 pl-8 text-lg">
                <li>
                  Interactive AI conversations with{' '}
                  <a
                    href="https://chat.openai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    ChatGPT by OpenAI
                  </a>
                </li>
                <li>
                  Programming Languages Tutorial{' '}
                  <a
                    href="https://www.geeksforgeeks.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    (GeeksforGeeks)
                  </a>
                </li>
                <li>
                  Dive into developer documentation at{' '}
                  <a
                    href="https://developer.mozilla.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    MDN Web Docs
                  </a>
                </li>
                <li>
                  Explore open source projects on{' '}
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  Sharpen your coding skills at{' '}
                  <a
                    href="https://www.hackerrank.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    HackerRank
                  </a>
                </li>
                <li>
                  Stay updated with the latest in tech with{' '}
                  <a
                    href="https://techcrunch.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    TechCrunch
                  </a>
                </li>
                <li>
                  Learn and practice modern web development on{' '}
                  <a
                    href="https://www.freecodecamp.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    freeCodeCamp
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </>
      </MainLayout>
    </>
  )
}

export { faqs }
export default DocumentationPage
