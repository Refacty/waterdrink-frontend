import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../../src/pages/home/HomeScreen';
import Profile from '../pages/profile/Profile';
import { useNavigation } from '@react-navigation/native';
import RegistroScreen from '../../src/pages/register/RegistroScreen';
import { View } from 'react-native';
import { FOCUS } from 'nativewind/dist/utils/selector';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    return setModalVisible(!isModalVisible);
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
            return focused ? <Ionicons name="water" size={30} color="white" /> : <Ionicons name="water-outline" size={30} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
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
        <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
