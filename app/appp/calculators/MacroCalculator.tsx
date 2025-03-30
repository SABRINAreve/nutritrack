import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MacroCalculator = () => {
  const [tmb, setTmb] = useState('');
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('low');
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  const calculateMacros = () => {
    const tmbValue = parseFloat(tmb);
    let activityFactor = 1.2;

    if (activityLevel === 'moderate') {
      activityFactor = 1.55;
    } else if (activityLevel === 'high') {
      activityFactor = 1.9;
    }

    const totalCalories = tmbValue * activityFactor;

    const protein = totalCalories * 0.3 / 4;
    const carbs = totalCalories * 0.5 / 4;
    const fat = totalCalories * 0.2 / 9;

    setMacros({ protein, carbs, fat });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Macronutrientes</Text>

      {/* Input para el TMB */}
      <TextInput
        style={styles.input}
        placeholder="TMB"
        keyboardType="numeric"
        value={tmb}
        onChangeText={setTmb}
        placeholderTextColor="#aaa"
      />

      {/* Input para el nivel de actividad */}
      <TextInput
        style={styles.input}
        placeholder="Nivel de actividad (bajo, moderado, alto)"
        value={activityLevel}
        onChangeText={(value) => setActivityLevel(value as 'low' | 'moderate' | 'high')}
        placeholderTextColor="#aaa"
      />

      {/* Botón para calcular */}
      <TouchableOpacity style={styles.button} onPress={calculateMacros}>
        <Text style={styles.buttonText}>Calcular Macronutrientes</Text>
      </TouchableOpacity>

      {/* Resultados */}
      {macros && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Proteínas: {macros.protein.toFixed(2)} g</Text>
          <Text style={styles.result}>Carbohidratos: {macros.carbs.toFixed(2)} g</Text>
          <Text style={styles.result}>Grasas: {macros.fat.toFixed(2)} g</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    color: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    color: '#ffcc00',
    fontSize: 22,
    fontWeight: '500',
  },
});

export default MacroCalculator;
