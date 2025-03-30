import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LogTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Pantalla principal de Registro */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Registro",
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />
      
      {/* Pantalla Plan de Comidas */}
      <Tabs.Screen
        name="meal-planning"
        options={{
          title: "Plan de Comidas",
          tabBarIcon: ({ color, size }) => <Ionicons name="fast-food" size={size} color={color} />,
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />
      
      {/* Pantalla de añadir actividad */}
      <Tabs.Screen
        name="activity-log"
        options={{
          title: "Registro de Actividad",
          tabBarIcon: ({ color, size }) => <Ionicons name="fitness" size={size} color={color} />,
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopWidth: 0 }, // Estilo minimalista
        }}
      />
    </Tabs>
  );
}
