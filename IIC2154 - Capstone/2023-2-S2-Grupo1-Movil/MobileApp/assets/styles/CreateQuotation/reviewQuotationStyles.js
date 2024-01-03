import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.85;

const formHeight = mainContainerHeight * 0.875;
const formWidth = width * 0.95;

const buttonTextSize = width * 0.05;

reviewQuotationStyles = StyleSheet.create({
    mainContainer: {
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: formWidth,
        maxWidth: formWidth,
        alignItems: 'center',
    },
    titleContainer: {
        minHeight: formHeight * 0.075,
        maxHeight: formHeight * 0.075,
        minWidth: formWidth,
        maxWidth: formWidth,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: formWidth*0.05,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        backgroundColor: '#155992',
    },
    titleBackIcon: {
        size: height * 0.03,
        color: 'white',
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: formWidth * 0.045,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },

    detailsContainer: {
        minHeight: formHeight * 0.85,
        maxHeight: formHeight * 0.85,
        minWidth: formWidth,
        maxWidth: formWidth,
        justifyContent: 'center',
        alignItems: 'center',   
        flex: 1,
        backgroundColor: '#E5E6E7',
    },
    detailsInfoContainer: {
        minWidth: formWidth * 0.975,
        maxWidth: formWidth * 0.975,
        marginVertical: formHeight * 0.025,
        paddingTop: formHeight * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    detailItem: {
        minWidth: formWidth * 0.975,
        maxWidth: formWidth * 0.975,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textAtribute: {
        maxWidth: formWidth * 0.5,
        minWidth: formWidth * 0.5,
        paddingVertical: formHeight * 0.02,
        paddingLeft: formWidth * 0.05,

        fontFamily: 'Roboto',
        color: '#18191A',
        fontSize: formWidth * 0.045,
    },
    textValue: {
        maxWidth: formWidth * 0.5,
        minWidth: formWidth * 0.5,
        paddingVertical: formHeight * 0.02,
        paddingRight: formWidth * 0.05,

        fontFamily: 'Roboto',
        color: '#18191A',
        fontSize: formWidth * 0.045,
        fontWeight: 'bold',
    },
    listContainer: {
        minWidth: formWidth * 0.975,
        maxWidth: formWidth * 0.975,
    },
    profileListBody: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        minWidth: formWidth,
    },
    profileListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: formHeight * 0.01,
        paddingHorizontal: formWidth * 0.1,
    },
    profileItemTypeText: {
        minWidth: formWidth * 0.4,
        maxWidth: formWidth * 0.4,
        fontSize: formWidth * 0.045,
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    profileItemAssignationText: {
        minWidth: formWidth * 0.2,
        maxWidth: formWidth * 0.2,
        fontSize: formWidth * 0.045,
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    profileItemPriceText: {
        minWidth: formWidth * 0.2,
        maxWidth: formWidth * 0.2,
        fontSize: formWidth * 0.045,
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    totalPriceContainer: {
        minHeight: formHeight * 0.075,
        maxHeight: formHeight * 0.075,
        minWidth: formWidth,
        maxWidth: formWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'end',
        minWidth: formWidth,
        backgroundColor: '#155992',

        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomWidth: width*0.0075,
        borderColor: 'grey',
    },
    totalPriceTitle: {
        minWidth: formWidth * 0.5,
        maxWidth: formWidth * 0.5,
        fontSize: formWidth * 0.055,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'white',
    },
    totalPriceValue: {
        minWidth: formWidth * 0.5,
        maxWidth: formWidth * 0.5,
        fontSize: formWidth * 0.055,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'white',
    },

    buttonContainer: {
        minHeight: mainContainerHeight*0.15,
        maxHeight: mainContainerHeight*0.15,
        minWidth: formWidth,
        maxWidth: formWidth,

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
    }
});

export default reviewQuotationStyles;