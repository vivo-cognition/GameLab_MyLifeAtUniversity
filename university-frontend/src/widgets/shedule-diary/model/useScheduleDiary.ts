import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { studentApi } from '../../../entities/student/api/studentApi';
import { type ScheduleDayResponse } from '../../../entities/student/model/types';

export const useScheduleDiary = (studentId: string, currentDay: number) => {
  const [schedule, setSchedule] = useState<ScheduleDayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDaySchedule = async () => {
      setIsLoading(true);
      try {
        const data = await studentApi.getScheduleDay(studentId, currentDay);
        setSchedule(data);
      } catch (err: any) {
        toast.error(err.body?.message || 'Не удалось загрузить расписание на сегодня');
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) {
      fetchDaySchedule();
    }
  }, [studentId, currentDay]);

  return {
    schedule,
    isLoading,
    isAttestationDay: schedule?.isAttestationDay ?? false,
  };
};
