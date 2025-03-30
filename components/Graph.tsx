import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Definir el tipo de los datos del gráfico
type ChartData = {
  name: string;
  value: number;
}[];

type GraphProps = {
  data: ChartData;
};

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico de Calorías</Text>
      <ResponsiveContainer width="95%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ffcc00" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
});

export default Graph;
