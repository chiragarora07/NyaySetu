require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { retrieveRelevantKnowledge } = require("./rag");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

async function analyzeWithAI(complaint) {
  // 1. Retrieve relevant knowledge
  const knowledge = retrieveRelevantKnowledge(complaint);

  // 2. Agent decides whether retrieval is sufficient
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
4. Determine priority.
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
    const result = await model.generateContent(prompt);

    const responseText = result.response.text().trim();

    const cleanedResponse = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const analysis = JSON.parse(cleanedResponse);

    return {
      ...analysis,

      // Useful for demonstrating the RAG pipeline
      ragUsed: hasRelevantKnowledge,
      retrievedSources: knowledge.map((item) => item.department)
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error("AI analysis failed");
  }
}

module.exports = {
  analyzeWithAI
};