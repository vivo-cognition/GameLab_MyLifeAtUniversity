import { useScheduleDiary } from '../model/useScheduleDiary';

interface ScheduleDiaryWidgetProps {
  studentId: string;
  currentDay: number;
}

export const ScheduleDiaryWidget = ({ studentId, currentDay }: ScheduleDiaryWidgetProps) => {
  const { schedule, isLoading, isAttestationDay } = useScheduleDiary(studentId, currentDay);

  return (
    <div className={`w-full max-w-md bg-white border rounded-3xl p-6 transition-all duration-300 ${
      isAttestationDay 
        ? 'border-rose-200 shadow-[0_20px_50px_-12px_rgba(244,63,94,0.08)] bg-rose-50/10' 
        : 'border-slate-100 shadow-[0_20px_50px_-12px_rgba(148,163,184,0.12)]'
    }`}>
      
      {/* Шапка Дневника */}
      <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4 mb-5">
        <div className="flex items-center gap-2">
          {/* Иконка раскрытой книги/дневника */}
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-sm font-bold text-slate-700 tracking-wide uppercase">
            Дневник расписания
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-400">
          День {currentDay}
        </span>
      </div>

      {/* Блок Аттестации (Варнинг) */}
      {isAttestationDay && (
        <div className="mb-5 flex items-center gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4 animate-pulse">
          <div className="p-2 bg-rose-100 rounded-xl text-rose-500 flex-shrink-0">
            {/* Иконка Восклицательного знака */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-700">Внимание: День аттестации!</h4>
            <p className="text-[11px] font-medium text-rose-500/90 mt-0.5">
              Сегодня контрольный день. Убедитесь, что у вас достаточно знаний!
            </p>
          </div>
        </div>
      )}

      {/* Список предметов */}
      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <span className="loading loading-spinner loading-md text-slate-300"></span>
          <p className="text-xs font-medium text-slate-400">Листаем страницы...</p>
        </div>
      ) : !schedule || schedule.subjects.length === 0 ? (
        /* Выходной день */
        <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-100 rounded-2xl">
          <p className="text-sm font-bold text-slate-400">Сегодня пар нет 🙌</p>
          <p className="text-xs text-slate-400/80 mt-1">Отличный повод отдохнуть или подработать!</p>
        </div>
      ) : (
        /* Список занятий */
        <div className="space-y-3">
          {schedule.subjects.map((subject, index) => (
            <div 
              key={subject.id} 
              className="flex items-center gap-4 bg-slate-50/60 hover:bg-slate-50 border border-slate-100/70 rounded-2xl p-4 transition-all duration-200 group"
            >
              {/* Номер пары */}
              <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 group-hover:border-teal-200 group-hover:text-teal-500 transition-colors flex-shrink-0">
                {index + 1}
              </div>

              {/* Название предмета */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors truncate">
                  {subject.title}
                </h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                  Учебное занятие
                </p>
              </div>

              {/* Декоративная стрелочка или индикатор */}
              <div className="text-slate-300 group-hover:text-slate-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
