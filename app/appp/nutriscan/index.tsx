import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

interface FoodItem {
  name: string;
  calories: string;
  proteins: string;
  fats: string;
  carbohydrates: string;
  image: string | null;
  date: string;
}

const NutriScanScreen = () => {
  const [foodData, setFoodData] = useState<FoodItem[]>([
    {
      name: "Manzana",
      calories: "52 kcal",
      proteins: "0.3 g",
      fats: "0.2 g",
      carbohydrates: "14 g",
      image: "https://example.com/apple.jpg",
      date: "2025-03-20",
    },
    {
      name: "Banana",
      calories: "89 kcal",
      proteins: "1.1 g",
      fats: "0.3 g",
      carbohydrates: "23 g",
      image: "https://example.com/banana.jpg",
      date: "2025-03-20",
    },
  ]);

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.foodItem}>
      <Image source={{ uri: item.image || "" }} style={styles.foodImage} />
      <View style={styles.foodDetails}>
        <Text style={styles.foodText}>🍏 {item.name}</Text>
        <Text style={styles.foodText}>🔥 Calorías: {item.calories}</Text>
        <Text style={styles.foodText}>💪 Proteínas: {item.proteins}</Text>
        <Text style={styles.foodText}>🥑 Grasas: {item.fats}</Text>
        <Text style={styles.foodText}>🍞 Carbohidratos: {item.carbohydrates}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Registro de Alimentos</Text>
      <FlatList
        data={foodData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFoodItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  foodItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  foodDetails: {
    flex: 1,
    justifyContent: "center",
  },
  foodText: {
    fontSize: 16,
  },
});

export default NutriScanScreen;
