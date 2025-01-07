import { create } from 'zustand';

interface GradeRecord {
  courseCode: string;
  finalGrade: number;
  details?: {
    midtermGrade: string;
    finalClassStanding: string;
    finalExam: string;
  };
  timestamp: string;
}

interface GradeStore {
  history: GradeRecord[];
  addGrade: (record: GradeRecord) => void;
  clearHistory: () => void;
}

export const useGradeStore = create<GradeStore>((set) => ({
  history: (() => {
    try {
      const saved = localStorage.getItem("gradeHistory");
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      return parsed.map((record: any) => ({
        courseCode: record.courseCode || 'Unknown',
        finalGrade: record.finalGrade || 0,
        details: record.details || {
          midtermGrade: 'N/A',
          finalClassStanding: 'N/A',
          finalExam: 'N/A'
        },
        timestamp: record.timestamp || new Date().toLocaleString()
      }));
    } catch (error) {
      console.error('Error loading grade history:', error);
      return [];
    }
  })(),
  addGrade: (record) => 
    set((state) => {
      const newHistory = [record, ...state.history];
      localStorage.setItem("gradeHistory", JSON.stringify(newHistory));
      return { history: newHistory };
    }),
  clearHistory: () => {
    localStorage.removeItem("gradeHistory");
    set({ history: [] });
  },
}));