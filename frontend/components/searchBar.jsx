import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import SearchImage from "../assets/search.png";

export default function SearchBar({ submit, topic, setTopic }) {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.input}
        value={topic}
        onChangeText={setTopic}
        keyboardAppearance="dark"
      />
      <TouchableOpacity style={styles.button} onPress={() => submit(topic)}>
        <Image source={SearchImage} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    padding: 20,
    marginTop: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: "85%",
    height: 40,
    borderColor: "#FAF9EE",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    color: "#FAF9EE",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginBottom: 0,
    outlineStyle: "none",
  },
  text: {
    fontSize: 18,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#FAF9EE",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 0,
    tintColor: "#FAF9EE",
  },
});
