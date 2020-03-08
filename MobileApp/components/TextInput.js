import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const UserTextInput = ({placeholder}) => {
    const [value, onChangeText] = React.useState('');
    return (
            <TextInput
                placeholder={placeholder}
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: '#515A47',
        borderWidth: 2,
        backgroundColor: '#D7BE82',
        margin: 8,
        width: 250,
        color: '#442B10',
    },
});

export default UserTextInput;
