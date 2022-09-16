import React from 'react';

import { Image, ScrollView, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import Icon from '../Icon';

import AppButton from '../AppButton';
import Screen from '../Screen';
import colors from '../colors';
import TopButtons from './TopButtons';
import { AppForm, AppFormField, SubmitButton } from '../forms';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});





function LoginScreen({ navigation }) {



    const handlePress = (values) => {
        // console.log(values, "form");
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/employe",
            data: {
                name: values.name,
                email: values.email,
                password: values.password,
                Role: "Admin",
            }
        }).then((res) => {

            alert("Admin has been Created")
            if(values.name=='Admin'){
                navigation.navigate('AdminHomeScreen')
            }else if(values.name=='Cashier'){
                navigation.navigate('CashierHomeScreen')
            }else if(values.name=='Rider') {
                navigation.navigate('RiderHomeScreen')
            }
            // alert(res.data.message)
            // console.log(res.data, "Json Res");

        }).catch((err) => { console.log(err, "Admin Created Error"); })
    }


    return (
        <Screen style={styles.container}>
            <TopButtons header={'Recovery Screen'} navigation={navigation}/>
            <ScrollView>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logoName}
                    />
                    <Icon
                        name='account-tie-outline'
                        backgroundColor={colors.backGround}
                        iconColor={colors.secondary}
                        size={150}
                    />
                </View>
                <AppForm
                    initialValues={{ email: '', password: '', name: '' }}
                    onSubmit={(values, { resetForm }) => {
                        handlePress(values)
                        // , resetForm({ values: initialValues });
                    }}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize='words'
                        autoCorrect={false}
                        icon='card-account-details-outline'
                        name='name'
                        placeholder='Name'
                        textContentType='name'
                    />
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='email'
                        keyboardType='email-address'
                        name='email'
                        placeholder='Email'
                        textContentType='emailAddress'
                    />
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='lock'
                        name='password'
                        placeholder='Password'
                        secureTextEntry={true}
                        textContentType='password'
                    />

                    <SubmitButton 
                        title='Register'
                        color='teal'
                    />
                </AppForm>
            </ScrollView>

            {/* <view>Login</view> */}

            {/* <AppButton
                title='By pass to home Screen'
                color='black'
                onPress={() => navigation.navigate('HomeScreen')}
            /> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: colors.backGround,
    },
    logoContainer: {
        width: '100%',
        height: 250,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoName: {
        width: '100%',
        height: 120,
    },
})
export default LoginScreen; 