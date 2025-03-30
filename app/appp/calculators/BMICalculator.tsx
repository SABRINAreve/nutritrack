import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [classification, setClassification] = useState<string | null>(null);

  // Cálculo del IMC
  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height) / 100; // Convertir de cm a metros
    if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
      setBmi(null);
      setClassification(null);
      return;
    }

    const bmiValue = weightValue / (heightValue * heightValue);
    setBmi(bmiValue);
    classifyBMI(bmiValue);
  };

  // Clasificación del IMC según el valor calculado
  const classifyBMI = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setClassification('Bajo peso');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setClassification('Normal');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setClassification('Sobrepeso');
    } else {
      setClassification('Obesidad');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo del IMC</Text>

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

      {/* Botón para calcular */}
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {/* Resultados */}
      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Tu IMC es: {bmi.toFixed(2)}</Text>
          <Text style={styles.classification}>Clasificación: {classification}</Text>
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
  classification: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});

export default BMICalculator;
