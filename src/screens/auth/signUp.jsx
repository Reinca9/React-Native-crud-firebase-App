import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator, Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../../App";
import Button from "../../components/button";
import Input from "../../components/input";


const genderOptions = ["Male", "Female", "Others"];




export default function SignUp() {
  const navigation = useNavigation();
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false)
  const auth = getAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00ff00" size={"large"} />
      </View>
    );
  }

  const signUpHandler = async () => {
    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc( collection(db, 'users'), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid
      })
      setLoading(false)
    } catch (error) {
      showMessage({
        message: 'something wrong! please try again later',
        type: 'danger'
      })
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={26} color="black" />
        </Pressable>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24 }}>Sign Up</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20, marginTop: 50 }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "bold",
            color: "#154666",
          }}
        >
          Create New Account!!!
        </Text>
      </View>

      <View style={styles.inputBox}>
        <Input placeholder="Email" onChangeText={(val) => setEmail(val)} />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
        <Input placeholder="Full Name" onChangeText={(val) => setName(val)} />
        <Input placeholder="Age" onChangeText={(val) => setAge(val)} />
      </View>

      <View style={styles.radioBox}>
        <Text style={{ fontSize: 20 }}>Select Gender: </Text>
        {genderOptions.map((option) => {
          const select = gender === option;
          return (
            <Pressable
              key={option}
              onPress={() => setGender(option)}
              style={styles.radioContainer}
            >
              <View
                style={[styles.outerLine, select && styles.selectOuterLine]}
              >
                <View
                  style={[styles.innerLine, select && styles.selectInnerLine]}
                ></View>
              </View>
              <Text style={{ fontSize: 18, marginLeft: 20 }}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button onPress={signUpHandler}>Sign Up</Button>
      <Pressable
        onPress={() => navigation.navigate("SignIn")}
        style={styles.navigation}
      >
        <Text style={{ fontSize: 18 }}>
          Already have an account ?{" "}
          <Text style={{ fontWeight: "bold", color: "#184C78" }}>Sign In</Text>
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
  inputBox: {
    marginHorizontal: 30,
  },
  navigation: {
    flex: 1,
    alignSelf: "center",
    marginTop: 70,
    position: "absolute",
    bottom: 25,
  },

  radioBox: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  outerLine: {
    height: 30,
    width: 30,
    borderColor: "#53736A",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  innerLine: {
    height: 15,
    width: 15,
    borderColor: "#53736A",
    borderWidth: 1,
    borderRadius: 15,
  },
  selectOuterLine: {
    borderColor: "#03A64A",
  },
  selectInnerLine: {
    backgroundColor: "#03A64A",
    borderColor: "#03A64A",
  },
});
