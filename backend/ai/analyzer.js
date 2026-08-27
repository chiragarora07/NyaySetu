function analyzeComplaint(text) {
    const complaint = text.toLowerCase();
  
    let category = "General";
    let department = "General Administration";
    let priority = "Medium";
  
    // Category detection
    if (
      complaint.includes("water") ||
      complaint.includes("pipe") ||
      complaint.includes("tap") ||
      complaint.includes("supply")
    ) {
      category = "Water Supply";
      department = "Water Department";
    } else if (
      complaint.includes("road") ||
      complaint.includes("pothole") ||
      complaint.includes("street")
    ) {
      category = "Roads";
      department = "Public Works Department";
    } else if (
      complaint.includes("electricity") ||
      complaint.includes("power") ||
      complaint.includes("transformer")
    ) {
      category = "Electricity";
      department = "Electricity Department";
    } else if (
      complaint.includes("garbage") ||
      complaint.includes("waste") ||
      complaint.includes("clean")
    ) {
      category = "Sanitation";
      department = "Sanitation Department";
    }
  
    // Priority detection
    if (
      complaint.includes("emergency") ||
      complaint.includes("danger") ||
      complaint.includes("accident") ||
      complaint.includes("fire") ||
      complaint.includes("life threatening")
    ) {
      priority = "Critical";
    } else if (
      complaint.includes("urgent") ||
      complaint.includes("days") ||
      complaint.includes("weeks") ||
      complaint.includes("unsafe")
    ) {
      priority = "High";
    } else if (
      complaint.includes("minor") ||
      complaint.includes("small")
    ) {
      priority = "Low";
    }
  
    return {
      category,
      department,
      priority,
      summary: text,
      status: "Pending"
    };
  }
  
  module.exports = { analyzeComplaint };