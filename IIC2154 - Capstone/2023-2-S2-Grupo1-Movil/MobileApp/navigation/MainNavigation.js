import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Views/Login/Login';
import Home from '../Views/Home/Home';
import ResumenesCotizaciones from '../Views/ResumenesCotizaciones/ResumenesCotizaciones';
import DetallesCotizaciones from '../Views/DetallesCotizacion/DetallesCotizaciones';
import CrearPerfil from '../Views/CrearPerfil/CrearPerfil';
import Fechas from '../Views/Fechas/Fechas';
import SeleccionarCliente from '../Views/CrearCotizacion/SeleccionarCliente';
import AsignarRiesgo from '../Views/CrearCotizacion/AsignarRiesgo';
import RevisarCotizaciones from '../Views/RevisarCotizaciones/RevisarCotizaciones';
import {Routes} from './Routes';


// Create a Stack variable using the createStackNavigator function
const Stack = createStackNavigator();

// Define the MainNavigation component
const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.ResumenesCotizaciones} component={ResumenesCotizaciones} />
      <Stack.Screen name={Routes.DetallesCotizaciones} component={DetallesCotizaciones} />
      <Stack.Screen name={Routes.CrearPerfil} component={CrearPerfil} />
      <Stack.Screen name={Routes.Fechas} component={Fechas} />
      <Stack.Screen name={Routes.SeleccionarCliente} component={SeleccionarCliente} />
      <Stack.Screen name={Routes.AsignarRiesgo} component={AsignarRiesgo} />
      <Stack.Screen name={Routes.RevisarCotizaciones} component={RevisarCotizaciones} />
    </Stack.Navigator>
  );
};


export default MainNavigation;