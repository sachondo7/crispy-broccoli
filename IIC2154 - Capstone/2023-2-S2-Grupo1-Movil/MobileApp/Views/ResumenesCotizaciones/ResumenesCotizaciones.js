import React from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header/Header";
import ResumenCotizacion from "../../components/ResumenCotizacion/ResumenCotizacion";

import globalStyles from "../../assets/styles/main";

//esta vista es para ver el listado de cotizaciones


const ResumenesCotizaciones = ({ navigation, route }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
      >
    <SafeAreaView style={globalStyles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <ResumenCotizacion navigation={navigation} route ={route}/>
    </KeyboardAvoidingView>
  </SafeAreaView>
  </KeyboardAvoidingView>
  );
};

export default ResumenesCotizaciones;
