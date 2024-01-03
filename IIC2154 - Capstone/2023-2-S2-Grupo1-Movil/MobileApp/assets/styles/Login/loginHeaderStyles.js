import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const headerHeight = height * 0.4;
const headerWidth = width;

const loginHeaderStyles = StyleSheet.create({
    loginHeader: {
        minHeight: headerHeight,
        maxHeight: headerHeight,
        minWidth: headerWidth,
        maxWidth: headerWidth,

        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLogosContainer: {
        flexDirection: 'row',
    },
    logoImage: {
        minWidth: headerWidth * 0.2,
        maxWidth: headerWidth * 0.2,
        minHeight: headerWidth * 0.2,
        maxHeight: headerWidth * 0.2,
        marginRight: headerWidth * 0.05,
        alignSelf: 'center',
    },
    logoItileImage: {
        minWidth: headerWidth * 0.55,
        maxWidth: headerWidth * 0.55,
        minHeight: headerWidth * 0.15,
        maxHeight: headerWidth * 0.15,
        marginLeft: headerWidth * 0.05,
        alignSelf: 'center',
    },
});

export default loginHeaderStyles;