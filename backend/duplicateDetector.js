const {
    createEmbedding,
    cosineSimilarity,
  } = require("./similarity");
  
  async function detectDuplicate(newComplaint, existingComplaints, threshold = 0.7) {
    const newEmbedding = await createEmbedding(newComplaint);
  
    const results = [];
  
    for (const complaint of existingComplaints) {
      const existingEmbedding = await createEmbedding(complaint.text);
  
      const score = cosineSimilarity(
        newEmbedding,
        existingEmbedding
      );
  
      results.push({
        id: complaint.id,
        text: complaint.text,
        similarity: Number(score.toFixed(4)),
        isDuplicate: score >= threshold,
      });
    }
  
    results.sort((a, b) => b.similarity - a.similarity);
  
    return results;
  }
  
  module.exports = {
    detectDuplicate,
  };