import React from 'react';

import { Text, View, StyleSheet, Image } from 'react-native';

import Screen from '../Screen';
import Icon from '../Icon';
import colors from '../colors';
import TopButtons from './TopButtons';

function HomeScreen({navigation}) {
    return (
        <Screen>
            <TopButtons header={'Home Screen'} navigation={navigation}/>

            <View style={styles.logoContainer}>
                <Image  
                    source={require('../../assets/logo.png')}
                    style={styles.logoName}
                />
            </View>
            
            <View style={{width: '100%', height: '50%', paddingHorizontal: 20}}>
                <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='view-dashboard-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.secondary}
                            size={150}
                            title='Assign Rider'
                             onPress={()=> navigation.navigate('RiderAssignScreen')}
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='account-tie-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.secondary}
                            size={150}
                            title='Client'
                            onPress={()=> navigation.navigate('ClientScreen')}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: '50%', flexDirection: 'row'}}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='cash-multiple' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.secondary}
                            size={150}
                            title='Cash'
                             onPress={()=> navigation.navigate('AddMemberScreen')}//shuldbe PaymentScreen
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='file-document-edit-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.secondary}
                            size={150}
                            title='Input Form'
                            onPress={()=> navigation.navigate('ClientFormScreen')}
                        />
                    </View>
                </View>

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    logoContainer:{
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logoName:{
        width: '90%',
        height: 130,
    },

})

export default HomeScreen;