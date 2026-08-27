const express = require("express");
const cors = require("cors");
const { analyzeWithAI } = require("./ai/coordinator");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "NyaySetu backend is running"
  });
});

app.post("/api/complaints/analyze", async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({
      error: "Complaint text is required"
    });
  }

  try {
    const result = await analyzeWithAI(text);
    res.json(result);
  } catch (error) {
    console.error("AI analysis error:", error);

    res.status(500).json({
      error: "AI analysis failed"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`NyaySetu backend running on http://localhost:${PORT}`);
});