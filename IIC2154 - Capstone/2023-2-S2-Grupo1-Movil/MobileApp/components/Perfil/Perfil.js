import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Alert, SafeAreaView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../Button/Button';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import addProfileStyles from '../../assets/styles/CreateQuotation/addProfileStyles';

const Perfil = ({ navigation, route }) => {
  const [possibleProfiles, setPossibleProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [percentage, setPercentage] = useState(100);
  const quotationData = route.params.quotationData;

  useEffect(() => {
    console.log('Estoy en la vista Perfil \n parametros recibidos:', quotationData);
    async function fetchProfiles() {
      try {
      const response = await axios.get(`https://legitbusiness.me/api/profiles/${quotationData.selectedClient.id}`);
      const profilesData = response.data;
      const profiles = profilesData.map((profile) => ({
        role: profile.role,
        costpermonth: profile.costpermonth,
      }));
      setPossibleProfiles(profiles);
      setSelectedClient(quotationData.selectedClient);
      } catch (error) {
        console.error('Error al obtener los perfiles:', error);
      }
    }
    fetchProfiles();
    if (quotationData.selectedProfiles) {
      setSelectedProfiles(quotationData.selectedProfiles);
    }
  }, [route.params]);

  const addProfile = () => {
    if (selectedProfile && percentage > 0) {
      const newSelectedProfiles = [...selectedProfiles];
      newSelectedProfiles.push([selectedProfile, percentage, selectedPrice]);
      setSelectedProfiles(newSelectedProfiles);
      setSelectedProfile('');
      setPercentage(100);
    }
  };

  const removeProfile = (index) => {
    const newSelectedProfiles = [...selectedProfiles];
    newSelectedProfiles.splice(index, 1);
    setSelectedProfiles(newSelectedProfiles);
  };

  const handleNext = () => {
    if (selectedProfiles.length > 0) {
      quotationData.selectedProfiles = selectedProfiles;
      navigation.navigate('AsignarRiesgo', {
        ...route.params,
        quotationData
      });
    }
    else {
    Alert.alert('Error', 'Debes seleccionar al menos un perfil', [
      { text: 'OK', onPress: () => console.log('Alerta cerrada') },
    ]);
    }
  };

  const handleBack = () => {
    if (selectedProfiles.length > 0) {
      quotationData.selectedProfiles = selectedProfiles;
    }
    else {
      delete quotationData.selectedProfiles;
    }
    navigation.navigate('SeleccionarCliente', {
      ...route.params,
      quotationData
    });
  };


  return (
    <SafeAreaView style={addProfileStyles.mainContainer}>
      <View style={addProfileStyles.titleContainer}>
        <Text style={addProfileStyles.titleText}>
          <Text> <Icon name='arrow-left' size={18}  style={{color:'#FFFFFF'}} onPress={() => handleBack()}/> </Text>
          {'           '} NUEVA COTIZACIÓN {'           '}
          <Text> <Icon name='close' size={18}  style={{color:'#FFFFFF'}} onPress={() => {
            quotationData.id ? navigation.navigate('DetallesCotizaciones', { IdCotizacion: quotationData.id }) :
            navigation.navigate('Home', { ...route.params });
          }} /> </Text>
        </Text>
      </View>

      <View style={addProfileStyles.formContainer}>
        <View style={addProfileStyles.form}>
          <Text style={addProfileStyles.title}>ASIGNACIÓN DE PERFILES </Text>
          <View style={addProfileStyles.atributesContainer}>
            <Text style={addProfileStyles.atributeTitle}>Perfiles</Text>
            <Text style={addProfileStyles.atributeTitle}>% Asignación</Text>
          </View>

          <View style={addProfileStyles.chooseProfileContainer}>
            <SelectDropdown
              defaultButtonText={selectedProfile ? selectedProfile : "Seleccione un perfil"}
              data={possibleProfiles ? possibleProfiles.map((profile, index) => ([profile.role, profile.costpermonth])) : []}
              onSelect={(selectedItem) => {
                console.log('Perfil seleccionado:', selectedItem);
                setSelectedProfile(selectedItem[0]); // Guarda el nombre del perfil
                setSelectedPrice(selectedItem[1]); // Guarda el nombre del perfil
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedProfile? selectedItem[0] +  " " + selectedItem[1] + " UF": "Seleccione un perfil";
              }}
              rowTextForSelection={(item) => {
                return item[0] + " " + item[1] + " UF"; 
              }}
              buttonStyle={addProfileStyles.profilePicker}
              // buttonStyle={clientFormStyles.dropdown}
              search
              searchPlaceHolder={'Busque aquí'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={'search'} color={'#444'} size={18} />;
              }}
            />



            <TextInput
              placeholder="Porcentaje de Asignación"
              keyboardType="numeric"
              label="Porcentaje de Asignación"
              value={percentage.toString()}
              onChangeText={(text) => setPercentage(Number(text))}
              style={addProfileStyles.percentageInput}
            />
            <Text> <Icon name="plus" size={30}  style={{color:'#222279'}} onPress={addProfile}/> </Text>
          </View>
          <ScrollView style={addProfileStyles.selectedProfilesContainer}>
            <View style={addProfileStyles.selectedProfilesContent}>
              {selectedProfiles.map((profileData, index) => (
                <View key={index} >
                  <View style={addProfileStyles.selectedProfileItem}>
                  {console.log('profileData:', profileData)}
                    <Icon name="paperclip" size={30} style={{color:'#155A92', backgroundColor:'#FFFFFF'}}/>
                    <Text style={addProfileStyles.selectedProfileItemText}>{profileData[0]}</Text>
                    <Icon name="trash" size={30} style={{color:'#FFFFFF', backgroundColor:'#FF3838'}} onPress={() => removeProfile(index)}/>
                  </View>
                  <View style={addProfileStyles.selectedProfileItem2}>
                    <Text style={addProfileStyles.selectedProfileItemPercentage}>%Asignación {profileData[1]}%</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={addProfileStyles.buttonContainer}>
        <Button 
            title="Continuar 2/5" 
            onPress={handleNext} 
            style={addProfileStyles.button}
          />
      </View>
    </SafeAreaView>
  );
};

export default Perfil;
