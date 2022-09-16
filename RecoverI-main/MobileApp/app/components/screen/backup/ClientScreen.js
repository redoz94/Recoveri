import {React,useEffect,useState} from 'react';
import { Image, Button, Text, FlatList, View, StyleSheet, TextInput } from 'react-native';
import Card from '../Card';
import NewCard from '../NewCard';
import colors from '../colors';
import Screen from '../Screen'
import {getClients} from '../APIcalls/getRequests'


function ClientScreen({ navigation }) {

  const list = [
    { Name: 'Hassan Mansoor1', PhoneNumber:'0300-xxxxxxx', Amount:'xxxxxxx', value: 1 },
    { Name: 'Hammad Ahmed', PhoneNumber:'0300-xxxxxxx', Amount:'xxxxxxx', value: 2 },
    { Name: 'Anas Mansoor', PhoneNumber:'0300-xxxxxxx', Amount:'xxxxxxx', value: 3 },
    { Name: 'Bilal Zia', PhoneNumber:'0300-xxxxxxx', Amount:'xxxxxxx', value: 4 },
    { Name: 'Mohib Zia', PhoneNumber:'0300-xxxxxxx', Amount:'xxxxxxx', value: 5 },
  ];
  // console.log("in client Screen",list)
  const[clients,setClients]=useState();
  useEffect(() => {
    fetch("https://paym-api.herokuapp.com/ClientData")
    .then((response) => response.json())
    .then((responseJson) => {
        console.log("in getAPI",responseJson);
         setClients(responseJson.Data);
  
    })
    .catch((error) => {
    console.error(error);
    });
   
   
     },[]);

    return (
        <Screen>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo} 
                    source={require('../../assets/logo.png')} 
                />
                <View style={styles.textContainer}>
                  <TextInput style={{fontWeight:'bold', width: '100%'}} placeholder='Client Name'/>
                </View>
                <Button title='Search'/>
            </View>
            {clients!=null?
            <FlatList 
                    data={clients}
                    keyExtractor={listing => listing.ClientId}
                    renderItem={({item}) =>
                    <Card 
                      title={item.ClientName}
                 
                      subTitle={item.PhoneNumber}
                            subSubTitle={item.Amount}
                            onPress={()=>navigation.navigate('RecoveryScreen', item)} 
                        /> 
                    } 
                />:<></>}
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
    logo:{
        height: 120,
        width: 300,
      },
      logoContainer:{ 
        alignItems: 'center',
        width: '100%', 
        marginVertical: 10,
        // backgroundColor: colors.
      },
      textContainer:{
        width: '80%',
        height: 50,
        backgroundColor: colors.light,
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
      },
})

export default ClientScreen;