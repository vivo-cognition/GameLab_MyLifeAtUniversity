import { useStartGame } from '../model/useStartGame';
import { type Student } from '../../../entities/student/model/types';

interface StartGameFormProps {
  onGameStarted: (studentData: Student) => void; 
}

export const StartGameForm = ({ onGameStarted }: StartGameFormProps) => {
  const {
    name,
    setName,
    specialization,
    setSpecialization,
    subjectsCount,
    setSubjectsCount,
    specializations,
    isLoading,
    isSpecsLoading,
    fieldErrors,
    startGame,
  } = useStartGame(onGameStarted);

  return (
    <div className="w-full max-w-md bg-slate-50 border border-slate-100 rounded-3xl shadow-[0_25px_60px_-15px_rgba(148,163,184,0.15)]">
      <form onSubmit={startGame} className="p-8 space-y-6">
        
        {/* Шапка формы */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            Моя Жизнь в Универе
          </h1>
          <p className="text-[10px] text-teal-600/80 font-bold tracking-widest uppercase">
            симуляция жизни студента
          </p>
        </div>

        {/* Поле: Имя студента */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="student-name" className="text-xs font-bold text-slate-500 tracking-wide">
            Имя студента
          </label>
          <div className="relative">
            <span className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${
              fieldErrors.name ? 'text-rose-400' : 'text-slate-400'
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              id="student-name"
              type="text" 
              placeholder="Введите имя..." 
              className={`w-full pl-11 pr-4 py-3 bg-white border text-slate-800 placeholder-slate-300 rounded-2xl font-medium text-sm focus:outline-none focus:ring-4 transition-all ${
                fieldErrors.name 
                  ? 'border-rose-300 bg-rose-50/20 focus:ring-rose-100/50' 
                  : 'border-slate-200/80 focus:border-teal-400 focus:ring-teal-50/50'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {fieldErrors.name && (
            <p className="text-rose-500 text-xs font-semibold pl-1">
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Поле: Направление обучения */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 tracking-wide">
            Направление обучения
          </label>
          
          <details className="dropdown w-full group">
            <summary className="w-full list-none flex items-center justify-between pl-11 pr-4 py-3 bg-white border border-slate-200/80 text-slate-700 rounded-2xl font-medium text-sm focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50/50 transition-all cursor-pointer relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v6a2 2 0 012-2m14-8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4" />
                </svg>
              </span>

              <span className="truncate">
                {isSpecsLoading 
                  ? 'Загрузка направлений...' 
                  : specialization || 'Выберите направление'}
              </span>
              
              <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>

            <ul className="dropdown-content menu p-2 mt-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white border border-slate-100 rounded-2xl w-full z-[100] space-y-0.5 animate-fadeIn">
              {isSpecsLoading ? (
                <li className="text-slate-400 px-3 py-2 text-sm">Загрузка...</li>
              ) : specializations.length === 0 ? (
                <li className="text-slate-400 px-3 py-2 text-sm">Нет доступных направлений</li>
              ) : (
                specializations.map((spec) => (
                  <li key={spec}>
                    <button
                      type="button"
                      onClick={(e) => {
                        setSpecialization(spec);
                        e.currentTarget.closest('details')?.removeAttribute('open');
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        specialization === spec
                          ? 'bg-teal-50 text-teal-600 font-semibold' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      {spec}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </details>
          {fieldErrors.specialization && (
            <p className="text-rose-500 text-xs font-semibold pl-1">
              {fieldErrors.specialization}
            </p>
          )}
        </div>

        {/* Поле: Слайдер предметов */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="subjects-count" className="text-xs font-bold text-slate-500 tracking-wide">
              Количество предметов
            </label>
            <span className="text-xs font-black text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
              {subjectsCount}
            </span>
          </div>
          
          <div className="pt-2">
            <input 
              id="subjects-count"
              type="range" 
              min="2" 
              max="7" 
              step="1"
              className="w-full h-1 bg-slate-200 rounded-full appearance-none cursor-pointer 
                         accent-teal-400 focus:outline-none
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-400" 
              value={subjectsCount}
              onChange={(e) => setSubjectsCount(Number(e.target.value))}
              disabled={isLoading}
            />
            
            {/* Сетка шагов */}
            <div className="w-full flex justify-between text-[11px] px-0.5 mt-2 font-bold text-slate-400 select-none">
              {[2, 3, 4, 5, 6, 7].map((num) => (
                <span key={num} className={subjectsCount === num ? "text-teal-500" : ""}>
                  {num}
                </span>
              ))}
            </div>
          </div>
          {fieldErrors.subjectsCount && (
            <p className="text-rose-500 text-xs font-semibold pl-1">
              {fieldErrors.subjectsCount}
            </p>
          )}
        </div>
        
        {/* Кнопка действия */}
        <div className="pt-2">
          <button 
            type="submit"
            disabled={isLoading || isSpecsLoading}
            className="w-full bg-gradient-to-r from-rose-200 via-teal-100 to-teal-200 hover:opacity-90 active:scale-[0.98] text-slate-800 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all shadow-[0_10px_25px_-5px_rgba(45,212,191,0.2)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs text-slate-800"></span>
                Создание персонажа...
              </>
            ) : (
              'Начать симуляцию'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
