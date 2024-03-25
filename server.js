const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Secure API key storage (Slide 2: Basic GPT-3 API Connection Setup)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Endpoint for code translation (Slide 2 & Slide 3: Advanced GPT-3 API Integration and Error Handling)
app.post('/translate-code', async (req, res) => {
    const { inputCode, sourceLang, targetLang } = req.body;

    try {
        // Constructing detailed requests with correct parameters (Slide 1 & Slide 3)
        const prompt = `Translate the following code from ${sourceLang} to ${targetLang}:\n\n${inputCode}`;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: `You are a knowledgeable assistant skilled in translating code from ${sourceLang} to ${targetLang}.`
            }, {
                role: "user",
                content: prompt
            }],
            max_tokens: 2048
        });

        // Processing the data for use by the frontend (Slide 3)
        const translatedCode = response.choices[0].message.content.trim();
        res.json({ success: true, translatedCode });
    } catch (error) {
        console.error('Error translating code:', error);

        // Comprehensive error handling (Slide 3)
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    res.status(400).json({ success: false, error: "Invalid request. Please check the input." });
                    break;
                case 429:
                    res.status(429).json({ success: false, error: "Rate limit exceeded. Please wait and try again." });
                    break;
                default:
                    res.status(500).json({ success: false, error: "An unexpected error occurred." });
            }
        } else {
            res.status(500).json({ success: false, error: "Failed to reach the OpenAI service. Please try again." });
        }
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
