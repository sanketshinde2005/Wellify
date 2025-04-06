// ---- Wellify Chatbot Integration ----
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes


const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const HF_API_KEY = process.env.HF_API_KEY;

const systemPrompt = `You are Wellify, an advanced medical AI assistant in a comprehensive healthcare platform.

Your capabilities:
1. Explain medical symptoms and conditions in simple terms
2. Provide general health advice based on user queries
3. Suggest over-the-counter medications for minor symptoms
4. Connect patients with appropriate medical specialists
5. Help interpret common medical terminology
6. Answer questions about medical procedures and tests

IMPORTANT LIMITATIONS - ALWAYS FOLLOW THESE:
- Never diagnose specific medical conditions
- Never prescribe specific prescription medications
- Always recommend consulting a physician for serious symptoms
- Do not give specific dosage instructions for medications
- Maintain strict patient confidentiality and privacy

When responding, consider that you are part of an integrated platform that also offers:
- Medical report analysis and disease risk prediction
- Medicine recommendations
- Cancer detection screening
- Doctor-patient connection services

Always include this disclaimer with your responses:
"This information is for educational purposes only and not a substitute for professional medical advice. Please consult with a qualified healthcare provider for personalized recommendations."`;

function formatMessage(message) {
    return `${systemPrompt}\n\nHuman: ${message}\nAssistant:`;
}

async function generateResponse(prompt) {
    const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                max_new_tokens: 512,
                temperature: 0.7,
                top_p: 0.95,
                do_sample: true
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.generated_text || data[0]?.generated_text || "";
}

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    // Input validation
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid message input.' });
    }

    try {
        const prompt = formatMessage(message);
        const generatedText = await generateResponse(prompt);
        const assistantReply = generatedText.replace(prompt, "").trim();

        let reply = assistantReply;
        if (!reply.includes("This information is for educational purposes only")) {
            reply += "\n\n📌 This information is for educational purposes only and not a substitute for professional medical advice. Please consult with a qualified healthcare provider for personalized recommendations.";
        }

        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Chatbot failed to respond.' });
    }
});

app.listen(5005, () => {
    console.log("🤖 Wellify Chatbot server running on port:", 5005);
});
