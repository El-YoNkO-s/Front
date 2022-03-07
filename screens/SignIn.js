import React,{useState} from "react";
import axios from "axios";
import {View ,Text,StyleSheet,Image, useWindowDimensions,onPress,ScrollView,AsyncStorage} from "react-native"
import Logo from "../assets/images/myLogo.png"
import CustomInput from "../components/customInput/CustomInput"; 
import CustomButton from "../components/customButton/CusstomButton";
import * as Google from 'expo-google-app-auth';
import { useNavigation } from "@react-navigation/native";

// import { NavigationActions } from "@react-navigation/compat";
const SignIn = ()=>{
  const [userData,setUserData]=useState([])
   const [password,setPassword]=useState("");
   const [email, setEmail] = useState("");
   const {height}=useWindowDimensions();
   const navigation = useNavigation();
   const onSignInPressed =async ()=>{
    axios
    .post("http://192.168.22.143:3000/api/user/login", {
      password,
      email
    })
    .then( async (res)=>{
      if(res.data ==="Email or password is incorrect!"){
        console.log(data)
        console.log(res.result)
        console.warn("wrong password or email")
      }else{
console.log(res.data)
await AsyncStorage.setItem("response",JSON.stringify(res.data))


        navigation.navigate("Profile")
      }
    }).catch((err)=>console.log(err))
 

};
const getUserInfo=()=>{
  axios.get()
}



   const onForgetPassword=()=>{
     console.warn("forget")
   }
   const onSignInGooglePressed= async ()=>{
    try {
      const result = await Google.logInAsync({
        androidClientId: "43341331951-lvkbfsn9refima4il5cd3sh3c41o946a.apps.googleusercontent.com",
        iosClientId: "43341331951-idk530b0a5e2t8r2fu4hhljspq0srmne.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  const onSignUpPressed=()=>{
    console.warn("onSignUpPress");
  }
  
  return (
    <ScrollView>
    <View style={styles.root}>
      <Image
      source={Logo} 
       style={[styles.Logo,{height:height * 0.3}]}
       resizeMode="contain"
       />
    {/* <CustomInput 
    placeholder="username"
    value={username}
    setValue ={setUsername}
    /> */}
    <CustomInput placeholder="email" value={email} setValue={setEmail} />
    <CustomInput
    placeholder="password"
    value={password}
    setValue ={setPassword}
    secureTextEntry={true}
    />
     
    <CustomButton text="Sign In" onPress={onSignInPressed}/>
    <CustomButton 
    text="Forgot password"
     onPress={onForgetPassword}
     type="TERTIARY"
     
     />
     <CustomButton text="Sign In with Google" onPress={onSignInGooglePressed} bgColor="#FAE9EA"fgColor="#DD4D44"/>
     <CustomButton 
    text="you don t have an acount ? Create one"
     onPress={onSignUpPressed}
     type="TERTIARY"
     />
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
root :{
  alignItems:'center',
  padding:20
},
Logo:{
  width:"70%",
  maxWidth:300,
  maxHeight:200,
}
})
export default SignIn
