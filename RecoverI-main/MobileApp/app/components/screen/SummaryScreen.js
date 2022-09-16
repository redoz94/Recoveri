import React, { useEffect, useState,useContext } from 'react';
import { Image, View, StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import PaymentList from '../PaymentList';

import AppText from '../AppText';
import Screen from '../Screen';
import colors from '../colors';
import axios from 'axios';
import TopButtons from './TopButtons';
import StoreContext from './GlobalState';


const attendanceData = [
    {
        emplyeeName: "Cashier1",
        amount: 600000,
    },
    {
        emplyeeName: "Cashier2",
        amount: 700000,
    },
    {
        emplyeeName: "Cashier3",
        amount: 800000,
    },
]



function SummaryScreen(props) {

    const [Cashier, setCashier] = useState([])
    const globalEmployee = useContext(StoreContext)
    console.log(globalEmployee.Role._id);

    useEffect(() => {
        axios({
            method: "post",
            url: "https://paym-api.herokuapp.com/auth/craetedby",
            data: {
                createdBy: globalEmployee.Role._id,
                Role: "Cashier"
                // Role: Globaledata.Role.Role
            }
        }).then((res) => {
            console.log(res.data, "data");
            setCashier(res.data)
        
        }).catch((error) => {
                console.error(error);
            
            });
    }, [])



    useEffect(() => {
        axios({
       
            method: "post",
            url: "https://paym-api.herokuapp.com/collectionBy",
            data: {
                heldby: globalEmployee.Role._id
            }

        }).then((res) => {
            console.log(res.data, "data");

        }).catch((error) => {
            console.error(error);
       
        });
    }, [])



    return (
        <Screen>
            <TopButtons header={'Summary Screen'} navigation={navigation}/>
            <View>
                <AppText style={styles.title}>
                    Payment Record
                </AppText>
            </View>
            <View style={styles.container}>
                <DataTable style={{ width: '100%' }}>
                    <DataTable.Header >
                        <DataTable.Title>
                            <AppText style={styles.header}>Name</AppText>
                        </DataTable.Title>
                        <DataTable.Title>
                            <AppText style={styles.header}>Amount</AppText>
                        </DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                <FlatList
                    data={Cashier}
                    renderItem={({ item }) =>
                        <PaymentList
                            item={item}
                            amount={0}
                        />
                    }
                />
            </View>

        </Screen>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        width: '100%',
    },
    header: {
        fontWeight: 'bold',
        color: colors.teal
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.teal
    },

})

export default SummaryScreen;