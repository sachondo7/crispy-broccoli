/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  const [name, setName] = useState('hola mundito');
  return (
    <SafeAreaView>
      <View style ={{flex: 1}}>
        <Header/>
        <Text>Aplicación mobile</Text>
        <Footer/>
      </View>
    </SafeAreaView>
  );
};

export default App;
