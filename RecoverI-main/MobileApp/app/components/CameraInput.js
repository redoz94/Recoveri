import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, Modal, Pressable } from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from './colors';

function CameraInput({ imageUri, onChangeImage, navigation }) {

    const [cameraPermission, setCameraPermission] = useState(null);
    const [storagePermission, setStoragePermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [camera, setCamera] = useState(null);
    const [permission, hasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);


    const permisionFunction = async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission.status === 'granted');
    
        const storagePermission = await MediaLibrary.requestPermissionsAsync();
        setStoragePermission(storagePermission.status === 'granted');
        if (
          cameraPermission.status !== 'granted' && 
          storagePermission.status !== 'granted'
        ) {
          alert('Permission for media access needed.');
        }
      };

    useEffect(()=> {
        permisionFunction();
    }, []);

    const handlePress=()=> {
        // if (!imageUri){
            selectImage();
        }

const selectImage= async()=> {
    console.log('hello1');
    if (camera) {
        const data = await camera.takePictureAsync(null);
        setModalVisible(!modalVisible);
        onChangeImage(data.uri);
  try {
    const asset = await MediaLibrary.createAssetAsync(data.uri);
    const album = await MediaLibrary.getAlbumAsync('Expo');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('Expo', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (error) {
    console.log(error);
  }
      }
}
return (    
        <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Picture has not changed.");
            setModalVisible(!modalVisible);
            }}
            >
            <View style={styles.cameraContainer}>
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'}
                />
                <Pressable
                onPress={ handlePress }
                >
                <MaterialCommunityIcons name='camera' size={30} style={{ paddingTop: 20, color: 'blue' }} />
                </Pressable>
            </View>
        </Modal>
        <Pressable
            onPress={() => setModalVisible(true)}
        >
            <View style={styles.container}>
                {! imageUri && (<MaterialCommunityIcons color={colors.lightShade} name='camera' size={60}/>)}
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            </View>
        </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
  } ,
  container:{
      backgroundColor: colors.lightGrey,
      borderRadius: 15,
      height: 150,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  image:{
    width: '100%',
    height: '100%',
    // borderRadius: 15,
  },
});

export default CameraInput;