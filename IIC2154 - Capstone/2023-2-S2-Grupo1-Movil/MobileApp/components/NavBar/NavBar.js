import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import SessionHandler from "../../session/sessionHandler";

import navbarStyles from "../../assets/styles/navbarStyles";

const NavBar = ({ navigation, route }) => {

  const { userId } = route.params;

  const logout = () => {
    SessionHandler.logout();
    navigation.navigate("Login");
  }

  return (
    <View style={navbarStyles.container}>
      <TouchableOpacity
        style={navbarStyles.navbarButton}
        onPress={() => navigation.navigate("Home", {userId: userId})}
      >
        <Icon name="home" size={navbarStyles.homeIconSize} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "lightblue", // Color de fondo de la barra de navegación
    height: 60,
    paddingHorizontal: 16,
  },
  navBarButton: {
    padding: 8,
  },
  navBarButtonText: {
    color: "white", 
    fontSize: 16,
  },
});

export default NavBar;
