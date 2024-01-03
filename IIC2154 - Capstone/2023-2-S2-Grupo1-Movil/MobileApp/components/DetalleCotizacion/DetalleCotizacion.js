import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView , Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import FoundIcon from 'react-native-vector-icons/Foundation';
import SIIcons from 'react-native-vector-icons/SimpleLineIcons';
import SelectDropdown from 'react-native-select-dropdown';
import Button from "../Button/Button";
import quotationDetailsStyles from "../../assets/styles/quotationDetailsStyles";

const DetalleCotizacion = ({ route, navigation }) => {

  const { IdCotizacion } = route.params;
  var { userId } = route.params;
  const [cotizacion, setCotizacion] = useState(null);
  const [isCotizacionEliminada, setIsCotizacionEliminada] = useState(false);
  const [isOptionIconPressed, setIsOptionIconPressed] = useState(false);
  var quotationData = new Object();

  console.log("paramterosssss", route.params);

  const cargarDetalleCotizacion = async () => {
    try {
      const response = await axios.get(`https://legitbusiness.me/api/quotes/${IdCotizacion}`);
      const cotizacionData = response.data;
      setCotizacion(cotizacionData);
      console.log("Datos de la cotización:");
      console.log(cotizacionData);
      console.log("Datos de la deduc:");
      console.log(cotizacionData.tariffId.deductions);
      console.log("Tarifa");
      console.log(cotizacionData.tariffId);
    } catch (error) {
      console.error("Error al cargar los detalles de la cotización:", error);
    }
  };

  const handleEditCotizacion = () => {
    console.log("Datos de la cotización:", cotizacion);
    console.log(cotizacion.tariffId.deductions);
    console.log(cotizacion.tariffId.profiles);
    userId = cotizacion.userId.id;
    quotationData.nombreCotizacion = cotizacion.idProyecto;
    quotationData.selectedService = cotizacion.tariffId.serviceId;
    quotationData.selectedClient = cotizacion.clientId;
    quotationData.selectedCounterpart = cotizacion.contactId;
    quotationData.selectedProfiles = [];
    cotizacion.tariffId.profiles.forEach(perfil => {
      quotationData.selectedProfiles.push([perfil.role, perfil.hourAssignment, perfil.costperhour]);
    })
    if (cotizacion.tariffId.risk == 10) {
      quotationData.selectedRisk = "Bajo";
    }
    else if (cotizacion.tariffId.risk == 20) {
      quotationData.selectedRisk = "Medio";
    }
    else if (cotizacion.tariffId.risk == 30) {
      quotationData.selectedRisk = "Alto";
    } 
    quotationData.discountValue = cotizacion.tariffId.deductions[0].percentage;
    quotationData.duracionProyecto = cotizacion.tariffId.proyectDuration;
    quotationData.fechaEntrega = cotizacion.deliveryDate;
    quotationData.fechaCierre = cotizacion.endDate;
    quotationData.otherCosts = cotizacion.tariffId.otherCosts;
    quotationData.id = cotizacion.id;
    quotationData.status = cotizacion.status;

    navigation.navigate("SeleccionarCliente", {
      ...route.params,
      quotationData,
      userId
    });
  };


  const handleOptionIconPress = () => {
    setIsOptionIconPressed(!isOptionIconPressed);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem == "Editar")
    {
      handleEditCotizacion();
    }
    else
    {
      handleDeleteCotizacion();
    }
  }

  

  const handleDeleteCotizacion = async () => {
    Alert.alert(
      "Confirmación",
      "¿Seguro que deseas eliminar esta cotización?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await axios.delete(`https://legitbusiness.me/api/quotes/${IdCotizacion}`);
              setIsCotizacionEliminada(true);
              Alert.alert("Cotización eliminada", "La cotización se ha eliminado correctamente.")
              navigation.navigate("Home", {userId: userId})
            } catch (error) {
              console.error("Error al eliminar la cotización:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    console.log('Estoy en la vista detallesCotizaciones \n parametros recibidos:', route.params);
    const unsubscribe = navigation.addListener('focus', () => {
      cargarDetalleCotizacion();
    });
    return () => unsubscribe();
  }, [IdCotizacion]);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateStr).toLocaleDateString('es-ES', options);
    return formattedDate;
  };

  if (!cotizacion) {
    return (
      <SafeAreaView>
        <Text>Cargando detalles de la cotización...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={quotationDetailsStyles.mainContainer}>
        <View style={quotationDetailsStyles.formContainer}>
          <View style={quotationDetailsStyles.titleContainer}>

              <Icon 
                name='arrow-left' 
                size={quotationDetailsStyles.titleBackIcon.size} 
                style={{'color': 'white'}}
                onPress={() => navigation.goBack()}
                /> 
              <Text style={quotationDetailsStyles.titleText}>
                DETALLE DE LA COTIZACIÓN 
              </Text>
              <SIIcons 
                name='options-vertical'
                size={quotationDetailsStyles.titleBackIcon.size}
                style={{'color': 'white'}}
                onPress={handleOptionIconPress}
              />
          </View>
          {isOptionIconPressed && (
              <View style={quotationDetailsStyles.optionsMenuContainer}>
                  <TouchableOpacity 
                    style={quotationDetailsStyles.optionMenuOptionIconContainer}
                    onPress={handleOptionIconPress}
                    >
                    <SIIcons 
                      name='options-vertical'
                      size={quotationDetailsStyles.optionMenuOptionIcon.size}
                      color={quotationDetailsStyles.optionMenuOptionIcon.color}
                      onPress={handleOptionIconPress}
                    />

                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={quotationDetailsStyles.optionMenuOptionContainer}
                    onPress={() => handleSelection("Editar")}
                    >
                      <FAIcon
                        name="pencil"
                        size={quotationDetailsStyles.optionMenuOptionIcon.size}
                        color={quotationDetailsStyles.optionMenuOptionIcon.color}
                      />
                      <Text style={quotationDetailsStyles.optionMenuOptionText}>Editar</Text>

                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={quotationDetailsStyles.optionMenuOptionContainer}
                    onPress={() => handleSelection("Eliminar")}
                    >
                    <MatIcon
                      name="delete"
                      size={quotationDetailsStyles.optionMenuOptionIcon.size}
                      color={quotationDetailsStyles.optionMenuOptionIcon.color}
                    />
                    <Text style={quotationDetailsStyles.optionMenuOptionText}>Eliminar</Text>

                  </TouchableOpacity>
              </View>
          )}

          <View style={quotationDetailsStyles.detailsContainer}>
            <ScrollView>
              <View style={quotationDetailsStyles.detailsInfoContainer}>
                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Nombre: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.idProyecto} </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Cliente: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.clientId.name} </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Contraparte: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.contactId.name} </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Fecha de entrega cliente: </Text>
                  <Text style={quotationDetailsStyles.textValue}>
                    {formatDate(cotizacion.deliveryDate)}
                  </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Fecha de cierre: </Text>
                  <Text style={quotationDetailsStyles.textValue}>
                    {formatDate(cotizacion.endDate)}
                    </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Servicio: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.serviceId.type} </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Riesgo: </Text>
                  {cotizacion.tariffId.risk == 10 ? 
                  <Text style={quotationDetailsStyles.textValue}> Bajo </Text>
                  : null}
                  {cotizacion.tariffId.risk == 20 ? 
                  <Text style={quotationDetailsStyles.textValue}> Medio </Text>
                  : null}
                  {cotizacion.tariffId.risk == 30 ? 
                  <Text style={quotationDetailsStyles.textValue}> Alto </Text>
                  : null}
                  {cotizacion.tariffId.risk == 0 ? 
                  <Text style={quotationDetailsStyles.textValue}> Sin Riesgo </Text>
                  : null}
                  
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Porcentaje Descuento: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.deductions[0].percentage}% </Text>
                </View>

                <View style={quotationDetailsStyles.listContainer}>
                  <Text style={quotationDetailsStyles.textAtribute}>Asignaciones: </Text>


                  <View style={quotationDetailsStyles.listBody}>
                    {cotizacion.tariffId.profiles.map((perfil, index) => (
                      <View style={quotationDetailsStyles.profileListItem} key={`${perfil.role}_${index}`}>
                        <Text style={quotationDetailsStyles.profileItemTypeText}>{perfil.role}</Text>
                        <Text style={quotationDetailsStyles.profileItemPriceText}>{Math.floor((perfil.hourAssignment/100) * perfil.costperhour)} UF</Text>
                        <Text style={quotationDetailsStyles.profileItemAssignationText}>{perfil.hourAssignment} %</Text>
                      </View>
                    ))}
                  </View>

                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Duración del proyecto: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.proyectDuration} Meses</Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Monto extra mensual: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.otherCosts} UF</Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Estado: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.status} </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Total por mes: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.monthPrice} UF </Text>
                </View>

                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Tarifa: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.grossPrice} UF</Text>
                </View>
          
                <View style={quotationDetailsStyles.detailItem}>
                  <Text style={quotationDetailsStyles.textAtribute}>Descuento: </Text>
                  <Text style={quotationDetailsStyles.textValue}>{cotizacion.tariffId.grossPrice - cotizacion.tariffId.priceWhitDeduction} UF </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={quotationDetailsStyles.totalPriceContainer}>
            <Text style={quotationDetailsStyles.totalPriceTitle}>Total:</Text>
            <Text style={quotationDetailsStyles.totalPriceValue}>{cotizacion.tariffId.priceWhitDeduction} UF</Text>
          </View>
        </View>

        <View style={quotationDetailsStyles.navbar}>
          <TouchableOpacity 
            onPress={() => (
              navigation.navigate("Home", {userId: userId}))
            }
            style={quotationDetailsStyles.homeIconContainer}
            >
            <FoundIcon
              name="home"
              size={quotationDetailsStyles.homeIconSize}
              color={quotationDetailsStyles.iconColor}
            />
            <Text style={quotationDetailsStyles.iconText}>Inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetalleCotizacion;
