import { useGame } from '../../../app/providers/with-game';
import { useScheduleDiary } from '../model/useScheduleDiary';
import { AttestationButton } from '../../../features/submit-attestation';

interface ScheduleDiaryWidgetProps {
  studentId: string;
  currentDay: number;
}

export const ScheduleDiaryWidget = ({ studentId, currentDay }: ScheduleDiaryWidgetProps) => {
  const { student } = useGame();
  const { schedule, isLoading, isAttestationDay } = useScheduleDiary(studentId, currentDay);

  if (!student || !studentId) {
    return (
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 min-h-[300px]">
        <span className="loading loading-spinner loading-md text-slate-300"></span>
        <p className="text-xs font-medium text-slate-400">Инициализация дневника семестра...</p>
      </div>
    );
  }

  const attestationSubjectId = (schedule as any)?.attestationSubjectId;

  return (
    <div className={`w-full bg-white border rounded-3xl p-6 transition-all duration-300 ${
      isAttestationDay 
        ? 'border-rose-200 shadow-[0_20px_50px_-12px_rgba(244,63,94,0.08)] bg-rose-50/10' 
        : 'border-slate-100 shadow-[0_20px_50px_-12px_rgba(148,163,184,0.12)]'
    }`}>
      
      <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4 mb-5">
        <div className="flex items-center gap-2">
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

      {isAttestationDay && (
        <div className="mb-5 flex items-center gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <div className="p-2 bg-rose-100 rounded-xl text-rose-500 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-rose-700">Внимание: День аттестации!</h4>
            <p className="text-[11px] font-medium text-rose-500/90 mt-0.5 leading-relaxed break-words">
              Сегодня экзамен по предмету: <span className="font-black text-rose-700">{schedule?.attestationSubjectTitle || 'Загрузка...'}</span>
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <span className="loading loading-spinner loading-md text-slate-300"></span>
          <p className="text-xs font-medium text-slate-400">Листаем страницы...</p>
        </div>
      ) : !schedule || schedule.subjects.length === 0 ? (
        <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-100 rounded-2xl">
          <p className="text-sm font-bold text-slate-400">Сегодня пар нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {schedule.subjects.map((subject, index) => {
            const isThisSubjectAttestation = isAttestationDay && attestationSubjectId === subject.id;
            const isAlreadyPassed = student?.passedAttestationSubjectIds?.includes(subject.id);

            return (
              <div 
                key={`${subject.id}-${index}`}
                className={`flex items-center justify-between gap-3 border rounded-2xl p-4 transition-all duration-200 group ${
                  isThisSubjectAttestation 
                    ? 'bg-rose-50/40 border-rose-100/70 hover:bg-rose-50/60 shadow-xs' 
                    : 'bg-slate-50/60 hover:bg-slate-50 border-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`w-7 h-7 rounded-xl bg-white border flex items-center justify-center text-xs font-black transition-colors shrink-0 ${
                    isThisSubjectAttestation 
                      ? 'text-rose-400 border-rose-200 group-hover:text-rose-500 group-hover:border-rose-300' 
                      : 'text-slate-400 border-slate-200 group-hover:text-teal-500 group-hover:border-teal-200'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className={`text-sm font-bold transition-colors truncate ${
                      isThisSubjectAttestation ? 'text-rose-800 group-hover:text-rose-900' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {subject.title}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {isThisSubjectAttestation ? 'Экзаменационная сессия' : 'Учебное занятие'}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-1">
                  {isThisSubjectAttestation ? (
                    <AttestationButton subjectId={subject.id} subjectTitle={subject.title} />
                  ) : isAlreadyPassed ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-wide">
                      Сдано ✓
                    </span>
                  ) : (
                    <div className="text-slate-300 group-hover:text-slate-400 transition-colors pr-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
