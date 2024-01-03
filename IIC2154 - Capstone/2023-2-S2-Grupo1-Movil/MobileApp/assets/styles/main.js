import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    viewContainer: {
        minHeight: height*0.9,
        maxHeight: height*0.9,
        backgroundColor: '#969CB5',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    homeViewContainer: {
        minHeight: height*0.7,
        maxHeight: height*0.7,
        backgroundColor: '#969CB5',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default globalStyles;