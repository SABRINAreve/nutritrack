  import React from "react";
  import { View, Text, StyleSheet, ScrollView } from "react-native";

  const Profile = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profileInfo}>
          <Text style={styles.profileText}>Nombre: Usuario</Text>
          <Text style={styles.profileText}>Edad: 25</Text>
          <Text style={styles.profileText}>Altura: 170 cm</Text>
          <Text style={styles.profileText}>Peso: 65 kg</Text>
        </View>

        <View style={styles.foodList}>
          <Text style={styles.foodListTitle}>Alimentos registrados</Text>
          <Text style={styles.foodListItem}>- Manzana</Text>
          <Text style={styles.foodListItem}>- Pollo a la plancha</Text>
          <Text style={styles.foodListItem}>- Ensalada</Text>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    profileInfo: {
      backgroundColor: "#f0f0f0",
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
    },
    profileText: {
      fontSize: 16,
      color: "#333",
      marginBottom: 5,
    },
    foodList: {
      marginTop: 20,
    },
    foodListTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#444",
      marginBottom: 10,
    },
    foodListItem: {
      fontSize: 16,
      color: "#666",
      paddingVertical: 5,
    },
  });

  export default Profile;
