import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RadioInput({data }) {
  const [gender, setGender] = useState(null);
  const select = gender === data;
  return (
    <Pressable onPress={ () => setGender(data)} style={styles.container}>
      <View style={[styles.outerLine, select && styles.selectOuterLine ]}>
      <View style={[styles.innerLine, select && styles.selectInnerLine ]}></View>
      </View>
      <Text style={{ fontSize: 18, marginLeft: 20 }}>{data}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
    borderColor: '#03A64A'
  },
  selectInnerLine: {
    backgroundColor: '#03A64A',
    borderColor: '#03A64A'
  },
});
