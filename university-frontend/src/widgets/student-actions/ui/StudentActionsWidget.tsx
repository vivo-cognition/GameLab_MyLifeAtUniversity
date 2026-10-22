import { useGame } from '../../../app/providers/with-game';
import { useStudentActions } from '../model/useStudentActions';
import { ACTION_BUTTONS } from './config';
import { SelectSubjectModal } from './SelectSubjectModal';

export const StudentActionsWidget = () => {
  const { student } = useGame();
  
  const todaySubjects = student?.activeSchedule?.find((d: any) => d.dayNumber === student.currentDay)?.subjects || [];
  const visitedTodayIds = (student as any).visitedSubjectIds || [];

  const {
    isLoading,
    semesterSubjects,
    isModalOpen,
    modalActionType,
    onActionClick,
    closeModal,
    handleAction,
    handleNextDay
  } = useStudentActions(todaySubjects);

  return (
    <div className="w-full space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-base font-black text-slate-700 tracking-wide uppercase">
          Что делаем сегодня?
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Выбери действие для распределения ресурсов семестра</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACTION_BUTTONS.map((button) => (
          <button
            key={button.type}
            type="button"
            disabled={isLoading}
            onClick={() => onActionClick(button.type)}
            className={`flex items-start gap-4 p-5 border rounded-3xl text-left transition-all duration-200 group active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${button.bgClass} ${button.borderClass}`}
          >
            <div className={`p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform ${button.textClass}`}>
              {button.icon}
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-700 group-hover:text-slate-900 transition-colors">
                {button.title}
              </h3>
              <p className="text-[11px] font-semibold text-slate-400 mt-1">
                {button.description}
              </p>
              
              <div className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${button.isEnergyPositive ? 'text-emerald-500' : 'text-amber-500'}`}>
                <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Энергия: {button.energyValue}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleNextDay}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-slate-500 hover:bg-slate-600 text-white font-black rounded-3xl text-xs tracking-widest uppercase transition-all shadow-[0_8px_20px_-4px_rgba(148,163,184,0.3)] active:scale-[0.99] disabled:opacity-40 flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-xs text-white"></span>
              Смена даты...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-slate-200 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Зафиксировать результаты и уснуть
            </>
          )}
        </button>
      </div>

      <SelectSubjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        actionType={modalActionType}
        todaySubjects={todaySubjects}
        semesterSubjects={semesterSubjects}
        visitedTodayIds={visitedTodayIds}
        isLoading={isLoading}
        onSelect={(subjectId) => {
          const successMsg = modalActionType === 'AttendClass'
            ? 'Вы успешно посетили пару и зафиксировали новые знания!'
            : 'Вы отлично поучились дома самостоятельно!';
          
          handleAction(modalActionType!, successMsg, subjectId);
        }}
      />
    </div>
  );
};
