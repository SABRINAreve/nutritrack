import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGoalContext } from '../../../components/GoalContext'; // Asegúrate de tener este contexto importado

const MealPlanning = () => {
  const [mealName, setMealName] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [meals, setMeals] = useState<any[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);

  const { goal } = useGoalContext(); // Acceder al objetivo del usuario desde el contexto

  // Lista de alimentos (ejemplo, puedes cambiarla según tus necesidades)
  const foods = [
    { name: 'Manzana', calories: 95 },
    { name: 'Banana', calories: 105 },
    { name: 'Pechuga de pollo', calories: 165 },
    { name: 'Arroz', calories: 130 },
  ];

  // Función para ajustar las calorías recomendadas según el objetivo
  const adjustCaloriesForGoal = (calories: number) => {
    if (goal === undefined) {
      return calories; // Si goal no está definido, no modificamos las calorías
    }

    if (String(goal) === 'lose') {
      return calories - 200; // Reducir calorías para perder peso
    } else if (String(goal) === 'gain') {
      return calories + 200; // Aumentar calorías para ganar peso
    }
    return calories; // Mantener las calorías si el objetivo es mantener peso
  };

  const handleAddFood = (food: any) => {
    setSelectedFoods([...selectedFoods, food]);
    setTotalCalories(totalCalories + food.calories);
  };

  const handleRemoveFood = (foodToRemove: any) => {
    setSelectedFoods(selectedFoods.filter(food => food.name !== foodToRemove.name));
    setTotalCalories(totalCalories - foodToRemove.calories);
  };

  const handleAddMeal = () => {
    if (mealName.trim() !== '' && selectedFoods.length > 0) {
      const newMeal = {
        name: mealName,
        foods: selectedFoods,
        calories: totalCalories,
      };
      setMeals([...meals, newMeal]);
      setMealName('');
      setSelectedFoods([]);
      setTotalCalories(0);
      setIsAddingMeal(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🍽️ Planificación de Comidas</Text>

        {isAddingMeal ? (
          <View style={styles.formContainer}>
            <Text style={styles.subTitle}>Agregar Comida</Text>
            <TextInput
              style={styles.input}
              placeholder="🍏 Nombre de la comida"
              value={mealName}
              onChangeText={setMealName}
            />

            <FlatList
              data={selectedFoods}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.foodItem}>
                  <Text>{item.name} - {item.calories} kcal</Text>
                  <Button title="❌ Eliminar" onPress={() => handleRemoveFood(item)} />
                </View>
              )}
              scrollEnabled={false} // Desactivar el desplazamiento de esta lista
            />
            <Text>Total Calorías: {adjustCaloriesForGoal(totalCalories)} kcal</Text> {/* Mostrar las calorías ajustadas */}

            <Text style={styles.subTitle}>Seleccionar Alimentos</Text>
            {foods.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleAddFood(item)}>
                <View style={styles.foodItem}>
                  <Text>{item.name} - {item.calories} kcal</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Button title="➕ Añadir Comida" onPress={handleAddMeal} />
            <Button title="❌ Cancelar" onPress={() => setIsAddingMeal(false)} />
          </View>
        ) : (
          <View style={styles.mealsList}>
            <Text style={styles.subTitle}>Comidas Planificadas</Text>
            {meals.map((item, index) => (
              <View key={index} style={styles.mealItem}>
                <Text>{item.name} - {item.calories} kcal</Text>
                <Text>Comidas: {item.foods.map((food: any) => food.name).join(', ')}</Text>
              </View>
            ))}
          </View>
        )}

        {!isAddingMeal && <Button title="➕ Agregar comida" onPress={() => setIsAddingMeal(true)} />}
      </ScrollView>

      {/* Barra fija en la parte inferior */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>🍴 ¡Organiza tus comidas fácilmente!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Aumentar el paddingBottom si es necesario
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
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
  mealsList: {
    marginTop: 20,
  },
  // Estilo para la barra en la parte inferior
  bottomBar: {
    backgroundColor: '#ff6347',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MealPlanning;
