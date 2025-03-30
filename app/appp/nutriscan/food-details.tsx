import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFoodContext } from '../../../components/FoodContext';
import { useGoalContext } from '../../../components/GoalContext';

const FoodDetails = () => {
  const router = useRouter();
  const { handleSelectFood } = useFoodContext();
  const { goal } = useGoalContext();
  const [search, setSearch] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<{ id: string; name: string; calories: number }[]>([]);
  const [selectedFood, setSelectedFood] = useState<{ id: string; name: string; calories: number } | null>(null);
  const [portion, setPortion] = useState('1');
  
  const foodDatabase = [
    { id: '1', name: 'Manzana', calories: 52 },
    { id: '2', name: 'Pollo', calories: 239 },
    { id: '3', name: 'Arroz', calories: 130 },
  ];

  useEffect(() => {
    let updatedFoods = foodDatabase;
    if (typeof goal === "string") {
      if (goal === "perder peso") {
        updatedFoods = foodDatabase.filter(food => food.calories <= 150);
      } else if (goal === "ganar músculo") {
        updatedFoods = foodDatabase.filter(food => food.name === "Pollo" || food.name === "Arroz");
      }
    }
    setFilteredFoods(updatedFoods);
    
  }, [goal]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      setFilteredFoods(foodDatabase.filter(food => food.name.toLowerCase().includes(text.toLowerCase())));
    } else {
      setFilteredFoods(foodDatabase);
    }
  };

  const handleSelect = (food: { id: string; name: string; calories: number }) => {
    setSelectedFood(food);
  };

  const registerFood = () => {
    if (!selectedFood) return;
    handleSelectFood({ ...selectedFood, portion: Number(portion) });
    alert(`Registrado: ${portion} porciones de ${selectedFood.name}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Alimentos</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar alimento..."
        value={search}
        onChangeText={handleSearch}
      />
      {!selectedFood ? (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.foodItem} onPress={() => handleSelect(item)}>
              <Text>{item.name} - {item.calories} kcal</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.detailsContainer}>
          <Text>{selectedFood.name} 🍽️</Text>
          <Text>Calorías: {selectedFood.calories} kcal</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de porciones"
            keyboardType="numeric"
            value={portion}
            onChangeText={setPortion}
          />
          <Button title="Registrar" onPress={registerFood} />
        </View>
      )}
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  foodItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default FoodDetails;