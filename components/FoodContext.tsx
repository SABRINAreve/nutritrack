import React, { createContext, useContext, useState } from 'react';

interface FoodContextProps {
  handleSelectFood: (food: any) => void;
  selectedFoods: any[]; // Exponer el estado de alimentos seleccionados
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

interface FoodProviderProps {
  children: React.ReactNode;
}

const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);

  const handleSelectFood = (food: any) => {
    setSelectedFoods((prevFoods) => {
      // Evitar duplicados
      const isFoodAlreadySelected = prevFoods.some(f => f.id === food.id);
      if (!isFoodAlreadySelected) {
        // Limitar a una cantidad máxima de alimentos si es necesario
        if (prevFoods.length >= 100) {
          prevFoods.shift(); // Elimina el primer elemento si se excede el límite
        }
        return [...prevFoods, food];
      }
      return prevFoods; // No agregar si ya está seleccionado
    });
  };

  return (
    <FoodContext.Provider value={{ handleSelectFood, selectedFoods }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};
