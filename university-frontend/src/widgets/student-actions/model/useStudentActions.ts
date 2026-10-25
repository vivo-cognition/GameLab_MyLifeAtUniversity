import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useGame } from '../../../app/providers/with-game';
import { studentApi } from '../../../entities/student/api/studentApi';
import { studentStorage } from '../../../entities/student/api/studentStorage';
import { GameService } from '../../../shared/api/generated/services/GameService';

export const useStudentActions = (todaySubjects: any[]) => {
  const { student, setStudent } = useGame();
  const [isLoading, setIsLoading] = useState(false);
  const [semesterSubjects, setSemesterSubjects] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState<'AttendClass' | 'SelfStudy' | null>(null);

  if (!student) throw new Error('useStudentActions must be used within a valid GameSession');

  useEffect(() => {
    const fetchSemesterData = async () => {
      try {
        // ИСПРАВЛЕНО: Передаем id чистой строкой в аргумент, а не объектом { studentId: student.id }
        const semesterSchedule = await GameService.getApiGameScheduleSemester(student.id) as any[];
        const allSubjectsWithDupes = semesterSchedule.flatMap(day => day.subjects || []);
        const uniqueSubjects = Array.from(new Map(allSubjectsWithDupes.map(s => [s.id, s])).values());
        setSemesterSubjects(uniqueSubjects);
      } catch (err) {
        console.error('Не удалось загрузить расписание семестра:', err);
      }
    };
    fetchSemesterData();
  }, [student.id]);

  const syncStudentState = (updatedStudent: any) => {
    setStudent(updatedStudent);
    studentStorage.saveLocalMarker(updatedStudent);
  };

  const handleAction = async (actionType: string, successMessage: string, subjectId?: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updatedStudent = await studentApi.performAction({
        studentId: student.id,
        actionType: actionType as any,
        subjectId: subjectId || null
      } as any);
      
      syncStudentState(updatedStudent);
      toast.success(successMessage);
      closeModal();
    } catch (err: any) {
      toast.error(err.body?.message || 'Действие недоступно. Проверьте параметры или уровень энергии.');
    } finally {
      setIsLoading(false);
    }
  };

  const onActionClick = (actionType: string) => {
    if (isLoading) return;

    if (student.energy < 15 && actionType !== 'Rest') {
      toast.error('Вы слишком устали! Отдохните или перейдите на следующий день.');
      return;
    }

    if (actionType === 'AttendClass' || actionType === 'SelfStudy') {
      setModalActionType(actionType as any);
      setIsModalOpen(true);
    } else {
      handleAction(actionType, 'Вы успешно восстановили силы!');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalActionType(null);
  };

  const handleNextDay = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updatedData = await studentApi.advanceDay(student.id);
      syncStudentState(updatedData);
      toast.success(`Наступил день ${updatedData.currentDay}!`);
    } catch (err: any) {
      toast.error(err.body?.message || 'Не удалось продвинуться на следующий день');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    student,
    isLoading, 
    semesterSubjects,
    isModalOpen,
    modalActionType,
    onActionClick,
    closeModal,
    handleAction,
    handleNextDay
  };
};