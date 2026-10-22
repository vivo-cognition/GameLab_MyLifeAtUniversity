import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext<{
  student: any | null;
  setStudent: (student: any) => void;
} | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame должен использоваться внутри GameProvider');
  return context;
};

export const withGame = (component: () => React.ReactNode) => () => {
  const [student, setStudent] = useState<any>(null);

  return (
    <GameContext.Provider value={{ student, setStudent }}>
      {component()}
    </GameContext.Provider>
  );
};
