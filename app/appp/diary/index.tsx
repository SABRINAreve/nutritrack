import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useGoalContext } from '../../../components/GoalContext';

// Obtén el ancho de la pantalla
const screenWidth = Dimensions.get('window').width;

// Define las rutas de tu Stack Navigator
type RootStackParamList = {
  MealPlanning: undefined;
  ActivityLog: undefined; 
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const DiaryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { goal } = useGoalContext();

  const [caloriasConsumidas, setCaloriasConsumidas] = useState<number>(1200);
  const [actividadRealizada, setActividadRealizada] = useState<number>(45);

  let caloriasObjetivo = 2000;
  let recomendacionActividad = 30;

  if (typeof goal === 'string') {
    if (goal === 'Perder peso') {
      caloriasObjetivo = 1800;
      recomendacionActividad = 60;
    } else if (goal === 'Ganar masa muscular') {
      caloriasObjetivo = 2500;
      recomendacionActividad = 45;
    }
  }

  const caloriasRestantes = caloriasObjetivo - caloriasConsumidas;
  const progress = caloriasObjetivo > 0 ? (caloriasConsumidas / caloriasObjetivo) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>📊 Resumen Diario</Text>
        <Text style={styles.summaryText}>Calorías consumidas hoy: <Text style={styles.boldText}>{caloriasConsumidas} kcal</Text></Text>
        <Text style={styles.summaryText}>Actividad realizada hoy: <Text style={styles.boldText}>{actividadRealizada} minutos</Text></Text>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>


      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>Recomendaciones</Text>
        <Text style={styles.recommendationText}>Calorías objetivo: <Text style={styles.boldText}>{caloriasObjetivo} kcal</Text></Text>
        <Text style={styles.recommendationText}>Actividad recomendada hoy: <Text style={styles.boldText}>{recomendacionActividad} minutos</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    alignItems: 'center',
  },
  summaryContainer: {
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
  },
  summaryTitle: {
    color: '#ffcc00',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    color: '#fff',
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#555',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffcc00',
  },
  accessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: screenWidth * 0.9,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  recommendationContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
    width: '100%',
  },
  recommendationTitle: {
    color: '#ffcc00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DiaryScreen;
