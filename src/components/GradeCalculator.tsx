import React, { useState } from "react";
import { courses, getGradeEquivalent } from "@/data/courses";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GradeFormulaVisualizer from "./GradeFormulaVisualizer";
import GradingSchemeTable from "./GradingSchemeTable";
import GradeInputForm from "./GradeInputForm";
import GradeHistory from "./GradeHistory";
import { useGradeStore } from "@/store/gradeStore";

const GradeCalculator = () => {
  const [yearLevel, setYearLevel] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [finalGrade, setFinalGrade] = useState<number | null>(null);
  const { addGrade } = useGradeStore();

  const yearLevels = ["1st", "2nd", "3rd", "4th"];
  const filteredCourses = courses.filter(
    (course) => course.yearLevel === Number(yearLevel.charAt(0))
  );

  const selectedCourseData = courses.find(course => course.code === selectedCourse);

  const handleCalculate = (grade: number, details: { midtermGrade: string, finalClassStanding: string, finalExam: string }) => {
    setFinalGrade(grade);
    
    // Add to history using the store
    addGrade({
      courseCode: selectedCourse,
      finalGrade: grade,
      details: {
        midtermGrade: details.midtermGrade,
        finalClassStanding: details.finalClassStanding,
        finalExam: details.finalExam
      },
      timestamp: new Date().toLocaleString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-4 sm:p-6 space-y-4 sm:space-y-6 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <Label className="dark:text-gray-200">Year Level</Label>
              <Select
                value={yearLevel}
                onValueChange={(value) => {
                  setYearLevel(value);
                  setSelectedCourse("");
                }}
              >
                <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-200">
                  <SelectValue placeholder="Select year level" />
                </SelectTrigger>
                <SelectContent>
                  {yearLevels.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year} Year
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {yearLevel && (
              <div>
                <Label className="dark:text-gray-200">Course</Label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger className="w-full dark:bg-gray-700 dark:text-gray-200">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCourses.map((course) => (
                      <SelectItem key={course.code} value={course.code}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedCourse && (
              <>
                <GradeInputForm onCalculate={handleCalculate} />

                {finalGrade !== null && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Results</h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Final Grade: {finalGrade.toFixed(2)}%
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Equivalent: {getGradeEquivalent(finalGrade).grade} ({getGradeEquivalent(finalGrade).rating})
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>

        {selectedCourseData && (
          <Card className="p-4 sm:p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Grade Formula</h2>
            <div className="text-gray-700 dark:text-gray-300">
              <GradeFormulaVisualizer course={selectedCourseData} />
            </div>
          </Card>
        )}

        <GradeHistory />

        <Card className="p-4 sm:p-6 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Grading Scheme</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <GradingSchemeTable />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GradeCalculator;
