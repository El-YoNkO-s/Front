import React,{useState} from "react";
import axios from "axios";
import {View ,Text,StyleSheet,Image, useWindowDimensions,onPress,ScrollView } from "react-native"
import Logo from "../assets/images/myLogo.png"
import CustomInput from "../components/customInput/CustomInput";
import CustomButton from "../components/customButton/CusstomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { NavigationActions } from "@react-navigation/compat";
const SignIn = ()=>{
   const [password,setPassword]=useState("");
   const [email, setEmail] = useState("");
   const {height}=useWindowDimensions();
   const onSignInPressed =()=>{
    axios
    .post("http://192.168.22.185:3000/api/user/login", {
      password,
      email
    })
    .then((response) => console.log('logiin',response))
    .catch((err) => console.log(err));
};
   const onForgetPassword=()=>{
     console.warn("forget")
   }
   const onSignInGooglePressed=()=>{
    console.warn("sign in")
  }
  const onSignUpPressed=()=>{
    console.warn("onSignUpPress");
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(response, jsonValue)
    } catch (e) {
      // saving error
    }
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