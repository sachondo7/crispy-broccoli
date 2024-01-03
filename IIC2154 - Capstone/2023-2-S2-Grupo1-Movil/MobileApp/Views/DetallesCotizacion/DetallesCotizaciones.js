import React from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header/Header";
import DetalleCotizacion from "../../components/DetalleCotizacion/DetalleCotizacion";
import globalStyles from "../../assets/styles/main";
import createQuotationStyles from "../../assets/styles/CreateQuotation/createQuotationStyles";

//Esta vista es para ver los detalles de una cotización en específico

const DetallesCotizaciones = ({ navigation, route }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <DetalleCotizacion navigation = {navigation} route={route}/>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
};

export default DetallesCotizaciones;