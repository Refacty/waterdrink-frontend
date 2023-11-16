import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../../src/pages/home/HomeScreen';
import Profile from '../pages/profile/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import RegistroScreen from '../../src/pages/register/RegistroScreen';
import { View, TouchableOpacity } from 'react-native';
import WeightScreen from "../../src/pages/weight/WeightScreen"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    return setModalVisible(!isModalVisible);
  };

  const handleModalPress = () => {
    toggleModal(); // Chama a função para alternar o modal
    navigation.navigate('HomeScreen', { isModalVisible: !isModalVisible });
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#007784",
          borderTopWidth: 0,
          width: "100%",
          height: 80,
          elevation: 0,
          flex: 1,
          borderWidth: 0
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <Ionicons name="home" size={30} color="white" /> : <Ionicons name="home-outline" size={30} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="ActionButton"
        component={HomeScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            const toggle = toggleModal();
            toggle; 
            navigation.navigate('HomeScreen', { isModalVisible: !isModalVisible });
          },
        }}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <View style={{borderRadius:200, height:100, width:100, bottom:30,borderColor:"white", backgroundColor:"white", alignItems:"center"}}>
              <TouchableOpacity onPress={handleModalPress} activeOpacity={0.6} style={{backgroundColor:"#007784" , borderRadius:100, height:80, width:80, top:10, alignItems:"center"}}>
              <Ionicons name="water" size={45} color="white" style={{marginTop:15}} />
              </TouchableOpacity>
              </View>
              )
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <Ionicons name="person" size={30} color="white" /> : <Ionicons name="person-outline" size={30} color="white" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistroScreen">
      <Stack.Screen name="RegistroScreen" component={RegistroScreen} options={{ headerShown: false, gestureEnabled: false, headerLeft:null}} />
      <Stack.Screen name="WeightScreen" component={WeightScreen} options={{ headerShown: false, gestureEnabled: false, headerLeft:null}} />
      <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false, gestureEnabled: false, headerLeft:null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
