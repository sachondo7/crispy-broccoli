import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const headerHeight = height * 0.075;

const modalIconSize = width * 0.15;

const textSize = width * 0.05;
const iconSize = headerHeight * 0.65;

const modalHeight = height * 0.4;
const modalWidth = width * 0.8;

const buttonSize = height * 0.025;

const headerStyles = StyleSheet.create({
    header: {
        minHeight: headerHeight,
        maxHeight: headerHeight,
        minWidth: width,
        maxWidth: width,

        flexDirection: 'row',

        paddingHorizontal: headerHeight*0.25,
        paddingVertical: headerHeight*0.15,

        alignItems: 'center',
        justifyContent: 'space-between',

        borderBottomWidth: 0.5,
        borderColor: '#454549',
    },
    headerText: {
        fontSize: textSize,
        fontFamily: 'Roboto',
        color: '#454549',
        fontWeight: 'bold',
        alignSelf:'center',
    },
    iconSize: iconSize,
    iconColor: '#5B77A8',
    modalMainContainer: {
        flex: 1,
        minHeight: height,
        maxHeight: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalWindow: {
        minHeight: modalHeight,
        maxHeight: modalHeight,
        minWidth: width*0.8,
        maxWidth: width*0.8,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    modalIcon: {
        size: modalIconSize,
        color: '#3f5691',
    },
    modalText: {
        fontSize: width*0.05,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    modalButtonsContainer: {
        minHeight: height*0.1,
        maxHeight: height*0.1,
        minWidth: width*0.8,
        maxWidth: width*0.8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        button: {
            backgroundColor: '#4f81ff',
            minWidth: modalWidth * 0.45,
            maxWidth: modalWidth * 0.45,
            padding: height*0.01,
            borderRadius: 5,
        },
        text: {
            fontSize: buttonSize,
            fontWeight: 'bold',
            color: 'white',
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'center',
        },
    },
});

export default headerStyles;