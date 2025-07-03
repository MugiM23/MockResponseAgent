require("dotenv").config();
const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    isActive: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
  },
  required: ["id", "name", "email", "isActive", "createdAt"],
};

async function generateMock(schema) {
  const prompt = `
Generate a unique, realistic, and random JSON object that conforms to the following JSON schema. Vary names, emails, timestamps, booleans, and IDs.

Only return the JSON object — no explanation, no markdown.

Schema:
${JSON.stringify(schema, null, 2)}

Seed: ${Date.now()}
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 512,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
     return response.data.choices[0].message.content;
     
  } catch (error) {
    console.error("Error calling Groq:", error.response?.data || error.message);
  }
};

module.exports = {
  generateMock
};
