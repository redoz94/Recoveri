import React, { useState } from 'react';

import { Image, StyleSheet, Switch, TouchableOpacity, View, ScrollView} from 'react-native';

import Screen from '../Screen';
import Icon from '../Icon';
import AppTextInput from '../AppTextInput';
import ImageInput from '../ImageInput';
import CameraInput from '../CameraInput';
import colors from '../colors';
import AppButton from '../AppButton';
import AppText from '../AppText';
import {postRequest} from '../APIcalls/postRequests'




function RecoveryScreen({ navigation, route }) {

  const listing = route.params;

  const [isNew, setIsNew] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [textInput, setTextInput] = useState(null);

  const handlePress = () => {
    console.log(textInput);
  }

  const handleContinue =async () => {
    
    console.log(listing);
    let api= "Clientdata";
    let payload={
      ClientId:"122",
clientName:"Wajahat",
clientEmail:"wajee@pacific.com.pk",
clientAmount:"190",
  status:"false"

    }
  //  let resp= await postRequest(api,payload);
    console.log("image",imageUri);
  //  navigation.navigate('OTPScreen', {listing, isNew, textInput})
  }
  return (
    <Screen style={styles.backGround}>
      <View style={styles.logoContainer}>
      <Image
          style={{width: 330, height: 140}} 
          source={require('../../assets/logo.png')} 
        />
      </View>
      <ScrollView>
      <View style={styles.inputContainer}>
        <AppText style={styles.name}>{listing.ClientName}</AppText>
        <AppTextInput
          placeholder='Amount'
          icon='currency-rupee'
          keyboardType='numeric'
          onChangeText={(textInput) => setTextInput(textInput)}
        />
      </View>
      <View style={ styles.chequeBarContainer}>
        <View style={styles.chequeBarLeft}>
          <AppText style={styles.text}>Cheque</AppText>
        </View>
        <View style={styles.chequeBarRight}>
          <Switch 
            value={isNew} 
            onValueChange={newValue => setIsNew(newValue)}
          />
        </View>
      </View>
      <View style={styles.image}>
        <CameraInput 
          imageUri={imageUri}
          onChangeImage={uri => setImageUri(uri)} 
        />

        <AppButton title='Continue' color= 'royalBlue' onPress={()=> handleContinue()}/>
      </View>
      <View style={styles.iconBar}>
          <Icon name='home' backgroundColor={colors.backGround} iconColor= {colors.royalBlue} onPress={handlePress}/>
          <Icon name='account' backgroundColor={colors.backGround} iconColor={colors.royalBlue} />
          <Icon name='magnify' backgroundColor={colors.backGround} iconColor= {colors.royalBlue} />
      </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
    backGround: {
      backgroundColor: '#D6DCE5',
      flex: 1,
    },
    chequeBarContainer:{
      width: '100%', 
      flexDirection: 'row',
      marginBottom: 15,
    },
    chequeBarRight:{
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chequeBarLeft:{
      width: '50%',
      justifyContent: 'center',
    },
    iconBar:{
      marginVertical: 15,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    image:{
      alignItems: 'center',
      marginVertical: 10,
    },
    inputContainer:{
      width: '100%', 
      paddingHorizontal: 20,
    },
    logo:{
      height: 120,
      width: 300,
    },
    logoContainer:{ 
      alignItems: 'center',
      width: '100%', 
      marginVertical: 10,
    },
    name:{
      fontWeight: '900',
      fontSize: 20,
      fontStyle: 'italic',
      color: colors.primary,
    },
    text:{
      fontWeight: '900',
      fontStyle: 'italic',
      textAlign: 'right',
    },
  });


export default RecoveryScreen;