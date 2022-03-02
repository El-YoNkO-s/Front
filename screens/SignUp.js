import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import CustomInput from "../components/customInput/CustomInput";
import CustomButton from "../components/customButton/CusstomButton";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phone_number, setPhone_number] = useState();
  const [categorie, setCategorie] = useState("");
  const [birthday, setBirthday] = useState("");
  const onRegisterPressed = () => {
    axios
      .post("http://192.168.22.185:3000/api/user/register", {
        username,
        password,
        email,
        phone_number,
        categorie,
        birthday,
      })
      .then(() => console.log("registreed"))
      .catch((err) => console.log(err));
  };
  const onForgetPassword = () => {
    console.warn("forget");
  };
  const onSignInGooglePressed = () => {
    console.warn("sign in");
  };
  const onSignUpPressed = () => {
    console.warn("onSignUpPress");
  };
  const onTermpress = () => {
    console.warn("on T press");
  };
  const onPrivacypress = () => {
    console.warn("on P press");
  };
  // console.log(birthday, "birthdayyyyyyyyyyyyyyyyyyy");
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an acount</Text>
        <CustomInput
          placeholder="username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput placeholder="email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Repeat password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="phone Number"
          value={phone_number}
          setValue={setPhone_number}
        />
        <CustomInput
          placeholder="categorie"
          value={categorie}
          setValue={setCategorie}
        />
        <DatePicker
          style={{ width: "100%" }}
          date={birthday}
          placeholder="Select Date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          value={birthday}
          setValue={setBirthday}
        />
        <CustomButton text="Register" onPress={onRegisterPressed} />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermpress}>
            {" "}
            Terms of Use{" "}
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacypress}>
            {" "}
            Privacy Policy{" "}
          </Text>{" "}
        </Text>
        <CustomButton
          text="Forgot password"
          onPress={onForgetPassword}
          type="TERTIARY"
        />
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGooglePressed}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
        <CustomButton
          text="you don t have an acount ? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
export default SignUp;