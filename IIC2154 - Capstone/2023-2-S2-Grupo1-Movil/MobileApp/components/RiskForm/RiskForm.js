import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, ScrollView, View, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import Button from '../Button/Button';
import riskFormStyles from '../../assets/styles/CreateQuotation/riskFormStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const RiskForm = ({ navigation, route }) => {

  const quotationData = route.params.quotationData;
  const [selectedRisk, setSelectedRisk] = useState('Seleccione un riesgo');
  const [riskOptions, setRiskOptions] = useState([]);
  const [discountValue, setDiscountValue] = useState('');
  const [otherCostsValue, setOtherCostsValue] = useState('');

  const statusOptions = ['Emitida', 'Enviada', 'Negociada', 'Adjudicada', 'Perdida']
  const [status, setStatus] = useState('');

  const [isRiskValid, setIsRiskValid] = useState(true);
  const [isTasaValid, setIsTasaValid] = useState(true);
  const [isOtherCostsValid, setIsOtherCostsValid] = useState(true);


  const handleNext = () => {
    let isValid = true;
    if (selectedRisk == 'Seleccione un riesgo') {
      setIsRiskValid(false);
      isValid = false;
    }
    else {
      setIsRiskValid(true);
    }
    if (discountValue == '') {
      setIsTasaValid(false);
      isValid = false;
    }
    else {
      setIsTasaValid(true);
    }
    if (otherCostsValue == '') {
      setIsOtherCostsValid(false);
      isValid = false;
    }
    else {
      setIsOtherCostsValid(true);
    }
    if (!isValid) {
      Alert.alert('Error', 'Debes llenar todos los campos.', [
        { text: 'OK', onPress: () => console.log('Alerta cerrada') },
      ]);
    }
    if (isValid) {
      quotationData.selectedRisk = selectedRisk;
      quotationData.discountValue = discountValue;
      quotationData.otherCosts = otherCostsValue;
      if (status != '') {
        quotationData.status = status;
      }
      navigation.navigate('Fechas', {
        ...route.params,
        quotationData
      });
    }
  };

  const handleBack = () => {
    if (selectedRisk != '') {
      quotationData.selectedRisk = selectedRisk;
    }
    if (discountValue != '') {
      quotationData.discountValue = discountValue;
    }
    if (quotationData.otherCosts != '') {
      quotationData.otherCosts = otherCostsValue;
    }
    navigation.navigate('CrearPerfil', {
      ...route.params,
      quotationData
    });
  };

  const setRisk = (risk) => {
    if (risk != 'Seleccione un riesgo') {
      setSelectedRisk(risk);
    }
  }

  const fetchRiskOptions = async () => {
    try {
      const response = await axios.get('https://legitbusiness.me/api/risks');
      const riskData = response.data;
      const riskTypes = Object.keys(riskData);
      setRiskOptions(riskTypes);
    } catch (error) {
      console.error('Error al obtener tipos de riesgos:', error);
    }
  };

  useEffect(() => {
    console.log('Estoy en la vista RiskForm \n parametros recibidos:', route.params);
    console.log(quotationData.selectedProfiles);
    fetchRiskOptions();
    if (quotationData.selectedRisk) {
      console.log("si hay riesgo");
      setRisk(quotationData.selectedRisk);
    }
    if (quotationData.discountValue || quotationData.discountValue == 0) {
      setDiscountValue(String(quotationData.discountValue));
    }
    if (quotationData.otherCosts || quotationData.otherCosts == 0) {
      setOtherCostsValue(String(quotationData.otherCosts));
    }
    if (quotationData.status) {
      setStatus(quotationData.status);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={riskFormStyles.mainContainer}>
        <View style={riskFormStyles.titleContainer}>
          <Text style={riskFormStyles.titleText}>
            <Text> <Icon name='arrow-left' size={18}  style={{color:'#FFFFFF'}} onPress={() => handleBack()}/> </Text>
            {'           '} NUEVA COTIZACIÓN {'           '}
            <Text> <Icon name='close' size={18}  style={{color:'#FFFFFF'}} onPress={() => {
              quotationData.id ? navigation.navigate('DetallesCotizaciones', { IdCotizacion: quotationData.id }) :
              navigation.navigate('Home', { ...route.params });
            }} /> </Text>
          </Text>
        </View>

        <ScrollView>
            <View style={riskFormStyles.formsContainer}>
              <View style={riskFormStyles.form}>
                <View style={riskFormStyles.itemTitleContainter}>
                  <Text style={riskFormStyles.title}>Riesgo:</Text>
                  {!isRiskValid && (
                    <View style={riskFormStyles.alertContainer}>
                      <Text style={riskFormStyles.asterisk}>*</Text>
                      <Text style={riskFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                    </View>
                  )}
                </View>
                <SelectDropdown
                  defaultButtonText={selectedRisk ? selectedRisk: "Seleccione un riesgo"}
                  buttonTextStyle={{fontSize: 16,
                  color: selectedRisk ? '#000' : "#999",}}
                  data={riskOptions}
                  onSelect={(selectedItem, index) => {
                    setRisk(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
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
              <View style={riskFormStyles.form}>
                <View style={riskFormStyles.itemTitleContainter}>
                  <Text style={riskFormStyles.title}>Porcentaje de Descuento:</Text>
                  {!isTasaValid && (
                      <View style={riskFormStyles.alertContainer}>
                        <Text style={riskFormStyles.asterisk}>*</Text>
                        <Text style={riskFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                      </View>
                    )}
                </View>
                <TextInput
                  style={riskFormStyles.input}
                  keyboardType={'numeric'}
                  placeholder={'%'}
                  placeholderTextColor="#999"
                  value={discountValue}
                  onChangeText={(text) => setDiscountValue(text)}
                  autoFocus={false}
                />
              </View>
              
              <View style={riskFormStyles.form}>
                <View style={riskFormStyles.itemTitleContainter}>
                  <Text style={riskFormStyles.title}>Monto extra mensual:</Text>
                  {!isOtherCostsValid && (
                      <View style={riskFormStyles.alertContainer}>
                        <Text style={riskFormStyles.asterisk}>*</Text>
                        <Text style={riskFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                      </View>
                    )}
                </View>
                <TextInput
                  keyboardType={'numeric'}
                  style={riskFormStyles.input}
                  placeholder={'Valor de otros costos '}
                  placeholderTextColor={'#999'}
                  value={otherCostsValue}
                  onChangeText={(text) => setOtherCostsValue(text)}
                  autoFocus={false}
                />
              </View>
              {quotationData.id ? 
              <View style={riskFormStyles.form}>
                <Text style={riskFormStyles.title}>
                {'Estado de la cotización'}
              </Text>
              <SelectDropdown
                defaultButtonText={status ? status: 'Seleccione un estado para la cotización'}
                data={statusOptions}
                onSelect={(selectedItem, index) => {
                  setStatus(selectedItem);
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={riskFormStyles.dropdown}
                search
                searchPlaceHolder={'Busque aquí'}
                searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return <FontAwesome name={'search'} color={'#444'} size={18} />;
                }}
              />
              </View> :
              null } 
                            
            </View>

        </ScrollView>
        <View style={riskFormStyles.buttonContainer}>
        <Button 
            title="Continuar 3/5" 
            onPress={handleNext} 
            style={clientFormStyles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RiskForm;
