import { z } from 'zod';

export const startGameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Имя слишком короткое (минимум 2 символа)' })
    .max(50, { message: 'Имя слишком длинное (максимум 50 символов)' })
    .regex(/^[A-Za-zА-Яа-яЁё\s-]+$/, {
      message: 'Имя должно содержать только буквы, пробелы или дефисы',
    }),
  specialization: z
    .string()
    .min(1, { message: 'Необходимо выбрать специальность' }),
  subjectsCount: z
    .number()
    .int()
    .min(2, { message: 'Минимум 2 предмета' })
    .max(7, { message: 'Максимум 7 предметов' }),
});

export type StartGameFormValues = z.infer<typeof startGameSchema>;
