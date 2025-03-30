import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    // Reemplazamos las propiedades de sombra obsoletas por boxShadow
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', // Sombra con opacidad al 10%
    elevation: 5, // Para compatibilidad con Android
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    marginTop: 10,
  },
});

export default Card;
