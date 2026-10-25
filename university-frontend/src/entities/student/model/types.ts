export interface SubjectResponse {
  id: string;
  title: string;
}

export interface PerformanceResponse {
  academicProgress: number;
  subject: SubjectResponse;
}

export interface ScheduleDayResponse {
  dayNumber: number;
  isAttestationDay: boolean;
  attestationSubjectId: string | null;
  attestationSubjectTitle: string | null; 
  subjects: SubjectResponse[];
}

export interface SaveLookupItem {
  id: string;
  name: string;
  specialization: string;
  intelligence: number;
  energy: number;
  currentDay: number;
  balance: number;
  isAutoSave: boolean;
  updatedAt: string;
}

export interface GameActionDto {
  studentId: string;
  actionType: 'AttendClass' | 'SelfStudy' | 'Rest' | 'SkipClass';
  subjectId?: string;
}

export interface AttestationQuestionResponse {
  id: string;
  text: string;
  options: string[];
}

export interface Student {
  id: string;
  name: string;
  specialization: string;
  intelligence: number;
  energy: number;
  currentDay: number;
  balance: number;
  monthlyIncome: number;
  subscriptions: PerformanceResponse[];
  activeSchedule: ScheduleDayResponse[];
  visitedSubjectIds: string[];
  passedAttestationSubjectIds: string[];
}
