import { useState } from "react";
import { type SaveLookupItem } from "../../../entities/student/model/types";

interface EditSaveModalProps {
  save: SaveLookupItem;
  onClose: () => void;
  onSave: (save: SaveLookupItem, data: { name: string; intelligence: number; balance: number }) => Promise<void>;
}

export const EditNameModal = ({ save, onClose, onSave }: EditSaveModalProps) => {
  // Автоподставляем текущие значения из сохранения в стейты инпутов
  const [name, setName] = useState(save.name);
  const [intelligence, setIntelligence] = useState(save.intelligence);
  const [balance, setBalance] = useState(save.balance);

  return (
    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center rounded-3xl z-50 p-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl max-w-sm w-full text-center space-y-4">
        
        <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-500 border border-teal-100 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-base text-slate-800">Редактирование сохранения</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Отредактируйте параметры персонажа:</p>
        </div>
        
        {/* Инпут для имени */}
        <div className="text-left space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Имя студента</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-teal-400 focus:bg-white transition-all text-slate-800 font-medium"
            placeholder="Имя студента..."
            maxLength={25}
            autoFocus
          />
        </div>

        {/* Сетка для числовых статов (Знания и Баланс) */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Знания (число)</label>
            <input 
              type="number" 
              value={intelligence}
              onChange={(e) => setIntelligence(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-teal-400 focus:bg-white transition-all text-slate-800 font-medium"
              min={0}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Баланс (BYN)</label>
            <input 
              type="number" 
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-teal-400 focus:bg-white transition-all text-slate-800 font-medium"
              min={0}
            />
          </div>
        </div>

        {/* Действия */}
        <div className="flex items-center gap-3 pt-2">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            Отмена
          </button>
          <button 
            type="button"
            disabled={!name.trim()}
            onClick={async () => {
              await onSave(save, { name, intelligence, balance });
              onClose();
            }}
            className="flex-1 py-2.5 bg-teal-500 text-white rounded-xl text-xs font-semibold hover:bg-teal-600 transition-colors shadow-md shadow-teal-500/10 disabled:opacity-50"
          >
            Сохранить
          </button>
        </div>
        
      </div>
    </div>
  );
};
