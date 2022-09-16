import React from 'react';

import { Text, View, StyleSheet, Image } from 'react-native';

import Screen from '../Screen';
import Icon from '../Icon';
import colors from '../colors';
import TopButtons from './TopButtons';

function AdminHomeScreen({navigation}) {
    return (
        <Screen>
            {/* <TopButtons header={'Admin Home Screen'}/> */}
            <TopButtons header={'Admin Home Screen'} navigation={navigation}/>
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
                            name='account-plus-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Add Member'
                             onPress={()=> navigation.navigate('AddMemberScreen')}
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='account-multiple-plus-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Client List'
                            onPress={()=> navigation.navigate('ClientScreen')}
                        />
                    </View>
                </View>
                <View style={{ width: '100%', height: '50%', flexDirection: 'row'}}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='file-document-edit-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Reporting'
                             onPress={()=> navigation.navigate('SummaryScreen')}//shuldbe PaymentScreen
                        />
                    </View>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon 
                            name='view-dashboard-outline' 
                            backgroundColor={colors.backGround}
                            iconColor={colors.teal}
                            size={150}
                            title='Transactions'
                            onPress={()=> navigation.navigate('Transactions')}
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

export default AdminHomeScreen;