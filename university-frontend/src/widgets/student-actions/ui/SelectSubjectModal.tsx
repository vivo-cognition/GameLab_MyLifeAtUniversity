import React from 'react';

interface SelectSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'AttendClass' | 'SelfStudy' | null;
  todaySubjects: any[]; 
  semesterSubjects: any[];
  visitedTodayIds: string[];
  onSelect: (subjectId: string) => void;
  isLoading: boolean;
}

export const SelectSubjectModal = ({
  isOpen,
  onClose,
  actionType,
  todaySubjects,
  semesterSubjects,
  visitedTodayIds = [],
  onSelect,
  isLoading
}: SelectSubjectModalProps) => {
  if (!isOpen || !actionType) return null;

  const isAttend = actionType === 'AttendClass';
  const availableSubjects = isAttend ? todaySubjects : semesterSubjects;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full space-y-4 animate-fadeIn">
        <div>
          <h3 className="font-bold text-base text-slate-800">
            {isAttend ? 'Выберите пару для посещения' : 'Выберите предмет для изучения дома'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAttend 
              ? 'Доступны только предметы из расписания на сегодня' 
              : 'Дома можно изучать любую дисциплину семестра'}
          </p>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {availableSubjects.length === 0 ? (
            <p className="text-xs font-semibold text-slate-400 text-center py-4">Нет доступных предметов</p>
          ) : (
            availableSubjects.map((subject) => {
              const isAlreadyVisited = isAttend && visitedTodayIds.includes(subject.id);

              return (
                <button
                  key={subject.id}
                  type="button"
                  disabled={isAlreadyVisited || isLoading}
                  onClick={() => onSelect(subject.id)}
                  className={`w-full p-3.5 border rounded-2xl text-left text-sm font-bold transition-all flex items-center justify-between ${
                    isAlreadyVisited
                      ? 'bg-slate-50 border-slate-100 text-slate-400 line-through cursor-not-allowed'
                      : 'bg-slate-50 hover:bg-white border-slate-200/70 hover:border-teal-400 text-slate-700 active:scale-[0.99]'
                  }`}
                >
                  <span>{subject.title}</span>
                  {isAlreadyVisited && (
                    <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase tracking-wider">
                      Уже посещено
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
