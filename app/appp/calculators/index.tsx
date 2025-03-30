import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Definimos las rutas de las calculadoras
const calculators: { 
  id: string; 
  name: string; 
  icon: keyof typeof Ionicons.glyphMap; 
  screen: keyof RootStackParamList; 
  description: string; 
  formula: string;
  useCase: string;  // Para qué sirve calcularlo
  precisionInfo: string; // Información sobre la precisión
}[] = [
  { 
    id: '1', 
    name: 'IMC (Índice de Masa Corporal)', 
    icon: 'body', 
    screen: 'BMICalculator',
    description: 'El IMC es un indicador utilizado para clasificar el peso en relación con la altura.',
    formula: 'IMC = Peso (kg) / Altura² (m²)',
    useCase: 'El IMC ayuda a identificar si una persona tiene un peso saludable, bajo peso, sobrepeso o obesidad, lo cual es fundamental para evaluar el riesgo de enfermedades relacionadas con el peso.',
    precisionInfo: 'El IMC es una aproximación general que no toma en cuenta la composición corporal (como masa muscular o grasa). Por lo tanto, puede no ser adecuado para personas con mucha masa muscular o con una gran pérdida de masa muscular.',
  },
  { 
    id: '2', 
    name: 'TMB (Tasa Metabólica Basal)', 
    icon: 'flame', 
    screen: 'BMRCalculator',
    description: 'La TMB estima las calorías que tu cuerpo necesita para funcionar en reposo.',
    formula: 'TMB (hombres) = 66 + (13.75 * peso) + (5 * altura) - (6.75 * edad)',
    useCase: 'La TMB es crucial para entender cuántas calorías necesitas diariamente sin hacer ejercicio, lo que te permite ajustar tu ingesta calórica para mantener o perder peso.',
    precisionInfo: 'La TMB es una estimación basada en fórmulas que no toman en cuenta factores individuales como la actividad física o el metabolismo específico de cada persona. Es útil como punto de partida, pero no es exacta para todos.',
  },
  { 
    id: '3', 
    name: 'Macronutrientes', 
    icon: 'fast-food', 
    screen: 'MacroCalculator',
    description: 'Calcula la cantidad de macronutrientes (proteínas, carbohidratos, grasas) que debes consumir.',
    formula: 'Distribución de macronutrientes: 40% carbohidratos, 30% proteínas, 30% grasas.',
    useCase: 'Conocer tus necesidades de macronutrientes es esencial para equilibrar tu dieta, asegurando que recibas los nutrientes adecuados para mantener energía, fortalecer músculos y apoyar el metabolismo.',
    precisionInfo: 'Esta distribución de macronutrientes es una recomendación general. Las necesidades específicas pueden variar según el nivel de actividad, los objetivos personales y otros factores como la edad o el sexo.',
  },
];

// Definimos RootStackParamList con tipos específicos
type RootStackParamList = {
  BMICalculator: undefined;
  BMRCalculator: undefined;
  MacroCalculator: undefined;
};

export default function CalculatorsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Estado para mostrar/ocultar la descripción de cada calculadora
  const [expanded, setExpanded] = useState<string | null>(null);

  // Estado para mostrar/ocultar la guía
  const [guideExpanded, setGuideExpanded] = useState(false);

  const toggleDescription = (id: string) => {
    setExpanded(expanded === id ? null : id); // Si ya está expandido, lo colapsa
  };

  const toggleGuide = () => {
    setGuideExpanded(!guideExpanded);
  };

  const collapseAllDescriptions = () => {
    setExpanded(null); // Colapsar todas las descripciones
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Calculadoras de Nutrición</Text>

      <FlatList
        data={calculators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.optionContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(item.screen as keyof RootStackParamList)}
              style={styles.itemTouchable}
              activeOpacity={0.8}
            >
              <Ionicons name={item.icon} size={28} color="#ffcc00" style={styles.icon} />
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>

            {/* Botón "Ver más" */}
            <TouchableOpacity onPress={() => toggleDescription(item.id)} style={styles.toggleButton}>
              <Text style={styles.toggleText}>{expanded === item.id ? 'Ver menos' : 'Ver más'}</Text>
            </TouchableOpacity>

            {/* Descripción desplegable */}
            {expanded === item.id && (
              <ScrollView style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}><Text style={styles.bold}>Descripción:</Text> {item.description}</Text>
                <Text style={styles.descriptionText}><Text style={styles.bold}>Fórmula:</Text> {item.formula}</Text>
                <Text style={styles.descriptionText}><Text style={styles.bold}>¿Para qué sirve calcular esto?</Text> {item.useCase}</Text>
                <Text style={styles.descriptionText}><Text style={styles.bold}>Precisión:</Text> {item.precisionInfo}</Text>
              </ScrollView>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Botón de Guía de Uso */}
      <TouchableOpacity onPress={toggleGuide} style={styles.guideButton}>
        <Text style={styles.guideButtonText}>{guideExpanded ? 'Ver menos' : 'Ver guía de uso'}</Text>
      </TouchableOpacity>

      {/* Guía de Uso desplegable */}
      {guideExpanded && (
        <View style={styles.guideContainer}>
          <ScrollView contentContainerStyle={styles.guideContainer}>
            <Text style={styles.guideText}>
              Bienvenido a la sección de Calculadoras de Nutrición. Aquí podrás encontrar herramientas útiles para llevar un control más preciso de tu salud y nutrición. Cada calculadora tiene una función específica y te ayudará a obtener estimaciones valiosas sobre tu cuerpo y necesidades nutricionales.

              {'\n\n'}Aquí te explicamos cómo puedes usar cada una:

              {'\n\n'}1. IMC (Índice de Masa Corporal): Te permite saber si tu peso es adecuado para tu altura. Un IMC bajo o alto puede ser un indicio de problemas de salud.

              {'\n\n'}2. TMB (Tasa Metabólica Basal): Estima cuántas calorías necesitas para mantener tu cuerpo funcionando en reposo. Es ideal para calcular tus necesidades energéticas diarias.

              {'\n\n'}3. Macronutrientes: Te ayuda a distribuir correctamente tus calorías entre carbohidratos, proteínas y grasas, para asegurar que tu dieta sea equilibrada.

              {'\n\n'}Recomendaciones:
              - Utiliza estas herramientas como una guía general, pero recuerda que los resultados son aproximados y no sustituyen la consulta con un profesional de la salud.
              - Si tienes alguna condición médica, consulta siempre a un nutricionista o médico antes de realizar cambios drásticos en tu dieta o ejercicio.
              - Puedes usar estas calculadoras para monitorear tu progreso hacia objetivos de salud, como pérdida de peso, ganancia muscular o mantenimiento.

              {'\n\n'}¡Comienza a calcular y optimizar tu bienestar!
              {'\n\n'}🍏🏋️‍♂️
              {'\n\n'}Equipo de NutriTrack
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    color: '#ffcc00',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionContainer: {
    marginBottom: 20,
  },
  itemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 10,
  },
  toggleButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  toggleText: {
    color: '#ffcc00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 10,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  guideButton: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  guideButtonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guideContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  guideText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
});
