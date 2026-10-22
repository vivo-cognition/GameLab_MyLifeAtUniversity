import type { Student } from '../model/types';

interface StudentCardProps {
  student: Partial<Student>;
  className?: string;
}

export const StudentCard = ({ student, className = '' }: StudentCardProps) => {
  const colors = [
    'bg-teal-50 text-teal-600 border-teal-100',
    'bg-rose-50 text-rose-600 border-rose-100',
    'bg-amber-50 text-amber-600 border-amber-100',
    'bg-indigo-50 text-indigo-600 border-indigo-100'
  ];
  const charCode = student.name ? student.name.charCodeAt(0) : 0;
  const avatarStyle = colors[charCode % colors.length];

  return (
    <div className={`flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm ${className}`}>
      {/* Аватарка */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold uppercase text-sm shrink-0 border ${avatarStyle}`}>
        {student.name ? student.name.substring(0, 2) : 'ST'}
      </div>
      
      <div className="space-y-0.5 min-w-0 flex-1">
        <h4 className="font-bold text-slate-800 text-sm truncate">{student.name}</h4>
        <p className="text-xs text-slate-400 font-medium truncate">{student.specialization}</p>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            День {student.currentDay ?? 1}
          </span>
          <span className="w-1 h-1 bg-slate-300 rounded-full shrink-0"></span>
          <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100 truncate">
            {student.balance ?? 0} BYN
          </span>
        </div>
      </div>
    </div>
  );
};
