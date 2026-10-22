import { studentApi } from '../api/studentApi';
import { studentStorage } from '../api/studentStorage';
import type { SaveLookupItem, Student } from './types';

export const studentActions = {
  loadAllSaves: async (): Promise<SaveLookupItem[]> => {
    const combinedSaves: SaveLookupItem[] = [];

    const localSave = studentStorage.loadLocalSave();
    if (localSave) {
      combinedSaves.push(localSave);
    }
    try {
      const serverSaves = await studentApi.getServerSaves();
      if (serverSaves.length > 0) {
        combinedSaves.push(...serverSaves);
      }
    } catch (err) {
      console.error('Ошибка при запросе серверных сейвов:', err);
    }

    return combinedSaves;
  },

  deleteSave: async (save: SaveLookupItem): Promise<void> => {
    if (save.isAutoSave) {
      studentStorage.deleteLocalSave();
    } else {
      await studentApi.deleteServerSave(save.id);
    }
  },

  updateSave: async (id: string, isAutoSave: boolean, data: { name: string; intelligence: number; balance: number }): Promise<void> => {
    if (!isAutoSave) {
      await studentApi.updateServerSave(id, data);
    }
  },

  fetchFullStudent: async (save: SaveLookupItem): Promise<Student> => {
    try {
      return await studentApi.getStudentById(save.id);
    } catch (error) {
      console.error('Не удалось загрузить студента с бэкенда, откат на базовую структуру', error);
      return {
        id: save.id,
        name: save.name,
        specialization: save.specialization,
        intelligence: save.intelligence,
        energy: save.energy,
        currentDay: save.currentDay,
        balance: save.balance,
        monthlyIncome: 150,
        subscriptions: [],
        activeSchedule: []
      } as Student;
    }
  }
};
