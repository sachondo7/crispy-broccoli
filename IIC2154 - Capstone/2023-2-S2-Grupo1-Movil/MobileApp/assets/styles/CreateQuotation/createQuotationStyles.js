import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.85;

const formWidth = width * 0.9;

createQuotationStyles = StyleSheet.create({
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
        alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius: 20,
        padding: 20,
        paddingHorizontal: 50,
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        color: '#5E5E5E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        width: formWidth * 0.85,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#4D4F58',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        margin: 10,
    },
    inputText: {
        color: '#5E5E5E',
        fontSize: 16,
    },
    dropdown: {
        width: formWidth * 0.85,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderColor: '#4D4F58',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        margin: 10,
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

export default createQuotationStyles;