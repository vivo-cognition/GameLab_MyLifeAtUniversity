import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { studentApi } from '../../../entities/student/api/studentApi';
import { type ScheduleDayResponse } from '../../../entities/student/model/types';

export const useScheduleDiary = (studentId: string, currentDay: number) => {
  const [schedule, setSchedule] = useState<ScheduleDayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDaySchedule = async () => {
      if (!studentId) return;
      setIsLoading(true);
      try {
        const data = await studentApi.getScheduleDay(studentId, currentDay);
        const cleanData = Array.isArray(data) ? data[0] : data;
        setSchedule(cleanData);
      } catch (err: any) {
        console.error('Ошибка в дневнике расписания:', err);
        toast.error('Не удалось загрузить расписание на сегодня');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDaySchedule();
  }, [studentId, currentDay]);

  return {
    schedule,
    isLoading,
    isAttestationDay: schedule?.isAttestationDay ?? false,
  };
};
