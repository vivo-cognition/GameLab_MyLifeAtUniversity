import { type SaveLookupItem } from "../../../entities/student/model/types";

interface DeleteConfirmModalProps {
  save: SaveLookupItem;
  onClose: () => void;
  onConfirm: (save: SaveLookupItem) => Promise<void>;
}

export const DeleteConfirmModal = ({ save, onClose, onConfirm }: DeleteConfirmModalProps) => {
  return (
    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center rounded-3xl z-50 p-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl max-w-sm w-full text-center space-y-4">
        
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-base text-slate-800">Удалить сохранение?</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Вы уверены, что хотите удалить файл игрока <span className="font-bold text-slate-700">{save.name}</span>? Это действие необратимо.
          </p>
        </div>

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
            onClick={async () => {
              await onConfirm(save);
              onClose();
            }}
            className="flex-1 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-semibold hover:bg-rose-600 transition-colors shadow-md shadow-rose-500/10"
          >
            Да, удалить
          </button>
        </div>

      </div>
    </div>
  );
};
