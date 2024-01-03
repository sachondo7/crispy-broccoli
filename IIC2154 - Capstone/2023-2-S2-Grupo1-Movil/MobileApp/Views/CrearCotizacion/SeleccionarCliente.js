import { View, KeyboardAvoidingView } from "react-native";
import Header from "../../components/Header/Header";
import ClientForm from "../../components/ClientForm/ClientForm";
import globalStyles from "../../assets/styles/main";
import createQuotationStyles from '../../assets/styles/CreateQuotation/createQuotationStyles';

const SeleccionarCliente = ({ navigation, route }) => {



  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView
        style={createQuotationStyles.mainContainer}
        behavior="height"
      >
        <ClientForm navigation={navigation} route={route}/>
      </KeyboardAvoidingView>
    
    </View>
  );
};

export default SeleccionarCliente;