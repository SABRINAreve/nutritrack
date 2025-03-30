import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar as PaperProgressBar } from 'react-native-paper';

interface ProgressBarProps {
  progress?: number; // Valor entre 0 y 1
  color?: string;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0, color = '#76c7c0', label = '' }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <PaperProgressBar progress={progress} color={color} style={styles.progressBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});

export default ProgressBar;
