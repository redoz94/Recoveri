import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import PhoneCamera from './PhoneCamera';
import colors from './colors';

function ImageInput({ imageUri, onChangeImage, navigation }) {

    useEffect(()=> {
        requestPermission();
    }, []);

    const requestPermission = async ()=>{
        const result = await ImagePicker.requestCameraPermissionsAsync();
        if (!result.granted){
          alert('You need to enable permission to access the library.');
        }
    }

    const handlePress=()=> {
        if (!imageUri){
            selectImage();
        }
        else{
            Alert.alert(
                'Delete',
                'Are you sure you want to delete this image?',
                [
                    {text: 'Yes', onPress:()=> onChangeImage(null)},
                    {text: 'No'},
                ]
            )
        }
    }

const selectImage= async()=> {
    try {      
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        });
          if (!result.cancelled){
            onChangeImage(result.uri);
            }
        } catch (error) {
          console.log('Error reading an image', error);
        }
}


return (
    <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
            {! imageUri && (<MaterialCommunityIcons color={colors.lightShade} name='camera' size={70}/>)}
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
    </TouchableWithoutFeedback>
      
  );
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: colors.lightGrey,
      borderRadius: 15,
      height: 150,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
  },
  image:{
    width: '100%',
    height: '100%',
    // borderRadius: 15,
  },
});

export default ImageInput;