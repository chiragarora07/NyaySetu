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

async function analyzeWithAI(complaint) {
  try {
    if (!complaint || !complaint.trim()) {
      throw new Error("Complaint text is empty");
    }

    console.log("=================================");
    console.log("🤖 Starting AI analysis");
    console.log("Complaint:", complaint);
    console.log("=================================");

    const knowledge = retrieveRelevantKnowledge(complaint);

    const hasRelevantKnowledge = knowledge.length > 0;

    const context = hasRelevantKnowledge
      ? JSON.stringify(knowledge, null, 2)
      : "No directly relevant department knowledge was retrieved.";

    const prompt = `
You are the NyaySetu Agentic AI Coordinator.

Analyze this citizen complaint.

Your workflow:

1. Understand the complaint.
2. Use the retrieved knowledge when available.
3. Identify the responsible department.
4. Assess the severity and potential impact of the complaint.
5. Generate a concise summary.
6. Explain the decision.

Citizen complaint:

${complaint}

Retrieved knowledge:

${context}

Important rules:

- If relevant knowledge was retrieved, use it as the primary reference.
- If no relevant knowledge was retrieved, use your general understanding,
  but clearly reason about the most appropriate department.
- Prefer an official department name from the retrieved knowledge when available.
- Do not invent specific government rules.
- Priority must be exactly one of:
  Critical, High, Medium, Low.

Return ONLY valid JSON:

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

    for (let attempt = 1; attempt <= 3; attempt++) {
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
            setTimeout(resolve, attempt * 2000)
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

    throw new Error("AI analysis failed");
  }
}

module.exports = {
  analyzeWithAI,
};

