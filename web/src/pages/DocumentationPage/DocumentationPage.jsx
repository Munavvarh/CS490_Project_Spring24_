import { MetaTags } from '@redwoodjs/web';
import { useState } from 'react';
import MainLayout from 'src/layouts/MainLayout/MainLayout';

// Example list of FAQs
const faqs = [
  {
    question: "How do I start translating code?",
    answer: "Access the Translator Tool via the navigation bar, select your source and target languages, paste your code, and click 'Submit'.",
  },
  {
    question: "What languages does SyntaxSwitch support?",
    answer: "SyntaxSwitch supports a wide range of programming languages, leveraging the GPT-3 API for seamless translation. For a full list, access the tool's language selection dropdown.",
  },
  {
    question: "Can I check the API status?",
    answer: "Yes, the current status of the GPT-3 API can be checked directly from our 'API Status' button to ensure the translation service is online.",
  },
  {
    question: "Is there a limit to how much code I can translate at once?",
    answer: "There might be limitations based on the current API usage and server capacity. Please refer to the API Status page for more information.",
  },
  {
    question: "How accurate is the code translation?",
    answer: "The accuracy depends on the complexity of the code and the languages involved. SyntaxSwitch aims to provide highly accurate translations, but we recommend reviewing the translated code before use.",
  },
  {
    question: "Can I contribute to improving SyntaxSwitch?",
    answer: "Absolutely! Feedback and contributions are welcome. Visit our GitHub repository or use the Feedback link to share your thoughts.",
  },
  {
    question: "Do I need an account to use SyntaxSwitch?",
    answer: "Yes, functionality is not available without an accoun. signing up enables access to advanced features and personalization options.",
  },
  {
    question: "How do I report a bug or request a new feature?",
    answer: "Use the Feedback link on our navigation bar to report bugs or suggest new features. Your input is invaluable in helping us improve SyntaxSwitch.",
  },
  // Add more FAQs as needed
];

const DocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <>
        <MetaTags title="Documentation" description="Documentation page for SyntaxSwitch" />

        <div className="max-w-full mx-auto p-6 shadow-lg rounded-lg mt-10">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-6">Documentation and Help Section</h1>
            <p className="text-lg mb-4">
              Welcome to the SyntaxSwitch Documentation! Here, you can find answers to frequently asked questions, user guides, and other helpful resources to enhance your experience with our code translation tool.
            </p>
          </header>
          <hr className="border-2 border-black" /><br></br>
          {/* Searchable FAQs Section */}
          <section className="mb-12">
            <h2 className="text-4xl font-semibold mb-6">Frequently Asked Questions (FAQs)</h2>
            <input
              type="text"
              placeholder="Search FAQs"
              className="form-input mb-6"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredFaqs.length > 0 ? (
              <ul className="list-disc pl-8 mb-6 space-y-4 text-lg">
                {filteredFaqs.map((faq, index) => (
                  <li key={index}>
                    <strong>{faq.question}</strong>
                    <p>{faq.answer}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No FAQs found matching your search criteria.</p>
            )}
          </section>
          {/* User Guides Section */}
          <section className="mb-12">
          <hr className="border-2 border-black" /><br></br>
            <h2 className="text-4xl font-semibold mb-6 ">User Guides</h2>
            <hr className="border-2 border-black" /><br></br>
            <p className="mb-4 text-lg">Explore detailed guides on making the most out of SyntaxSwitch. For comprehensive guides, please:</p>
            <ul className="list-disc pl-8 space-y-2 text-lg">
              <li> For how to utilize SyntaxSwitch website visit the quickstart section on  <a href="/home" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'> - HomePage</a></li>
              <li> Contact us for personalized assistance.<a href="/Feedback" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'> - Feedback</a></li>
              <li>Visit our gitHub repository for more technical details and examples. <a href="https://github.com/Munavvarh/CS490_Project_Spring24_" target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>- Github</a></li>
            </ul>
          </section>

          {/* Other Resources Section */}
          <section className="mb-12">
          <hr className="border-2 border-black" /><br></br>
            <h2 className="text-4xl font-semibold mb-6">Other Resources</h2>
            <hr className="border-2 border-black" /><br></br>
            <ul className="list-disc pl-8 space-y-2 text-lg">
              <li>
                Interactive AI conversations with <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ChatGPT by OpenAI</a>
              </li>
              <li>
                Programming Languages Tutorial <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">(GeeksforGeeks)</a>
              </li>
              <li>
                Dive into developer documentation at <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MDN Web Docs</a>
              </li>
              <li>
                Explore open source projects on <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
              </li>
              <li>
                Sharpen your coding skills at <a href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HackerRank</a>
              </li>
              <li>
                Stay updated with the latest in tech with <a href="https://techcrunch.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TechCrunch</a>
              </li>
              <li>
                Learn and practice modern web development on <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">freeCodeCamp</a>
              </li>
            </ul>
          </section>
        </div>
      </>
    </MainLayout>
  );
};


export { faqs };
export default DocumentationPage;
