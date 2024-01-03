import React from 'react';
import { Text, Pressable } from 'react-native';

const Button = ({ onPress, title, style }) => {
    return (
        <Pressable onPress={onPress} style={style.button}>
            <Text style={style.text}>{title}</Text>
        </Pressable>
    );
};

export default Button;
