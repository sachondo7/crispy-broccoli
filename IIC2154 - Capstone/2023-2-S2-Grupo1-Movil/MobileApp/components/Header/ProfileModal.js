import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../Button/Button";

import headerStyles from '../../assets/styles/headerStyles';


const ProfileModal = ({ modalVisible, closeModal, logout }) => {
  console.log('button style:'+ headerStyles.button)
    
  if (!modalVisible) {
    console.log("Modal cerrado");
    return
  }
  else {
    console.log("Modal abierto");
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={headerStyles.modalMainContainer}>
          <View style={headerStyles.modalWindow}>
            <Icon
              name="user-circle"
              size={headerStyles.modalIcon.size}
              color={headerStyles.modalIcon.color}
              onPress={closeModal}
            />
            <Text style={headerStyles.modalText}>¿Estas seguro que deseas cerrar sesión?</Text>
            <View style={headerStyles.modalButtonsContainer}>
              <Button 
                title="Volver" 
                onPress={closeModal} 
                style={headerStyles.button}
              />
              <Button 
                title="Cerrar Sesión" 
                onPress={logout} 
                style={headerStyles.button}
              />
              </View>
          </View>
        </View>
      </Modal>
    )
  }
};

export default ProfileModal;