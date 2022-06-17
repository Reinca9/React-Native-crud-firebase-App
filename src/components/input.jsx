import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({ placeholder, secureTextEntry, onChangeText, multiline, value }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText= {onChangeText}
      multiline= {multiline}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    padding: 15,
    borderBottomColor: "#BFBFBF",
    color: "#154666",
  },
});
