import React, {useEffect} from "react";
import { View, KeyboardAvoidingView} from "react-native";
import NavBar from "../../components/NavBar/NavBar";
import OtrosCostosForm from "../../components/OtrosCostosForm/OtrosCostosForm";

import globalStyles from "../../assets/styles/main";

const OtrosCostos = ({ navigation , route }) => {
  return (
    <View style={globalStyles.container}>
      <Header navigation={navigation}/>
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <OtrosCostosForm navigation={navigation} route = {route} />
      </KeyboardAvoidingView>
      <NavBar navigation={navigation} />
    </View>
  );
};

export default OtrosCostos;