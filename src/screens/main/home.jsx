import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { db } from "../../../App";
export default function Home({ user }) {
  //state defines
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  //call react-native/navigation
  const navigation = useNavigation();
  //auth instance
  const auth = getAuth();
  //navigate create screen
  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  //handle logout 
  const LogOut = () => {
    signOut(auth);
  }

  //query data from firebase/firestore
  useEffect(() => {
    //create query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    //data observer and realtime changes
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //handle delete note
  const handleDeleteDoc = async (id) => {
    try {
      deleteDoc(doc(db, "notes", id));
    } catch (err) {
      console.log(err);
    }
  };

  // loading time
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00ff00" size={"large"} />
      </View>
    );
  }

  //each note
  const renderItem = ({ item }) => {
    const { title, description, Color, id } = item;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Edit", { item })}
        style={{
          backgroundColor: Color,
          padding: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
        <Text style={{ color: "white", marginTop: 8 }}>{description}</Text>
        <TouchableOpacity
          onPress={() => handleDeleteDoc(id)}
          style={{ position: "absolute", right: 10, top: 10, zIndex: 44 }}
        >
          <AntDesign name="delete" size={30} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.SafeArea}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600" }}>My Notes</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={LogOut}>
            <AntDesign name="logout" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={onPressCreate}>
            <AntDesign name="pluscircleo" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
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
});
