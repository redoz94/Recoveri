import React, { useContext, useState } from 'react';

import { View, Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker'


import { AppForm, AppFormField, SubmitButton } from '../forms';
import Screen from '../Screen'
import colors from '../colors';
import axios from "axios";
import TopButtons from './TopButtons';
import StoreContext from './GlobalState';


const validationSchema = Yup.object().shape({
    userName: Yup.string().required().label("User Name"),
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
});

function AddMemberScreen({navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Rider', value: 'Rider' },
        { label: 'Cashier', value: 'Cashier' },
    ]);
    const createdByAdminId = useContext(StoreContext)

    // console.log(createdByAdminId.Role._id, "createdBy");

    const handlePress = ({ values, value }) => {


        console.log(values, value, "a");
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/employe",
            data: {
                email: values.email,
                password: values.password,
                Role: value,
                createdBy: createdByAdminId.Role._id,
                name: values.userName
            },
        })
            .then((res) => {
                console.log(res.data, "response");
                alert(`your ${value} is successully created`)
            })
            .catch((err) => {
                console.log(err, "error");
            });


    }

    return (
        <Screen style={styles.backGround}>

            <TopButtons header={'Admin Member Screen'} navigation={navigation}/>
            <View style={styles.logoContainer}>
                <Image
                    style={{ width: 330, height: 140 }}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <View style={styles.inputContianer}>

                <AppForm
                    initialValues={{ email: '', password: '', userName: '' }}
                    // onSubmit={values => console.log(values, value,":sasas")}
                    onSubmit={values => { handlePress({ values, value }) }}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='account-circle-outline'
                        keyboardType='email-address'
                        name='userName'
                        placeholder='User Name'
                        textContentType='emailAddress'
                    />

                    <AppFormField
                        autoCapitalize='none'
                        autoCorrect={false}
                        icon='email-outline'
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

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{ backgroundColor: colors.lightGrey, borderRadius: 25 }}
                    />

                    <SubmitButton title='Confirm'
                        color='teal' />
                </AppForm>

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#D6DCE5',
        flex: 1,
    },
    logo: {
        height: 120,
        width: 300,
    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    inputContianer: {
        paddingHorizontal: 15,
    },
})

export default AddMemberScreen;