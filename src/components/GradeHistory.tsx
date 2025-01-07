import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useGradeStore } from "@/store/gradeStore";
import { getGradeEquivalent } from "@/data/courses";

const GradeHistory = () => {
  const { toast } = useToast();
  const { history, clearHistory: clearHistoryStore } = useGradeStore();
  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({});

  const clearHistory = () => {
    clearHistoryStore();
    toast({
      title: "History cleared",
      description: "Your grade history has been cleared successfully.",
    });
  };

  const downloadHistory = () => {
    const content = history.map(record => {
      const status = record.finalGrade >= 50 ? "PASSED" : "FAILED";
      const equivalent = getGradeEquivalent(record.finalGrade);
      return `Course: ${record.courseCode}\nFinal Grade: ${record.finalGrade.toFixed(2)}%\nEquivalent Grade: ${equivalent.grade}\nStatus: ${status}\n` +
        `Details:\n- Midterm Grade: ${record.details?.midtermGrade || 'N/A'}%\n- Final Class Standing: ${record.details?.finalClassStanding || 'N/A'}%\n` +
        `- Final Exam: ${record.details?.finalExam || 'N/A'}%\nDate: ${record.timestamp}\n\n`;
    }).join('-------------------\n');

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grade-history.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "History downloaded",
      description: "Your grade history has been downloaded successfully.",
    });
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (history.length === 0) {
    return (
      <Card className="p-6 text-center dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-300">No grade history available.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Grade History</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadHistory}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={clearHistory}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Final Grade</TableHead>
              <TableHead>Equivalent Grade</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className="font-medium">{record.courseCode}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded ${
                        record.finalGrade >= 50
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {record.finalGrade.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell>{getGradeEquivalent(record.finalGrade).grade}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleItem(index)}
                      className="flex items-center gap-1"
                    >
                      {openItems[index] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      {openItems[index] ? "Hide" : "Show"}
                    </Button>
                  </TableCell>
                </TableRow>
                {openItems[index] && (
                  <TableRow>
                    <TableCell colSpan={4} className="bg-gray-50 dark:bg-gray-700">
                      <div className="p-4 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Midterm Grade:</span> {record.details?.midtermGrade || 'N/A'}%
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Final Class Standing:</span> {record.details?.finalClassStanding || 'N/A'}%
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Final Exam:</span> {record.details?.finalExam || 'N/A'}%
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default GradeHistory;