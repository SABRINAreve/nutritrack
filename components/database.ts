import * as SQLite from 'expo-sqlite';

// Abrir la base de datos (si no existe, la crea)
const db = SQLite.openDatabase('nutritrack.db');

// Crear la tabla de alimentos si no existe
export const setupDatabase = () => {
  db.transaction((tx: SQLite.SQLTransaction) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER NOT NULL
      );`
    );
  });
};

// Agregar un nuevo alimento con nombre y calorías
export const addFood = (name: string, calories: number, callback: () => void) => {
  db.transaction((tx: SQLite.SQLTransaction) => {
    tx.executeSql(
      'INSERT INTO foods (name, calories) VALUES (?, ?);',
      [name, calories],
      (_, result: SQLite.SQLResultSet) => callback() // Callback para realizar una acción tras la inserción
    );
  });
};

// Obtener todos los alimentos de la base de datos
export const getFoods = (callback: (foods: { id: number; name: string; calories: number }[]) => void) => {
  db.transaction((tx: SQLite.SQLTransaction) => {
    tx.executeSql(
      'SELECT * FROM foods;',
      [],
      (_, { rows }: SQLite.SQLResultSet) => callback(rows._array) // Obtener los alimentos como un array
    );
  });
};
