// server.js

const detectLang = require('lang-detector');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock function to simulate a successful API request
const mockSuccessRequest = async () => {
  return { status: 'success', data: 'Mock data' };
};

// Mock function to simulate a failed API request
const mockFailedRequest = async () => {
  throw new Error('Mock error');
};

function preprocessCode(inputCode, sourceLang) {
  // Preserves important comments before further processing
  const importantComments = inputCode.match(/\/\/.*TODO:.*|\/\/.*FIXME:.*|\/\/.*NOTE:.*|\/\*.*TODO:.*\*\/|\/\*.*FIXME:.*\*\/|\/\*.*NOTE:.*\*\/|#+.*TODO:.*|#+.*FIXME:.*|#+.*NOTE:.*/g);
  let preservedComments = "";
  if (importantComments) {
    preservedComments = importantComments.join('\n') + '\n';
  }

  // Removes comments based on the source language
  let cleanedCode = removeComments(inputCode, sourceLang);

  return preservedComments + cleanedCode.trim();
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });

function removeComments(code, language) {
  switch (language.toLowerCase()) {
    case 'python':
      code = code.replace(/#.*$/gm, ''); // Removes Python comments
      break;
    case 'java':
    case 'javascript':
      // Removes single-line and multi-line comments for Java and JavaScript
      code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
      break;
    // No default needed as we're only supporting Python, Java, JavaScript
  }
  return code;
}

app.post('/translate-code', async (req, res) => {
  const { inputCode, sourceLang, targetLang } = req.body;
  const MAX_LINES_ALLOWED = 1500;
  const lineCount = (inputCode.match(/\n/g) || []).length + 1; // +1 for the last line without a newline character
  if (lineCount > MAX_LINES_ALLOWED) {
    // Handle the error for exceeding the maximum number of lines
    return res.status(429).json({
      success: false,
      error: "Rate limit exceeded due to large input size. Please try again max limit is 1500 Lines."
    });
  }

  // Detect the source language using lang-detector
  const detectedLanguage = detectLang(inputCode).toLowerCase();

  if (!['python', 'java', 'javascript'].includes(detectedLanguage)) {
    return res.status(400).json({ success: false, error: "Unsupported source language detected. Please choose between Python, Java, and JavaScript." });
  }

  const preprocessedCode = preprocessCode(inputCode, sourceLang);
  const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${preprocessedCode}`;

  try {
    const MAX_TOKENS_BASE = 2048;
    const additionalTokens = Math.min(Math.floor(preprocessedCode.length / 100), 1000);
    const max_tokens = MAX_TOKENS_BASE + additionalTokens;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `You are a knowledgeable assistant skilled in translating code from ${sourceLang} to ${targetLang}.`
      }, {
        role: "user",
        content: prompt
      }],
      max_tokens: max_tokens
    });

    const translatedCode = response.choices[0].message.content.trim();
    res.json({ success: true, translatedCode });
  } catch (error) {
    console.error('Error translating code:', error);
    let errorMessage = "An unexpected error occurred.";
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = "Invalid request. Please check the input.";
          break;
        case 429:
          errorMessage = "Rate limit exceeded. Please wait and try again.";
          break;
        default:
          if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error.message;
          }
          break;
      }
      res.status(error.response.status).json({ success: false, error: errorMessage });
    } else {
      res.status(500).json({ success: false, error: "Failed to reach the OpenAI service. Please try again." });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// At the end of your server.js file
module.exports = { app, preprocessCode, mockSuccessRequest, mockFailedRequest }; // Export app for testing
