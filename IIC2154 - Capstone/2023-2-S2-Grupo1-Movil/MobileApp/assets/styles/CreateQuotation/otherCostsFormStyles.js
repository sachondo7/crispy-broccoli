import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.85;

const formWidth = width * 0.9;

const formTextSize = width * 0.06;
const inputTextSize = width * 0.05;

const buttonTextSize = width * 0.05;

otherCostsFormStyles = StyleSheet.create({
    mainContainer: {
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
    },
    formContainer: {
        minHeight: mainContainerHeight*0.8,
        maxHeight: mainContainerHeight*0.8,
        minWidth: width,
        maxWidth: width,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    form: {
        minHeight: mainContainerHeight*0.5,
        maxHeight: mainContainerHeight*0.5,
        minWidth: formWidth,
        maxWidth: formWidth,

        marginVertical: mainContainerHeight*0.015,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius: 20,
    },
    text: {
        color: '#5E5E5E',
        fontSize: formTextSize,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    input: {
        width: formWidth * 0.85,
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
    dropdown: {
        width: formWidth * 0.85,
        backgroundColor: '#F3F3F3',
        borderColor: '#4D4F58',
        marginTop: height * 0.02,
        borderRadius: 10,
        borderWidth: 2,
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
            minWidth: width * 0.3,
            maxWidth: width * 0.3,
            minHeight: mainContainerHeight * 0.1,
            maxHeight: mainContainerHeight * 0.1,

            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4D4F58',
        },
        text: {
            fontSize: buttonTextSize,
            fontWeight: 'bold',
            color: 'white',
            justifyContent: 'center',
        },
    }
});

export default otherCostsFormStyles;