import React, { useState } from "react";
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileModal from './ProfileModal';

import headerStyles from '../../assets/styles/headerStyles';

const Header = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    console.log("Modal abierto");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const logout = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={headerStyles.header}>
      <View style={{width:headerStyles.iconSize}}></View>
      <Text style={headerStyles.headerText}>Cotizaciones</Text>
      <Icon
        name="user-circle-o"
        size={headerStyles.iconSize}
        color={headerStyles.iconColor}
        alignSelf="flex-end"
        onPress={openModal}
      />
      <ProfileModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        logout={logout}
      />
    </View>
  );
};

export default Header;
