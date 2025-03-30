import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBarComponent from '../../../components/ProgressBar';
import { useGoalContext } from '../../../components/GoalContext'; // Asegúrate de que estás importando correctamente el GoalContext

const ProgressAnalysis = () => {
  const { goal } = useGoalContext(); // Obtener el objetivo del contexto
  const totalCalories = 1800; // Este valor puede ser dinámico, basado en el registro del usuario

  // Convertir goal a string para que la comparación sea coherente
  const goalStr = String(goal);

  const goalCalories = goalStr === 'Perder peso' ? 1800 : goalStr === 'Aumentar masa muscular' ? 2500 : 2000; // Valor por defecto si goal no está definido
  const progress = goalCalories > 0 ? totalCalories / goalCalories : 0; // Calcular el progreso

  const macros = {
    carbs: { consumed: 200, goal: goalStr === 'Aumentar masa muscular' ? 300 : 250 }, // Ajustar según el objetivo
    protein: { consumed: 80, goal: goalStr === 'Aumentar masa muscular' ? 120 : 100 }, // Ajustar según el objetivo
    fats: { consumed: 60, goal: 70 } // Los valores de grasa no cambian
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análisis Nutricional y Progreso</Text>
      <Text style={styles.subtitle}>Reporte de calorías y macronutrientes</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Calorías Consumidas: <Text style={styles.highlight}>{totalCalories} kcal</Text></Text>
        <Text style={styles.label}>Objetivo: <Text style={styles.highlight}>{goalCalories} kcal</Text></Text>
        <ProgressBarComponent progress={progress} label="Progreso de calorías" />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Macronutrientes</Text>
        {Object.entries(macros).map(([key, value]) => (
          <View key={key} style={styles.macroContainer}>
            <Text style={styles.macroLabel}>{key.toUpperCase()}</Text>
            <Text style={styles.macroValue}>{value.consumed}g / {value.goal}g</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  highlight: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  macroLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  macroValue: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProgressAnalysis;
