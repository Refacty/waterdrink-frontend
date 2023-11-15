import db from "../sqlLite/DbManager";

db.transaction((tx) => {

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tb_user (bd_key INTEGER PRIMARY KEY, user_id, user_name VARCHAR(255), user_email VARCHAR(255), user_session TEXT, user_birthday DATE, user_daily_progress FLOAT, user_profession VARCHAR(255), user_weekly_progress FLOAT, user_weight FLOAT);"
  );
});

const create_user = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO tb_user (user_id, user_name, user_email, user_birthday, user_daily_progress, user_profession, user_weekly_progress, user_weight, user_session) values (? ,? ,? ,? ,? ,? ,?, ?, ?);",
        [obj.user_id, obj.user_name, obj.user_email, obj.user_birthday, obj.user_daily_progress, obj.user_profession, obj.user_weekly_progress, obj.user_weight, obj.user_session],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const consultar = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => {
          resolve(result.rows._array); 
        },
        (_, error) => {
          reject(error); 
        }
      );
    });
  });
};

const executar = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        () => {
          resolve(); // Resolva a promessa sem um valor, já que é uma ação sem retorno
        },
        (_, error) => {
          reject(error); // Rejeite a promessa em caso de erro
        }
      );
    });
  });
};

const update_progress = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE user_daily_progress SET user_daily_progress = user_daily_progress + ?, user_weekly_progress + ?;",
        [obj.ml, obj.ml],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj"); // nenhum registro alterado
        },
        (_, error) => {
          console.error('Error executing SQL:', error);
          reject(error)
        } // erro interno em tx.executeSql
      );
    });
  });
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tb_user;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};


export default {
  create_user,
  update_progress,
  findAll,
  executar,
  consultar
};