import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");


const textSizes = width * 0.06;

const buttonTextSize = width * 0.05;
const invalidSessionTextSize = width * 0.04;

const loginFormStyles = StyleSheet.create({
  container: {
    minHeight: height,
    maxHeight: height,
    minWidth: width,
    maxWidth: width,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: width * 0.01, // Ajustar según necesidad
    paddingVertical: width * 0.1, // Ajustar según necesidad
    borderRadius: 20, 
    width: '90%',
  },
  headerLogosContainer: {
    flexDirection: 'row',
  },
  loginHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    minWidth: width * 0.2,
    maxWidth: width * 0.2,
    minHeight: width * 0.2,
    maxHeight: width * 0.2,
    marginRight: width * 0.05,
    alignSelf: 'center',
  },
  logoItileImage: {
    minWidth: width * 0.55,
    maxWidth: width * 0.55,
    minHeight: width * 0.15,
    maxHeight: width * 0.15,
    marginLeft: width * 0.05,
    alignSelf: 'center',
  },
  text: {


    marginTop: 56, 
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    color: '#000000',
    fontSize: textSizes * 0.7,
  },
  title: {
    fontFamily: 'Roboto',
    color: '#000000',


    fontSize: textSizes,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5 
  },
  input: {
    height: width * 0.15,
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    marginVertical: width * 0.02,
    borderWidth: 2,
    paddingLeft: width*0.05,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    borderColor: '#B0B0B0',
  },
  button: {
    button:{
      minHeight: width * 0.125,
      maxHeight: width * 0.125,
      minWidth:  width * 0.7,
      maxWidth: width * 0.7,
      backgroundColor: '#3D65CC',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    text: {
      fontSize: buttonTextSize,
      fontWeight: 'bold',
      color: 'white',
    },
    invalidSessionText: {
      color: 'red',
      fontSize: invalidSessionTextSize,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  forgotPassword: {
    color: '#3D65CC',
    marginTop: width * 0.05,
    marginBottom: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
  },
});

export default loginFormStyles;