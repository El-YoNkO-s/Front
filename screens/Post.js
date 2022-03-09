import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ScrollView, StyleSheet, TextInput ,Alert,SafeAreaView,AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
export default function ImagePickerExample() {

  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [imageselected,setimageselected]= useState("")
  const [iduserdata,setiduserdata]= useState([])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }


  };
  
  const sentpost= async ()=> {
    await AsyncStorage.getItem("response").then((res)=>{
      var x = JSON.parse(res)
      axios.post("http://192.168.22.200:3000/api/posts/Post",{
        post:text,
        picture:image,
        id_User:x.id_User
      })
      .then((response)=>{
        console.log(response);
      })
    })
  }
  

  // const uploadImage = (image)=>{
  //   const formdata = new FormData();
  //   formdata.append("file",image[0])
  //   formdata.append("upload_preset","tnjoxxs1")

  //   axios.post("https://api.cloudinary.com/v1_1/ihebmoujahed/image/upload",formdata).then(response=>{
  //     console.log(response);
  //   })
  // }

  return (
    <SafeAreaView style={styles.container}>

    <View >
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button
        title="Press me"
        color="#f194ff"
        onPress={sentpost}
      />
    </View>
    </SafeAreaView>


  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  }
})
