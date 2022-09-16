import React, { useState, useEffect, useContext } from 'react';
import { Button, View, StyleSheet, FlatList, TouchableOpacity, Modal, Text } from 'react-native';

import RiderNameCard from '../components/RiderNameCard';

import colors from './colors';
import AppText from './AppText';
import axios from "axios";
import StoreContext from './screen/GlobalState';

const tempRiderName = [
    { Name: 'Hassan Mansoor', value: 1 },
    { Name: 'Hammad Ahmed', value: 2 },
    { Name: 'Anas Mansoor', value: 3 },
    { Name: 'Bilal Zia', value: 4 },
    { Name: 'Mohib Zia', value: 5 },
]

// 
function RiderCard({ name, phoneNumber, email, amount, rider, id,setUpdate,update, navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [Rider, setallRider] = useState([])
    const Globaledata = useContext(StoreContext);
    const [realTime, setRealTime] = useState(true);

    console.log(Globaledata.Role, "Rider Card Globaledata");
    // console.log(Globaledata.Role._id, "Rider Card Globaledata");

    const handlePress = () => {
        // console.log(rider)
        setModalVisible(true)

    }


    // useEffect(() => {
    //     axios({
    //         method: "get",
    //         url: "https://paym-api.herokuapp.com/auth/RiderEmploye",
    //     }).then((res) => {

    //         setallRider(res.data)
    //         // console.log(res.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }, [realTime])

    useEffect(() => {
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/craetedby",
            data: {
                createdBy: Globaledata.Role.createdBy,
                Role: "Rider"
                // Role: Globaledata.Role.Role
            }
        }).then((res) => {

            setallRider(res.data)
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [realTime])

    var ClinetID = id._id
    var employeeName = Globaledata.Role.employeeName

    const handleRider = (item) => {

        console.log(item.employeeName, "eee");
        console.log(item, "eee");

        axios({
            method: 'post',
            url: "https://paym-api.herokuapp.com/ClientDataUpdate",
            data: {
                id: ClinetID,
                ClientRider: item.employeeName,
                CashierName: employeeName,
                ClientRiderObjectId: item._id
            }
        }).then((res) => {
            console.log(res.data.message, "res");
            alert(res.data.message)
            setRealTime(!realTime);
            setUpdate(!update);
            navigation.navigate('RiderAssignScreen')

        }).catch((err) => {
            console.log(err, "err");
        })
    }

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => { handlePress() }}>
                <View style={styles.detailsContainer}>
                    <AppText>{name}</AppText>
                    <AppText>{phoneNumber}</AppText>
                    <AppText>{email}</AppText>
                    <AppText>Rs: {amount}</AppText>
                    {/* <AppText>Rider: {rider===true? 'temp' : id.Rider}</AppText> */}
                    <AppText>Rider: {rider}</AppText>

                </View>
            </TouchableOpacity>



            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <Button title='List of Riders' onPress={() => setModalVisible(!modalVisible)} color={colors.royalBlue} />


                <FlatList
                    data={Rider}
                    // keyExtractor={tempRiderName => tempRiderName.value.toString()}
                    renderItem={({ item }) =>
                        <RiderNameCard
                            name={item.employeeName}
                            // id={item._id}
                            onPress={() => { handleRider(item) }}
                        />
                    }
                />

            </Modal>





















        </>



    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.lightBlueShade,
        marginBottom: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: colors.dark,
        borderWidth: 2,
    },
    subTitle: {
        color: colors.secondary,
        // fontWeight: 'bold',
        paddingLeft: 3
    },
    title: {
        color: colors.primary,
        marginBottom: 7,
        fontWeight: 'bold',
    },
})

export default RiderCard;