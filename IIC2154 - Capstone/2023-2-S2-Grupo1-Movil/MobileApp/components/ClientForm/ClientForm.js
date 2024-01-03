import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, Alert, TextInput, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import Button from '../Button/Button';
import clientFormStyles from '../../assets/styles/CreateQuotation/clientFormStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ClientForm = ({ navigation, route }) => {
  
  const quotationData = route.params.quotationData;
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [counterparts, setCounterparts] = useState([]);
  const [selectedCounterpart, setSelectedCounterpart] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [NameValue, setNameValue] = useState('');
  const [isClientValid, setIsClientValid] = useState(true);
  const [isCounterpartValid, setIsCounterpartValid] = useState(true);
  const [isServiceValid, setIsServiceValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);

  const fetchServiceTypes = async (id) => {
    try {
      const response = await axios.get(`https://legitbusiness.me/api/services/${id}`);
      console.log('Id del cliente: ', id);
      const data = response.data;
      setServiceTypes(data);
    } catch (error) {
      console.error('Error al obtener los tipos de servicio:', error);
    }
  };

  const handleNext = () => {

    let isValid = true;

    if (!selectedClient) {
      setIsClientValid(false);
      isValid = false;
    }
    else {
      setIsClientValid(true);
    } 

    if (!selectedCounterpart) {
      setIsCounterpartValid(false);
      isValid = false;
    }
    else {
      setIsCounterpartValid(true);
    }

    if (!selectedService) {
      setIsServiceValid(false);
      isValid = false;
    } 
    else {
      setIsServiceValid(true);
    }

    if (!NameValue) {
      setIsNameValid(false);
      isValid = false;
    }
    else {
      setIsNameValid(true);
    }

    if (!isValid) {
      Alert.alert('Error', 'Debes llenar todos los campos.', [
        { text: 'OK', onPress: () => console.log('Alerta cerrada') },
      ]);
    }

    if (selectedClient && selectedCounterpart && selectedService && NameValue) {
      quotationData.selectedService = selectedService;
      quotationData.nombreCotizacion = NameValue;

      const clientInfo = clients.find(client => client.name === selectedClient[1]);
      quotationData.selectedClient = clientInfo;

      quotationData.counterparts = counterparts;

      const counterpartInfo = counterparts.find(counterpart => counterpart.name === selectedCounterpart[1]);

      if (counterpartInfo != undefined) {
        quotationData.selectedCounterpart = counterpartInfo;
      }
      quotationData.userId = route.params.userId;
      navigation.navigate('CrearPerfil', {
        ...route.params,
        quotationData,
      });
    } 
  };

  const handleBack = () => {
    if (selectedClient) {
      const clientInfo = clients.find(client => client.name === selectedClient[1]);
      quotationData.selectedClient = clientInfo;
      
      quotationData.counterparts = counterparts;
    };
    if (selectedCounterpart) {

      const counterpartInfo = counterparts.find(counterpart => counterpart.name === selectedCounterpart[1]);

      if (counterpartInfo != undefined) {
        quotationData.selectedCounterpart = counterpartInfo;
      }
    };

    navigation.navigate('Home', {
      ...route.params, 
      quotationData,
    });
  };

  const handleClient = async (cliente) => {
    console.log(cliente)
    if (selectedClient != cliente){
      setSelectedCounterpart(null);
    }
    setSelectedClient(cliente);
    const client = clients.find(client => client.name === cliente[1]);
    setCounterparts[[]];
    setSelectedCounterpart(null);
    setCounterparts(client.contacts);
    setSelectedService('');
    setServiceTypes([]);
    fetchServiceTypes(cliente[0]);
    if (quotationData.selectedProfiles) {
      quotationData.selectedProfiles = [];
    }
    
  }

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://legitbusiness.me/api/clients');
      const data = response.data;
      quotationData.clients = data;
      setClients(data);
      if (quotationData.selectedClient)
      {
        const client = data.find(client => client.name === quotationData.selectedClient.name);
        setCounterparts(client.contacts);
      }
      
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  useEffect(() => {
    console.log('Estoy en la vista ClientForm \n, Parametros recibidos:', quotationData);
    fetchClients();
    if (quotationData.selectedClient) {
      setSelectedClient([quotationData.selectedClient.id, quotationData.selectedClient.name]);
      setCounterparts(quotationData.counterparts);
    }
    if (quotationData.selectedCounterpart) {
      setSelectedCounterpart([quotationData.selectedCounterpart.id, quotationData.selectedCounterpart.name]);
    }
    if (quotationData.selectedService)
    {
      setSelectedService(quotationData.selectedService);
    }
    if (quotationData.nombreCotizacion)
    {
      setNameValue(quotationData.nombreCotizacion);
    }
  }, [route.params]);

  return (
    <SafeAreaView>
      <View style={clientFormStyles.mainContainer}>
        <View style={clientFormStyles.titleContainer}>
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
        <View style={clientFormStyles.formsContainer}>
        {quotationData.id ? null : 
          <View style={clientFormStyles.form}>
            <View style={clientFormStyles.itemTitleContainter}>
              <Text style={clientFormStyles.title}>Cliente:</Text>
              {!isClientValid && (
                  <View style={clientFormStyles.alertContainer}>
                    <Text style={clientFormStyles.asterisk}>*</Text>
                    <Text style={clientFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                  </View>
                )}
            </View>
            <SelectDropdown
              defaultButtonText={selectedClient ? selectedClient[1] : "Seleccionar cliente"}
              buttonTextStyle={{fontSize: 16, 
              color: selectedClient? "#000" : "#999"}} // Mostrar el nombre del cliente
              data={clients.map((client) => ([client.id, client.name]))}
              onSelect={(selectedItem) => {
                handleClient(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedClient ? selectedClient[1] : selectedItem; // Mostrar el nombre del cliente
              }}
              rowTextForSelection={(item) => {
                return item[1]; // Mostrar el nombre del cliente
              }}
              buttonStyle={clientFormStyles.dropdown}
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
  }

          {selectedClient ? 
          <View style={clientFormStyles.form}>
            <View style={clientFormStyles.itemTitleContainter}>
              <Text style={clientFormStyles.title}>Contraparte:</Text>
              {!isCounterpartValid && (
                  <View style={clientFormStyles.alertContainer}>
                    <Text style={clientFormStyles.asterisk}>*</Text>
                    <Text style={clientFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                  </View>
                )}
            </View>
            <SelectDropdown
              defaultButtonText={selectedCounterpart ? selectedCounterpart[1] : "Seleccionar contraparte"} // Mostrar el nombre de la contraparte
              buttonTextStyle={{fontSize: 16,
                color: selectedCounterpart? "#000" : "#999"}}
              data={counterparts ? counterparts.map((counterpart) => ([counterpart.id, counterpart.name])) : []}
              onSelect={(selectedItem) => {
                console.log('Contraparte seleccionada:', selectedItem);
                setSelectedCounterpart(selectedItem); // Guarda la contraparte seleccionada
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedCounterpart ? selectedCounterpart[1] : "Seleccione una contraparte"; // Mostrar el nombre de la contraparte
              }}
              rowTextForSelection={(item) => {
                return item[1]; // Mostrar el nombre de la contraparte
              }}
              buttonStyle={clientFormStyles.dropdown}
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
          : null}
        </View>
        <View style={clientFormStyles.formsContainer}>
          {selectedClient && !quotationData.id ? 
          <View style={clientFormStyles.form}>
            <View style={clientFormStyles.itemTitleContainter}>
              <Text style={clientFormStyles.title}>Servicio:</Text>
              {!isServiceValid && (
                  <View style={clientFormStyles.alertContainer}>
                    <Text style={clientFormStyles.asterisk}>*</Text>
                    <Text style={clientFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                  </View>
                )}
            </View>
            <SelectDropdown
              defaultButtonText={selectedService ? selectedService.type : "Seleccionar servicio"}
              buttonTextStyle={{fontSize: 16, 
                color: selectedService? "#000" : "#999"}}
              data={serviceTypes.map((service) =>  service.type)}
              onSelect={(selectedItem, index) => {
                console.log('Tipo de servicio seleccionado:', selectedItem);
                const selectedService = serviceTypes.find((service) => service.type === selectedItem);
                setSelectedService(selectedService);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={clientFormStyles.dropdown}
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
          : null}

          <View style={clientFormStyles.form}>
            <View style={clientFormStyles.itemTitleContainter}>
                <Text style={clientFormStyles.title}>Nombre de la cotización:</Text>
                {!isNameValid && (
                  <View style={clientFormStyles.alertContainer}>
                    <Text style={clientFormStyles.asterisk}>*</Text>
                    <Text style={clientFormStyles.alertMessage}>Recuerde rellenar este campo</Text>
                  </View>
                )}
            </View>
            <TextInput
              style={clientFormStyles.input}
              placeholder={'Ingrese el nombre del proyecto'}
              placeholderTextColor="#999"
              value={NameValue}
              onChangeText={(text) => setNameValue(text)}
              autoFocus={false}
            />
          </View>
        </View>

        <View style={clientFormStyles.buttonContainer}>
          <Button 
            title="Continuar 1/5" 
            onPress={handleNext} 
            style={clientFormStyles.button}
          />
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ClientForm;
