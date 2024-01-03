import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.9;

const formHeight = mainContainerHeight * 0.875;
const formWidth = width * 0.95;

const navbarHeight = height * 0.1;

quotationDetailsStyles = StyleSheet.create({
    mainContainer: {
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: formWidth,
        maxWidth: formWidth,
        alignItems: 'center',
    },
    formContainer: {
        minHeight: formHeight,
        maxHeight: formHeight,
        minWidth: formWidth,
        maxWidth: formWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: mainContainerHeight*0.025,
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
    optionsMenuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        minHeight: formHeight * 0.275,
        maxHeight: formHeight * 0.275,
        backgroundColor: '#43434D',
        borderRadius: 10,
        borderTopRightRadius: 10,        
        zIndex: 1,
    },
    optionMenuOptionIconContainer: {
        paddingTop: formHeight * 0.0175,
        paddingRight: formWidth * 0.0475,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    optionMenuOptionIcon: {
        size: height * 0.03,
        color: 'white',
    },
    optionMenuOptionContainer: {
        minWidth: formWidth * 0.5,
        maxWidth: formWidth * 0.5,
        flexDirection: 'row',
        paddingHorizontal: formWidth * 0.1,
        marginVertical: formHeight * 0.025,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionMenuOptionIcon: {
        size: height * 0.03,
        color: '#9D9D9D',
    },
    optionMenuOptionText: {
        minWidth: formWidth * 0.4,
        maxWidth: formWidth * 0.4,
        paddingLeft: formWidth * 0.05,
        paddingRight: formWidth * 0.05,
        color: '#9D9D9D',
        fontSize: formWidth * 0.045,
        fontFamily: 'Roboto',
    },

    detailsContainer: {
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
        maxWidth: formWidth * 0.4,
        minWidth: formWidth * 0.4,
        paddingVertical: formHeight * 0.02,
        paddingLeft: formWidth * 0.05,

        fontFamily: 'Roboto',
        color: '#18191A',
        fontSize: formWidth * 0.045,
    },
    textValue: {
        maxWidth: formWidth * 0.6,
        minWidth: formWidth * 0.6,
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
    dropdown: {
        height: 18,
        formWidth: 'auto',
        backgroundColor: '#155992',
        color: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        alignContent: 'end',
        maxHeight: height * 0.1,
        minWidth: formWidth,
        backgroundColor: '#E3E7F0',
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
    navbar: {
        minHeight: navbarHeight,
        maxHeight: navbarHeight,
        minWidth: formWidth,
        maxWidth: formWidth,

        alignItems: 'center',
        justifyContent: 'center',
    },
    homeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeIconSize: navbarHeight*0.3,
    iconColor: 'black',
    iconText: {
        fontSize: formWidth*0.03,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
});

export default quotationDetailsStyles;