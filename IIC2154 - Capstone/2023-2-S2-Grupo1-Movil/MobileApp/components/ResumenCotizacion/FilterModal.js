import React, { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Dimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';

import Button from "../Button/Button";


const FilterModalWindow = ({ modalVisible, setModalVisible, handleOrder, handleSearch, handleClear }) => {

    const [firstScreen, setFirstScreen] = useState(true);
    const [onSearch, setOnSearch] = useState(false);
    const [onOrder, setOnOrder] = useState(false);

    const [search, setSearch] = useState("");
    
    const [order, setOrder] = useState("");

    const resetModalWindow = () => {
        setFirstScreen(true);
        setOnSearch(false);
        setOnOrder(false);
        setSearch("");
    };

    const searchPressed = () => {
        setFirstScreen(false);
        setOnSearch(true);
        setOnOrder(false);
    };

    const orderPressed = () => {
        setFirstScreen(false);
        setOnSearch(false);
        setOnOrder(true);
    };

    const clearPressed = () => {
        setModalVisible(false);
        resetModalWindow()
        setSearch("");
        handleClear();
    }

    const cancellPressed = () => {
        setModalVisible(false);
        resetModalWindow()
    }

    const handleProyectSearch = () => {
        setModalVisible(false);
        resetModalWindow();
        handleSearch('proyect', search)
    }

    const handleClientSearch = () => {
        setModalVisible(false);
        resetModalWindow();
        handleSearch('client', search)
    }

    const handleOrderSelected = (order) => {
        setModalVisible(false);
        resetModalWindow();
        handleOrder(order);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            {firstScreen && (
                <View style={modalWindowStyles.mainContainer}>
                    <View style={modalWindowStyles.modalWindow}>
                        <Button
                            title="Buscar"
                            onPress={() => {
                                searchPressed();
                            }}
                            style={modalWindowStyles.button}
                        />
                        <Button
                            title="Ordenar"
                            onPress={() => {
                                orderPressed();
                            }}
                            style={modalWindowStyles.button}
                        />
                        <Button
                            title="Borrar filtros"
                            onPress={() => {
                                clearPressed();
                            }}
                            style={modalWindowStyles.button}
                        />
                        <Button
                            title="Cancelar"
                            onPress={() => {
                                cancellPressed();
                            }}
                            style={modalWindowStyles.button}
                        />
                    </View>
                </View>
            )}
            {onSearch && (
                <View style={modalWindowStyles.mainContainer}>
                    <View style={modalWindowStyles.modalWindow}>
                        <TextInput 
                            style={modalWindowStyles.textInput} 
                            onChangeText={setSearch} 
                            value={search} 
                            placeholder="Buscar" 
                        />
                        <Button
                            title="Buscar Proyecto"
                            onPress={() => handleProyectSearch()}
                            style={modalWindowStyles.button}
                        />
                        <Button
                            title="Buscar Cliente"
                            onPress={() => handleClientSearch()}
                            style={modalWindowStyles.button}
                        />
                        <Button
                            title="Cancelar"
                            onPress={() => cancellPressed()}
                            style={modalWindowStyles.button}
                        />
                    </View>
                </View>
            )}
            {onOrder && (
                <View style={modalWindowStyles.mainContainer}>
                    <View style={modalWindowStyles.modalWindow}>
                        <Picker
                            selectedValue={order}
                            style={modalWindowStyles.picker}
                            onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
                        >
                            <Picker.Item label="Más antiguas" value="oldest" />
                            <Picker.Item label="Más recientes" value="newest" />
                            <Picker.Item label="Vencimiento más cercano" value="closest" />
                            <Picker.Item label="Vencimiento más lejano" value="farthest" />
                        </Picker>
                        <Button
                            title="Ordenar"
                            onPress={() => {
                                handleOrderSelected(order);
                            }}
                            style={modalWindowStyles.button}
                        />
                        <Button
                            title="Cancelar"
                            onPress={() => cancellPressed()}
                            style={modalWindowStyles.button}
                        />
                    </View>
                </View>
            )}


        </Modal>
    );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const modalWindowStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        minHeight: height,
        maxHeight: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalWindow: {
        minHeight: height*0.4,
        maxHeight: height*0.4,
        minWidth: width*0.8,
        maxWidth: width*0.8,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    firstButtonsContainer: {
        minHeight: 5000,
        maxHeight: 5000,
        minWidth: 300,
        maxWidth: 300,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    button: {
        button: {
            borderRadius: 5,
            padding: 15,
            backgroundColor: "#4D4F58",
            maxHeight: 50,
            minHeight: 50,
            minWidth: 250,
            maxWidth: 250,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
        },
    },
    textInput: {
        height: 40,
        width: 250,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    picker: {
        height: 50,
        width: 250,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

export default FilterModalWindow;