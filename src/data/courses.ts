export interface Course {
  code: string;
  name: string;
  yearLevel: number;
  description: string;
  gradingFormula: {
    classStanding: {
      prelim: Array<{ name: string; percentage: number }>;
      midterm: Array<{ name: string; percentage: number }>;
      final: Array<{ name: string; percentage: number }>;
    };
    finalGrade: string;
  };
}

export const courses: Course[] = [
  {
    code: "CS 004",
    name: "Networks and Communications",
    yearLevel: 3,
    description: "Study of computer networks and communications",
    gradingFormula: {
      classStanding: {
        prelim: [
          { name: "Quizzes", percentage: 60 },
          { name: "Laboratory Activities", percentage: 20 },
          { name: "Assignment/Discussion/Seatwork", percentage: 20 },
        ],
        midterm: [
          { name: "Quizzes", percentage: 60 },
          { name: "Laboratory Activities", percentage: 20 },
          { name: "Assignment/Discussion/Seatwork", percentage: 20 },
        ],
        final: [
          { name: "Quizzes", percentage: 60 },
          { name: "Laboratory Activities", percentage: 20 },
          { name: "Assignment/Discussion/Seatwork", percentage: 20 },
        ],
      },
      finalGrade: "FG = 1/3(MG) + 2/3(50%FCS + 50%FME)",
    },
  },
  {
    code: "CS 300",
    name: "Automata Theory and Formal Languages",
    yearLevel: 3,
    description: "Study of theoretical computer science concepts",
    gradingFormula: {
      classStanding: {
        prelim: [
          { name: "Quiz", percentage: 60 },
          { name: "Activity Task / Laboratory Task", percentage: 30 },
          { name: "Discussion / Assignment", percentage: 10 },
        ],
        midterm: [
          { name: "Quiz", percentage: 60 },
          { name: "Project", percentage: 20 },
          { name: "Discussion / Assignment", percentage: 20 },
        ],
        final: [
          { name: "Quiz", percentage: 60 },
          { name: "Project/ Student Portfolio", percentage: 30 },
          { name: "Discussion / Reflection Paper", percentage: 10 },
        ],
      },
      finalGrade: "FG = {FCS (0.5) + FE (0.5)}2/3 + 1/3(MG)",
    },
  },
  {
    code: "SOCSC 005",
    name: "Life and Works of Rizal",
    yearLevel: 3,
    description: "Study of Jose Rizal's life, works and writings",
    gradingFormula: {
      classStanding: {
        prelim: [
          { name: "Quiz", percentage: 75 },
          { name: "Recitation", percentage: 25 },
        ],
        midterm: [
          { name: "Quiz", percentage: 75 },
          { name: "Recitation", percentage: 25 },
        ],
        final: [
          { name: "Quiz", percentage: 75 },
          { name: "Recitation", percentage: 10 },
          { name: "Seatwork", percentage: 15 },
        ],
      },
      finalGrade: "FG = {FCS (0.5) + FE (0.5)}2/3 + 1/3(MG)",
    },
  },
  {
    code: "MATH 009CS",
    name: "Probability and Statistics",
    yearLevel: 3,
    description: "Study of probability theory and statistical methods",
    gradingFormula: {
      classStanding: {
        prelim: [
          { name: "Quiz", percentage: 60 },
          { name: "MINITAB", percentage: 20 },
          { name: "Assessment Tasks", percentage: 20 },
        ],
        midterm: [
          { name: "Quiz", percentage: 60 },
          { name: "MINITAB", percentage: 20 },
          { name: "Assessment Tasks", percentage: 20 },
        ],
        final: [
          { name: "Quiz", percentage: 60 },
          { name: "MINITAB", percentage: 20 },
          { name: "Other Assessment Tasks", percentage: 20 },
        ],
      },
      finalGrade: "FG = {FCS (0.5) + FE (0.5)}2/3 + 1/3(MG)",
    },
  },
];

export const gradingScheme = [
  { min: 94, max: 100, grade: "1.00", rating: "Excellent" },
  { min: 88.5, max: 93.99, grade: "1.25", rating: "Superior" },
  { min: 83, max: 88.49, grade: "1.50", rating: "Meritorious" },
  { min: 77.5, max: 82.99, grade: "1.75", rating: "Very Good" },
  { min: 72, max: 77.49, grade: "2.00", rating: "Good" },
  { min: 65.5, max: 71.99, grade: "2.25", rating: "Very Satisfactory" },
  { min: 61, max: 65.49, grade: "2.50", rating: "Satisfactory" },
  { min: 55.5, max: 60.99, grade: "2.75", rating: "Fair" },
  { min: 50, max: 55.49, grade: "3.00", rating: "Passing" },
  { min: 0, max: 49.99, grade: "5.00", rating: "Failed" },
];

export const getGradeEquivalent = (percentage: number) => {
  const gradeEntry = gradingScheme.find(
    (entry) => percentage >= entry.min && percentage <= entry.max
  );
  return gradeEntry || { grade: "5.00", rating: "Failed" };
};