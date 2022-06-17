import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../../App";
import Button from "../../components/button";
import Input from "../../components/input";
const noteColorOptions = ["blue", "red", "green"];
export default function Create({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

 const navigation = useNavigation();

  const onPressCreateHandlrNotes = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        Color: noteColor,
        uid: user.uid,
      });
      setLoading(false);
      showMessage({
        message: 'Note successfully Created',
        type: 'success'
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00ff00" size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.SafeArea}>
      <Text style={{ fontSize: 22, fontWeight: "600", textAlign: "center" }}>
        Create Your New Note
      </Text>
      <View style={{ marginTop: 25 }}>
        <Input placeholder="Title" onChangeText={(val) => setTitle(val)} />
        <Input
          placeholder="Description"
          onChangeText={(val) => setDescription(val)}
          multiline={true}
        />
      </View>
      <View style={styles.radioBox}>
        <Text style={{ fontSize: 20 }}>Select Note Color: </Text>
        {noteColorOptions.map((option) => {
          const select = noteColor === option;
          return (
            <Pressable
              key={option}
              onPress={() => setNoteColor(option)}
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
      <Button onPress={onPressCreateHandlrNotes}>Add</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 25,
    paddingTop: 50,
  },

  radioBox: {
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
