import { useGame } from '../../../app/providers/with-game';

export const useStudentStats = () => {
  const context = useGame();

  if (!context) {
    throw new Error('useStudentStats должен использоваться внутри GameProvider');
  }

  return {
    student: context.student, 
  };
};
