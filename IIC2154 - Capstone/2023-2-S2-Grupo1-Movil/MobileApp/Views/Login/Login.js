import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import LoginForm from "../../components/Login/LoginForm";

import loginStyles from "../../assets/styles/Login/loginStyles";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={loginStyles.mainContainer}>
      <View style={loginStyles.login}>
        <LoginForm navigation={navigation}/> 
      </View>
    </SafeAreaView>
  );
};


export default Login;
