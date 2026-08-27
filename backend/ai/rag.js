const departments = require("../knowledge/departments.json");

function retrieveRelevantKnowledge(complaint) {
  const text = complaint.toLowerCase();

  const results = departments.map((department) => {
    let score = 0;

    // Exact department match gets highest weight
    if (text.includes(department.department.toLowerCase())) {
      score += 10;
    }

    // Category matches are highly relevant
    department.categories.forEach((category) => {
      if (text.includes(category.toLowerCase())) {
        score += 6;
      }
    });

    // Specific keywords
    department.keywords.forEach((keyword) => {
      if (text.includes(keyword.toLowerCase())) {
        score += 3;
      }
    });

    // Responsibility matches get lower weight
    department.responsibilities.forEach((responsibility) => {
      const words = responsibility
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 4);

      words.forEach((word) => {
        if (text.includes(word)) {
          score += 1;
        }
      });
    });

    return {
      ...department,
      relevanceScore: score
    };
  });

  return results
    .filter((department) => department.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 1);
}

module.exports = {
  retrieveRelevantKnowledge
};