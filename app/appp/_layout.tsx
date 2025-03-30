import React from 'react';
import { Drawer } from 'expo-router/drawer'; // Importamos el Drawer de expo-router
import Ionicons from '@expo/vector-icons/Ionicons'; // Iconos para el drawer
import FoodProvider from '../../components/FoodContext'; // Asegúrate de que la ruta al archivo de contexto sea correcta
import { GoalProvider } from '../../components/GoalContext'; // Importamos el GoalProvider

export default function Layout() {
  return (
    <GoalProvider> 
      <FoodProvider>
        <Drawer
          initialRouteName="home" // Especificamos que la pantalla de Bienvenida debe ser la primera
          screenOptions={{
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#ccc',
            drawerStyle: { backgroundColor: '#2a2a2a' }, // Fondo oscuro del menú
            headerStyle: { backgroundColor: '#1a1a1a' }, // Fondo del header
            headerTintColor: '#fff', // Color del texto del header
          }}
        >
          <Drawer.Screen
            name="home" // Pantalla de bienvenida en la carpeta app/Bienvenid@/index.tsx
            options={{
              title: 'Home',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="fitness" size={size} color="#F44336" />
              ),
            }}
          />

          <Drawer.Screen
            name="nutriscan" // Pantalla NutriScan en la carpeta app/nutriscan/index.tsx
            options={{
              title: 'NutriScan',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="scan" size={size} color="#4CAF50" />
              ),
            }}
          />

          <Drawer.Screen
            name="diary" // Pantalla Diario en la carpeta app/diary/index.tsx
            options={{
              title: 'Diario',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="book" size={size} color="#757575" />
              ),
            }}
          />

          <Drawer.Screen
            name="calculators" // Pantalla Calculadoras en la carpeta app/calculators/index.tsx
            options={{
              title: 'Calculadoras',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="calculator" size={size} color="#FFCC99" />
              ),
            }}
          />

          <Drawer.Screen
            name="profile" // Pantalla Perfil en la carpeta app/profile/index.tsx
            options={{
              title: 'Perfil',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color="#A7C7E7" />
              ),
            }}
          />
        </Drawer>
      </FoodProvider>
    </GoalProvider> // Asegúrate de que GoalProvider esté envolviendo todo el Drawer
  );
}
