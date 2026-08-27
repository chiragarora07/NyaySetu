const PRIORITY_RULES = {
    Critical: {
      score: 4,
    },
    High: {
      score: 3,
    },
    Medium: {
      score: 2,
    },
    Low: {
      score: 1,
    },
  };
  
  const KEYWORD_GROUPS = {
    Critical: [
      "fire",
      "accident",
      "electrocution",
      "gas leak",
      "collapsed",
      "life threatening",
      "dangerous",
      "trapped",
    ],
  
    High: [
        "open manhole",
        "sewage overflow",
        "major water leakage",
        "exposed wire",
        "exposed electric wire",
        "live wire",
        "electric wire",
        "broken electric pole",
        "no water",
        "flooding",
        "road accident",
      ],
  
    Medium: [
      "pothole",
      "garbage",
      "street light",
      "drain",
      "water leakage",
      "broken road",
      "illegal dumping",
    ],
  
    Low: [
      "minor",
      "cosmetic",
      "suggestion",
      "information",
    ],
  };
  
  function findKeyword(text, keywords) {
    return keywords.find((keyword) => text.includes(keyword));
  }
  
  function calculatePriority(complaintText = "", affectedPeople = 0) {
    const text = complaintText.toLowerCase();
    const people = Number(affectedPeople || 0);
  
    const criticalKeyword = findKeyword(
      text,
      KEYWORD_GROUPS.Critical
    );
  
    if (criticalKeyword) {
      return {
        priority: "Critical",
        score: PRIORITY_RULES.Critical.score,
        reason: `Critical issue detected: "${criticalKeyword}"`,
      };
    }
  
    const highKeyword = findKeyword(
      text,
      KEYWORD_GROUPS.High
    );
  
    if (highKeyword || people >= 20) {
      return {
        priority: "High",
        score: PRIORITY_RULES.High.score,
        reason: highKeyword
          ? `High-priority issue detected: "${highKeyword}"`
          : "Large number of affected citizens",
      };
    }
  
    const mediumKeyword = findKeyword(
      text,
      KEYWORD_GROUPS.Medium
    );
  
    if (mediumKeyword || people >= 5) {
      return {
        priority: "Medium",
        score: PRIORITY_RULES.Medium.score,
        reason: mediumKeyword
          ? `Medium-priority civic issue detected: "${mediumKeyword}"`
          : "Multiple citizens affected",
      };
    }
  
    return {
      priority: "Low",
      score: PRIORITY_RULES.Low.score,
      reason: "No high-severity indicators detected",
    };
  }
  
  module.exports = {
    calculatePriority,
  };