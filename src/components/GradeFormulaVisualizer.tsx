import React from "react";
import { Card } from "@/components/ui/card";
import { Course } from "@/data/courses";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeFormulaVisualizerProps {
  course: Course;
}

const GradeFormulaVisualizer = ({ course }: GradeFormulaVisualizerProps) => {
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Grade Calculation Breakdown</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Final Grade Formula:</h4>
          <p className="text-xs sm:text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded break-words text-gray-900 dark:text-gray-100">
            {course.gradingFormula.finalGrade}
          </p>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Class Standing Components:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Period</TableHead>
                  <TableHead className="whitespace-nowrap">Component</TableHead>
                  <TableHead className="whitespace-nowrap">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.gradingFormula.classStanding.final.map((component, index) => (
                  <TableRow key={`final-${index}`}>
                    {index === 0 && (
                      <TableCell className="whitespace-nowrap" rowSpan={course.gradingFormula.classStanding.final.length}>
                        Final
                      </TableCell>
                    )}
                    <TableCell className="whitespace-nowrap">{component.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{component.percentage}%</TableCell>
                  </TableRow>
                ))}
                {course.gradingFormula.classStanding.midterm.map((component, index) => (
                  <TableRow key={`midterm-${index}`}>
                    {index === 0 && (
                      <TableCell className="whitespace-nowrap" rowSpan={course.gradingFormula.classStanding.midterm.length}>
                        Midterm
                      </TableCell>
                    )}
                    <TableCell className="whitespace-nowrap">{component.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{component.percentage}%</TableCell>
                  </TableRow>
                ))}
                {course.gradingFormula.classStanding.prelim.map((component, index) => (
                  <TableRow key={`prelim-${index}`}>
                    {index === 0 && (
                      <TableCell className="whitespace-nowrap" rowSpan={course.gradingFormula.classStanding.prelim.length}>
                        Prelim
                      </TableCell>
                    )}
                    <TableCell className="whitespace-nowrap">{component.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{component.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GradeFormulaVisualizer;