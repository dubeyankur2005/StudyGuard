const test = require("node:test");
const assert = require("node:assert/strict");
const { classifySubject, buildSubjectDistribution } = require("../src/utils/subjectAnalytics");

test("classifies JavaScript before Java and avoids abbreviation substring matches", () => {
  assert.equal(classifySubject("JavaScript crash course"), "JavaScript");
  assert.equal(classifySubject("Learn Java from scratch"), "Java");
  assert.equal(classifySubject("A mathematics lesson"), null);
});

test("uses all study videos as denominator and marks unmatched titles", () => {
  const distribution = buildSubjectDistribution([
    { category: "Study", title: "React tutorial" },
    { category: "Study", title: "React hooks" },
    { category: "Study", title: "A lecture without a known keyword" },
    { category: "Entertainment", title: "JavaScript" },
  ]);
  assert.deepEqual(distribution, [
    { name: "React", count: 2, percentage: 66.67 },
    { name: "Unclassified", count: 1, percentage: 33.33 },
  ]);
});

test("returns an empty distribution when there are no study records", () => {
  assert.deepEqual(buildSubjectDistribution([]), []);
  assert.deepEqual(buildSubjectDistribution([{ category: "Entertainment", title: "Python" }]), []);
});
