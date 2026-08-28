const departments = require("../knowledge/departments.json");

function retrieveRelevantKnowledge(complaint) {
  const text = complaint.toLowerCase();

  const results = departments.map((department) => {
    let score = 0;

    // Exact department match
    if (text.includes(department.department.toLowerCase())) {
      score += 10;
    }

    // Category matches
    department.categories.forEach((category) => {
      if (text.includes(category.toLowerCase())) {
        score += 6;
      }
    });

    // Keyword matches
    department.keywords.forEach((keyword) => {
      if (text.includes(keyword.toLowerCase())) {
        score += 3;
      }
    });

    // Responsibility matches
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
      department,
      relevanceScore: score
    };
  });

  const best = results
    .filter((item) => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 1);

  return best.map((item) => ({
    department: item.department.department,
    categories: item.department.categories,
    responsibilities: item.department.responsibilities
  }));
}

module.exports = {
  retrieveRelevantKnowledge
};