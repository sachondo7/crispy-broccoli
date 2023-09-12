import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi Aplicación</Text>
      </View>
      <View style={styles.content}>
        {/* Aquí puedes colocar el contenido principal de tu aplicación */}
        <Text>Contenido de la aplicación</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Mi Empresa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
});

export default HeaderFooter;
