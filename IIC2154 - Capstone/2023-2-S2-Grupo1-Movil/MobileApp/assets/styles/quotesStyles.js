import { StyleSheet } from "react-native";

const quotesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  quotesContainer: {
    backgroundColor: '#E3E7F0',
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  quotesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    button: {
      backgroundColor: '#4D4F58',
      padding: 10,
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      justifyContent: 'center',
    },
  }
});

export default quotesStyles;