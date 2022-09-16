import React, { useEffect, useState, useContext } from 'react'

import { Image, ScrollView, StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Screen';
import { AppForm, AppFormField, SubmitButton } from '../forms';
import AppButton from '../AppButton';
import axios from 'axios';
import StoreContext from './GlobalState';
import TopButtons from './TopButtons';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});


function LoginScreen({ navigation }) {


    const AdminRole = useContext(StoreContext);

    // console.log(AdminRole,"AdminRole");

    const handlePress = (values) => {
        console.log(values.email, "login");
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/login",
            data: {
                email: values.email,
                password: values.password,
            }
        }).then((res) => {
            // console.log(res.data,"login Response");
            console.log(res.data.Role);
            // localStorage.setItem("Role", JSON.stringify(res.data.Role))
            alert("Login Successfully!")
            // console.log(email)
            AdminRole.setRole(res.data)
            if (res.data.Role === 'Admin') {
                navigation.navigate('AdminHomeScreen')

            } else if (res.data.Role === 'Cashier') {

                navigation.navigate('CashierHomeScreen')

            } else if (res.data.Role === "Rider") {

                navigation.navigate('RiderHomeScreen')

            } else {
                navigation.navigate('WelcomeScreen')

            }

        }).catch((err) => {
            console.log(err, "employee not found");
            alert("Login error, please retry later");
        })


    }

    return (
        <Screen style={styles.container}>
            <TopButtons header={'Login Screen'} navigation={navigation}/>
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
                <AppForm
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { resetForm }) => {
                        handlePress(values)
                        // , resetForm({ values: initialValues });
                    }}
                    validationSchema={validationSchema}
                >
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
                        title='Login'
                        color='teal'
                    />
                </AppForm>
            </ScrollView>

            {/* <AppButton
                title='By pass to home Screen'
                color='black'
            onPress={()=> navigation.navigate('HomeScreen')}
            /> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    logo: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
})
export default LoginScreen; 