import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CalculatorsTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Pantalla principal con acceso a las calculadoras */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calculator" size={size} color={color} />,
          tabBarLabel: () => null, // Eliminar texto
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />

  

      {/* Pantalla de IMC */}
      <Tabs.Screen
        name="BMICalculator"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="body" size={size} color={color} />,
          tabBarLabel: () => null, // Eliminar texto
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />

      {/* Pantalla de TMB */}
      <Tabs.Screen
        name="BMRCalculator"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="flame" size={size} color={color} />,
          tabBarLabel: () => null, // Eliminar texto
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />

      {/* Pantalla de Macronutrientes */}
      <Tabs.Screen
        name="MacroCalculator"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="fast-food" size={size} color={color} />,
          tabBarLabel: () => null, // Eliminar texto
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />
    </Tabs>
  );
}
