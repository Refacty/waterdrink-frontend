
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import tbUser from './src/services/tbUser/TbUser.js'
import Home from './src/pages/home/HomeScreen';
import db from "./src/services/sqlLite/DbManager";


export default function App(){
  db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tb_user (bd_key INTEGER PRIMARY KEY, user_id INTEGER, user_logado INTEGER default(0), user_name VARCHAR(255), user_email VARCHAR(255), user_session VARCHAR(255), user_birthday DATE, user_profession VARCHAR(255), user_weight DOUBLE);"
    );
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tb_progrees (bd_key INTEGER PRIMARY KEY, water_amount DOUBLE, date DATE);"
    );
  });

  return(
  <AppNavigator/>
  )
};
