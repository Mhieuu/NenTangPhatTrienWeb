const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function classify(score) {
  if (score >= 8) return "Giỏi";
  if (score >= 6.5) return "Khá";
  if (score >= 5) return "Trung bình";
  return "Yếu";
}

let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;
const counts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
const byGender = { M: { total: 0, count: 0 }, F: { total: 0, count: 0 } };

let highest = null;
let lowest = null;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let index = 0; index < students.length; index++) {
  const student = students[index];
  const average = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
  const rank = classify(average);

  totalMath += student.math;
  totalPhysics += student.physics;
  totalCs += student.cs;
  counts[rank] += 1;
  byGender[student.gender].total += average;
  byGender[student.gender].count += 1;

  if (!highest || average > highest.average) highest = { ...student, average };
  if (!lowest || average < lowest.average) lowest = { ...student, average };

  console.log(`| ${index + 1}   | ${student.name.padEnd(6)} | ${average.toFixed(1)} | ${rank.padEnd(11)} |`);
}

console.log("Counts:", counts);
console.log("Highest:", highest.name, highest.average.toFixed(1));
console.log("Lowest:", lowest.name, lowest.average.toFixed(1));
console.log("Class average math:", (totalMath / students.length).toFixed(2));
console.log("Class average physics:", (totalPhysics / students.length).toFixed(2));
console.log("Class average cs:", (totalCs / students.length).toFixed(2));
console.log("Average by gender:", {
  M: (byGender.M.total / byGender.M.count).toFixed(2),
  F: (byGender.F.total / byGender.F.count).toFixed(2),
});
