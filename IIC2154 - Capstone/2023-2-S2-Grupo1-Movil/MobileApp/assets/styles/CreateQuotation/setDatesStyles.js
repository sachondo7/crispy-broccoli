import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const mainContainerHeight = height * 0.85;
const formWidth = width * 0.9;
const textSizes = width * 0.06;
const formTextSize = width * 0.06;
const inputTextSize = width * 0.05;
const buttonTextSize = width * 0.05;

setDatesStyles = StyleSheet.create({
    mainContainer: {
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: '#155992',
        minWidth: width,
        maxWidth: width,
        height: mainContainerHeight*0.05,
        marginBottom: 15,
    },
    titleText: {
        width:'100%',
        marginTop: 5,
        marginBottom: 5,
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        color: '#000000',
        fontSize: textSizes,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    formContainer: {
        minHeight: mainContainerHeight*0.3,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    form: {
        paddingVertical: 10,
        flex: 1,
        width: formWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius: 0,
        marginTop: 0,
    },
    durationContainer: {
        minHeight: mainContainerHeight*0.2,
        maxHeight: mainContainerHeight*0.2,
        minWidth: formWidth,
        maxWidth: formWidth,
        paddingHorizontal: formWidth * 0.1,
        paddingVertical: mainContainerHeight * 0.05,

        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationText: {
        color: '#5E5E5E',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    input: {
        height: height * 0.075,
        minWidth: formWidth * 0.85,
        maxWidth: formWidth * 0.85,
        backgroundColor: '#F3F3F3',

        borderColor: '#4D4F58',
        paddingLeft: formWidth * 0.05,
        borderRadius: 10,
        borderWidth: 2,
        marginTop: height * 0.02,
    },
    inputText: {
        color: '#5E5E5E',
        fontSize: inputTextSize,
    },
    datesContainer: {
        minHeight: mainContainerHeight*0.5,
        maxHeight: mainContainerHeight*0.5,
        minWidth: formWidth,
        maxWidth: formWidth,

        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarContainer: {
        minWidth: formWidth * 0.45,
        maxWidth: formWidth * 0.45,
        marginHorizontal: formWidth * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        color: '#5E5E5E',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    calendar: {
        maxHeight: mainContainerHeight*0.15,
        minHeight: mainContainerHeight*0.15,
        marginTop: height * 0.02,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: formWidth * 0.45,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#4D4F58',
    },
    buttonContainer: {
        minHeight: mainContainerHeight*0.2,
        maxHeight: mainContainerHeight*0.2,
        minWidth: width,
        maxWidth: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'end',
    },
    button: {
        button: {
            width: formWidth * 0.8,
            height: mainContainerHeight * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3D65CC',
        },
        text: {
            fontSize: buttonTextSize,
            fontWeight: 'bold',
            color: '#FFFFFF',
            justifyContent: 'center',
        },
    },
    datePicker: {
        flexDirection: 'row', // Alinea horizontalmente el texto y el ícono
        alignItems: 'center', // Centra verticalmente los elementos dentro del contenedor
        justifyContent: 'space-between', // Coloca el texto a la izquierda y el ícono a la derecha
        borderWidth: 2,
        borderColor: '#4D4F58',
        paddingHorizontal: 10, // Añade espacio en los lados del contenedor
        paddingVertical: 10, // Añade espacio en la parte superior e inferior dentro del contenedor
        marginTop: height * 0.02,
        width: formWidth * 0.85, // Asegúrate de que coincida con el ancho del dropdown
        backgroundColor: '#FFFFFF', // Fondo blanco
      },
});

export default setDatesStyles;