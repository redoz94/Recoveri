import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Permissions from 'expo-permissions';

// import CameraRoll from '@react-native-community/cameraroll';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

// import { string } from 'yup';

export default function Add({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [storagePermission, setStoragePermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [permission, hasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraPermission.status === 'granted');

    const storagePermission = await MediaLibrary.requestPermissionsAsync();
    setStoragePermission(storagePermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted' && 
      storagePermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
      console.log('Picture Source', data.uri);
      const temp1 = data.uri;
      // const temp2 = await MediaLibrary.createAssetAsync(temp1);
      console.log('temp', temp1 );
  
      // await MediaLibrary.createAlbumAsync('GWA', asset);


//       const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
// if (perm.status != 'granted') {
//   return;
// }

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

      // handlePress(data);
      // const asset = await MediaLibrary.addAssetsToAlbumAsync('Expo', data.uri, false);
      // MediaLibrary.addAssetsToAlbumAsync(data.uri, 'expo', false);
      
      // handlePress();

        // saveFile(temp);
        handlePress(data.uri);


      // const cachedAsset = await MediaLibrary.createAssetAsync(data);

      // console.log('cachedAsset', asset.);
    }

  };



  // const saveFile = async (fileUri) => {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
  //   if (status === "granted") {
  //     const cachedAsset = await MediaLibrary.createAssetAsync(fileUri);
      
  //     const albumName = 'Download';
  //     const album = await MediaLibrary.getAlbumAsync(albumName)
      
  //     if(album){
  //       await MediaLibrary.addAssetsToAlbumAsync([cachedAsset], album, false);
  //     }else{
  //       const asset = await MediaLibrary.createAssetAsync(fileUri);
  //       await MediaLibrary.createAlbumAsync(albumName, asset);
  //     }
  //   }
  // };




    

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handlePress = (data) => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      {/* <Button title={'Gallery'} onPress={pickImage} /> */}
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});