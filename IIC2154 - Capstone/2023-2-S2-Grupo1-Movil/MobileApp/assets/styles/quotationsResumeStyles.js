import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.9;

const buttonContainerHeight = mainContainerHeight * 0.1;

const quotationsContainerHeight = mainContainerHeight*0.775;
const quotationsContainerWidth = width*0.9;

const navbarHeight = mainContainerHeight * 0.125;

const filterButtonTextSize = width * 0.045;
const newQuotationButtonTextSize = width * 0.04;

const LIST_ITEM_TITLE_SIZE = width*0.05
const LIST_ITEM_DATE_SIZE = width*0.05
const LIST_ITEM_BODY_TEXT_SIZE = width*0.04


const BUTTON_TEXT_SIZE = width*0.035

quotationsResumeStyles = StyleSheet.create({
    mainContainer: { 
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
    },
    buttonsContainer: {
        minHeight: buttonContainerHeight,
        maxHeight: buttonContainerHeight,
        paddingHorizontal: width*0.05,
        minWidth: width,
        maxWidth: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filterButton: {
        minWidth: width*0.3,
        maxWidth: width*0.3,

        paddingHorizontal: quotationsContainerWidth*0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#4263b8',
    },
    filterIcon: {
        size: width*0.1,
        color: '#4263b8',
    },
    filterButtonText: {
        fontSize: filterButtonTextSize,
        fontWeight: 'bold',
        color: '#4263b8',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        paddingVertical: quotationsContainerWidth*0.025,
    },
    newQuotationButton: {
            maxWidth: quotationsContainerWidth*0.5,
            minWidth: quotationsContainerWidth*0.5,

            paddingHorizontal: quotationsContainerWidth*0.05,
            paddingVertical: quotationsContainerWidth*0.015,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: '#4f81ff',
            borderRadius: 5,
    },
    newQuotationButtontext: {
        fontSize: newQuotationButtonTextSize,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto',
    },
    quotationsContainer: {
        maxHeight: quotationsContainerHeight,
        minHeight: quotationsContainerHeight,
        minWidth: quotationsContainerWidth,
        maxWidth: quotationsContainerWidth,

        paddingBottom: quotationsContainerHeight*0.05,
    },
    listContainer: {
        alignItems: 'center',    
        minWidth: width,
        maxWidth: width,
    },
    listItem: {
        minWidth: quotationsContainerWidth,
        maxWidth: quotationsContainerWidth,

        borderRadius: 10,
        marginVertical: quotationsContainerHeight*0.01,
        borderBottomWidth: 2,
        borderColor: '#9e9e9e',

                
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#f2f3f5',
    },
    listItemTitleContainer: {
        flexDirection: 'row',
        maxWidth: quotationsContainerWidth,
        minWidth: quotationsContainerWidth,
        minHeight: quotationsContainerHeight*0.085,
        maxHeight: quotationsContainerHeight*0.085,

        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#3f5691',
    },
    listItemTitle: {
        maxWidth: quotationsContainerWidth*0.6,
        minWidth: quotationsContainerWidth*0.6,


        textAlign: 'left',
        alignSelf: 'center',
        paddingLeft: quotationsContainerWidth*0.025,

        fontSize: LIST_ITEM_TITLE_SIZE,
        fontFamily: 'Montserrat',
        color: 'white',
    },
    listItemDate: {
        minHeight: quotationsContainerHeight*0.085,
        maxHeight: quotationsContainerHeight*0.085,
        maxWidth: quotationsContainerWidth*0.4,
        minWidth: quotationsContainerWidth*0.4,

        textAlign: 'right',
        paddingRight: quotationsContainerWidth*0.025,
        paddingTop: quotationsContainerHeight*0.01,
        borderTopRightRadius: 10,
        
        fontSize: LIST_ITEM_DATE_SIZE,
        fontFamily: 'Montserrat',
        color: 'white',
        backgroundColor: '#5770C7',
    },
    listItemBody: {
        maxWidth: quotationsContainerWidth,
        minWidth: quotationsContainerWidth,
        justifyContent: 'center',
    },
    listTextItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: quotationsContainerWidth,
        minWidth: quotationsContainerWidth,
        paddingHorizontal: quotationsContainerWidth*0.05,
        paddingVertical: quotationsContainerWidth*0.03,
    },
    listItemIcon: {
        size: width*0.075,
        color: '#5B77A8',
    },
    listTextValue: {
        maxWidth: quotationsContainerWidth*0.8,
        minWidth: quotationsContainerWidth*0.8,
        fontSize: LIST_ITEM_BODY_TEXT_SIZE,
        // fontWeight: 'bold',
        color: '#212020',
        // backgroundColor: 'green',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        alignContent: 'end',
        maxHeight: height * 0.1,
        minHeight: height * 0.1,
        minWidth: quotationsContainerWidth,
        backgroundColor: '#E3E7F0',
    },
    button: {
        button: {
            backgroundColor: '#4D4F58',
            padding: quotationsContainerWidth*0.025,
            borderRadius: 10,
            paddingHorizontal: quotationsContainerWidth*0.05,
        },
        text: {
            fontSize: BUTTON_TEXT_SIZE,
            fontWeight: 'bold',
            color: 'white',
            justifyContent: 'center',
        },
    },
    navbar: {
        minHeight: navbarHeight,
        maxHeight: navbarHeight,
        minWidth: width,
        maxWidth: width,

        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width*0.1,

        borderTopWidth: 0.5,

    },
    homeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeIconSize: navbarHeight*0.3,
    iconColor: 'black',
    iconText: {
        fontSize: width*0.03,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
});

export default quotationsResumeStyles;