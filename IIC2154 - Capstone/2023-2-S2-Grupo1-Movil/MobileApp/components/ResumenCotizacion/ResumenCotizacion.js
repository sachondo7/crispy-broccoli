import React, { useState, useEffect, setState } from "react";
import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import axios from "axios";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FeIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import FoundIcon from 'react-native-vector-icons/Foundation';
import filter from "lodash.filter";
import SessionHandler from "../../session/sessionHandler";

import quotationsResumeStyles from "../../assets/styles/quotationsResumeStyles";

import Button from "../Button/Button";
import FilterModalWindow from "./FilterModal";


const CotizacionesPorPagina = 7;

var cotizacionesPaginaActual = [];

var searchOn = false;

const ResumenCotizacion = ({navigation, route}) => {

  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesMostradas, setCotizacionesMostradas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryClient, setSearchQueryClient] = useState('');
  const [searchForName, setSearchForName] = useState(false);
  const [searchForClient, setSearchForClient] = useState(false);
  const [filters, setFilters] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Seleccione un filtro');
  const [modalVisible, setModalVisible] = useState(false);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  useEffect(() => {
    console.log('Estoy en la vista ResumenCotizacion \n parametros recibidos:', route.params);
    async function fetchCotizaciones() {
      console.log("Estoy en la pagina ResumenCotizacion \n parametros recibidos:", route.params);
      try {
        const response = await axios.get("https://legitbusiness.me/api/quotes");
        setCotizaciones(response.data);
        if (!SessionHandler.getIsAdmin()) {
          const cotizacionesUsuario = response.data.filter(cotizacion => cotizacion.userId.id === route.params.userId);
          setCotizacionesMostradas(cotizacionesUsuario);
        } else {
          setCotizacionesMostradas(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
      }
    }

    fetchCotizaciones();
  }, [route.params.userId]);

  const handleSearchName = (query) => {
    searchOn = true;
    setFilters(false);
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(cotizaciones, (cotizacion) => {
      return contains(cotizacion, formattedQuery);
    });
      setCotizacionesMostradas(filteredData);
  };

  const contains = ({id, startDate, endDate, idProyecto}, query) => {
    lowerIdProyecto = idProyecto.toLowerCase();
    if (lowerIdProyecto.includes(query)) {
      return true;
    }
    return false;
  };

  const handleSearchClient = (query) => {
    searchOn = true;
    setFilters(false);
    setSearchQueryClient(query);
    const formattedQueryClient = query.toLowerCase();
    const filteredDataClient = filter(cotizaciones, (cotizacion) => {
      return containsClient(cotizacion, formattedQueryClient);
    });
      setCotizacionesMostradas(filteredDataClient);
  };

  const containsClient = ({id, startDate, endDate, idProyecto, clientId}, query) => {
    lowerClient = clientId.name.toLowerCase();
    if (lowerClient.includes(query)) {
      return true;
    }
    return false;
  };

  const HandleDetallesCotizaciones = ({cotizacionId}) => {
    navigation.navigate("DetallesCotizaciones", { IdCotizacion: cotizacionId,
    userId: route.params.userId });
  };

  const HandleCrearCotizacion = () => {
    var quotationData = new Object();
    navigation.navigate("SeleccionarCliente",{
      ...route.params,
      quotationData,
    });
  };

  const HandleBuscarCotizacionPorCliente = () => {
    setSearchForClient(true);
  };

  const HandleBuscarCotizacionPorNombre = () => {
    setSearchForName(true);
  };

  const HandleOrdenarCotizacionesPorFechaInicioNew = () => {
    cotizaciones.sort(function(a, b){
      var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
      return dateB - dateA;
    });
    setCotizacionesMostradas(cotizaciones);
    const pag = paginaActual
    setPaginaActual(pag);
    setFilters(false);
  };

  const HandleOrdenarCotizacionesPorFechaInicioOld = () => {
    cotizaciones.sort(function(a, b){
      var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
      return dateA - dateB;
    });
    setCotizacionesMostradas(cotizaciones);
    const pag = paginaActual
    setPaginaActual(pag);
    setFilters(false);
  };

  const HandleOrdenarCotizacionesPorFechaFinNew = () => {
    cotizaciones.sort(function(a, b){
      var dateA = new Date(a.endDate), dateB = new Date(b.endDate);
      return dateB - dateA;
    });
    setCotizacionesMostradas(cotizaciones);
    const pag = paginaActual
    setPaginaActual(pag);
    setFilters(false);
  };

  const HandleOrdenarCotizacionesPorFechaFinOld = () => {
    cotizaciones.sort(function(a, b){
      var dateA = new Date(a.endDate), dateB = new Date(b.endDate);
      return dateA - dateB;
    });
    setCotizacionesMostradas(cotizaciones);
    const pag = paginaActual
    setPaginaActual(pag);
    setFilters(false);
  };

  const HandleFilter = () => {
    setModalVisible(true);
  };

  const handleOrder = (order) => {
    console.log(order);
    if (order === "newest") {
      HandleOrdenarCotizacionesPorFechaInicioNew();
    }
    if (order === "oldest") {
      HandleOrdenarCotizacionesPorFechaInicioOld();
    }
    if (order === "closest") {
      HandleOrdenarCotizacionesPorFechaFinNew();
    }
    if (order === "farthest") {
      HandleOrdenarCotizacionesPorFechaFinOld();
    }
  }

  const handleClearFilters = () => {
    setFilters(false);
    setFiltered(false);
    setPaginaActual(1);
    setSearchForName(false);
    setSearchForClient(false);
    setSearchQuery('');
    setSearchQueryClient('');
    setCotizacionesMostradas(cotizaciones);
  }

  const handleSearch = (searchField, value) => {
    console.log("searching projects " + searchField + " " + value);
    if (searchField === 'proyect') {
      const filteredData = filter(cotizaciones, (cotizacion) => {
        return contains(cotizacion, value.toLowerCase());
      });
      setCotizacionesMostradas(filteredData);
    } else if (searchField === 'client') {
      const filteredData = filter(cotizaciones, (cotizacion) => {
        return containsClient(cotizacion, value.toLowerCase());
      });
      setCotizacionesMostradas(filteredData);
    }
    setModalVisible(false);
  }


cotizacionesPaginaActual = searchOn ? cotizacionesMostradas : cotizacionesMostradas.slice(
    (paginaActual - 1) * CotizacionesPorPagina,
    paginaActual * CotizacionesPorPagina
  );

  const formatearFecha = (fecha) => {
    var dateWithoutTime = fecha.split("T")[0];
    console.log(dateWithoutTime)

    return dateWithoutTime.toLocaleString();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
      >
      <SafeAreaView style={quotationsResumeStyles.mainContainer}>
        <View style={quotationsResumeStyles.buttonsContainer}>
          <TouchableOpacity onPress={HandleFilter} style={quotationsResumeStyles.filterButton}>
            <FAIcon 
              name="filter" 
              size={25} 
              color="#4f81ff" 
            />
            <Text style={quotationsResumeStyles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => HandleCrearCotizacion()} style={quotationsResumeStyles.newQuotationButton}>
            <Text style={quotationsResumeStyles.newQuotationButtontext}>Nueva Cotización</Text>
            <FeIcon name="plus" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView style={quotationsResumeStyles.quotationsContainer}>
          {cotizacionesPaginaActual.map((item, index) => (
                  
          <TouchableOpacity 
            key={item.id}
            onPress={() => HandleDetallesCotizaciones({cotizacionId: item.id})} 
            style={quotationsResumeStyles.listItem}
          >
            <View style={quotationsResumeStyles.listItemTitleContainer}>
              <Text style={quotationsResumeStyles.listItemTitle}>
                {item.idProyecto}
              </Text>
              <Text style={quotationsResumeStyles.listItemDate}>
                {formatearFecha(item.startDate)}
              </Text>
            </View>
            <View style={quotationsResumeStyles.listItemBody}>
              <View style={quotationsResumeStyles.listTextItem}>
                <FAIcon 
                  name="building" 
                  size={quotationsResumeStyles.listItemIcon.size} 
                  color={quotationsResumeStyles.listItemIcon.color} 
                />
                <Text style={quotationsResumeStyles.listTextValue}>
                  {item.clientId.name}
                </Text>
              </View>
              <View style={quotationsResumeStyles.listTextItem}>
                <FAIcon 
                  name="user" 
                  size={quotationsResumeStyles.listItemIcon.size} 
                  color={quotationsResumeStyles.listItemIcon.color} 
                />
                <Text style={quotationsResumeStyles.listTextValue}>
                  {item.contactId.name}
                </Text>
              </View>
              <View style={quotationsResumeStyles.listTextItem}>
                <EIcon 
                  name="briefcase" 
                  size={quotationsResumeStyles.listItemIcon.size} 
                  color={quotationsResumeStyles.listItemIcon.color} 
                />
                <Text style={quotationsResumeStyles.listTextValue}>
                  {item.tariffId.serviceId.type}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}


          {cotizacionesMostradas.length > CotizacionesPorPagina * paginaActual && !searchOn && (
            <Button
              title="Ver más"
              onPress={() => setPaginaActual(paginaActual + 1)}
              style={quotationsResumeStyles.button}
            />
          )}
        </ScrollView>
        <View style={quotationsResumeStyles.navbar}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Home", {userId: route.params.userId})}
            style={quotationsResumeStyles.homeIconContainer}
            >
            <FoundIcon
              name="home"
              size={quotationsResumeStyles.homeIconSize}
              color={quotationsResumeStyles.iconColor}
            />
            <Text style={quotationsResumeStyles.iconText}>Inicio</Text>
          </TouchableOpacity>
        </View>
        <FilterModalWindow
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleOrder={handleOrder}
            handleSearch={handleSearch}
            handleClear={handleClearFilters}
          />
      </SafeAreaView>
    </KeyboardAvoidingView>

  );
};

export default ResumenCotizacion;
