import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import FoundIcon from 'react-native-vector-icons/Foundation';
import SIIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import Button from "../Button/Button";
import reviewQuotationStyles from "../../assets/styles/CreateQuotation/reviewQuotationStyles";

const RevisarCotizacion = ({ navigation, route }) => {


    const [tarifaFinal, setTarifaFinal] = useState();
    const [tarifaSinDescuento, setTarifaSinDescuento] = useState();
    const [tarifaMensualSinDescuento, setTarifaMensualSinDescuento] = useState();

  const quotationData = route.params.quotationData;
  const fechaCierre = quotationData.fechaCierre;
  const fechaEntrega = quotationData.fechaEntrega;
/*   const costoPerfiles = quotationData.selectedProfiles.map(([name, assignment, cost]) => (assignment * cost)/ 100).reduce((partialSum, a) => partialSum + Math.floor(a), 0);
  var risk = quotationData.selectedRisk == "Alto" ? 1.3 : quotationData.selectedRisk == "Medio" ? 1.2 : quotationData.selectedRisk == "Bajo" ? 1.1 : 1;
  const tarifaMensualSinDescuento = Math.floor((costoPerfiles + parseInt(quotationData.otherCosts)) * risk);
  const tarifaMensualConDescuento = tarifaMensualSinDescuento - Math.floor((tarifaMensualSinDescuento * (parseInt(quotationData.discountValue) / 100)));
  const tarifaSinDescuento = tarifaMensualSinDescuento * quotationData.duracionProyecto;
  const tarifaFinal = tarifaMensualConDescuento * quotationData.duracionProyecto; */
  var perfilesAEnviar = quotationData.selectedProfiles.map(perfil => perfil.slice(0,2));


  const formatearFecha = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('es-ES', options);
    return formattedDate;
  };

  const formatearFechaATimeStamp = (stringFecha) => {
    const date = new Date(stringFecha);
    const desiredOffsetInMinutes = -180;
    date.setMinutes(date.getMinutes() + desiredOffsetInMinutes);
    const formattedTimestamp = date.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "-03");
    return formattedTimestamp;
  }


  const fechaCiereStamp = formatearFechaATimeStamp(fechaCierre);
  

  const fechaEntregaStamp = formatearFechaATimeStamp(fechaEntrega);

  useEffect(() => {
    console.log('Estoy en la vista Revisar \n parametros recibidos:', quotationData);
    console.log(quotationData.selectedProfiles);
    // console.log(costoPerfiles);
    // console.log(quotationData.otherCosts);
    // console.log(quotationData.duracionProyecto);
    // console.log(risk);
    // console.log(tarifaMensualSinDescuento);
    // console.log(tarifaMensualConDescuento);
    // console.log(tarifaSinDescuento);
    // console.log(tarifaFinal);
    console.log(quotationData.id);
    console.log("clientId:", quotationData.selectedClient.id);
    console.log("contactId:", quotationData.selectedCounterpart.id);
    console.log("idProyecto:", quotationData.nombreCotizacion);
    console.log("risk:", quotationData.selectedRisk);
    console.log("porcentajeDescuento:", quotationData.discountValue);
    console.log("proyectDuration:", quotationData.duracionProyecto);
    console.log("userId:", quotationData.userId);
    console.log("perfiles:", perfilesAEnviar);
    console.log("currency:", 'UF');
    console.log("service:", quotationData.selectedService.id);
    console.log("otherCosts:", quotationData.otherCosts);
    console.log("endDate:", fechaCiereStamp);
    console.log("deliveryDate:", fechaEntregaStamp);
    // console.log("status:", quotationData.status);
    handleGetCart();
    }, []);

  const handleGetCart = async () => {
    try {
      const response = await axios.post('https://legitbusiness.me/api/cart', {
        risk: quotationData.selectedRisk,
        profiles: perfilesAEnviar,
        discountPercentage: parseInt(quotationData.discountValue),
        proyectDuration: quotationData.duracionProyecto,
        otherCosts: parseInt(quotationData.otherCosts),
        clientId: quotationData.selectedClient.id,
      });
      console.log("Carrito");
      console.log(response.data);
      setTarifaFinal(response.data.total);
      setTarifaSinDescuento(response.data.tarifa);
      setTarifaMensualSinDescuento(response.data.mensual);
    } catch (error) {
      console.error("Error al cargar los detalles del carrito", error);
    }
  };

  const handleCreateQuotation = async () => {
    try {
      // Realiza la solicitud POST
      const response = await axios.post('https://legitbusiness.me/api/quotes', {
        "clientId": quotationData.selectedClient.id,
        "contactId": quotationData.selectedCounterpart.id, // id contacto contraparte
        "idProyecto": quotationData.nombreCotizacion,
        "risk": quotationData.selectedRisk, // alto, medio, bajo
        "porcentajeDescuento": parseInt(quotationData.discountValue), // Entre 0 y 100
        "proyectDuration": quotationData.duracionProyecto, //en meses
        "userId": quotationData.userId,
        "perfiles": perfilesAEnviar, // array de objetos [perfil, costo]
        // "adicionales": quotationData.selectedExtraItems, // array de arrays [nombre, costo]
        "currency": 'UF', 
        "service": quotationData.selectedService.id, 
        "otherCosts": parseInt(quotationData.otherCosts),
        "endDate": fechaCiereStamp,
        "deliveryDate": fechaEntregaStamp,
      } );
    
      // Verifica si la solicitud fue exitosa
      if (response.data.quoteId) {
        // Muestra un mensaje de éxito
        Alert.alert("Cotización creada", "La cotización se ha creado correctamente.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ResumenesCotizaciones",{
              userId: quotationData.userId,
            })
          }
        ]);
      } else {
        // Muestra un mensaje de error si no se pudo crear la cotización
        Alert.alert("Error", "Ocurrió un error al crear la cotización. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.log(error.response);
      console.error("Error al crear la cotización:", error);
      // Muestra un mensaje de error en caso de una excepción
      Alert.alert("Error", "Ocurrió un error al crear la cotización. Por favor, inténtalo de nuevo.");
    }
  };

  const handleEditQuotation = async () => {
    try {
      // Realiza la solicitud POST
      const response = await axios.post(`https://legitbusiness.me/api/quotes/update/${quotationData.id}`, {
        "clientId": quotationData.selectedClient.id,
        "contactId": quotationData.selectedCounterpart.id, // id contacto contraparte
        "idProyecto": quotationData.nombreCotizacion,
        "risk": quotationData.selectedRisk, // alto, medio, bajo
        "porcentajeDescuento": parseInt(quotationData.discountValue), // Entre 0 y 100
        "proyectDuration": quotationData.duracionProyecto, //en meses
        "userId": quotationData.userId,
        "perfiles": perfilesAEnviar, // array de objetos [perfil, costo]
        // "adicionales": quotationData.selectedExtraItems, // array de arrays [nombre, costo]
        "currency": 'UF', 
        // "service": quotationData.selectedService.id, 
        "otherCosts": parseInt(quotationData.otherCosts),
        "endDate": fechaCiereStamp,
        "deliveryDate": fechaEntregaStamp,
        "status": quotationData.status,
      } );
    
      // Verifica si la solicitud fue exitosa
      console.log(response.status);
      if (response.status == 200) {
        // Muestra un mensaje de éxito
        Alert.alert("Cotización creada", "La cotización se ha editado correctamente.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ResumenesCotizaciones",{
              userId: quotationData.userId,
            })
          }
        ]);
      } else {
        // Muestra un mensaje de error si no se pudo editar la cotización
        Alert.alert("Error", "Ocurrió un error al editar la cotización. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.log(error.response);
      console.error("Error al editar la cotización:", error);
      // Muestra un mensaje de error en caso de una excepción
      Alert.alert("Error", "Ocurrió un error al editar la cotización. Por favor, inténtalo de nuevo.");
    }
  };

  const handleBack = () => {
    navigation.navigate('Fechas', {
      ...route.params,
      quotationData
    });
  }

  return (
    <SafeAreaView>
      <View style={reviewQuotationStyles.mainContainer}>
      <View style={quotationDetailsStyles.titleContainer}>

        <FAIcon 
          name='arrow-left' 
          size={quotationDetailsStyles.titleBackIcon.size} 
          style={{'color': 'white'}}
          onPress={() => navigation.goBack()}
          /> 
        <Text style={quotationDetailsStyles.titleText}>
          DETALLE DE LA COTIZACIÓN 
        </Text>
        <View></View>
        </View>
        
        <View style={reviewQuotationStyles.detailsContainer}>
          <ScrollView>
            <View style={reviewQuotationStyles.detailsInfoContainer}>
              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Nombre: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.nombreCotizacion} </Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Cliente: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.selectedClient.name} </Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Contraparte: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.selectedCounterpart.name} </Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Servicio: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.selectedService.type} </Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                  <Text style={reviewQuotationStyles.textAtribute}>Fecha de entrega cliente: </Text>
                  <Text style={reviewQuotationStyles.textValue}>
                    {formatearFecha(quotationData.fechaEntrega)}
                    </Text>
                </View>

                <View style={reviewQuotationStyles.detailItem}>
                  <Text style={reviewQuotationStyles.textAtribute}>Fecha de Cierre: </Text>
                  <Text style={reviewQuotationStyles.textValue}>
                    {formatearFecha(quotationData.fechaCierre)}
                    </Text>
                </View>


              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Riesgo: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.selectedRisk} </Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Porcentaje de descuento: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.discountValue}% </Text>
              </View>

              <View style={reviewQuotationStyles.listContainer}>
                <Text style={reviewQuotationStyles.textAtribute}>Asignaciones: </Text>

                <View style={reviewQuotationStyles.listBody}>
                  {quotationData.selectedProfiles.map(([name, assignment, cost], index) => (
                    <View style={reviewQuotationStyles.profileListItem} key={index}>
                      <Text style={reviewQuotationStyles.profileItemTypeText}>{name} </Text>
                      <Text style={reviewQuotationStyles.profileItemPriceText}>{Math.floor((assignment * cost)/ 100)} UF</Text>
                      <Text style={reviewQuotationStyles.profileItemAssignationText}>{assignment} %</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Duración del proyecto: </Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.duracionProyecto} Meses</Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Monto extra mensual:</Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.otherCosts} UF</Text>
              </View>

              {quotationData.id? <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Estado:</Text>
                <Text style={reviewQuotationStyles.textValue}>{quotationData.status}</Text>
              </View>: null}

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Total por mes:</Text>
                <Text style={reviewQuotationStyles.textValue}>{tarifaMensualSinDescuento} UF</Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Tarifa:</Text>
                <Text style={reviewQuotationStyles.textValue}>{tarifaSinDescuento} UF</Text>
              </View>

              <View style={reviewQuotationStyles.detailItem}>
                <Text style={reviewQuotationStyles.textAtribute}>Descuento</Text>
                <Text style={reviewQuotationStyles.textValue}>{tarifaSinDescuento - tarifaFinal} UF</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={reviewQuotationStyles.totalPriceContainer}>
            <Text style={quotationDetailsStyles.totalPriceTitle}>Total:</Text>
            <Text style={reviewQuotationStyles.totalPriceValue}>{tarifaFinal} UF</Text>
        </View>


        <View style={reviewQuotationStyles.buttonContainer}>
          {quotationData.id ? 
           <Button 
            title="Editar" 
            onPress={handleEditQuotation} 
            style={reviewQuotationStyles.button}
          />
          :
          <Button 
            title="Continuar 5/5" 
            onPress={handleCreateQuotation} 
            style={reviewQuotationStyles.button}
          />
          } 
        </View>
        </View>
    </SafeAreaView>
  );
};


export default RevisarCotizacion;
