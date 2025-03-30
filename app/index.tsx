import React from 'react';
import { Text, Pressable, StyleSheet, ImageBackground, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut, SlideInUp } from 'react-native-reanimated';

const WelcomeScreen = () => {
  const router = useRouter();

  const handleEnterApp = () => {
    router.push('/appp/home'); // Redirige al dashboard
  };

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(800)} exiting={FadeOut.duration(800)}>
      {/* Fondo con imagen */}
      <ImageBackground 
        source={require('../assets/images/nutricion.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        {/* Contenido centrado con un fondo semitransparente */}
        <View style={styles.overlay}>
          <Animated.Text style={styles.title} entering={SlideInUp.duration(1000)}>
            ¡Bienvenida a NutriTrack!
          </Animated.Text>
          <Text style={styles.subtitle}>
            Tu compañero ideal para alcanzar tus objetivos de salud y bienestar.
          </Text>

          {/* Frase motivadora con animación */}
          <Animated.Text style={styles.motivationalText} entering={SlideInUp.duration(1200).delay(300)}>
            "Cada paso cuenta. ¡Juntas podemos lograrlo!"
          </Animated.Text>

          {/* Botón con efecto de presión */}
          <Pressable 
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
            onPress={handleEnterApp}
          >
            <Text style={styles.buttonText}>Ir al Dashboard</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece un poco el fondo para mejorar el contraste
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  motivationalText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 4, // Sombra
  },
  buttonPressed: {
    backgroundColor: '#388E3C',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WelcomeScreen;
