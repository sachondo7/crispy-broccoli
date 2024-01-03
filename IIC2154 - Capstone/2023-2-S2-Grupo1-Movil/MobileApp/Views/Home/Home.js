import React  from "react";
import { View, SafeAreaView } from "react-native";
import Header from "../../components/Header/Header";
import HomePage from "../../components/HomePage/HomePage";
import ProfileHeader from "../../components/Header/ProfileHeader";
import globalStyles from "../../assets/styles/main";

const Home = ({ navigation , route }) => {
  return (
    <View style={globalStyles.container}>
      <Header navigation={navigation} />
      <HomePage navigation={navigation} route = {route} />
    </View>
  );
};

export default Home;