import { React, useEffect, useState, useContext } from 'react';
import { Image, Button, Modal, FlatList, View, StyleSheet, TextInput } from 'react-native';
import TransferCard from '../TransferCard';
import NewCard from '../NewCard';
import colors from '../colors';
import CashierNameCard from '../CashierNameCard';
import Screen from '../Screen'
import { getClients } from '../APIcalls/getRequests'
import AppButton from '../AppButton';
import StoreContext from './GlobalState';
import axios from 'axios';
import TopButtons from './TopButtons';
function TransferScreen({ navigation }) {
  const list = [
    { Name: 'Hassan Mansoor1', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 1 },
    { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 2 },
    { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 3 },
    { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 4 },
    { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 5 },
  ];
  // console.log("in client Screen",list)
  const [payments, setPayments] = useState();
  const [clients, setClients] = useState();
  const [transferId, setTransferId] = useState([]);
  const [transferAmounts, setTransferAmounts] = useState([]);
  const [realTime, setRealTime] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [CashierName, setCashierName] = useState([]);
  const [heldbyCashierName, setheldbyCashierName] = useState([]);

  const [name, setName] = useState('Select Cashier')

  // console.log(RiderContextData.Role.employeeName, "RiderNameRiderName");
  const [CashierObjectID, setCashierObjectID] = useState([]);
  const RiderContextData = useContext(StoreContext)
  const BelongsTo = RiderContextData.Role.createdBy
  const RiderID = RiderContextData.Role._id

  // console.log(RiderContextData.Role._id, "RiderNameRiderName");


  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "https://paym-api.herokuapp.com/heldBy",
  //     data: {
  //       heldby: RiderContextData.Role._id
  //     }
  //   }).then((res) => {
  //     setClients(res.data);
  //     // console.log(res.data);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }, [realTime])


  useEffect(() => {
    axios({
      method: "post",
      url: "https://paym-api.herokuapp.com/auth/craetedby",
      data: {
        createdBy: RiderContextData.Role.createdBy,
        Role: "Cashier"
        // Role: Globaledata.Role.Role
      }
    }).then((res) => {

      setCashierName(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [realTime,])

  useEffect(() => {
    axios({
      method: "post",
      url: "https://paym-api.herokuapp.com/filteredPayments",
      data:{
          filter:{
          heldby:RiderContextData.Role._id
        }
                    }

      }
  ).then((res) => {
      var a = res.data
setPayments(a);
console.log("Payments",res.data.length);
  }).catch((error) => {
      console.log(error);
  })
  }, [])


  const handlePress = () => {
    console.log("World")
    setModalVisible(true)
  }


  const handleValues = (ids, amounts) => {
    setTransferId(ids);
    setTransferAmounts(amounts);
    console.log(ids, "datatatata");
  }


  const handlebyCashier = (data) => {

    setheldbyCashierName(data.employeeName)
    setName(data.employeeName)
    setModalVisible(!modalVisible)
    setheldbyCashierName(data)

 //   console.log(data._id, "Cashier Data");
    setCashierObjectID(data._id)
  }
  // console.log(heldbyCashierName, "heldbyCashierNameheldbyCashierNameheldbyCashierName");

  function PaymentTransferCashier() {
    let amounts = [0];
    // console.log(transferId, "transferId");
    for (let i = 0; i < transferId.length; i++) {

      var paymentObjectId = transferId[i]
      console.log(paymentObjectId, "paymentObjectId");

      axios({
        method: "post",
        url: `https://paym-api.herokuapp.com/auth/paymentTransfer/${paymentObjectId}`,
        data: {
          heldby: heldbyCashierName._id,
          status:"True"
        }
      }).then((res) => {
        amounts.push(res.data.PaymentAmount);
        console.log(res, "res");

        setRealTime(!realTime)
        setTransferId("")
        alert("Payment is transferred successfully");

      }).catch((err) => {
        console.log(err, "error");
      })
    }
    transaction(transferId, transferAmounts);
  }

  function transaction(id, amount) {
    console.log(transferId, "transfer", CashierObjectID, "transaction");

    axios({
      method: "post",
      url: "https://paym-api.herokuapp.com/auth/transaction",
      data: {
        nature: "Internal Transfer",
        Instrument: id,
        PaymentAmount: amount,
        BelongsTo: BelongsTo,
        to: CashierObjectID,
        From: RiderID,
      }

    }).then((res) => {
      console.log(res.data, "transaction Response");
    }).catch((err) => {

      console.log(err, "transaction Error");
    })
  }


  return (
    <Screen>
      <TopButtons header={'Transfer Screen'} navigation={navigation} />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <View style={styles.textContainer}>
          <TextInput style={{ fontWeight: 'bold', width: '100%' }} placeholder='Client Name' />
        </View>
        <Button title='Search' />
      </View>
      {payments != null ?
        <FlatList
          // key={i}
          data={payments}
          keyExtractor={listing => listing.ClientId}
          renderItem={({ item, i }) =>
            <TransferCard
              key={i}
              title={item.PaymentName}
              subTitle={item.PaymentAmount}
              subSubTitle={item.status}
              // value={item.PaymentId}
              value={item}
              arrayList={handleValues}
            />
          }
        /> : <></>}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 10 }}>
        <View style={{ width: '45%' }}>
          <AppButton title={name} color='teal' style={{ width: 50 }} onPress={
            () => handlePress()
          } />
        </View>
        <View style={{ width: '45%' }}>
          <AppButton title='Submit' color='teal' onPress={
            // () => console.log(transferId, "djdjdjdj")
            PaymentTransferCashier
          } />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        {/* <Button title='List of Cashier' onPress={() => setModalVisible(!modalVisible)} color={colors.teal} /> */}
        <FlatList
          data={CashierName}
          keyExtractor={item => item.value}
          // keyExtractor={tempRiderName => tempRiderName.value.toString()}
          renderItem={({ item }) =>
            <CashierNameCard
              name={item.employeeName}
              onPress={() => handlebyCashier(item)}

            />
          }
        />
      </Modal>
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
  textContainer: {
    width: '80%',
    height: 50,
    backgroundColor: colors.light,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
})
export default TransferScreen;