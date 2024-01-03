import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const mainContainerHeight = height * 0.85;
const formWidth = width * 0.9;
const textSizes = width * 0.06;
const formTextSize = width * 0.06;
const inputTextSize = width * 0.05;
const buttonTextSize = width * 0.05;

clientFormStyles = StyleSheet.create({
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
    itemTitleContainter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        color: '#000000',
        fontSize: textSizes,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    formsContainer: {
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
    text: {
        color: '#5E5E5E',
        fontSize: formTextSize,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'left',
    },
    input: {
        width: formWidth * 0.85,
        backgroundColor: '#F3F3F3',
        borderColor: '#4D4F58',
        paddingLeft: formWidth * 0.05,
        paddingRight: formWidth * 0.05, // Agregado para equilibrar el relleno
        paddingTop: 10, // Relleno superior para centrar el texto
        paddingBottom: 10, // Relleno inferior para centrar el texto
        borderRadius: 0,
        borderWidth: 2,
        marginTop: height * 0.02,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: "#000",
        textAlignVertical: 'center', // A
    },
    dropdown: {
        width: formWidth * 0.85,
        backgroundColor: '#F3F3F3',
        borderColor: '#4D4F58',
        marginTop: height * 0.02,
        borderRadius: 0,
        borderWidth: 2,
        flewDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
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
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5, // Espacio después del dropdown
        marginLeft: 10, // Alinear con el inicio del dropdown
        backgroundColor: 'transparent',
    },
    asterisk: {
        color: 'red',
        fontSize: 14, 
        fontWeight: 'bold',
    },
    alertMessage: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    }
});

export default clientFormStyles;