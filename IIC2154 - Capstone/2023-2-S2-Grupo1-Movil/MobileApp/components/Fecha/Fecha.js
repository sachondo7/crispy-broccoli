import React, { useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from "../Button/Button";
import SelectDropdown from 'react-native-select-dropdown';
import setDatesStyles from "../../assets/styles/CreateQuotation/setDatesStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";

const Fecha = ({ navigation, route }) => {

  const quotationData = route.params.quotationData;
  
  const fechaActual = new Date();
  const fechaCierrePredeterminada = new Date();
  fechaCierrePredeterminada.setMonth(fechaActual.getMonth() + 1);
  // fechaCierrePredeterminada.setDate(fechaActual.getDate() + 1);

  const [duracionProyecto, setDuracionProyecto] = useState(1); // Duración predeterminada de 1 mes
  const [fechaCierre, setFechaCierre] = useState(fechaCierrePredeterminada); // Fecha de cierre predeterminada (un mes y un dia mas)
  const [fechaEntrega, setFechaEntrega] = useState(fechaCierrePredeterminada); // Fecha de entrega predeterminada (un mes y un dia mas)

  const fechaCierreString = fechaCierre.toISOString();
  const fechaEntregaString = fechaEntrega.toISOString();

  const [showFechaCierre, setShowFechaCierre] = useState(false);
  const [showFechaEntrega, setShowFechaEntrega] = useState(false);

  const [fechaCierreDisplay, setFechaCierreDisplay] = useState(fechaCierrePredeterminada.toDateString());
  const [fechaEntregaDisplay, setFechaEntregaDisplay] = useState(fechaCierrePredeterminada.toDateString());

  const [otherCostsValue, setOtherCostsValue] = useState(0);

  useEffect(() => {
    console.log('Estoy en la vista Fechas \n parametros recibidos:', route.params);
    if (quotationData.duracionProyecto) {
      setDuracionProyecto(quotationData.duracionProyecto);
    }
    if (quotationData.fechaCierre) {
      setFechaCierre(new Date(quotationData.fechaCierre));
      setFechaCierreDisplay(new Date(quotationData.fechaCierre).toDateString());
    }
    if (quotationData.fechaEntrega) {
      setFechaEntrega(new Date(quotationData.fechaEntrega));
      setFechaEntregaDisplay(new Date(quotationData.fechaEntrega).toDateString());
    }
    if (quotationData.otherCosts) {
      setOtherCostsValue(quotationData.otherCosts);
    }
  }, [route.params]);

  const onChangeFechaCierre = (event, selectedDate) => {
    const currentDate = selectedDate || fechaCierre;
    setShowFechaCierre(Platform.OS === 'ios');
    setFechaCierre(currentDate);

    setFechaCierreDisplay(currentDate.toDateString());
  };

  const onChangeFechaEntrega = (event, selectedDate) => {
    const currentDate = selectedDate || fechaEntrega;
    setShowFechaEntrega(Platform.OS === 'ios');
    setFechaEntrega(currentDate);

    setFechaEntregaDisplay(currentDate.toDateString());
  };

  const showFechaCierrePicker = () => {
    setShowFechaCierre(true);
  };

  const showFechaEntregaPicker = () => {
    setShowFechaEntrega(true);
  };

  const handleNext = () => {
    quotationData.duracionProyecto = duracionProyecto;
    quotationData.fechaCierre = fechaCierreString;
    quotationData.fechaEntrega = fechaEntregaString;

    navigation.navigate("RevisarCotizaciones", {
        ...route.params, 
        quotationData,
      });
  };


  const handleBack = () => {
    if (duracionProyecto) {
      quotationData.duracionProyecto = duracionProyecto;
    }
    if (fechaCierreString) {
      quotationData.fechaCierre = fechaCierreString;
    }
    if (fechaEntregaString) {
      quotationData.fechaEntrega = fechaEntregaString;
    }

    navigation.navigate("AsignarRiesgo", {
        ...route.params, 
        quotationData,
      });
  };

  const numberOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  useEffect(() => {
    console.log('Estoy en la vista Fechas \n parametros recibidos:', route.params);
  });

  return (
    <SafeAreaView>
      <View style={setDatesStyles.mainContainer}>
        <View style={setDatesStyles.titleContainer}>
          <Text style={clientFormStyles.titleText}>
            <Text> <Icon name='arrow-left' size={18}  style={{color:'#FFFFFF'}} onPress={() => handleBack()}/> </Text>
            {'           '} NUEVA COTIZACIÓN {'           '}
            <Text> <Icon name='close' size={18}  style={{color:'#FFFFFF'}} onPress={() => {
              quotationData.id ? navigation.navigate('DetallesCotizaciones', { IdCotizacion: quotationData.id }) :
              navigation.navigate('Home', { ...route.params });
            }} /> </Text>
          </Text>
        </View>
        <ScrollView>
        <View style={setDatesStyles.formContainer}>
          <View style={setDatesStyles.form}>
            <Text style={setDatesStyles.title}>
                  Duración del Proyecto (meses):
                  {!duracionProyecto && (
                    <View style={setDatesStyles.alertContainer}>
                      <Text style={setDatesStyles.asterisk}>*</Text>
                      <Text style={setDatesStyles.alertMessage}>Recuerde rellenar este campo</Text>
                    </View>
                  )}
              </Text>
              <SelectDropdown
                defaultButtonText={duracionProyecto ? duracionProyecto : "Duración del proyecto"}
                buttonTextStyle={{
                  fontSize: 16,
                  color: duracionProyecto ? '#000' : "#999",
                }}
                data={numberOptions} // Utiliza numberOptions aquí
                onSelect={(selectedItem, index) => {
                  setDuracionProyecto(selectedItem);
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.toString(); // Asegúrate de convertir el número a string si es necesario
                }}
                rowTextForSelection={(item, index) => {
                  return item.toString(); // Asegúrate de convertir el número a string
                }}
                buttonStyle={riskFormStyles.dropdown}
                renderDropdownIcon={() => {
                  return <FontAwesome name={'chevron-down'} color={'#444'} size={18} />;
                }}
                search
                searchPlaceHolder={'Busque aquí'}
                searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return <FontAwesome name={'search'} color={'#444'} size={18} />;
                }}
              />
          </View>

          <View style={setDatesStyles.form}>
            <Text style={setDatesStyles.title}>
              Fecha de entrega cliente:
            </Text>
            <TouchableOpacity style={setDatesStyles.datePicker} onPress={showFechaEntregaPicker}>
              <Text style={setDatesStyles.dateText}>
                {fechaEntregaDisplay ? fechaEntregaDisplay : 'Seleccionar Fecha'}
              </Text>
              <FontAwesome name={'calendar'} size={18} color={'#444'} />
            </TouchableOpacity>
            {showFechaEntrega && (
              <DateTimePicker
                value={fechaEntrega} // Asigna la fecha de entrega
                mode="date"
                display="default"
                onChange={onChangeFechaEntrega}
              />
            )}
          </View>

          <View style={setDatesStyles.form}>
            <Text style={setDatesStyles.title}>
                Fecha de Cierre:
            </Text>
                <TouchableOpacity style={setDatesStyles.datePicker} onPress={showFechaCierrePicker}>
                  <Text style={setDatesStyles.dateText}>
                    {fechaCierreDisplay ? fechaCierreDisplay : 'Seleccionar Fecha'}
                  </Text>
                  <FontAwesome name={'calendar'} size={18} color={'#444'} />
                </TouchableOpacity>
                {showFechaCierre && (
                  <DateTimePicker
                    value={fechaCierre}
                    mode="date"
                    display="default"
                    onChange={onChangeFechaCierre}
                  />
                )}
          </View>



          

          
          
        </View>
        </ScrollView>
        <View style={setDatesStyles.buttonContainer}>
          <Button 
            title="Continuar 4/5" 
            onPress={handleNext} 
            style={setDatesStyles.button}
          />
        </View>
      </View> 
    </SafeAreaView>
  );
};



export default Fecha;
