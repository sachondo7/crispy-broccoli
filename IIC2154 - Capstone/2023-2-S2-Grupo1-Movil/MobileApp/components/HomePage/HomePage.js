import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Button from "../../components/Button/Button";
import homeStyles from "../../assets/styles/homeStyles";
import SessionHandler from "../../session/sessionHandler";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA6Icon from 'react-native-vector-icons/FontAwesome6';
import FeIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import FoundIcon from 'react-native-vector-icons/Foundation';
import axios from "axios";

const CotizacionesPorPagina = 7;
const dias_vencimiento = 5;

var cotizacionesPaginaActual = [];


const HomePage = ({ navigation, route }) => {

  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesMostradas, setCotizacionesMostradas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  console.log("Estoy en la pagina Home, parametros recibidos:", route.params);

  useEffect(() => {
    console.log("Estoy en la pagina Home, parametros recibidos:", route.params);
    if (!route.params) {
      if (SessionHandler.getUserId() != null) {
        console.log("Acutalizando el id del usuario " + userId + " desde sessionHandler")
        route.params = { ...route.params, userId: userId };
      }
      else if (userId != null) {
        console.log("Acutalizando el id del usuario " + userId + " desde el estado")
        route.params = { ...route.params, userId: userId };
      }
      else {
        console.log("No se pudo actualizar el id del usuario")
      }
    }
    const getUserId = async () => {
      const id = await SessionHandler.getUserId();
      setUserId(id);
    };
    getUserId();

    async function fetchCotizaciones() {
      try {
        const response = await axios.get(`https://legitbusiness.me/api/quotes/expire/${route.params.userId}/${dias_vencimiento}`);
        setCotizaciones(response.data);
        setCotizacionesMostradas(response.data);
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
      }
    }

    fetchCotizaciones();
  
  }, []);

  const handleCreateQuotation = () => {
    var quotationData = new Object();
    navigation.navigate("SeleccionarCliente", {
      ...route.params,
      quotationData,
    });
  }

  const HandleDetallesCotizaciones = ({cotizacionId}) => {
    navigation.navigate("DetallesCotizaciones", { IdCotizacion: cotizacionId, userId: userId});
  };

  const [userId, setUserId] = useState(null);

  cotizacionesPaginaActual = cotizacionesMostradas.slice(
    (paginaActual - 1) * CotizacionesPorPagina,
    paginaActual * CotizacionesPorPagina
  );


  const formatearFecha = (fecha) => {
    var dateWithoutTime = fecha.split("T")[0];
    return dateWithoutTime.toLocaleString();
  };

  return (
    <View style={homeStyles.mainContainer}>
      <View style={homeStyles.dashboardTitleContainer}>
        <Text style={homeStyles.dashboardTitle}>DASHBOARD</Text>
        <View style={homeStyles.dashboardDescription}>
          <FeIcon 
            name="info" 
            size={homeStyles.dashboardIcon.size} 
            color={homeStyles.dashboardIcon.color} 
          />
          <Text style={homeStyles.dashboardDescriptionText}>
            Cotizaciones próximas a vencer
          </Text>
        </View>
      </View>
      <ScrollView style={homeStyles.quotationsContainer}>
        {cotizacionesPaginaActual.map((item, index) => (
                
        <TouchableOpacity 
          key={item.id}
          onPress={() => HandleDetallesCotizaciones({cotizacionId: item.id})} 
          style={homeStyles.listItem}
        >
          <View style={homeStyles.listItemTitleContainer}>
            <Text style={homeStyles.listItemTitle}>
              {item.idProyecto}
            </Text>
            <Text style={homeStyles.listItemDate}>
              {formatearFecha(item.startDate)}
            </Text>
          </View>
          <View style={homeStyles.listItemBody}>
            <View style={homeStyles.listTextItem}>
              <FAIcon 
                name="building" 
                size={homeStyles.listItemIcon.size} 
                color={homeStyles.listItemIcon.color} 
              />
              <Text style={homeStyles.listTextValue}>
                {item.clientId.name}
              </Text>
            </View>
            <View style={homeStyles.listTextItem}>
              <FAIcon 
                name="user" 
                size={homeStyles.listItemIcon.size} 
                color={homeStyles.listItemIcon.color} 
              />
              <Text style={homeStyles.listTextValue}>
                {item.contactId.name}
              </Text>
            </View>
            <View style={homeStyles.listTextItem}>
              <EIcon 
                name="briefcase" 
                size={homeStyles.listItemIcon.size} 
                color={homeStyles.listItemIcon.color} 
              />
              <Text style={homeStyles.listTextValue}>
                {item.tariffId.serviceId.type}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}


        {cotizacionesMostradas.length > CotizacionesPorPagina * paginaActual && (
          <Button
            title="Ver más"
            onPress={() => setPaginaActual(paginaActual + 1)}
            style={homeStyles.seeMoreButton}
          />
        )}
      </ScrollView>
      <View style={homeStyles.navbar}>
        <TouchableOpacity 
          onPress={handleCreateQuotation}
          style={homeStyles.navbarIconContainer}
          >
          <FA6Icon
            name="diagram-project"
            size={homeStyles.navbarIconSize}
            color={homeStyles.iconColor}
          />
          <Text style={homeStyles.iconText}>Nueva Cotización</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate("ResumenesCotizaciones", {
                ...route.params,
              });
            }}
          style={homeStyles.navbarIconContainer}
          >
          <FoundIcon
            name="projection-screen"
            size={homeStyles.navbarIconSize}
            color={homeStyles.iconColor}
          />
          <Text style={homeStyles.iconText}>Ver Cotizaciones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;