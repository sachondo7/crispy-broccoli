import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView } from "react-native";



import RiskForm from "../../components/RiskForm/RiskForm"

import globalStyles from "../../assets/styles/main";

const AsignarRiesgo = ({ navigation, route }) => {
  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <RiskForm navigation={navigation} route ={route}/>
      </KeyboardAvoidingView>
      
    </View>
  );
};

export default AsignarRiesgo;