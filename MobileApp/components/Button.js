import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';

const MyButton = ({name}) => {
    return (
        <View style={styles.buttonSpacing}>
            <TouchableOpacity onPress={() => Alert.alert('You pressed me')}
                              style={styles.button}>
                <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#442B10',
        borderRadius: 100/ 5,
        height: 45,
        width: 95,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginTop: 4,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EA5C15',
    },
    buttonSpacing: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    }
});

export default MyButton;