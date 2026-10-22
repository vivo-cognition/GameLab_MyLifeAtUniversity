import { useNavigate } from 'react-router-dom';
import { useGame } from '../../app/providers/with-game';
import { StartGameForm } from '../../widgets/start-game-form/';

export const StartPage = () => {
  const { setStudent } = useGame();
  const navigate = useNavigate();

  const handleGameStarted = (studentData: any) => {
    setStudent(studentData);
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <StartGameForm onGameStarted={handleGameStarted} />
    </div>
  );
};
