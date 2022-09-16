import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Platform, TouchableWithoutFeedback, Modal, Button, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import defaultStyles from './styles';
import AppText from './AppText';
import Screen from './Screen';
import PickerItem from './PickerItem';

function AppPicker({ icon, items, numberOfColumns  = 1 ,onSelectItem, PickerItemComponent = PickerItem ,placeholder, selectedItem, width='100%' }) {

    const [modalVisible, setModalVisible ] =  useState(false);

     return (
         <React.Fragment>
            <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>
                <View style={[styles.container, {width}]}>
                    {icon && <MaterialCommunityIcons name={icon} size={25} color={defaultStyles.colors.lightShade} style={styles.icon} />}
                    {selectedItem ? (
                        <AppText style={styles.text}>{selectedItem.label}</AppText>
                    ): (
                        <AppText style={styles.placeholder}>{placeholder}</AppText>
                    )}
                    {/* <AppText style={styles.text}>{ selectedItem ? selectedItem.label : placeholder }</AppText>  */}  
                    <MaterialCommunityIcons name="chevron-down" size={25} color={defaultStyles.colors.lightShade} style={styles.icon} />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
                <Screen>
                    <Button title='Close' onPress={()=> setModalVisible(false)} />
                    <FlatList 
                        data={items} 
                        keyExtractor={(item) => item.value.toString()}
                        numColumns={numberOfColumns}
                        renderItem={({item}) =>( 
                            <PickerItemComponent 
                                item={item}
                                label={item.label}
                                onPress={()=> {
                                    setModalVisible(false);
                                    onSelectItem(item);   
                                }} /> )} />
                </Screen>
            </Modal>
         </React.Fragment>
     );
 }

 const styles = StyleSheet.create({
     container:{
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
     },
     icon:{
        marginRight:10,
     },
     placeholder:{
         color: defaultStyles.colors.lightShade,
         flex: 1,
     },
     text:{
        flex: 1,
     },
 })
 
 export default AppPicker;