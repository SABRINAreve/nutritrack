import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FoodItemProps {
  name: string;
  calories: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, calories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.calories}>{calories} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 16,
    color: '#888',
  },
});

export default FoodItem;
