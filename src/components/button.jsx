import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({children, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.button}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#184C78",
    color: "#fff",
    padding: 15,
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
