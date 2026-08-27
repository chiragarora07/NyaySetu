const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env")
});
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { retrieveRelevantKnowledge } = require("./rag");
const { calculatePriority } = require("../priorityEngine");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.6-flash"
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
    reason: "AI service unavailable. Priority determined using NyaySetu rule-based analysis.",
    status: "Pending",
    ragUsed: knowledge.length > 0,
    retrievedSources: knowledge.map((item) => item.department)
  };
}
async function analyzeWithAI(complaint) {
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

  try {
    let result;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error) {
        if (error.status !== 503 || attempt === 3) {
          throw error;
        }

        console.log(`Gemini temporarily unavailable. Retrying (${attempt}/3)...`);

        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 2000)
        );
      }
    }

    const responseText = result.response.text().trim();
    const analysis = extractJson(responseText);
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
      retrievedSources: knowledge.map((item) => item.department)
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    console.log("Using rule-based fallback analysis.");

    return createFallbackAnalysis(complaint, knowledge);
  }
}

module.exports = {
  analyzeWithAI
};
