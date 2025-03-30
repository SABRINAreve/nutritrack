// navigation/types.ts
export type RootStackParamList = {
    Profile: undefined;
    Settings: { refresh?: boolean }; // Cambia esta línea para aceptar el parámetro refresh
  };