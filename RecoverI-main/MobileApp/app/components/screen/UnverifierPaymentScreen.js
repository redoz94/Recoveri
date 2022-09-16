import { React, useEffect, useState,useContext } from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput } from 'react-native';
import PaymentCard from '../../components/PaymentCard';
import StoreContext from './GlobalState';
import NewCard from '../NewCard';
import colors from '../colors';
import TopButtons from './TopButtons';
import Screen from '../Screen';
import axios from 'axios';

import { getClients } from '../APIcalls/getRequests'


function UnverifierPaymentScreen({ navigation }) {

  const list = [
    { Name: 'Hassan Mansoor1', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 1 },
    { Name: 'Hammad Ahmed', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 2 },
    { Name: 'Anas Mansoor', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 3 },
    { Name: 'Bilal Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 4 },
    { Name: 'Mohib Zia', PhoneNumber: '0300-xxxxxxx', Amount: 'xxxxxxx', value: 5 },
  ];
  // console.log("in client Screen",list)
  const [clients, setClients] = useState();
  const [payments, setPayments] = useState();

  const userContext = useContext(StoreContext)
 
  const userId = userContext.Role._id
 
//- for filtered payments
useEffect(() => {
  axios({
      method: "post",
      url: "https://paym-api.herokuapp.com/filteredPayments",
      data:{
          filter:{
            heldby: userId,
            "status": "false"

        }
                    }

      }
  ).then((res) => {
      var a = res.data
setPayments(a);
  }).catch((error) => {
      console.log(error);
  })
}, [])




  return (
    <Screen>
      <TopButtons header={'Universal Payment Screen'} navigation={navigation}/>

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
          data={payments}
          keyExtractor={listing => listing.ClientId}
          renderItem={({ item, i }) =>
            <PaymentCard
              key={i}
              title={item.PaymentName}
              subTitle={item.PaymentAmount}
              subSubTitle={item.status}
              onPress={() => navigation.navigate('OTPScreen', item)}
            />
          }
        /> : <></>}
      {/* <NewCard
                  items={categories[0]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[0])
                  }
                />
                <NewCard
                  items={categories[1]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[1])
                  }
                />
                <NewCard
                  items={categories[2]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[2])
                  }
                />
                <NewCard
                  items={categories[3]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[3])
                  }
                />
                <NewCard
                  items={categories[4]}
                  onPress={()=> navigation.navigate('RecoveryScreen', categories[4])
                  }
                /> */}
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

export default UnverifierPaymentScreen;