import { useStudentStats } from '../model/useStudentStats';

export const StudentStatsWidget = () => {
  const { student } = useStudentStats();

  if (!student) {
    return (
      <div className="w-full max-w-sm bg-white border border-slate-100 rounded-3xl p-6 text-center text-sm text-slate-400 font-medium">
        Загрузка характеристик...
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(148,163,184,0.08)] space-y-6">
      
      {/* Профиль и Календарь */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="min-w-0 flex-1 pr-2">
          <h3 className="text-base font-bold text-slate-800 truncate">
            {student.name}
          </h3>
          <p className="text-xs font-medium text-slate-400 truncate">
            {student.specialization}
          </p>
        </div>
        
        {/* Календарь */}
        <div className="flex flex-col items-center bg-rose-50 border border-rose-100 rounded-2xl px-4 py-2 text-center min-w-[75px] shrink-0">
          <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider">День</span>
          <span className="text-2xl font-black text-rose-500 leading-tight">
            {student.currentDay}
          </span>
        </div>
      </div>

      {/* Энергия и Интеллект */}
      <div className="space-y-4">
        {/* Энергия */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Энергия
            </span>
            <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              {student.energy} / 100
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200/70 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-300 to-orange-300 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${Math.min(Math.max(student.energy, 0), 100)}%` }}
            />
          </div>
        </div>

        {/* Интеллект */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Интеллект
            </span>
            <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
              {student.intelligence}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200/70 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-300 to-emerald-300 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${Math.min(student.intelligence, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 grid grid-cols-12 gap-2 divide-x divide-slate-200/60">
        
        <div className="col-span-7 flex flex-col space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
            Баланс
          </span>
          <span className="text-lg font-black text-slate-800 tracking-tight truncate">
            {(student?.balance ?? 0).toLocaleString('ru-RU')} BYN
          </span>
        </div>
=
        <div className="col-span-5 flex flex-col space-y-1 pl-3 min-w-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1 truncate">
            Доход (мес.)
          </span>
          <span className="text-base font-bold text-emerald-500 tracking-tight truncate">
            {(student?.monthlyIncome ?? 0).toLocaleString('ru-RU')} BYN
          </span>
        </div>
        
      </div>

    </div>
  );
};
