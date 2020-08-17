export interface Session {
  endDate: number;
  id: string;
  isPlaying: boolean;
  isStarted: boolean;
  pauseDate: number;
  quiz: string;
}

export interface CurrentSession {
  session: string;
  quiz: string;
}
