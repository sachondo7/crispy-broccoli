import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.85;

const formWidth = width * 0.9;

addItemsStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingVertical: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    form: {
        width: formWidth,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor:'#fff',
        borderRadius: 20,
        padding: 20,
        paddingHorizontal: 20,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        maxHeight: height * 0.1,
    },
    priceText: {
        color: '#5E5E5E',
        fontSize: 15,
        fontWeight: 'bold',
        minWidth: width * 0.2,
        maxWidth: width * 0.2,
    },
    text: {
        color: '#5E5E5E',
        fontSize: 15,
        fontWeight: 'bold',
        minWidth: width * 0.5,
        maxWidth: width * 0.5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'end',
        maxHeight: height * 0.1,
    },
    button: {
        button: {
            backgroundColor: '#4D4F58',
            width: formWidth * 0.3,
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

export default addItemsStyles;