
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { retrieveRelevantKnowledge } = require("./rag");
const { calculatePriority } = require("../priorityEngine");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing from .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash",
  generationConfig: {
    temperature: 0,
    responseMimeType: "application/json",
  },
});

function extractJson(responseText) {
  const cleanedResponse = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch {
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("AI did not return valid JSON");
    }

    return JSON.parse(jsonMatch[0]);
  }
}

function createFallbackAnalysis(complaint, knowledge) {
  const priorityResult = calculatePriority(complaint, 0, "");
  const firstKnowledge = knowledge[0];

  return {
    category: "General Civic Issue",
    department: firstKnowledge?.department || "General Administration",
    priority: priorityResult.priority,
    priorityScore: priorityResult.score,
    priorityReason: priorityResult.reason,
    summary: complaint.slice(0, 200),
    reason:
      "AI service unavailable. Priority determined using NyaySetu rule-based analysis.",
    status: "Pending",
    ragUsed: knowledge.length > 0,
    retrievedSources: knowledge.map((item) => item.department),
  };
}

async function analyzeWithAI(complaint) {
  let knowledge = [];

  try {
    if (!complaint || !complaint.trim()) {
      throw new Error("Complaint text is empty");
    }

    console.log("=================================");
    console.log("🤖 Starting AI analysis");
    console.log("Complaint:", complaint);
    console.log("=================================");

    knowledge = retrieveRelevantKnowledge(complaint);

    const hasRelevantKnowledge = knowledge.length > 0;

    const context = hasRelevantKnowledge
      ? JSON.stringify(knowledge, null, 2)
      : "No directly relevant department knowledge was retrieved.";

      const prompt = `
      You are NyaySetu, an AI coordinator for citizen grievances.
      
      Analyze the complaint and return the required structured information.
      
      Complaint:
      ${complaint}
      
      Relevant departmental knowledge:
      ${context || "No relevant knowledge retrieved."}
      
      Rules:
      - Use the retrieved knowledge as the primary reference when available.
      - Select the most appropriate responsible department.
      - Assess severity based on safety, urgency, and citizen impact.
      - Do not invent government rules.
      - Priority must be exactly: Critical, High, Medium, or Low.
      - Keep summary and reason concise.
      - Return ONLY valid JSON.
      
      Required JSON:
      {
        "category": "string",
        "department": "string",
        "priority": "Critical | High | Medium | Low",
        "summary": "string",
        "reason": "string",
        "status": "Pending"
      }
      `;

    let result;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Calling Gemini... attempt ${attempt}/3`);

        result = await model.generateContent(prompt);

        console.log("✅ Gemini response received");

        break;
      } catch (error) {
        console.error("❌ Gemini attempt failed:");
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        console.error("Full error:", error);

        if (attempt === 3) {
          throw error;
        }

        if (error.status === 503) {
          console.log(
            `Gemini temporarily unavailable. Retrying (${attempt}/3)...`
          );

          await new Promise((resolve) =>
            setTimeout(resolve, 1000)
          );
        } else {
          throw error;
        }
      }
    }

    if (!result) {
      throw new Error("No response received from Gemini");
    }

    const responseText = result.response.text().trim();

    console.log("Gemini raw response:");
    console.log(responseText);

    const analysis = extractJson(responseText);

    console.log("✅ AI JSON parsed successfully");
    console.log(analysis);

    const aiSeverity = analysis.priority || analysis.severity;

    const priorityResult = calculatePriority(
      complaint,
      0,
      aiSeverity
    );

    return {
      ...analysis,
      status: analysis.status || "Pending",
      priority: priorityResult.priority,
      priorityScore: priorityResult.score,
      priorityReason: priorityResult.reason,
      ragUsed: hasRelevantKnowledge,
      retrievedSources: knowledge.map(
        (item) => item.department
      ),
    };
  } catch (error) {
    console.error("=================================");
    console.error("❌ GEMINI ANALYSIS FAILED");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    console.error("Full error:", error);
    console.error("=================================");

    console.log("Using rule-based fallback analysis.");

    return createFallbackAnalysis(complaint, knowledge);
  }
}

module.exports = {
  analyzeWithAI,
};
