import React from "react";
import { View, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header/Header";
import Perfil from "../../components/Perfil/Perfil";
import { ScrollView } from "react-native-gesture-handler";

import globalStyles from "../../assets/styles/main";

const CrearPerfil = ({ navigation, route }) => {
  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <Perfil navigation={navigation} route={route}  />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CrearPerfil;
