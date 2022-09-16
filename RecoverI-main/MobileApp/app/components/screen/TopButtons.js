import { React, useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StoreContext from './GlobalState';
import colors from '../colors';
import AppText from '../AppText';

function TopButtons({header,navigation}) {

    const contextData = useContext(StoreContext)
    

    const handleLeftButton=()=>{
        console.log('Home Button is pressed');
        if(contextData.Role.Role=='Admin'){
            navigation.navigate("AdminHomeScreen")

        } else if (contextData.Role.Role === 'Cashier') {

            navigation.navigate('CashierHomeScreen')

        } else if (contextData.Role.Role === "Rider") {

            navigation.navigate('RiderHomeScreen')

        } else {
            navigation.navigate('WelcomeScreen');
    }
}
    const handleRightButton=()=>{
        contextData.setRole([]);
        alert("logged out successfully");
        navigation.navigate('WelcomeScreen');
        console.log('Logout Button is pressed');
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftCorner}>
                <TouchableOpacity onPress={handleLeftButton}>
                    <MaterialCommunityIcons name='home-outline' color={colors.teal} size={30} />
                </TouchableOpacity>
            </View>
            <AppText>{header}</AppText>
            <View style={styles.rightCorner}>
                <TouchableOpacity onPress={handleRightButton}>
                    <MaterialCommunityIcons name='logout' color={colors.teal} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '8%',
        // marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftCorner:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightCorner:{
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default TopButtons;