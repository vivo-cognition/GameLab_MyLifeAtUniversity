import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useMainMenu = () => {
  const navigate = useNavigate();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSavesOpen, setIsSavesOpen] = useState(false);

  const handleNewGame = () => {
    navigate('/start');
  };

  const toggleAboutModal = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  const toggleSavesModal = () => {
    setIsSavesOpen(!isSavesOpen);
  };

  const handleExit = () => {
    window.location.href = 'https://www.bstu.by';
  };

  return {
    handleNewGame,
    toggleAboutModal,
    toggleSavesModal,
    handleExit,
    isAboutOpen,
    isSavesOpen,
  };
};
