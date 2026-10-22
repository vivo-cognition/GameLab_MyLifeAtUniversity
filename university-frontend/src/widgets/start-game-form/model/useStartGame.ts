import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { GameService } from '../../../shared/api/generated/services/GameService';
import { startGameSchema, type StartGameFormValues } from './schema';

export const useStartGame = (onSuccess: (studentData: any) => void) => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [subjectsCount, setSubjectsCount] = useState(4);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [isSpecsLoading, setIsSpecsLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof StartGameFormValues, string>>>({});

  const clearFieldError = (field: keyof StartGameFormValues) => {
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const data = await GameService.getApiGameSpecializations();
        setSpecializations(data);
        if (data && data.length > 0) {
          setSpecialization(data[0]);
        }
      } catch (err: any) {
        toast.error('Не удалось загрузить специальности с сервера');
      } finally {
        setIsSpecsLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  const startGame = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const formValues: StartGameFormValues = { name, specialization, subjectsCount };
    const validationResult = startGameSchema.safeParse(formValues);

    if (!validationResult.success) {
      const errors: typeof fieldErrors = {};
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof StartGameFormValues;
        if (fieldName) {
          errors[fieldName] = issue.message;
        }
      });
      setFieldErrors(errors);
      toast.error('Проверьте правильность заполнения полей');
      return;
    }

    setFieldErrors({});
    setIsGameLoading(true);

    try {
      const payload = {
        name: validationResult.data.name,
        specialization: validationResult.data.specialization,
        subjectsCount: validationResult.data.subjectsCount
      };
      
      const student = await GameService.postApiGameStart(payload);

      toast.success('Студент успешно создан');
      onSuccess(student);
    } catch (err: any) {
      toast.error(err.body?.message || 'Не удалось инициализировать семестр');
    } finally {
      setIsGameLoading(false);
    }
  };

  return {
    name,
    setName: (val: string) => { setName(val); clearFieldError('name'); },
    specialization,
    setSpecialization: (val: string) => { setSpecialization(val); clearFieldError('specialization'); },
    subjectsCount,
    setSubjectsCount: (val: number) => { setSubjectsCount(val); clearFieldError('subjectsCount'); },
    specializations,
    isLoading: isGameLoading,
    isSpecsLoading,
    fieldErrors,
    startGame,
  };
};
