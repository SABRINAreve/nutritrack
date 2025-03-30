import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NutriScanTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Escanear",
          tabBarIcon: ({ color, size }) => <Ionicons name="scan" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="food-details"
        options={{
          title: "Detalles",
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="barcode-scannerr"
        options={{
          title: "Escanear Código de Barras",
          tabBarIcon: ({ color, size }) => <Ionicons name="barcode" size={size} color={color} />,
         
        }}
      />
    </Tabs>
  );
}
