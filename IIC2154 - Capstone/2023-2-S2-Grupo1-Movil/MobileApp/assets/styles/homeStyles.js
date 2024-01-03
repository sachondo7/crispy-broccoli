import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.9;

const dashboardTitleContainerHeight = mainContainerHeight * 0.1;

const quotationsContainerHeight = mainContainerHeight*0.775;
const quotationsContainerWidth = width*0.85;

const navbarHeight = mainContainerHeight * 0.125;

const LIST_ITEM_TITLE_SIZE = width*0.05
const LIST_ITEM_DATE_SIZE = width*0.05
const LIST_ITEM_BODY_TEXT_SIZE = width*0.04


const BUTTON_TEXT_SIZE = width*0.035

const homeStyles = StyleSheet.create({
    mainContainer: {
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
    },
    dashboardTitleContainer: {
        minHeight: dashboardTitleContainerHeight,
        maxHeight: dashboardTitleContainerHeight,
        paddingHorizontal: width*0.05,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dashboardTitle: {
        fontSize: width*0.05,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#616161',
    },
    dashboardDescription: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dashboardIcon: {
        size: width*0.05,
        color: 'black',
    },
    dashboardDescriptionText: {
        fontSize: width*0.04,
        fontFamily: 'Roboto',
        color: 'black',
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
        alignItems: 'center',
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
        maxWidth: quotationsContainerWidth*0.4,
        minWidth: quotationsContainerWidth*0.4,

        textAlign: 'right',
        paddingRight: quotationsContainerWidth*0.025,
        
        fontSize: LIST_ITEM_DATE_SIZE,
        fontFamily: 'Montserrat',
        color: 'white',
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
    seeMoreButton: {
        button: {
            backgroundColor: '#5B77A8',
            borderRadius: 10,
            padding: height*0.01,
            width: width*0.5,
            height: height*0.05,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        text: {
            fontSize: BUTTON_TEXT_SIZE,
            fontWeight: 'bold',
            color: 'white',
        },
    },
    navbar: {
        minHeight: navbarHeight,
        maxHeight: navbarHeight,
        minWidth: width,
        maxWidth: width,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width*0.1,

        borderTopWidth: 0.5,

    },
    navbarIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: width*0.05,
    },
    navbarIconSize: navbarHeight*0.35,
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

export default homeStyles;