const SUBJECT_KEYWORDS = [
  ["JavaScript", ["javascript", "ecmascript"]],
  ["MongoDB", ["mongodb", "mongo"]],
  ["Python", ["python"]],
  ["React", ["react"]],
  ["Node", ["node", "express"]],
  ["DSA", ["dsa", "leetcode", "algorithm"]],
  ["SQL", ["sql", "database", "mysql"]],
  ["HTML", ["html"]],
  ["CSS", ["css"]],
  ["Java", ["java"]],
];

function classifySubject(title) {
  if (typeof title !== "string" || !title.trim()) return null;
  const normalized = title.toLowerCase();
  for (const [subject, keywords] of SUBJECT_KEYWORDS) {
    if (keywords.some((keyword) => {
      if (["dsa", "sql", "html", "css", "java", "mongo"].includes(keyword)) {
        return new RegExp(`\\b${keyword}\\b`, "i").test(normalized);
      }
      return normalized.includes(keyword);
    })) return subject;
  }
  return null;
}

// The denominator is every Study-category video. Unmatched titles remain visible.
function buildSubjectDistribution(videos = []) {
  const studyVideos = videos.filter((video) => video?.category === "Study");
  if (!studyVideos.length) return [];

  const counts = new Map();
  for (const video of studyVideos) {
    const subject = classifySubject(video.title) || "Unclassified";
    counts.set(subject, (counts.get(subject) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percentage: Number(((count / studyVideos.length) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

module.exports = { classifySubject, buildSubjectDistribution };
