import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const mainContainerHeight = height * 0.85;
const formWidth = width * 0.9;
const textSizes = width * 0.06;
const formTextSize = width * 0.06;
const inputTextSize = width * 0.05;
const buttonTextSize = width * 0.05;


addProfileStyles = StyleSheet.create({
    mainContainer: {
        minHeight: mainContainerHeight,
        maxHeight: mainContainerHeight,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: '#155992',
        minWidth: width,
        maxWidth: width,
        height: mainContainerHeight*0.05,
        marginBottom: 15,
    },
    titleText: {
        width:'100%',
        marginTop: 5,
        marginBottom: 5,
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        minHeight: mainContainerHeight*0.8,
        maxHeight: mainContainerHeight*0.8,
        minWidth: width,
        maxWidth: width,
        alignItems: 'center',
    },
    form: {
        paddingVertical: 10,
        flex: 1,
        maxHeight: height * 0.5,
        width: formWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius: 20,
        padding: 20,
        paddingHorizontal: 50,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    title: {
        marginBottom: 10,
        color: '#18191A',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    atributesContainer: {
        width: formWidth,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    atributeTitle: {
        color: '#1A242D',
        paddingRight: width * 0.3,
        fontSize: 16,
        fontWeight: 'bold',
    },
    chooseProfileContainer: {
        width: formWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    profilePicker: {
        width: formWidth * 0.6,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        color: '#495057',
        padding: 10,
        borderWidth: 2,
        margin: 10,
    },
    percentageInput: {
        color: '#495057',
        width: formWidth * 0.15,
        fontSize: 16,
        borderColor: '#C4C4C4',
        backgroundColor: '#FFFFFF',
    },
    addProfileButtonImage: {
        width: formWidth * 0.1,
        height: formWidth * 0.1,
    },
    selectedProfilesContainer: {
        width: formWidth,
        flexDirection: 'column',
        backgroundColor: '#ACACAC05',
        borderRadius: 10,
        minHeight: mainContainerHeight * 0.6,
        maxHeight: mainContainerHeight * 0.6,
    },
    selectedProfilesContent: {
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedProfileItem: {
        width: formWidth,
        height: height * 0.075,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderColor: 'gray',
        color: '#000000',
    },
    selectedProfileItem2: {
        width: formWidth,
        height: height * 0.06,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: '#ACACAC05',
        borderRadius: 15,
        borderColor: 'gray',
        color: '#000000',
    },
    selectedProfileItemText: {
        color: '#5E5E5E',
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: width * 0.5,
    },
    selectedProfileItemPercentage: {
        color: '#000000',
        fontSize: 14,
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

export default addProfileStyles;