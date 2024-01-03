import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput , Image, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Importa CheckBox desde aquí
import Button from '../Button/Button';
import axios from 'axios';
import SessionHandler from '../../session/sessionHandler';
import loginFormStyles from '../../assets/styles/Login/loginFormStyles';
import usePushNotification from '../../src/hooks/usePushNotifications';

const LoginForm = ({ navigation, route }) => {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [invalidSession, setInvalidSession] = useState(false);
  const {getFCMToken} = usePushNotification();
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://legitbusiness.me/api/users/login', {
        email: emailValue,
        password: passwordValue,
      });

      const responseData = response.data;

      console.log(responseData);

      if (responseData.userId) {
        setInvalidSession(false);
        const userId = responseData.userId;
        const isAdmin = responseData.administrator;
        SessionHandler.saveIsAdmin(isAdmin);
        SessionHandler.login(userId);   
        const fcmToken = await getFCMToken();
        console.log("Devise token:", fcmToken);
        console.log("User id:", userId);
        if (fcmToken) {
          try {
            await axios.post('https://legitbusiness.me/api/users/updateToken', {
              fcmToken: fcmToken,
              userId: userId,
            });
          console.log('Token enviado al servidor');
          } catch (error) {
          console.error('Error al enviar el token al servidor:', error);
          }
        }
        console.log('Iniciaste sesión con {userId: ' + userId + ', isAdmin: ' + isAdmin + '}}');                         
        navigation.navigate('Home', { userId: userId}); 
      } else {
        // Inicio de sesión fallido
        console.error('Inicio de sesión fallido:', responseData.detail);
      }
    } catch (error) {
      setInvalidSession(true);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={loginFormStyles.container}>
        <Text style={loginFormStyles.title}>
              {'COTIZADOR TREBOL IT'}
        </Text>
        <View style={loginFormStyles.loginHeader}>
          <View style={loginFormStyles.headerLogosContainer}>
            <Image style={loginFormStyles.logoImage} source={require('../../assets/images/logo.png')} />
          </View>
        </View>
        <Text style= {[loginFormStyles.title]}>
            {'Inicio de Sesión'}
        </Text>

        <Text style={loginFormStyles.text}>{'Correo Electrónico'}</Text>
        <TextInput
          keyboardType={'email-address'}
          style={loginFormStyles.input}
          placeholder={'pedro@trebolit.cl'}
          autoFocus={true}
          value={emailValue}
          onChangeText={(text) => setEmailValue(text)}
        />
        <Text style={loginFormStyles.text}>{"Contraseña"}</Text>
        <TextInput
          style={loginFormStyles.input}
          secureTextEntry={true}
          placeholder={'********'}
          value={passwordValue}
          onChangeText={(text) => setPasswordValue(text)}
        />

        <View style={loginFormStyles.centeredView}>
          <TouchableOpacity style={loginFormStyles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[loginFormStyles.checkbox, isChecked && loginFormStyles.checkboxChecked]} />
            <Text style={loginFormStyles.label}>Recordar usuario</Text>
          </TouchableOpacity>
        </View>

        
        <Text style={loginFormStyles.button.invalidSessionText}>
          {invalidSession && (
            'Correo o contraseña incorrectos'
          )}
        </Text>

        <Text style={loginFormStyles.forgotPassword}>
          {"¿Olvidaste tu contraseña?"}
        </Text>
      
        <Button 
          title="Iniciar Sesión" 
          onPress={handleLogin} 
          style={loginFormStyles.button}
        />
      </View>
    </SafeAreaView>
  );

};

export default LoginForm;
