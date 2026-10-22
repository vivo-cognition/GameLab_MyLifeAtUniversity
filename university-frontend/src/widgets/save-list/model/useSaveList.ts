import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../../app/providers/with-game';
import { studentActions } from '../../../entities/student/model/actions';
import type { SaveLookupItem } from '../../../entities/student/model/types';
import { toast } from 'react-hot-toast';

export const useSaveList = (onClose: () => void) => {
  const navigate = useNavigate();
  const { setStudent } = useGame();
  const [saves, setSaves] = useState<SaveLookupItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSaves = async () => {
      setIsLoading(true);
      try {
        const data = await studentActions.loadAllSaves();
        setSaves(data);
      } catch (err) {
        console.error('Ошибка при получении списка сохранений:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaves();
  }, []);

  const handleSelectSave = async (save: SaveLookupItem) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fullStudent = await studentActions.fetchFullStudent(save);
      setStudent(fullStudent);
      onClose();
      navigate('/game');
    } catch (err) {
      console.error('Ошибка при загрузке сохранения:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSave = async (save: SaveLookupItem) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await studentActions.deleteSave(save);
      setSaves((prevSaves) => prevSaves.filter((item) => item.id !== save.id));
      toast.success('Сохранение успешно удалено');
    } catch (err) {
      console.error('Ошибка при удалении сохранения:', err);
      toast.error('Не удалось удалить сохранение');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSave = async (
    save: SaveLookupItem, 
    updatedData: { name: string; intelligence: number; balance: number }
  ) => {
    if (isLoading || !updatedData.name.trim()) return;
    
    setIsLoading(true);
    try {
      await studentActions.updateSave(save.id, save.isAutoSave, {
        name: updatedData.name.trim(),
        intelligence: updatedData.intelligence,
        balance: updatedData.balance
      });
      
      setSaves((prevSaves) =>
        prevSaves.map((item) =>
          item.id === save.id 
            ? { 
                ...item, 
                name: updatedData.name.trim(),
                intelligence: updatedData.intelligence,
                balance: updatedData.balance
              } 
            : item
        )
      );
      toast.success('Изменения успешно сохранены');
    } catch (err) {
      console.error('Ошибка при обновлении сохранения:', err);
      toast.error('Не удалось обновить данные сохранения');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saves,
    isLoading,
    handleSelectSave,
    handleDeleteSave,
    handleUpdateSave
  };
};
