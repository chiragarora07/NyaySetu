const express = require("express");
const cors = require("cors");
const { analyzeWithAI } = require("./ai/coordinator");

const app = express();
const FASTAPI_BASE_URL = "http://127.0.0.1:8004";

app.use(cors());
app.use(express.json());

function mapDepartment(departments, aiDepartment) {
  if (!aiDepartment || !Array.isArray(departments) || departments.length === 0) {
    return null;
  }

  const target = String(aiDepartment).toLowerCase().trim();

  const exactMatch = departments.find(
    (item) => String(item.name || "").toLowerCase() === target
  );

  if (exactMatch) {
    return exactMatch;
  }

  const includesMatch = departments.find((item) => {
    const name = String(item.name || "").toLowerCase();
    return name.includes(target) || target.includes(name);
  });

  if (includesMatch) {
    return includesMatch;
  }

  const significantWords = target
    .split(/\s+/)
    .filter((word) => word.length > 3 && word !== "department");

  return (
    departments.find((item) => {
      const name = String(item.name || "").toLowerCase();
      return significantWords.some((word) => name.includes(word));
    }) || null
  );
}

async function readErrorMessage(response, fallback) {
  try {
    const data = await response.json();
    return data.detail || data.error || fallback;
  } catch {
    return fallback;
  }
}

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
    citizen_mobile,
    description,
    location
  } = req.body;

  if (!description || !description.trim()) {
    return res.status(400).json({
      error: "Complaint description is required"
    });
  }

  try {
    const analysis = await analyzeWithAI(description);

    const departmentsResponse = await fetch(`${FASTAPI_BASE_URL}/api/departments`);

    if (!departmentsResponse.ok) {
      throw new Error("Could not fetch departments");
    }

    const departments = await departmentsResponse.json();
    const department = mapDepartment(departments, analysis.department);

    const complaintResponse = await fetch(`${FASTAPI_BASE_URL}/api/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        citizen_name: citizen_name || null,
        citizen_mobile: citizen_mobile || null,
        description,
        location: location || null,
        category: analysis.category
      })
    });

    if (!complaintResponse.ok) {
      const message = await readErrorMessage(
        complaintResponse,
        "Could not save complaint"
      );
      throw new Error(message);
    }

    const complaint = await complaintResponse.json();

    const updateResponse = await fetch(
      `${FASTAPI_BASE_URL}/api/complaints/${complaint.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          department_id: department ? department.id : null,
          priority: analysis.priority,
          status: analysis.status || "Pending",
          ai_summary: analysis.summary,
          ai_analysis: analysis.reason
        })
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Could not update AI analysis");
    }

    const savedComplaint = await updateResponse.json();

    res.json({
      complaintId: savedComplaint.id,
      ...analysis,
      departmentId: department ? department.id : null
    });
  } catch (error) {
    console.error("Complaint submission error:", error);

    res.status(500).json({
      error: error.message || "Complaint submission failed"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`NyaySetu backend running on http://localhost:${PORT}`);
});
