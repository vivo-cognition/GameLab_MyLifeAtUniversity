import React from 'react';

interface AttestationModalProps {
  isOpen: boolean;
  question: any;
  subjectTitle: string;
  selectedAnswer: number | null;
  isVerified: boolean;
  isCorrect: boolean | null;
  isLoading: boolean;
  onSelectAnswer: (index: number) => void;
  onClose: () => void;
}

export const AttestationModal = ({
  isOpen, question, subjectTitle, selectedAnswer, isVerified, isCorrect, isLoading, onSelectAnswer, onClose
}: AttestationModalProps) => {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full space-y-5 animate-fadeIn">
        
        <div className="text-center border-b border-slate-100 pb-3">
          <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase tracking-wider">
            Экзаменационный бланк
          </span>
          <h3 className="font-bold text-base text-slate-800 mt-2 truncate">Аттестация: {subjectTitle}</h3>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
          <p className="text-sm font-semibold text-slate-700 leading-relaxed">{question.text}</p>
        </div>

        <div className="space-y-2">
          {question.options?.map((option: string, index: number) => {
            const isCurrentSelected = selectedAnswer === index;
            let btnStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-700";
            let badgeStyle = "bg-slate-50 text-slate-400 border-slate-200";

            if (isVerified) {
              if (isCurrentSelected) {
                btnStyle = isCorrect 
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                  : "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/10";
                badgeStyle = "bg-white/20 text-white border-white/20";
              } else {
                btnStyle = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60 cursor-not-allowed";
                badgeStyle = "bg-slate-100 text-slate-300 border-slate-200";
              }
            } else if (isCurrentSelected) {
              btnStyle = "bg-teal-400 border-teal-400 text-white";
              badgeStyle = "bg-white/20 text-white border-white/20";
            }

            return (
              <button
                key={index}
                type="button"
                disabled={isVerified || isLoading}
                onClick={() => onSelectAnswer(index)}
                className={`w-full p-3.5 border rounded-2xl text-left text-xs font-bold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 border ${badgeStyle}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="truncate">{option}</span>
                </div>
                {isVerified && isCurrentSelected && (
                  <span className="text-white text-xs">{isCorrect ? '✓' : '✕'}</span>
                )}
              </button>
            );
          })}
        </div>

        {isVerified && (
          <div className="text-center animate-fadeIn">
            {isCorrect ? (
              <p className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">ПРАВИЛЬНО! Стипендия увеличилась!</p>
            ) : (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 p-2.5 rounded-xl">ОТВЕТ НЕВЕРНЫЙ! Стипендия уменьшилась!</p>
            )}
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            disabled={!isVerified}
            onClick={onClose}
            className={`w-full py-3.5 font-black rounded-xl text-xs tracking-widest uppercase transition-all flex items-center justify-center ${
              isVerified ? 'bg-slate-700 hover:bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/40'
            }`}
          >
            {isLoading ? 'Проверка...' : isVerified ? 'Закончить аттестацию' : 'Выберите вариант ответа'}
          </button>
        </div>
      </div>
    </div>
  );
};
