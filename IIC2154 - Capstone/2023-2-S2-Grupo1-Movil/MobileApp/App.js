import React , { useState, useEffect }from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import usePushNotification from './src/hooks/usePushNotifications';


const App = () => {

  const Stack = createStackNavigator();

  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    //Recuperar ultima pantalla visitada
    AsyncStorage.getItem('lastScreen').then((lastScreen) => {
      if (lastScreen) {
        setInitialRoute(lastScreen);
      }
    });
  }, []);

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName={initialRoute}>
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 

export default App;
