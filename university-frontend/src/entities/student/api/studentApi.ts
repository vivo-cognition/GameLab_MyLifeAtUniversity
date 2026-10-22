import { GameService } from '../../../shared/api/generated/services/GameService';
import type { GameActionDto } from '../../../shared/api/generated/models/GameActionDto';
import type { Student, ScheduleDayResponse, SaveLookupItem } from '../model/types';

export const studentApi = {
  advanceDay: async (studentId: string): Promise<Student> => {
    return await GameService.postApiGameNextDay( studentId );
  },

  getScheduleDay: async (studentId: string, dayNumber: number): Promise<ScheduleDayResponse> => {
    return await GameService.getApiGameScheduleDay( studentId, dayNumber );
  },

  performAction: async (dto: GameActionDto): Promise<Student> => {
    return await GameService.postApiGameAction( dto );
  },

  getStudentById: async (studentId: string): Promise<Student> => {
    return await GameService.getApiGame( studentId );
  },

  getServerSaves: async (): Promise<SaveLookupItem[]> => {
    const serverSaves = await GameService.getApiGameSaves();
    if (!serverSaves) return [];
    
    return serverSaves.map((serverSave: any) => ({
      id: serverSave.id,
      name: serverSave.name,
      specialization: serverSave.specialization,
      intelligence: serverSave.intelligence,
      energy: serverSave.energy,
      currentDay: serverSave.currentDay,
      balance: serverSave.balance,
      isAutoSave: false,
      updatedAt: 'База данных PostgreSQL'
    }));
  },

  deleteServerSave: async (id: string): Promise<void> => {
    await GameService.deleteApiGame( id );
  },

  updateServerSave: async (id: string, data: { name: string; intelligence: number; balance: number }): Promise<Student> => {
    return await GameService.patchApiGame(
      id, 
      {
        name: data.name,
        intelligence: data.intelligence,
        balance: data.balance
      }
    ) as any;
  }
};
