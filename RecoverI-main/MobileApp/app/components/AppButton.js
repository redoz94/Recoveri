import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from './colors';

function AppButton({title, onPress, color = '#367588'}) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color]}] } onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.dark,
        borderRadius: 25,
        justfyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
        width: '100%',
    },
    text:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
})

export default AppButton;