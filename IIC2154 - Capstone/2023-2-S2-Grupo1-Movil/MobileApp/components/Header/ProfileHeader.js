import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import profileHeaderStyles from '../../assets/styles/profileHeaderStyles';
import ProfileModal from './ProfileModal';

const ProfileHeader = ({ navigation }) => {
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
    <View style={profileHeaderStyles.header}>
      <Icon
        name="user-circle"
        size={profileHeaderStyles.profileIconSize}
        color="#fff"
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

export default ProfileHeader;
