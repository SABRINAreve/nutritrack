import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ActivityLog = () => {
  interface Activity {
    id: string;
    name: string;
    duration: string;
    calories: string;
    date: string;
  }
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddActivity = () => {
    // Validación de entrada
    if (!activity || !duration || !calories) return;

    const parsedDuration = parseInt(duration, 10);
    const parsedCalories = parseInt(calories, 10);

    if (isNaN(parsedDuration) || isNaN(parsedCalories)) {
      alert('Por favor, ingresa un número válido para la duración y las calorías.');
      return;
    }

    const newActivity = {
      id: Date.now().toString(),
      name: activity,
      duration: `${parsedDuration} min`,
      calories: `${parsedCalories} kcal`,
      date: new Date().toLocaleDateString(),

    };

    if (editingIndex !== null) {
      const updatedActivities = [...activities];
      updatedActivities[editingIndex] = newActivity;
      setActivities(updatedActivities);
      setEditingIndex(null);
    } else {
      setActivities([...activities, newActivity]);
    }

    // Limpiar los campos
    setActivity('');
    setDuration('');
    setCalories('');
  };

  const handleEditActivity = (index: number): void => {
    setActivity(activities[index].name);
    setDuration(activities[index].duration.replace(' min', ''));
    setCalories(activities[index].calories.replace(' kcal', ''));
    setEditingIndex(index);
  };

  const handleDeleteActivity = (id: string): void => {
    setActivities(activities.filter((item: Activity) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏃‍♂️ Registro de Actividad Física</Text>
      
      <TextInput
        style={styles.input}
        placeholder='🏋️‍♀️ Nombre del ejercicio'
        value={activity}
        onChangeText={setActivity}
      />
      <TextInput
        style={styles.input}
        placeholder='⏳ Duración (minutos)'
        keyboardType='numeric'
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder='🔥 Calorías quemadas'
        keyboardType='numeric'
        value={calories}
        onChangeText={setCalories}
      />
      
      <Button title={editingIndex !== null ? '✏️ Editar Actividad' : '➕ Añadir Actividad'} onPress={handleAddActivity} />
      
      <Text style={styles.subtitle}>📋 Actividades Registradas</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.activityItem}>
            <Text>📅 {item.date}</Text>
            <Text>🏋️‍♂️ {item.name} - ⏳ {item.duration} - 🔥 {item.calories}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditActivity(index)}>
                <Ionicons name='pencil' size={20} color='blue' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteActivity(item.id)}>
                <Ionicons name='trash' size={20} color='red' />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default ActivityLog;
