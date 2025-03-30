import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BMRCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bmr, setBmr] = useState<number | null>(null);

  // Cálculo de la TMB (Tasa Metabólica Basal)
  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseInt(age);

    let bmrValue: number;
    if (gender === 'male') {
      bmrValue = 66.5 + (13.75 * weightInKg) + (5.003 * heightInCm) - (6.755 * ageInYears);
    } else {
      bmrValue = 655 + (9.563 * weightInKg) + (1.850 * heightInCm) - (4.676 * ageInYears);
    }

    setBmr(bmrValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de la TMB</Text>

      {/* Input para el peso */}
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholderTextColor="#aaa"
      />

      {/* Input para la altura */}
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholderTextColor="#aaa"
      />

      {/* Input para la edad */}
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="#aaa"
      />

      {/* Input para el género */}
      <TextInput
        style={styles.input}
        placeholder="Género (masculino/femenino)"
        value={gender}
        onChangeText={(value) => setGender(value as 'male' | 'female')}
        placeholderTextColor="#aaa"
      />

      {/* Botón para calcular */}
      <TouchableOpacity style={styles.button} onPress={calculateBMR}>
        <Text style={styles.buttonText}>Calcular TMB</Text>
      </TouchableOpacity>

      {/* Resultado */}
      {bmr && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Tu TMB es: {bmr.toFixed(2)} kcal/día</Text>
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
    fontSize: 24,
    fontWeight: '500',
  },
});

export default BMRCalculator;
