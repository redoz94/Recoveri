import React, { useEffect, useState,useContext } from 'react';


import { Image, View, StyleSheet, FlatList, Modal, Button } from 'react-native';
import RiderCard from '../RiderCard';
import StoreContext from './GlobalState';

import Screen from '../Screen';
import colors from '../colors'
import axios from "axios";
import TopButtons from './TopButtons';

let temp = {};

function RiderAssignScreen({props,navigation}) {
    const [updateList, setUpdateList] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [Client, setClient] = useState([])
    const GlobaleEmployee = useContext(StoreContext)
    useEffect(() => {
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/BelongsTo",
            data: {
              createdBy: GlobaleEmployee.Role.createdBy
            }
          }).then((res) => {
            setClient(res.data)
            console.log("Clients in AssignRider",res.data);
        }).catch((err) => {
            console.log(err);
        })
        
    }, [updateList])

    let tempData = [
        { Name: 'Hassan Mansoor', PhoneNumber: '0300-xxxxxxx', Email: 'abc@example.com', Amount: 'xxxxxxx', Rider: null, value: 1 },
        { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Email: 'abc@example.com', Amount: 'xxxxxxx', Rider: 'Careem', value: 2 },
        { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Email: 'abc@example.com', Amount: 'xxxxxxx', Rider: null, value: 3 },
        { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Email: 'abc@example.com', Amount: 'xxxxxxx', Rider: 'Uber', value: 4 },
        { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Email: 'abc@example.com', Amount: 'xxxxxxx', Rider: null, value: 5 },
    ];

    // let tempRiderName = [
    //     { Name: 'Hassan Mansoor', value: 1 },
    //     { Name: 'Hammad Ahmed', value: 2 },
    //     { Name: 'Anas Mansoor', value: 3 },
    //     { Name: 'Bilal Zia', value: 4 },
    //     { Name: 'Mohib Zia', value: 5 },
    // ];










    return (
        <Screen>
            <TopButtons header={'Rider Assign Screen'} navigation={navigation}/>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                />
            </View>

            <FlatList
                data={Client}
                // keyExtractor={Client => Client.value.toString()}
                renderItem={({ item }) =>
                    <RiderCard
                        name={item.ClientName}
                        phoneNumber={item.ClientPhoneNumber}
                        email={item.ClientEmail}
                        amount={item.ClientAmount}
                        rider={item.ClientRider}
                        id={item}
                        update={updateList}
                        setUpdate={setUpdateList}
                        onPress={() => { handlePress(item._id) }}
                    />
                }
            />

        </Screen>
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 120,
        width: 300,
    },
    logoContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        // backgroundColor: colors.
    },
})

export default RiderAssignScreen;