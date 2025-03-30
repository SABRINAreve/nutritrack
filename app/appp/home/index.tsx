import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ProgressBarComponent from '../../../components/ProgressBar';
import ButtonComponent from '../../../components/Button';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FoodItem from '../../../components/FoodItem';
import Card from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { useGoalContext } from '../../../components/GoalContext'; // Importa el hook

const QuickActionButton: React.FC<{ iconName: keyof typeof Ionicons.glyphMap; color: string; label: string; onPress: () => void }> = ({ iconName, color, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.quickActionButton}>
    <Ionicons name={iconName} size={30} color={color} />
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const { goal } = useGoalContext(); // Usamos el GoalContext

  const totalCalories = 1800;

  // Verificar si goal es un número válido y establecer un valor predeterminado
  const goalCalories = typeof goal === 'number' ? goal : 2500; // Establecer un valor predeterminado de 2500 kcal si goal no es un número
  const progress = goalCalories > 0 ? totalCalories / goalCalories : 0;

  const foodItems = [
    { name: 'Manzana', calories: 95 },
    { name: 'Plátano', calories: 105 },
    { name: 'Yogur', calories: 150 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      
      <Animated.View entering={FadeIn.duration(800)} style={styles.section}>
        <Text style={styles.title}>Resumen del Día</Text>
        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesText}>Consumidas: <Text style={styles.highlight}>{totalCalories} kcal</Text></Text>
          <Text style={styles.caloriesText}>Objetivo: <Text style={styles.highlight}>{goalCalories} kcal</Text></Text>
        </View>
        <ProgressBarComponent progress={progress} />
      </Animated.View>
      
      <Card title="Calorías">
        <View style={styles.cardContent}>
          <Ionicons name="flame" size={40} color="orange" />
          <View>
            <Text style={styles.label}>Calorías Consumidas</Text>
            <Text style={styles.value}>{totalCalories} kcal</Text>
          </View>
        </View>
      </Card>
      
      <Animated.View entering={SlideInUp.duration(1000)} style={styles.section}>
        <Text style={styles.foodTitle}>Alimentos Consumidos</Text>
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => <FoodItem key={index} name={item.name} calories={item.calories} />)
        ) : (
          <Text style={styles.noFoodText}>No hay alimentos registrados</Text>
        )}
      </Animated.View>
      
      <View style={styles.quickActionsSection}>
        <Text style={styles.subtitle}>Accesos Rápidos</Text>
        <View style={styles.quickActions}>
          <QuickActionButton iconName="fast-food" color="#FF9500" label="Añadir Comida" onPress={() => router.push('/appp/nutriscan/food-details')} />
          <QuickActionButton iconName="barcode" color="#007AFF" label="Escanear" onPress={() => router.push('/appp/nutriscan/food-details')} />
          <QuickActionButton iconName="barbell" color="#4CD964" label="Añadir Actividad" onPress={() => router.push('/appp/calculators/activity-log')} />
        </View>
      </View>
      
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  section: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  caloriesContainer: {
    marginBottom: 15,
  },
  caloriesText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  foodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noFoodText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  quickActionsSection: {
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    width: 100,
    height: 80,
  },
  quickActionLabel: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
