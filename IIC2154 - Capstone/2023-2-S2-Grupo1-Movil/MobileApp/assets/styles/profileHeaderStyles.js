import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const headerHeight = height * 0.15;

const modalHeight = height * 0.5;
const modalWidth = width * 0.8;

const logoWidth = headerHeight * 0.5;

const nameHeight = height * 0.07;
const nameWidth = width * 0.5;

const buttonSize = height * 0.03;

const headerStyles = StyleSheet.create({
    header: {
        minHeight: headerHeight,
        maxHeight: headerHeight,
        minWidth: width,
        maxWidth: width,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingEnd: width*0.05,
    },
    profileIconSize: logoWidth,
    modalMainContainer: {
        flex: 1,
        minHeight: height,
        maxHeight: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalWindow: {
        minWidth: width*0.8,
        maxWidth: width*0.8,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    modalText: {
        fontSize: width*0.05,
        fontWeight: 'bold',
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
            backgroundColor: '#4D4F58',
            minWidth: modalWidth * 0.45,
            maxWidth: modalWidth * 0.45,
            padding: height*0.01,
            borderRadius: 10,
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