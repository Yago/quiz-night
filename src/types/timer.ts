export interface Timer {
  isQuestion: boolean;
  currentQuestion: number;
  currentBreak: number;
  timer: string;
  duration: number;
  // timer2:
  isCompleted: boolean;
}
