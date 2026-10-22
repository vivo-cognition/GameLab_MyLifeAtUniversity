import type { SaveLookupItem } from '../model/types';

export const studentStorage = {
  loadLocalSave: (): SaveLookupItem | null => {
    const localSaveData = localStorage.getItem('university_game_autosave');
    if (!localSaveData) return null;
    
    const parsed = JSON.parse(localSaveData);
    return {
      id: parsed.id,
      name: parsed.name,
      specialization: parsed.specialization,
      intelligence: parsed.intelligence,
      energy: parsed.energy,
      currentDay: parsed.currentDay,
      balance: parsed.balance,
      isAutoSave: true,
      updatedAt: parsed.savedAt || 'Локальный кэш сессии'
    };
  },

  saveLocalMarker: (student: any): void => {
    localStorage.setItem('university_game_autosave', JSON.stringify({
      id: student.id,
      name: student.name,
      specialization: student.specialization,
      intelligence: student.intelligence,
      energy: student.energy,
      currentDay: student.currentDay,
      balance: student.balance,
      savedAt: new Date().toLocaleString()
    }));
  },

  deleteLocalSave: (): void => {
    localStorage.removeItem('university_game_autosave');
  },
};
