import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Checkbox from 'expo-checkbox';

import colors from './colors';
import AppText from './AppText';
import NewCard from './NewCard';

let tempArray=[];// for logging ids
let tempAmount=[];// for accumulated amounts

function TransferCard({title, subTitle, subSubTitle, onPress, value, arrayList}) {

    const [checkBox, setCheckBox] = useState(false);
    const [array, setArray] = useState([])


    const handlePress=(value)=>{
        setCheckBox(previousState => !previousState)        
        if(checkBox== false){
            tempArray.push(value._id);
            tempAmount.push(value.PaymentAmount);
            console.log('tempArray after addition ' , tempArray,tempAmount)
            // alert('tempArray after addition ' + tempArray)
        }else{
            var index = tempArray.indexOf(value._id)
            tempArray.splice(index, 1);
            tempAmount.splice(index, 1);
            console.log('tempArray after substraction ' + tempArray,tempAmount)
            // alert('tempArray after substraction ' + tempArray)
        }
        arrayList(tempArray,tempAmount);
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.detailsContainer}>
                <AppText style={styles.title} numberOfLines={1}>Name: {title}</AppText>
                <AppText style={styles.subTitle} numberOfLines={1}>Amount: {subTitle}</AppText>
                <AppText style={styles.subTitle} numberOfLines={1}>Status: {subSubTitle}</AppText>
            </View>
            <View style={styles.switch}>
                <Checkbox
                    style={styles.checkbox}
                    value={checkBox}
                    onValueChange={()=> handlePress(value)}
                    color={checkBox ? '#4630EB' : undefined}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 15,
        backgroundColor: colors.lightBlueShade,
        marginBottom: 15,
        marginHorizontal: 10,
        overflow: 'hidden',
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: colors.dark,
        borderWidth: 2,
        flexDirection: 'row',
    },
    checkbox:{
        width: 25,
        height: 25,
    },
    detailsContainer:{
        width: '80%',
    },
    subTitle:{
        color: colors.secondary,
        // fontWeight: 'bold',
        paddingLeft: 3
    },
    switch:{
        width: "20%",
        // height: '100%',
        // backgroundColor: 'red',
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color: colors.primary,
        marginBottom: 7,
        fontWeight: 'bold',
    },
})

export default TransferCard;