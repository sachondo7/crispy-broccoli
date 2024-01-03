import React, {useEffect} from "react";
import { View, KeyboardAvoidingView} from "react-native";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import Fecha from "../../components/Fecha/Fecha";

import globalStyles from "../../assets/styles/main";

const Fechas = ({ navigation , route }) => {
  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <Fecha navigation={navigation} route = {route} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Fechas;