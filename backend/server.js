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
app.post("/api/complaints/submit", async (req, res) => {
  const {
    citizen_name,
    citizen_email,
    description,
    location
  } = req.body;

  if (!description || !description.trim()) {
    return res.status(400).json({
      error: "Complaint description is required"
    });
  }

  try {
    // 1. Analyze complaint using Gemini + RAG
    const analysis = await analyzeWithAI(description);

    // 2. Find department ID
    const departmentsResponse = await fetch(
      "http://127.0.0.1:8000/api/departments"
    );

    if (!departmentsResponse.ok) {
      throw new Error("Could not fetch departments");
    }

    const departments = await departmentsResponse.json();

    const department = departments.find(
      (item) =>
        item.name.toLowerCase() ===
        analysis.department.toLowerCase()
    );

    // 3. Create complaint in PostgreSQL
    const complaintResponse = await fetch(
      "http://127.0.0.1:8000/api/complaints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          citizen_name: citizen_name || null,
          citizen_email: citizen_email || null,
          description,
          location: location || null,
          category: analysis.category
        })
      }
    );

    if (!complaintResponse.ok) {
      throw new Error("Could not save complaint");
    }

    const complaint = await complaintResponse.json();

    // 4. Update complaint with AI results
    const updateResponse = await fetch(
      `http://127.0.0.1:8000/api/complaints/${complaint.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          department_id: department ? department.id : null,
          priority: analysis.priority,
          status: "Pending",
          ai_summary: analysis.summary,
          ai_analysis: analysis.reason
        })
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Could not update AI analysis");
    }

    const savedComplaint = await updateResponse.json();

    // 5. Return everything to frontend
    res.json({
      complaintId: savedComplaint.id,
      ...analysis,
      departmentId: department ? department.id : null
    });

  } catch (error) {
    console.error("Complaint submission error:", error);

    res.status(500).json({
      error: "Complaint submission failed"
    });
  }
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`NyaySetu backend running on http://localhost:${PORT}`);
});