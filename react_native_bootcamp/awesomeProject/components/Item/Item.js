import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

const Item = ({name, price}) => {
  return(
    <View>
        <Text>Item: {name} </Text>
        <Text>Price: {price} </Text>
    </View>
    );
};

Item.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Item;
