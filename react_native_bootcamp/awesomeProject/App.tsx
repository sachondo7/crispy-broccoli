/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Item from './components/Item/Item';
import HeaderFooter from './components/HeaderFooter/HeaderFooter';

const App = () => {
  const [name, setName] = useState('hola mundito');
  return (
    <SafeAreaView>
      <View>
        <HeaderFooter />
      </View>
      <View style = {{backgroundColor: 'lightblue'}}>
        <Text onPress={() => setName("Chao mundo")}>{name}</Text>
      </View>
      <View style = {{backgroundColor: 'lightgrey'}}>
        <HelloWorld />
      </View>
      <View style = {{backgroundColor: 'magenta'}}>
        <Text>THIS IS MY FOOTER</Text>
      </View>
      <Item name= {'hola'} price = {200} />
    </SafeAreaView>
  );
};

export default App;
