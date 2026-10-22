import { useState } from "react";
import { useSaveList } from "../model/useSaveList";
import { StudentCard } from "../../../entities/student/ui/student-card";
import type { SaveLookupItem } from "../../../entities/student/model/types";
import { EditNameModal } from "./EditNameModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";


const classes = {
  overlay: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4",
  modal: "w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 space-y-6 flex flex-col max-h-[85vh] relative",
  header: "flex items-center justify-between pb-2 border-b border-slate-100",
  title: "font-bold text-lg text-slate-800",
  subtitle: "text-xs text-slate-400 font-medium",
  closeBtn: "p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  container: "overflow-y-auto space-y-3 pr-1 flex-1",
  statusText: "text-center py-8 text-sm font-semibold text-slate-400",
  cardContainer: "w-full text-left p-4 bg-slate-50 border border-slate-200/60 rounded-2xl hover:border-teal-300 hover:bg-white transition-all duration-200 cursor-pointer flex flex-col gap-4 group",
  cardDisabled: "opacity-60 cursor-not-allowed pointer-events-none",
  badgeAuto: "text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md uppercase tracking-wider",
  badgeManual: "text-[10px] font-black text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md uppercase tracking-wider",
  rightSection: "flex items-center bg-white p-3 rounded-xl border border-slate-200/40 w-full justify-between gap-4",
  statItem: "text-center shrink-0",
  statLabel: "text-[10px] font-bold text-slate-400 uppercase tracking-wide",
  statTeal: "text-sm font-black text-teal-600",
  statAmber: "text-sm font-black text-amber-500",
  editBtn: "p-2 text-slate-400 hover:text-teal-500 hover:bg-teal-50 rounded-xl transition-colors shrink-0 disabled:opacity-50",
  deleteBtn: "p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0 disabled:opacity-50",
  arrowIcon: "text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all block pl-2"
};

interface SavesListProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavesList = ({ isOpen, onClose }: SavesListProps) => {
  const { saves, isLoading, handleSelectSave, handleDeleteSave, handleUpdateSave } = useSaveList(onClose);
  
  const [saveToDelete, setSaveToDelete] = useState<SaveLookupItem | null>(null);
  const [saveToEdit, setSaveToEdit] = useState<SaveLookupItem | null>(null);

  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        
        {/* Шапка модального окна */}
        <div className={classes.header}>
          <div>
            <h3 className={classes.title}>Загрузка игры</h3>
            <p className={classes.subtitle}>Выберите точку сохранения семестра</p>
          </div>
          <button onClick={onClose} disabled={isLoading} className={classes.closeBtn}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Списочная часть сохранений */}
        <div className={classes.container}>
          {isLoading && saves.length === 0 ? (
            <div className={classes.statusText}>Загрузка списка файлов...</div>
          ) : saves.length === 0 ? (
            <div className={classes.statusText}>Сохранения не найдены</div>
          ) : (
            saves.map((save) => (
              <div
                key={save.id}
                role="button"
                tabIndex={isLoading ? -1 : 0}
                onClick={() => !isLoading && handleSelectSave(save)}
                onKeyDown={(e) => {
                  if (isLoading) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectSave(save);
                  }
                }}
                className={`${classes.cardContainer} ${isLoading ? classes.cardDisabled : ""}`}
              >
                {/* ВЕРХНЯЯ СТРОКА: Карточка студента и тип сохранения */}
                <div className="flex items-center justify-between gap-4 w-full">
                  <StudentCard 
                    student={{
                      name: save.name,
                      specialization: save.specialization,
                      currentDay: save.currentDay,
                      balance: save.balance
                    }} 
                    className="p-0 border-none bg-transparent shadow-none w-full min-w-0"
                  />
                  
                  <div className="shrink-0 pl-2">
                    <span className={save.isAutoSave ? classes.badgeAuto : classes.badgeManual}>
                      {save.isAutoSave ? 'Сохранено на сайте' : 'Сохранено на сервере'}
                    </span>
                  </div>
                </div>

                {/* НИЖНЯЯ СТРОКА*/}
                <div className={classes.rightSection}>
                  
                  {/* Левая сторона нижней строки: Знания и Энергия */}
                  <div className="flex items-center gap-6">
                    <div className={classes.statItem}>
                      <p className={classes.statLabel}>Знания</p>
                      <p className={classes.statTeal}>{save.intelligence}</p>
                    </div>

                    <div className={classes.statItem}>
                      <p className={classes.statLabel}>Энергия</p>
                      <p className={classes.statAmber}>{save.energy}%</p>
                    </div>
                  </div>

                  {/* Правая сторона нижней строки: Линия-разделитель и Кнопки управления */}
                  <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    {/* Кнопка Редактирования */}
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSaveToEdit(save);
                      }}
                      className={classes.editBtn}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>

                    {/* Кнопка Удаления */}
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSaveToDelete(save);
                      }}
                      className={classes.deleteBtn}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    {/* Стрелочка перехода */}
                    <div className={classes.arrowIcon}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

        {/* Подключение вынесенных модальных окон */}
        {saveToEdit && (
          <EditNameModal 
            save={saveToEdit} 
            onClose={() => setSaveToEdit(null)} 
            onSave={handleUpdateSave} 
          />
        )}

        {saveToDelete && (
          <DeleteConfirmModal 
            save={saveToDelete} 
            onClose={() => setSaveToDelete(null)} 
            onConfirm={handleDeleteSave} 
          />
        )}

      </div>
    </div>
  );
};
