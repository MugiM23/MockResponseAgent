const express = require('express');
const {generateMock} = require("./agent")
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample route - GET
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/generate-mock', async(req, res) => {
  const receivedData = req.body;
  try {
    const data = await generateMock(receivedData)
    console.log({data})
    res.json(JSON.parse(data))
  } catch (error) {
    res.status(500).json({ error: "LLM failed to generate valid JSON", details: err.message });
  }
  
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
