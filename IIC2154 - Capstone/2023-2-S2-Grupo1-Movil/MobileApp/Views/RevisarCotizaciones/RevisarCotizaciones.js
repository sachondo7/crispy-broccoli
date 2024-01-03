import React from "react";
import {SafeAreaView, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header/Header";
import RevisarCotizacion from "../../components/RevisarCotizacion/RevisarCotizacion";
import globalStyles from "../../assets/styles/main";
import createQuotationStyles from "../../assets/styles/CreateQuotation/createQuotationStyles";

//Esta vista es para ver los detalles de una cotización en específico

const RevisarCotizaciones = ({ navigation, route }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <RevisarCotizacion navigation = {navigation} route={route}/>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
};


export default RevisarCotizaciones;
