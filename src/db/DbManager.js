import SQLite from 'react-native-sqlite-storage';

const databaseName = 'MyDatabase.db';

class DatabaseManager {
  constructor() {
    this.db = SQLite.openDatabase({
      name: waterdrink_controle,
      location: 'default',
    });
  }

  initDatabase() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tb_user (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), email VARCHAR(255), profession VARCHAR(255), daily_progress FLOAT, weekly_progress FLOAT, weight FLOAT)',
        [],
        () => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.log('Error creating table:', error);
        }
      );
    });
  }


  getProgress() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Users',
          [],
          (_, result) => {
            const users = [];
            const rows = result.rows;
            for (let i = 0; i < rows.length; i++) {
              users.push(rows.item(i));
            }
            resolve(users);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
}

export default DatabaseManager;
