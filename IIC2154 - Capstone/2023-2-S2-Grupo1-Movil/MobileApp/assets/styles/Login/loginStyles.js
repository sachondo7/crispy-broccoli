import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");



const loginStyles = StyleSheet.create({
    mainContainer: {
        minHeight: height,
        maxHeight: height,
        minWidth: width,
        maxWidth: width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        backgroundColor: '#53536A',
    },
    login: {
        backgroundColor: '#53536A',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        backgroundColor: '#969CB5',
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: '90%',
    },
    loginButton: {
        button: {
            backgroundColor: '#4D4F58',
            padding: 10,
            marginTop: 40,
            borderRadius: 20,
            paddingLeft: 40,
            paddingRight: 40,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
    },
});

export default loginStyles;