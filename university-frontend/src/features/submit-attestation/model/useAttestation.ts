import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useGame } from '../../../app/providers/with-game';
import { studentStorage } from '../../../entities/student/api/studentStorage';
import { GameService } from '../../../shared/api/generated/services/GameService';

export const useAttestation = (subjectId: string, subjectTitle: string) => {
  const { student, setStudent } = useGame();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState<any | null>(null);
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  if (!student) throw new Error('useAttestation must be used within a valid GameSession');

  const handleOpenAttestation = async () => {
    setIsLoading(true);
    try {
      const data = await GameService.getApiGameAttestationQuestion(student.id, subjectId);
      setQuestion(data);
      setIsOpen(true);
    } catch (err: any) {
      toast.error(err.body?.message || 'Не удалось загрузить вопросы аттестации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = async (index: number) => {
    if (isVerified || isLoading) return;
    
    setSelectedAnswer(index);
    setIsLoading(true);

    const oldMonthlyIncome = student.monthlyIncome || 0;

    try {
      const updatedStudent = await GameService.postApiGameSubmitAttestation({
        studentId: student.id,
        questionId: question.id,
        selectedOptionIndex: index
      });

      setIsSuccessfullySubmitted(true);
      
      setStudent(updatedStudent);
      studentStorage.saveLocalMarker(updatedStudent);

      const correctCheck = updatedStudent.monthlyIncome > oldMonthlyIncome;
      const diff = Math.abs(updatedStudent.monthlyIncome - oldMonthlyIncome).toFixed(2);

      if (correctCheck) {
        toast.success(`Отлично! Будущая стипендия увеличена на +${diff} BYN`);
      } else {
        toast.error(`Увы, ответ неверный. Будущая стипендия снижена на -${diff} BYN`);
      }
      setIsCorrect(correctCheck);
      setIsVerified(true);
    } catch (err) {
      toast.error('Ошибка отправки ответа на сервер');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAnswer(null);
    setIsVerified(false);
    setIsCorrect(null);
  };

  return {
    isLoading,
    isOpen,
    question,
    selectedAnswer,
    isVerified,
    isCorrect,
    isSuccessfullySubmitted,
    handleOpenAttestation,
    handleSelectAnswer,
    handleClose
  };
};
