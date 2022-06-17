import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { db } from "../../../App";
import Button from "../../components/button";
import Input from "../../components/input";
const noteColorOptions = ["blue", "red", "green"];
export default function Edit({ user, route }) {
  const noteItem = route.params.item;

  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.Color);
  const [loading, setLoading] = useState(false);

 const navigation = useNavigation();

  const updateDocHandler = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        Color: noteColor,
      });
      setLoading(false);
      showMessage({
        message: 'Note successfully udpated',
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
        Update Note
      </Text>
      <View style={{ marginTop: 25 }}>
        <Input placeholder="Title" onChangeText={(val) => setTitle(val)} value={title} />
        <Input
          placeholder="Description"
          onChangeText={(val) => setDescription(val)}
          multiline={true}
          value={description}
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
      <Button onPress={updateDocHandler}>Submit</Button>
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