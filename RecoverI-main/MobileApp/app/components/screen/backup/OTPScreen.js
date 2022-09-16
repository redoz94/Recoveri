import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, View ,TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';

import Screen from '../Screen';
import AppText from '../AppText';
import colors from '../colors';
import AppButton from '../AppButton';


function OTPScreen({ navigation, route }) {

    const {listing, isNew, textInput} = route.params;

    let modeOfPayment = {};

    if (isNew===true){
        modeOfPayment = 'Cheque'
    }else{
        modeOfPayment = 'Cash'
    }

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');

    var OTP_Array = ['','','',''];

    const handlePress = () => {
        // console.log(isNew)
        Alert.alert(
            'OTP Verification',
            'You have made the '+ modeOfPayment + " transaction of Rs. " + textInput +'.',
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    };

    return (
        <Screen>    
            <View style={styles.descriptionContainer}>
                <AppText style={{ fontWeight: '900'}}>Name: {listing.ClientName}</AppText>
                <AppText style={{ fontWeight: '900'}}>Amount: {(textInput)}</AppText>
                <AppText style={{ fontWeight: '900'}}>Mode of Payment: {(modeOfPayment)}</AppText>
            </View>
            <View style={styles.backgroundContainer}>
            <View style={styles.container}>
                <AppText style={{ fontWeight: 'bold', }}> Please Insert OTP </AppText>
                <View style={styles.inputContainer}>

                    <View style={styles.textContainer}>
                        <TextInput
                            ref={pin1Ref} 
                            style={styles.textBox}
                            placeholder="0"
                            keyboardType='numeric'
                            maxLength={1} 
                            onChangeText={(text) => {
                                console.log(text.toString())
                                OTP_Array[0]=text
                                setPin1(pin1)
                                if(text!== "" ){
                                    pin2Ref.current.focus()
                                }
                            }}
                        />
                    </View>
                    
                    <View style={styles.textContainer}>
                    <TextInput
                            ref={pin2Ref} 
                            style={styles.textBox}
                            placeholder="0"
                            keyboardType='numeric'
                            maxLength={1}
                            onChangeText={(text) => {
                                console.log(text.toString())
                                OTP_Array[1]=text
                                setPin2(pin2)
                                if(text!== "" ){
                                    pin3Ref.current.focus()
                                }
                            }}
                        />
                    </View>
                    
                    <View style={styles.textContainer}>
                    <TextInput
                            ref={pin3Ref} 
                            style={styles.textBox}
                            placeholder="0"
                            keyboardType='numeric' 
                            maxLength={1}
                            onChangeText={(text) => {
                                console.log(text.toString())
                                OTP_Array[2]=text
                                setPin3(pin3)
                                if(text!== "" ){
                                    pin4Ref.current.focus()
                                }
                            }}
                        />
                    </View>
                    
                    
                    <View style={styles.textContainer}>
                    <TextInput
                            ref={pin4Ref} 
                            style={styles.textBox}
                            placeholder="0"
                            keyboardType='numeric'
                            maxLength={1} 
                            onChangeText={(text) => {
                                console.log(text.toString())
                                OTP_Array[3]=text
                            }}
                        />
                    </View>

                </View>
                <View style={styles.button}>
                    <AppButton 
                        title='Confirm' 
                        color='black'
                        onPress={handlePress}
                    />
                </View>
            </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '80%',
        height: 220,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.lightShade,
        padding: 10,
    },
    descriptionContainer:{
        marginVertical: 30,
        alignItems: 'center',
    },
    backgroundContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    inputContainer:{
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-evenly',
    },
    textContainer:{
        backgroundColor: colors.lightBlueShade,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 15,        
    },
    textBox:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 40,
        fontWeight: '700',
    },
    button:{
        alignItems:'center'
    },
})



export default OTPScreen;