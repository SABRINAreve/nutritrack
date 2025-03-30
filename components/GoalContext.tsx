import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GoalContextType {
  goal: number | null;
  setGoal: React.Dispatch<React.SetStateAction<number | null>>;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: ReactNode }) => {
  const [goal, setGoal] = useState<number | null>(null);

  return (
    <GoalContext.Provider value={{ goal, setGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = (): GoalContextType => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoalContext must be used within a GoalProvider');
  }
  return context;
};
