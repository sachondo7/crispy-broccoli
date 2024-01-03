import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import Button from '../Button/Button';

const DescuentoForm = ({ navigation, route }) => {

  const quotationData = route.params.quotationData;
  const [discountValue, setDiscountValue] = useState(0);

  const handleChange = (text) => {
    setDiscountValue(Number(text));
    quotationData.discountValue = Number(text);
  };

  useEffect(() => {
    console.log('Estoy en la vista DescuentoForm \n parametros recibidos:', quotationData);
    if (quotationData.discountValue) {
      setDiscountValue(quotationData.discountValue);
    }
  }, [route.params]);


  const handleNext = () => {
    if (discountValue < 0 || discountValue > 100) {
      // Alerta si la tasa de descuento esta fuera de los valores correspondientes.
      Alert.alert('Alerta', 'La tasa de descuento debe estar entre 0 y 100.');
    } else {
      quotationData.discountValue = discountValue;
      navigation.navigate("AsignarRiesgo", {
        ...route.params, 
        quotationData,
      });
    }
  };
  
  const handleBack = () => {
    quotationData.discountValue = discountValue;
    navigation.navigate("ItemsCobrables", {
      ...route.params, 
      quotationData,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={createQuotationStyles.container}>
          <View style={createQuotationStyles.form}>
            <Text style={createQuotationStyles.text}>
              {'Tasa de descuento de la cotización'}
            </Text>
            <TextInput
              style={createQuotationStyles.input}
              keyboardType={'numeric'}
              placeholder={'Ingrese la tasa de descuento de la cotización'}
              value={discountValue.toString()}
              onChangeText={(text) => handleChange(text)}
              autoFocus={true}
            />
          </View>
        </View> 
        <View style={createQuotationStyles.buttonContainer}>
          <Button 
            title="Atrás" 
            onPress={handleBack} 
            style={createQuotationStyles.button}
          />
          <Button 
            title="Cancelar" 
            onPress={() => navigation.navigate('Home')} 
            style={createQuotationStyles.button}
          />
          <Button 
            title="Siguiente" 
            onPress={handleNext} 
            style={createQuotationStyles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DescuentoForm;
