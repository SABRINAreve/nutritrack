import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© 2025 NutriTrack. Todos los derechos reservados.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
});

export default Footer;
