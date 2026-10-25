import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../app/providers/with-game';
import { studentActions } from '../../entities/student/model/actions';
import { StudentStatsWidget } from '../../widgets/student-stats';
import { ScheduleDiaryWidget } from '../../widgets/shedule-diary';
import { StudentActionsWidget } from '../../widgets/student-actions';

export const GamePage = () => {
  const navigate = useNavigate();
  const { student, setStudent } = useGame();
  const [isInitializing, setIsInitializing] = useState(!student);

  useEffect(() => {
    if (student) {
      setIsInitializing(false);
      return;
    }

    const restoreSession = async () => {
      try {
        const saves = await studentActions.loadAllSaves();
        const activeSave = saves.find(s => s.isAutoSave) || saves[0];

        if (!activeSave) {
          navigate('/start');
          return;
        }
        const fullStudentData = await studentActions.fetchFullStudent(activeSave);
        setStudent(fullStudentData);
      } catch (err) {
        console.error('Не удалось восстановить сессию:', err);
        navigate('/');
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, [student, navigate, setStudent]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-teal-400"></span>
        <p className="text-sm font-semibold text-slate-400">Загрузка симуляции...</p>
      </div>
    );
  }

  if (!student) return null;

return (
  <div className="min-h-screen bg-slate-100/50 p-4 md:p-8 animate-fadeIn flex flex-col justify-start">
    
    <div className="w-full max-w-[95%] mx-auto mb-6 flex justify-between items-center px-2">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors bg-white px-4 py-2.5 rounded-2xl border border-slate-200/60 shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Выйти в меню
      </button>
      <span className="text-[10px] font-black tracking-widest text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full uppercase">
        Семестр 1
      </span>
    </div>

    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
      
      <div className="lg:col-span-3">
        <StudentStatsWidget />
      </div>

      <div className="lg:col-span-6">
        <StudentActionsWidget />
      </div>

      <div className="lg:col-span-3">
        <ScheduleDiaryWidget studentId={student.id} currentDay={student.currentDay} />
      </div>

    </div>
  </div>
);


};