import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator, Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text, View
} from "react-native";
import Button from "../../components/button";
import Input from "../../components/input";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const auth = getAuth();
  const image = require("../../../assets/images/login-screen-img.png");
  const loginHandler = async () => {
    setLoading(true);
    try{
        await signInWithEmailAndPassword(auth, email, password);
        setLoading(false)
    }catch(err){
          console.log(err);
          setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00ff00" size={"large"} />
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={image} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "bold",
            color: "#154666",
          }}
        >
          Never forget your notes
        </Text>
      </View>

      <View style={styles.inputBox}>
        <Input placeholder='Email' onChangeText={ (val) => setEmail(val)} />
        <Input onChangeText={ (val) => setPassword(val)} placeholder='Password' secureTextEntry />
      </View>
      <Button onPress={loginHandler} >Sign In</Button>
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={styles.navigation}
      >
        <Text style={{ fontSize: 18 }}>
          Don't have an account ?{" "}
          <Text style={{ fontWeight: "bold", color: "#184C78" }}>Sign Up</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  img: {
    width: 350,
    height: 350,
    alignSelf: "center",
  },
  inputBox: {
    marginHorizontal: 30,
  },
  navigation: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 25,
  },
});
