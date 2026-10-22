import React from 'react';

export interface ActionButtonConfig {
  type: string;
  title: string;
  description: string;
  energyValue: string;
  isEnergyPositive: boolean;
  successMessage: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  icon: React.ReactNode;
}

export const ACTION_BUTTONS: ActionButtonConfig[] = [
  {
    type: 'AttendClass',
    title: 'Пойти на пару',
    description: 'Прогресс предмета +++',
    energyValue: '-35',
    isEnergyPositive: false,
    successMessage: 'Вы отсидели пару и получили новые знания (+8)',
    bgClass: 'bg-teal-50/60 hover:bg-teal-50',
    borderClass: 'border-teal-100/70 hover:border-teal-200',
    textClass: 'text-teal-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    type: 'SelfStudy',
    title: 'Учиться дома',
    description: 'Общий Интеллект +',
    energyValue: '-20',
    isEnergyPositive: false,
    successMessage: 'Вы усердно позанимались дома самостоятельно (+5)',
    bgClass: 'bg-indigo-50/50 hover:bg-indigo-50',
    borderClass: 'border-indigo-100/60 hover:border-indigo-200',
    textClass: 'text-indigo-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    type: 'Rest',
    title: 'Отдохнуть дома',
    description: 'Восстановление сил +++',
    energyValue: '+30',
    isEnergyPositive: true,
    successMessage: 'Вы отлично выспались и восстановили силы (+30)',
    bgClass: 'bg-amber-50/60 hover:bg-amber-50',
    borderClass: 'border-amber-100/70 hover:border-amber-200',
    textClass: 'text-amber-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    type: 'SkipClass',
    title: 'Прогулять пары',
    description: 'Опасность отчисления!',
    energyValue: '+10',
    isEnergyPositive: true,
    successMessage: 'Вы решили прогулять пары и немного расслабиться (+10)',
    bgClass: 'bg-rose-50/60 hover:bg-rose-50',
    borderClass: 'border-rose-100/70 hover:border-rose-200',
    textClass: 'text-rose-400',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828-9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
];
