import { useMainMenu } from '../model/useMainMenu';
import { SavesList } from '../../save-list';

const STYLES = {
  container: "w-full max-w-md bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-8 relative shadow-[0_25px_60px_-15px_rgba(148,163,184,0.15)]",
  headerIcon: "mx-auto w-12 h-12 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center shadow-sm text-teal-600",
  headerTitle: "text-xl font-bold tracking-tight text-slate-800 uppercase mt-3",
  headerSubtitle: "text-[10px] text-teal-600/80 font-bold tracking-widest uppercase",
  btnContainer: "flex flex-col gap-3.5",
  newGameBtn: "w-full py-3.5 px-5 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm rounded-2xl shadow-md shadow-teal-100/50 border-b-4 border-emerald-600/20 transition-all active:scale-[0.98] active:border-b-0 flex items-center justify-between group",
  secondaryBtn: "w-full py-3.5 px-5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100/50 font-bold text-sm rounded-2xl transition-all active:scale-[0.98] flex items-center justify-between group",
  exitBtn: "w-full py-3.5 px-5 bg-white border border-slate-200/60 text-slate-400 hover:text-rose-500 hover:bg-rose-50/30 hover:border-rose-100 font-bold text-sm rounded-2xl transition-all active:scale-[0.98] flex items-center justify-between group",
  modalOverlay: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4",
  modalBody: "w-full max-w-sm bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 space-y-4",
  modalInfoBox: "text-xs font-medium space-y-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100/80",
  modalCloseBtn: "w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
};

export const MainMenuCard = () => {
  const { 
    handleNewGame, 
    toggleAboutModal, 
    toggleSavesModal, 
    handleExit, 
    isAboutOpen, 
    isSavesOpen 
  } = useMainMenu();

  return (
    <div className={STYLES.container}>
      
      {/* Шапка меню */}
      <div className="text-center space-y-1.5">
        <div className={STYLES.headerIcon}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <h1 className={STYLES.headerTitle}>Моя Жизнь В Универе</h1>
        <p className={STYLES.headerSubtitle}>Симулятор Жизни Студента</p>
      </div>

      {/* Список кнопок */}
      <div className={STYLES.btnContainer}>
        
        <button onClick={handleNewGame} className={STYLES.newGameBtn}>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-teal-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Начать новую игру</span>
          </div>
          <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button onClick={toggleSavesModal} className={STYLES.secondaryBtn}>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
            <span>Загрузить сохранение</span>
          </div>
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button onClick={toggleAboutModal} className={STYLES.secondaryBtn}>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>О программе</span>
          </div>
        </button>

        <button onClick={handleExit} className={STYLES.exitBtn}>
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-slate-400 group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Выход (переход на сайт БрГТУ)</span>
          </div>
        </button>
      </div>

      {/* Модальное окно "О программе" */}
      {isAboutOpen && (
        <div className={STYLES.modalOverlay}>
          <div className={STYLES.modalBody}>
            <h3 className="font-bold text-lg text-slate-800 text-center">О программе</h3>
            
            <div className={STYLES.modalInfoBox}>
              <p><strong className="text-slate-800">Наименование:</strong> Игра Моя Жизнь в Универе</p>
              <p><strong className="text-slate-800">Локальный порт бэкенда:</strong> localhost:5218</p>
              <p><strong className="text-slate-800">Версия:</strong> MPV 1.0</p>
              <p><strong className="text-slate-800">Разработчик:</strong> Милищук Ольга ПО-16</p>
            </div>

            <div className="pt-2">
              <button onClick={toggleAboutModal} className={STYLES.modalCloseBtn}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Список сохранений */}
      <SavesList isOpen={isSavesOpen} onClose={toggleSavesModal} />
    </div>
  );
};
