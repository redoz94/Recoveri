import React from 'react';
import { TextInput, View, StyleSheet, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from './colors';

function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />}
            <TextInput style={styles.textInput} { ...otherProps } />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        padding: 15,
        marginVertical: 10,
        // marginLeft: 20,
        alignItems: 'center',
    },
    icon:{
        color: colors.black,
    },
    textInput:{
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        alignItems: 'center',
        marginLeft: 20,
        flex: 1,
    },
})

export default AppTextInput;