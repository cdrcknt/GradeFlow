import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GradeInputFormProps {
  onCalculate: (finalGrade: number, details: { midtermGrade: string, finalClassStanding: string, finalExam: string }) => void;
}

const GradeInputForm = ({ onCalculate }: GradeInputFormProps) => {
  const [midtermGrade, setMidtermGrade] = useState("");
  const [finalClassStanding, setFinalClassStanding] = useState("");
  const [finalExam, setFinalExam] = useState("");

  const calculateFinalGrade = () => {
    const mg = parseFloat(midtermGrade);
    const fcs = parseFloat(finalClassStanding);
    const fe = parseFloat(finalExam);

    if (isNaN(mg) || isNaN(fcs) || isNaN(fe)) {
      return;
    }

    const fg = (1/3) * mg + (2/3) * (0.5 * fcs + 0.5 * fe);
    onCalculate(fg, {
      midtermGrade,
      finalClassStanding,
      finalExam
    });
  };

  const handleClear = () => {
    setMidtermGrade("");
    setFinalClassStanding("");
    setFinalExam("");
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Midterm Grade (%)</Label>
        <Input
          type="number"
          value={midtermGrade}
          onChange={(e) => setMidtermGrade(e.target.value)}
          placeholder="Enter your midterm grade"
          min="0"
          max="100"
        />
      </div>

      <div>
        <Label>Final Class Standing (%)</Label>
        <Input
          type="number"
          value={finalClassStanding}
          onChange={(e) => setFinalClassStanding(e.target.value)}
          placeholder="Enter your final class standing"
          min="0"
          max="100"
        />
      </div>

      <div>
        <Label>Final Exam (%)</Label>
        <Input
          type="number"
          value={finalExam}
          onChange={(e) => setFinalExam(e.target.value)}
          placeholder="Enter your final exam grade"
          min="0"
          max="100"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={calculateFinalGrade}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          Calculate Final Grade
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="w-24"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default GradeInputForm;